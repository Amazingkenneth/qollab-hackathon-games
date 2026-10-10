import * as museum from 'quantum.model';

const ANGLES = { quarter: Math.PI / 4, sixth: Math.PI / 6, twelfth: Math.PI / 12 };
const PHASES = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2];
const root = document.querySelector('.qollab-museum');
const thetaInput = document.querySelector('#theta');
const phaseInput = document.querySelector('#phase');
const occupancyInput = document.querySelector('#occupancy');
const shotsInput = document.querySelector('#shots');
const runButton = document.querySelector('#backend-run');
const outcomeBars = document.querySelector('#exact-bars');
const resultBox = document.querySelector('#backend-result');
const backendState = document.querySelector('#backend-state');
const calibrationBadge = document.querySelector('#calibration-badge');
let backendJobSpent = false;
let requestHash = '';

function configuration() {
  return {
    theta: ANGLES[thetaInput.value],
    phase: PHASES[Number(phaseInput.value)],
    occupied: occupancyInput.value === 'occupied',
    shots: Math.max(100, Math.min(10000, Math.round(Number(shotsInput.value) || 1024))),
  };
}

function exactPreview(config) {
  const c = Math.cos(config.theta);
  const s = Math.sin(config.theta);
  if (config.occupied) return { bright: c ** 4, dark: s * s * c * c, absorbed: s * s, unused: 0 };
  const dark = Math.sin(2 * config.theta) ** 2 * Math.sin(config.phase / 2) ** 2;
  return { bright: 1 - dark, dark, absorbed: 0, unused: 0 };
}

function percent(value) { return `${(value * 100).toFixed(2).replace(/\.?0+$/, '')}%`; }
function hash(config) { return [config.theta.toFixed(9), config.phase.toFixed(9), config.occupied, config.shots].join('|'); }

function renderPreview() {
  const config = configuration();
  const probabilities = exactPreview(config);
  const labels = [['bright', 'Bright · B'], ['dark', 'Dark · D'], ['absorbed', 'Absorbed · A']];
  outcomeBars.innerHTML = labels.map(([key, label]) => `<div class="q-outcome"><span>${label}</span><div class="q-track"><i class="${key === 'bright' ? 'b' : key === 'dark' ? 'd' : 'a'}" style="width:${probabilities[key] * 100}%"></i></div><strong>${percent(probabilities[key])}</strong></div>`).join('');
  document.querySelector('#exact-case').textContent = config.occupied ? 'Occupied reference' : 'Known empty case';
  document.querySelector('#exact-config').textContent = `θ = ${thetaInput.options[thetaInput.selectedIndex].text.split(' · ')[0]} · δ = ${Number(phaseInput.value) * 90}°`;
  const emptyDark = exactPreview({ ...config, occupied: false }).dark;
  calibrationBadge.textContent = emptyDark <= 1e-9 ? 'EMPTY DARK PORT CERTIFIED' : `EMPTY DARK ${percent(emptyDark)} · NOT CERTIFIED`;
  calibrationBadge.classList.toggle('valid', emptyDark <= 1e-9);

  const operations = [`R(θ) live · ${thetaInput.options[thetaInput.selectedIndex].text.split(' · ')[0]}`, `phase δ · ${Number(phaseInput.value) * 90}°`];
  if (config.occupied) operations.push('swap probe ↔ absorption');
  operations.push('R(−θ) live', 'measure q₁q₀');
  document.querySelector('#circuit-steps').innerHTML = operations.map((label, i) => `${i ? '<span class="q-arrow">→</span>' : ''}<span class="q-gate">${label}</span>`).join('');
  requestHash = hash(config);
}

function toPlain(value) {
  if (value && typeof value.toJs === 'function') {
    const converted = value.toJs();
    if (converted instanceof Map) return Object.fromEntries(converted.entries());
    return converted;
  }
  if (value instanceof Map) return Object.fromEntries(value.entries());
  return value;
}

function showFailure(error, config, configHash) {
  backendState.textContent = 'BACKEND ERROR';
  backendState.className = 'q-state-pill error';
  resultBox.innerHTML = `<p class="q-error">The backend did not return evidence. The exact local preview remains available.</p><div class="q-evidence-meta">source: Qollab selected backend · config: ${configHash} · shots requested: ${config.shots} · error: ${String(error)}</div>`;
}

