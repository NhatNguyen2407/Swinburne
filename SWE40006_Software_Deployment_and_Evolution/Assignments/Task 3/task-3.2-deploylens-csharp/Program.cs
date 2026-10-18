using System.Text.RegularExpressions;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok", service = "DeployLens C#" }));
app.MapPost("/api/analyze", (AssessmentInput input) =>
{
    string? name = input.ReleaseName?.Trim();
    string? version = input.Version?.Trim();
    string? environment = input.Environment;
    string? changeType = input.ChangeType;
    var checks = input.Checks;

    if (string.IsNullOrWhiteSpace(name) || name.Length > 60)
        return Results.BadRequest(new { error = "Release name must contain 1 to 60 characters." });
    if (string.IsNullOrWhiteSpace(version) || version.Length > 24 || !Regex.IsMatch(version, @"^[a-zA-Z0-9][a-zA-Z0-9._-]*$"))
        return Results.BadRequest(new { error = "Version must contain 1 to 24 letters, digits, dots, dashes or underscores." });
    if (environment is not ("Development" or "Staging" or "Production"))
        return Results.BadRequest(new { error = "Choose a valid deployment environment." });
    if (changeType is not ("Patch" or "Minor" or "Major"))
        return Results.BadRequest(new { error = "Choose a valid change type." });
    if (checks is null)
        return Results.BadRequest(new { error = "Provide the release checklist." });

    var gates = new (string Key, string Title, bool Passed, int Penalty, string Recommendation)[]
    {
        ("tests", "Automated tests", checks.Tests, 20, "Run the automated test suite and record the outcome."),
        ("security", "Security review", checks.Security, 18, "Review access, secrets and exposed endpoints before deployment."),
        ("dependencies", "Dependency compatibility", checks.Dependencies, 14, "Verify libraries, runtime versions and external services."),
        ("staging", "Staging verification", checks.Staging, 18, "Test the release in a production-like staging environment."),
        ("monitoring", "Monitoring configured", checks.Monitoring, 12, "Configure request logs, error monitoring and a health check."),
        ("rollback", "Rollback plan", checks.Rollback, 18, "Prepare and verify a rollback procedure before release.")
    };

    int risk = gates.Where(g => !g.Passed).Sum(g => g.Penalty);
    risk += environment == "Production" ? 10 : 0;
    risk += changeType == "Major" ? 8 : changeType == "Minor" ? 4 : 0;
    risk = Math.Min(100, risk);
    int score = 100 - risk;
    bool critical = environment == "Production" && (!checks.Rollback || !checks.Staging || !checks.Tests);
    string status = critical || score < 55 ? "BLOCKED" : score < 80 ? "REVIEW" : "READY";
    string summary = status switch
    {
        "READY" => "The selected controls indicate a release that is ready for final approval.",
        "REVIEW" => "Some release controls are incomplete. Review the findings before deploying.",
        _ => "Deployment is not recommended until the flagged controls are addressed."
    };

    var findings = gates.Where(g => !g.Passed).Select(g => new
    {
        key = g.Key, title = g.Title, impact = g.Penalty, recommendation = g.Recommendation
    }).ToArray();

    return Results.Ok(new
    {
        release = new { name, version, environment, changeType },
        score, risk, status, summary,
        passed = gates.Count(g => g.Passed), total = gates.Length,
        findings, analyzedAt = DateTimeOffset.UtcNow.ToString("O")
    });
});

app.Run();

record AssessmentInput(string? ReleaseName, string? Version, string? Environment,
    string? ChangeType, ChecklistInput? Checks);
record ChecklistInput(bool Tests, bool Security, bool Dependencies,
    bool Staging, bool Monitoring, bool Rollback);
