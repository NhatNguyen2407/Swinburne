<?php
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');

if (isset($_GET['api'])) {
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    if ($_GET['api'] === 'health' && $_SERVER['REQUEST_METHOD'] === 'GET') {
        echo json_encode(['status' => 'ok', 'service' => 'DeployLens PHP']);
        exit;
    }
    if ($_GET['api'] !== 'analyze' || $_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found.']);
        exit;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    if (!is_array($input)) respondError('Invalid JSON request.');
    $name = is_string($input['releaseName'] ?? null) ? trim($input['releaseName']) : '';
    $version = is_string($input['version'] ?? null) ? trim($input['version']) : '';
    $environment = $input['environment'] ?? null;
    $changeType = $input['changeType'] ?? null;
    $checks = $input['checks'] ?? null;

    if ($name === '' || strlen($name) > 60) respondError('Release name must contain 1 to 60 characters.');
    if ($version === '' || strlen($version) > 24 || !preg_match('/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/', $version)) {
        respondError('Version must contain 1 to 24 letters, digits, dots, dashes or underscores.');
    }
    if (!in_array($environment, ['Development', 'Staging', 'Production'], true)) respondError('Choose a valid deployment environment.');
    if (!in_array($changeType, ['Patch', 'Minor', 'Major'], true)) respondError('Choose a valid change type.');
    if (!is_array($checks)) respondError('Provide the release checklist.');

    $descriptions = [
        'tests' => ['Automated tests', 20, 'Run the automated test suite and record the outcome.'],
        'security' => ['Security review', 18, 'Review access, secrets and exposed endpoints before deployment.'],
        'dependencies' => ['Dependency compatibility', 14, 'Verify libraries, runtime versions and external services.'],
        'staging' => ['Staging verification', 18, 'Test the release in a production-like staging environment.'],
        'monitoring' => ['Monitoring configured', 12, 'Configure request logs, error monitoring and a health check.'],
        'rollback' => ['Rollback plan', 18, 'Prepare and verify a rollback procedure before release.']
    ];
    $passed = 0;
    $risk = 0;
    $findings = [];
    foreach ($descriptions as $key => [$title, $penalty, $recommendation]) {
        if (!isset($checks[$key]) || !is_bool($checks[$key])) respondError('Checklist fields must be true or false.');
        if ($checks[$key]) {
            $passed++;
        } else {
            $risk += $penalty;
            $findings[] = ['key' => $key, 'title' => $title, 'impact' => $penalty, 'recommendation' => $recommendation];
        }
    }
    if ($environment === 'Production') $risk += 10;
    $risk += $changeType === 'Major' ? 8 : ($changeType === 'Minor' ? 4 : 0);
    $risk = min(100, $risk);
    $score = 100 - $risk;
    $critical = $environment === 'Production' && (!$checks['rollback'] || !$checks['staging'] || !$checks['tests']);
    $status = $critical || $score < 55 ? 'BLOCKED' : ($score < 80 ? 'REVIEW' : 'READY');
    $summary = match ($status) {
        'READY' => 'The selected controls indicate a release that is ready for final approval.',
        'REVIEW' => 'Some release controls are incomplete. Review the findings before deploying.',
        default => 'Deployment is not recommended until the flagged controls are addressed.'
    };
    echo json_encode([
        'release' => ['name' => $name, 'version' => $version, 'environment' => $environment, 'changeType' => $changeType],
        'score' => $score, 'risk' => $risk, 'status' => $status, 'summary' => $summary,
        'passed' => $passed, 'total' => count($descriptions), 'findings' => $findings,
        'analyzedAt' => gmdate('Y-m-d\\TH:i:s\\Z')
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

require __DIR__ . '/view.php';

function respondError(string $message): never
{
    http_response_code(400);
    echo json_encode(['error' => $message]);
    exit;
}