function showEvidence(evidence, config, configHash) {
  backendState.textContent = 'FINITE SAMPLE';
  backendState.className = 'q-state-pill done';
  const counts = evidence.counts || {};
  const entries = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  const countHtml = entries.map(([ket, count]) => `<span class="q-count">|${ket.replace(/ /g, '')}⟩ · ${count}</span>`).join('');
  const operations = (evidence.operations || []).join(' → ');
  resultBox.innerHTML = `<div class="q-count-row">${countHtml || '<span class="q-count">No count values returned</span>'}</div><div class="q-evidence-meta">source: ${evidence.source || 'Qollab selected backend'} · basis: ${evidence.basis || '|q₁q₀⟩'} · shots: ${evidence.shots || config.shots} · config: ${configHash}<br>circuit: ${operations}</div>`;
}

async function runBackend() {
  if (backendJobSpent || runButton.disabled) return;
  const config = configuration();
  const configHash = hash(config);
  requestHash = configHash;
  runButton.disabled = true;
  runButton.querySelector('span').textContent = 'Submitting one backend job…';
  backendState.textContent = 'PENDING';
  backendState.className = 'q-state-pill pending';
  resultBox.innerHTML = `<p>Submitting ${config.shots} shots for ${thetaInput.options[thetaInput.selectedIndex].text.split(' · ')[0]}, ${Number(phaseInput.value) * 90}° phase, ${config.occupied ? 'occupied' : 'empty'} reference.</p>`;

  try {
    // Python module bridge and injected backend are Qollab's documented JS API.
    const proxy = await museum.execute.callPromising(backend, config.theta, config.phase, config.occupied, config.shots);
    const evidence = toPlain(proxy);
    if (requestHash !== configHash) return;
    showEvidence(evidence, config, configHash);
  } catch (error) {
    if (requestHash === configHash) showFailure(error, config, configHash);
  } finally {
    backendJobSpent = true;
    runButton.disabled = true;
    runButton.querySelector('span').textContent = 'Job spent · exact preview still available';
  }
}

for (const input of [thetaInput, phaseInput, occupancyInput, shotsInput]) input.addEventListener('change', renderPreview);
runButton.addEventListener('click', runBackend);
renderPreview();

// Standalone Qollab story flow. Occupancy remains only in storyState.trial;
// renderStory receives public fields and never writes the hidden value to DOM.
const storyRoot = document.querySelector('#story-flow');
const reportCases = ['dark', 'bright', 'absorbed'];
const thetaValues = [ANGLES.quarter, ANGLES.sixth, ANGLES.twelfth];
const thetaNames = ['π/4', 'π/6', 'π/12'];
let storySeed = (() => {
  try { const word = new Uint32Array(1); crypto.getRandomValues(word); return word[0] || 0x5eed1234; }
  catch { return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0; }
})();
let storyState = initialStory();

function initialStory() {
  return {
    scene: 'foyer', phaseIndex: 1, calibrated: false, trial: null, outcome: null,
    liveClassified: false, reportIndex: 0, thetaIndex: 0, feedback: 'The museum is quiet. First make the empty reference trustworthy.',
    feedbackKind: '', hintIndex: 0, ensemble: null, signed: null,
  };
}

function storyRandom() {
  storySeed >>>= 0;
  if (storySeed === 0) storySeed = 0x6d2b79f5;
  storySeed ^= storySeed << 13;
  storySeed ^= storySeed >>> 17;
  storySeed ^= storySeed << 5;
  storySeed >>>= 0;
  return storySeed / 0x100000000;
}

function storyExact(theta, phase, occupied) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  if (occupied) return { bright: c ** 4, dark: s * s * c * c, absorbed: s * s, unused: 0 };
  const dark = Math.sin(2 * theta) ** 2 * Math.sin(phase / 2) ** 2;
  return { bright: 1 - dark, dark, absorbed: 0, unused: 0 };
}

