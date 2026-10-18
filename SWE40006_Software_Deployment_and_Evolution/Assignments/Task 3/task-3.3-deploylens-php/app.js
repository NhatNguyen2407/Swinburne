const $ = selector => document.querySelector(selector);
const form = $('#release-form');
const endpoint = document.body.dataset.api;
const historyKey = `deploylens-history-${document.body.dataset.platform}`;
let latestResult = null;

const sample = {
  releaseName: 'Customer Portal', version: '2.4.0', environment: 'Production', changeType: 'Minor',
  checks: { tests: true, security: true, dependencies: true, staging: false, monitoring: true, rollback: false }
};

function readInput() {
  return {
    releaseName: form.elements.releaseName.value.trim(),
    version: form.elements.version.value.trim(),
    environment: form.elements.environment.value,
    changeType: form.elements.changeType.value,
    checks: Object.fromEntries(['tests','security','dependencies','staging','monitoring','rollback']
      .map(key => [key, form.elements[key].checked]))
  };
}

function fillInput(data) {
  for (const key of ['releaseName','version','environment','changeType']) form.elements[key].value = data[key];
  for (const [key, value] of Object.entries(data.checks)) form.elements[key].checked = value;
}

function getHistory() {
  try { const entries = JSON.parse(localStorage.getItem(historyKey) || '[]'); return Array.isArray(entries) ? entries : []; }
  catch { return []; }
}
function saveHistory(result) {
  try { localStorage.setItem(historyKey, JSON.stringify([result, ...getHistory()].slice(0, 5))); }
  catch { /* Browser storage may be disabled; analysis still works. */ }
  renderHistory();
}
function renderHistory() {
  const entries = getHistory();
  const target = $('#history-content');
  target.replaceChildren();
  if (!entries.length) { target.className = 'empty-state'; target.textContent = 'Nothing analyzed yet. Recent results are stored only in this browser.'; return; }
  target.className = '';
  for (const result of entries) {
    const row = document.createElement('div'); row.className = 'history-entry';
    const left = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = `${result.release.name} · ${result.release.version}`;
    const note = document.createElement('small');
    note.textContent = `${result.release.environment} · ${new Date(result.analyzedAt).toLocaleString()}`;
    left.append(title,note);
    const score = document.createElement('span'); score.textContent = `${result.score}/100`;
    row.append(left,score); target.append(row);
  }
}
function renderResult(result) {
  latestResult = result;
  $('#stat-status').textContent = result.status;
  $('#stat-score').innerHTML = `${result.score} <span class="small-unit">/100</span>`;
  $('#stat-passed').innerHTML = `${result.passed} <span class="small-unit">/6</span>`;
  $('#ring-score').textContent = result.score;
  $('#score-ring').style.setProperty('--angle', `${result.score * 3.6}deg`);
  const pill = $('#status-pill'); pill.textContent = result.status; pill.className = `status-pill ${result.status.toLowerCase()}`;
  $('#result-description').textContent = result.summary;
  $('#risk-value').textContent = `${result.risk}/100`;
  $('#risk-fill').style.width = `${result.risk}%`;
  $('#finding-count').textContent = `${result.findings.length} finding${result.findings.length === 1 ? '' : 's'}`;
  $('#export-button').disabled = false;
  const target = $('#findings-content'); target.replaceChildren(); target.className = '';
  if (!result.findings.length) { const div = document.createElement('div'); div.className='ok-state'; div.textContent='✓ All six quality gates are marked as verified.'; target.append(div); return; }
  for (const finding of result.findings) {
    const row = document.createElement('div'); row.className = 'finding';
    const mark = document.createElement('span'); mark.className='finding-mark'; mark.textContent='↳';
    const body = document.createElement('div');
    const title = document.createElement('strong'); title.textContent = finding.title;
    const text = document.createElement('p'); text.textContent = finding.recommendation;
    const impact = document.createElement('span'); impact.className='impact'; impact.textContent=`Risk penalty: +${finding.impact}`;
    body.append(title,text,impact); row.append(mark,body); target.append(row);
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = $('#analyze-btn'); const previous = button.textContent;
  button.disabled = true; button.textContent = 'Analyzing...';
  try {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(readInput()) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || `Request failed (${response.status})`);
    renderResult(result); saveHistory(result);
    $('#findings').scrollIntoView({behavior:'smooth',block:'nearest'});
  } catch (error) { $('#result-description').textContent = error.message; }
  finally { button.disabled = false; button.textContent = previous; }
});
$('#demo-button').addEventListener('click', () => fillInput(sample));
$('#clear-history').addEventListener('click', () => { try { localStorage.removeItem(historyKey); } catch {} renderHistory(); });
$('#export-button').addEventListener('click', () => {
  if (!latestResult) return;
  const blob = new Blob([JSON.stringify(latestResult,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href=url;
  link.download=`deploylens-${latestResult.release.version.replace(/[^\w.-]/g,'_')}-assessment.json`;
  link.click(); URL.revokeObjectURL(url);
});
renderHistory();
