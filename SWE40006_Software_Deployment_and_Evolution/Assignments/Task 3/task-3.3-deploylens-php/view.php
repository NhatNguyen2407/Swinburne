<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>DeployLens | Pixel Pastel Release Console</title>
  <meta name="description" content="A release-readiness assessment dashboard for software deployments.">
  <link rel="stylesheet" href="/style.css">
  <script src="/app.js" defer></script>
</head>
<body data-api="?api=analyze" data-platform="PHP 8.4">
  <div class="shell">
    <aside class="sidebar">
      <div class="brand"><span class="brand-mark">D<span class="lens">.</span></span><div><strong>DeployLens</strong><small>RELEASE INTELLIGENCE</small></div></div>
      <div class="nav-label">WORKSPACE</div>
      <nav aria-label="Sections">
        <a href="#overview" class="nav-link active"><span class="nav-icon">◈</span> Overview</a>
        <a href="#assessment" class="nav-link"><span class="nav-icon">☷</span> Release assessment</a>
        <a href="#findings" class="nav-link"><span class="nav-icon">◇</span> Findings</a>
        <a href="#history" class="nav-link"><span class="nav-icon">↺</span> Local history</a>
      </nav>
      <div class="side-note"><span class="live-dot"></span><span>Release engine<br><strong>PHP 8.4</strong></span></div>
      <p class="side-foot">SWE40006 · Task 3.3<br>Software Deployment & Evolution</p>
    </aside>

    <div class="main-wrap" id="overview">
      <header class="topbar"><span>Workspace <span class="chevron">/</span> Release overview</span><span class="top-chip"><span class="live-dot"></span> Evaluation workspace</span></header>
      <main class="content">
        <div class="hero-head"><div><span class="eyebrow">PIXEL RELEASE CONSOLE / 01</span><h1>Ready, set, <em>deploy.</em></h1><p>Assess the controls that matter before a software release goes live.</p></div><div class="hero-side">BACKEND ENGINE<span>PHP 8.4</span></div></div>

        <div class="summary-strip" aria-label="Assessment overview">
          <div><span class="stat-label">Release status</span><strong id="stat-status">Not analyzed</strong><small>Latest assessment</small></div>
          <div><span class="stat-label">Readiness score</span><strong id="stat-score">— <span class="small-unit">/100</span></strong><small>Evidence-based estimate</small></div>
          <div><span class="stat-label">Passing controls</span><strong id="stat-passed">— <span class="small-unit">/6</span></strong><small>Quality gates checked</small></div>
        </div>

        <div class="workspace-grid" id="assessment">
          <div class="left-stack">
            <section class="panel">
              <div class="section-top"><div><span class="section-kicker">01 / CONFIGURATION</span><h2>Release profile</h2></div><button class="ghost-button" id="demo-button" type="button">Load example ↗</button></div>
              <form id="release-form" novalidate>
                <div class="field-grid">
                  <label class="field wide">Release name<input id="release-name" name="releaseName" placeholder="e.g. Customer Portal" maxlength="60" required autocomplete="off"></label>
                  <label class="field">Version<input id="release-version" name="version" placeholder="e.g. 1.4.0" maxlength="24" required autocomplete="off"></label>
                  <label class="field">Target environment<select id="environment" name="environment"><option>Development</option><option selected>Staging</option><option>Production</option></select></label>
                  <label class="field wide">Change classification<select id="change-type" name="changeType"><option>Patch</option><option selected>Minor</option><option>Major</option></select></label>
                </div>
                <div class="inside-divider"></div>
                <div class="section-top checks-title"><div><span class="section-kicker">02 / QUALITY GATES</span><h2>Pre-deployment checklist</h2></div><span class="hint">Tick only verified controls</span></div>
                <div class="checks">
                  <label class="check"><input type="checkbox" name="tests"><span class="check-content"><strong>Automated tests</strong><small>Test suite passed</small></span></label>
                  <label class="check"><input type="checkbox" name="security"><span class="check-content"><strong>Security review</strong><small>Secrets and access checked</small></span></label>
                  <label class="check"><input type="checkbox" name="dependencies"><span class="check-content"><strong>Dependencies</strong><small>Runtime compatibility verified</small></span></label>
                  <label class="check"><input type="checkbox" name="staging"><span class="check-content"><strong>Staging verification</strong><small>Pre-production checks passed</small></span></label>
                  <label class="check"><input type="checkbox" name="monitoring"><span class="check-content"><strong>Monitoring ready</strong><small>Logs and health checks set</small></span></label>
                  <label class="check"><input type="checkbox" name="rollback"><span class="check-content"><strong>Rollback plan</strong><small>Recovery process documented</small></span></label>
                </div>
                <div class="form-footer"><span>Assessment reflects selected checks, not an actual Azure inspection.</span><button class="primary-button" type="submit" id="analyze-btn">Analyze release <span>↗</span></button></div>
              </form>
            </section>
          </div>
          <div class="right-stack">
            <section class="panel result-panel" aria-live="polite"><span class="section-kicker">03 / READINESS</span><h2>Release signal</h2><div class="score-ring" id="score-ring" style="--angle:0deg"><div><strong id="ring-score">—</strong><small>READINESS</small></div></div><div id="status-pill" class="status-pill neutral">AWAITING ANALYSIS</div><p id="result-description">Complete the release profile and checklist to receive a readiness score and recommendations.</p><div class="risk-row"><span>Estimated risk</span><strong id="risk-value">—</strong></div><div class="risk-bar"><span id="risk-fill" style="width:0%"></span></div><button id="export-button" class="export-button" type="button" disabled>Export assessment <span>↓</span></button></section>
            <section class="panel insight-panel"><span class="section-kicker">HOW IT WORKS</span><h3>Transparent scoring</h3><p>Every unchecked gate adds a defined risk penalty. Production deployments also require testing, staging and a rollback plan.</p><p class="subtle-note">The score is decision support, not proof that deployment is safe.</p></section>
          </div>
        </div>

        <section class="panel findings-panel" id="findings"><div class="section-top"><div><span class="section-kicker">04 / ACTION ITEMS</span><h2>Findings & next actions</h2></div><span id="finding-count" class="count-pill">0 findings</span></div><div id="findings-content" class="empty-state">No assessment yet. Results from the backend will appear here.</div></section>
        <section class="panel history-panel" id="history"><div class="section-top"><div><span class="section-kicker">05 / ACTIVITY</span><h2>Recent assessments</h2></div><button id="clear-history" class="ghost-button" type="button">Clear history</button></div><div id="history-content" class="empty-state">Nothing analyzed yet. Recent results are stored only in this browser.</div></section>
        <footer>DeployLens <span>·</span> SWE40006 deployment portfolio <span>·</span> Educational demonstration</footer>
      </main>
    </div>
  </div>
</body>
</html>