function storySample(probabilities) {
  const random = storyRandom();
  if (random < probabilities.bright) return 'bright';
  if (random < probabilities.bright + probabilities.dark) return 'dark';
  if (random < probabilities.bright + probabilities.dark + probabilities.absorbed) return 'absorbed';
  return 'unused';
}

function storyConclusion(outcome) {
  return outcome === 'dark' ? 'gentle-presence' : outcome === 'absorbed' ? 'costly-presence' : 'inconclusive';
}

function storyLabel(outcome) { return ({ bright: 'Bright', dark: 'Dark', absorbed: 'Absorbed' })[outcome] || 'Unused'; }
function storyPct(number) { return `${(number * 100).toFixed(2).replace(/\.?0+$/, '')}%`; }

function storyAnswerButtons(kind) {
  return `<div class="q-story-actions" role="group" aria-label="Classify ${kind === 'live' ? 'observed evidence' : 'reference report'}"><button data-story="answer" data-kind="${kind}" data-answer="gentle-presence">◇ Presence, no absorption in branch</button><button data-story="answer" data-kind="${kind}" data-answer="inconclusive">● Inconclusive</button><button data-story="answer" data-kind="${kind}" data-answer="costly-presence">❧ Presence by absorption</button></div>`;
}

function renderStory() {
  const state = storyState;
  const sceneTitles = {
    foyer: ['A quiet mystery after closing', 'The gallery is almost dark. A paper orchid is losing its color.'],
    calibrate: ['Earn the Dark detector', 'A dark click means something only if an empty case cannot make one.'],
    classify: ['What does the click prove?', 'Classify what the recorded evidence allows you to say.'],
    gentler: ['Choose a gentler inspection', 'The museum needs a useful signal and a conservation cost it can name.'],
    ending: ['The gallery can reopen', 'We have a method, and we know its price.'],
  };
  const step = state.scene === 'calibrate' ? 0 : state.scene === 'classify' ? 1 : state.scene === 'gentler' || state.scene === 'ending' ? 2 : -1;
  let content = '';
  if (state.scene === 'foyer') {
    content = `<p class="q-story-overline">THE QUESTION</p><div class="q-story-actions"><button class="primary" data-story="start">Enter the gallery →</button></div>`;
  } else if (state.scene === 'calibrate') {
    const phase = PHASES[state.phaseIndex];
    const p = storyExact(ANGLES.quarter, phase, false);
    content = `<p class="q-story-overline">KNOWN-EMPTY REFERENCE · θ = π/4 · EXACT DARK ${storyPct(p.dark)}</p><div class="q-story-actions" role="radiogroup" aria-label="Phase alignment dial">${PHASES.map((_, i) => `<button role="radio" aria-checked="${state.phaseIndex === i}" class="${state.phaseIndex === i ? 'selected' : ''}" data-story="phase" data-index="${i}">δ ${i * 90}°${i === 1 ? ' · start' : ''}</button>`).join('')}</div><div class="q-story-values"><span>Empty: B ${storyPct(p.bright)}</span><span>D ${storyPct(p.dark)}</span><span>A ${storyPct(p.absorbed)}</span></div><div class="q-story-actions"><button class="primary" data-story="calibrate">Sign empty reference</button><button data-story="hint">Hint ${state.hintIndex}/3</button><button data-story="reset">Reset</button></div>`;
  } else if (state.scene === 'classify') {
    const sampleBox = state.outcome
      ? `<div class="q-story-outcome"><b>${state.outcome === 'bright' ? '●' : state.outcome === 'dark' ? '◇' : '❧'}</b><span>Observed record: <strong>${storyLabel(state.outcome)}</strong> · replica ${String(state.trial ? state.trial.id : 0).padStart(2, '0')}</span></div>`
      : `<p class="q-story-overline">THE FROSTED CASE LOOKS THE SAME UNDER BOTH HYPOTHESES · PRIOR 50:50</p><div class="q-story-actions"><button data-story="prepare">Prepare one fresh replica</button><button class="primary" data-story="probe" ${!state.trial ? 'disabled' : ''}>Send one probe →</button><button data-story="ensemble">128 fresh preparations · optional</button></div>`;
    const live = state.outcome && !state.liveClassified ? `<p class="q-story-overline">LIVE OBSERVATION · WHAT DOES THIS RECORD JUSTIFY?</p>${storyAnswerButtons('live')}` : '';
    const report = state.liveClassified && state.reportIndex < reportCases.length
      ? `<div class="q-story-reports"><strong>REFERENCE REPORT ${state.reportIndex + 1} OF 3 · ILLUSTRATIVE MODEL OUTCOME</strong><div class="q-story-outcome"><b>${reportCases[state.reportIndex] === 'dark' ? '◇' : reportCases[state.reportIndex] === 'bright' ? '●' : '❧'}</b><span>${storyLabel(reportCases[state.reportIndex])} · not an additional live trial</span></div>${storyAnswerButtons('report')}</div>`
      : '';
    const more = state.liveClassified && state.reportIndex >= reportCases.length
      ? `<div class="q-story-actions"><button class="primary" data-story="continue">Choose a gentler protocol →</button><button data-story="inspect">Inspect another replica</button></div>`
      : '';
    const ensemble = state.ensemble ? `<div class="q-story-values"><span>128 fresh preparations</span><span>B ${state.ensemble.bright}</span><span>D ${state.ensemble.dark}</span><span>A ${state.ensemble.absorbed}</span><span>finite sample · equal prior</span></div>` : '';
    content = `${sampleBox}${live}${report}${more}${ensemble}<div class="q-story-actions"><button data-story="hint">Hint ${state.hintIndex}/3</button></div>`;
  } else if (state.scene === 'gentler') {
    const p = storyExact(thetaValues[state.thetaIndex], 0, true);
    content = `<p class="q-story-overline">FICTIONAL POLICY · DARK ≥ 18% · ABSORBED ≤ 30% · PER PREPARED PROBE</p><div class="q-story-protocol">${thetaValues.map((_, i) => `<button class="${state.thetaIndex === i ? 'selected' : ''}" data-story="theta" data-index="${i}"><b>${thetaNames[i]}</b><small>${['balanced','gentle','very gentle'][i]}</small></button>`).join('')}</div><div class="q-story-values"><span>Dark signal ${storyPct(p.dark)} ${p.dark >= .18 ? '✓' : '· below floor'}</span><span>Bright ${storyPct(p.bright)}</span><span>Absorbed ${storyPct(p.absorbed)} ${p.absorbed <= .30 ? '✓' : '· above ceiling'}</span></div><div class="q-story-actions"><button class="primary" data-story="sign-protocol">Confirm conservation protocol</button><button data-story="hint">Hint ${state.hintIndex}/3</button></div>`;
  } else {
    const p = state.signed || storyExact(ANGLES.sixth, 0, true);
    content = `<div class="q-report-final"><strong>Signed conservation protocol</strong><p>θ = π/6 · Dark ${storyPct(p.dark)} · Bright ${storyPct(p.bright)} · Absorbed ${storyPct(p.absorbed)}. A successful Dark branch preserves the exhibit from absorption in this model; absorption risk remains visible on every prepared probe.</p></div><div class="q-story-actions" style="margin-top:9px"><button data-story="inspect">Inspect another replica</button><button class="primary" data-story="replay">Replay story ↺</button></div>`;
  }
  storyRoot.innerHTML = `<div class="q-story-top"><div><p class="q-story-overline">${state.scene === 'ending' ? 'CONSERVATOR IVO · SIGNED REPORT' : state.scene === 'foyer' ? 'GHOSTLIGHT MUSEUM · NIGHT INVENTORY' : `ROOM 0${step + 1} / 03`}</p><h2>${sceneTitles[state.scene][0]}</h2></div><div class="q-story-step"><span class="${step === 0 ? 'current' : ''}">01 CALIBRATE</span><span class="${step === 1 ? 'current' : ''}">02 INTERPRET</span><span class="${step === 2 ? 'current' : ''}">03 CONSERVE</span></div></div><div class="q-story-body"><div class="q-story-narrative"><strong>${state.scene === 'calibrate' ? 'Ivo · at the empty reference' : state.scene === 'classify' ? 'Ivo · at the evidence desk' : state.scene === 'gentler' ? 'Ivo · conservation policy' : 'Ivo · night conservator'}</strong><p>“${sceneTitles[state.scene][1]}”</p><p>${state.scene === 'foyer' ? 'All trials use simulated replicas. The hidden trial is never used to script a desired click.' : state.scene === 'classify' ? 'Dark is conclusive after calibration. Bright is inconclusive. Absorbed is conclusive with a conservation cost.' : state.scene === 'gentler' ? 'The policy compares signal and absorption across all prepared probes.' : 'Exact predictions and sampled observations are shown separately.'}</p></div><div class="q-story-controls">${content}<div class="q-story-feedback ${state.feedbackKind}">${state.feedback}</div></div></div><div class="q-story-footer"><span>IDEAL MODEL · FRESH REPLICAS · NO HIDDEN LABEL IN THE PLAYER VIEW</span>${state.scene !== 'foyer' && state.scene !== 'ending' ? '<button data-story="reset">Reset this scene</button>' : state.scene === 'foyer' ? '<span>Start to begin the calibration.</span>' : '<span>Replay or inspect a fresh replica.</span>'}</div>`;
}

function storyDispatch(action, target) {
  const index = target ? Number(target.dataset.index) : 0;
  const answer = target ? target.dataset.answer : '';
  const setFeedback = (message, kind = '') => { storyState.feedback = message; storyState.feedbackKind = kind; };
  if (action === 'start' && storyState.scene === 'foyer') {
    storyState.scene = 'calibrate';
    setFeedback('The replica is known empty. First make its exact Dark probability zero.');
  } else if (action === 'phase' && storyState.scene === 'calibrate') {
    storyState.phaseIndex = index;
    setFeedback('Phase changed. Use the exact empty-case likelihood, not a lucky sample.');
  } else if (action === 'calibrate' && storyState.scene === 'calibrate') {
    const dark = storyExact(ANGLES.quarter, PHASES[storyState.phaseIndex], false).dark;
    if (dark > 1e-9) setFeedback('This alignment still predicts a Dark click for an empty case. Set δ to 0°.', 'wrong');
    else {
      storyState.calibrated = true;
      storyState.scene = 'classify';
      setFeedback('Calibration signed: the ideal empty model assigns Dark probability zero.', 'success');
    }
  } else if (action === 'prepare' && storyState.scene === 'classify') {
    storyState.trial = { occupied: storyRandom() < .5, id: storyState.trial ? storyState.trial.id + 1 : 1 };
    storyState.outcome = null;
    storyState.liveClassified = false;
    storyState.ensemble = null;
    setFeedback(`Fresh replica ${String(storyState.trial.id).padStart(2, '0')} prepared. Its 50:50 prior is not a revealed label.`);
  } else if (action === 'probe' && storyState.scene === 'classify' && storyState.trial && !storyState.outcome) {
    const probabilities = storyExact(ANGLES.quarter, 0, storyState.trial.occupied);
    storyState.outcome = storySample(probabilities);
    setFeedback('One detector record is ready. Classify what this observation permits you to conclude.');
  } else if (action === 'answer' && storyState.scene === 'classify') {
    if (!storyState.liveClassified) {
      const expected = storyConclusion(storyState.outcome);
      if (answer !== expected) {
        const wrong = storyState.outcome === 'bright' ? 'Both empty and occupied references can produce Bright.' : storyState.outcome === 'dark' ? 'A calibrated empty reference assigns zero probability to Dark.' : 'Absorbed confirms presence, but it is a conservation cost.';
        setFeedback(wrong, 'wrong');
      } else {
        storyState.liveClassified = true;
        setFeedback(storyState.outcome === 'dark' ? 'Correct: presence confirmed, with no absorption in this successful Dark branch.' : storyState.outcome === 'bright' ? 'Correct: Bright is inconclusive; both hypotheses allow it.' : 'Correct: presence is confirmed, and absorbed energy is recorded.', 'success');
      }
    } else {
      const outcome = reportCases[storyState.reportIndex];
      if (answer !== storyConclusion(outcome)) {
        const wrong = outcome === 'bright' ? 'Both empty and occupied references can produce Bright; keep this report inconclusive.' : outcome === 'dark' ? 'The calibrated empty reference assigns zero likelihood to Dark.' : 'Presence is known, but the probe was absorbed.';
        setFeedback(wrong, 'wrong');
      } else {
        storyState.reportIndex += 1;
        setFeedback(storyState.reportIndex === 3 ? 'All three reports are classified. Certainty and gentleness are separate.' : 'Reference report understood. These are illustrative model outcomes, not extra live trials.', 'success');
      }
    }
  } else if (action === 'ensemble' && storyState.scene === 'classify') {
    const counts = { bright: 0, dark: 0, absorbed: 0 };
    for (let shot = 0; shot < 128; shot += 1) {
      const occupied = storyRandom() < .5;
      const outcome = storySample(storyExact(ANGLES.quarter, 0, occupied));
      if (counts[outcome] !== undefined) counts[outcome] += 1;
    }
    storyState.ensemble = counts;
    setFeedback('128 fresh preparations sampled at the equal prior. These finite counts are not exact predictions.');
  } else if (action === 'continue' && storyState.scene === 'classify' && storyState.liveClassified && storyState.reportIndex === 3) {
    storyState.scene = 'gentler';
    storyState.thetaIndex = 0;
    setFeedback('The museum policy is a fictional task budget: satisfy both limits per prepared probe.');
  } else if (action === 'theta' && storyState.scene === 'gentler') {
    storyState.thetaIndex = index;
    setFeedback('Signal, absorption and inconclusive probability updated from the exact model.');
  } else if (action === 'sign-protocol' && storyState.scene === 'gentler') {
    const p = storyExact(thetaValues[storyState.thetaIndex], 0, true);
    if (p.dark < .18) setFeedback('Dark signal is below the museum policy floor of 18%.', 'wrong');
    else if (p.absorbed > .30) setFeedback('Absorption risk exceeds the museum policy ceiling of 30%.', 'wrong');
    else {
      storyState.scene = 'ending';
      storyState.signed = p;
      setFeedback('Protocol signed with all outcome probabilities visible.', 'success');
    }
  } else if (action === 'hint') {
    storyState.hintIndex = Math.min(storyState.hintIndex + 1, 3);
    const hints = storyState.scene === 'calibrate'
      ? ['Compare the exact empty Dark probability.', 'Reverse the phase offset.', 'Set δ to 0°.']
      : storyState.scene === 'classify'
        ? ['Compare the empty and occupied reference rows.', 'Conclusive means the competing hypothesis assigns zero likelihood.', 'Dark is gentle presence; Bright is inconclusive; Absorbed is presence with cost.']
        : ['The probe-arm amplitude controls signal and absorption.', 'Meet Dark ≥ 18% and Absorbed ≤ 30%.', 'Choose π/6: Dark 18.75%, Absorbed 25%.'];
    setFeedback(hints[storyState.hintIndex - 1]);
  } else if (action === 'reset') {
    if (storyState.scene === 'calibrate') { storyState.phaseIndex = 1; setFeedback('Calibration dial reset to the documented 90° mismatch.'); }
    else if (storyState.scene === 'classify') { storyState.trial = null; storyState.outcome = null; storyState.liveClassified = false; storyState.ensemble = null; setFeedback('The attempt is cleared. Prepare a fresh replica when ready.'); }
    else if (storyState.scene === 'gentler') { storyState.thetaIndex = 0; setFeedback('Protocol selection reset to π/4 · balanced.'); }
  } else if (action === 'inspect') {
    storyState.scene = 'classify'; storyState.trial = null; storyState.outcome = null; storyState.liveClassified = false; storyState.ensemble = null;
    setFeedback('A new trial is a fresh preparation; the signed empty reference remains locked.');
  } else if (action === 'replay') {
    storySeed = (storySeed ^ 0x9e3779b9) >>> 0;
    storyState = initialStory();
  }
  renderStory();
}

storyRoot.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest('[data-story]') : null;
  if (target) storyDispatch(target.dataset.story, target);
});
renderStory();
