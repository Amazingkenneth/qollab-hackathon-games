import './style.css';
import { galleryAudio } from './audio/audio';
import { reduceGame, createInitialState, toPlayerView, type Conclusion, type GameAction, type GameState } from './state/game';
import { renderApp } from './ui/render';

const mount = document.querySelector<HTMLDivElement>('#app');
if (!mount) throw new Error('Missing #app root.');

function newSeed(): number {
  try {
    const words = new Uint32Array(1);
    crypto.getRandomValues(words);
    return words[0] || 0x5eed1234;
  } catch { return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0; }
}

let state: GameState = createInitialState(newSeed());
let animationTimer: number | null = null;

function render(focus?: { action?: string; index?: string | null; conclusion?: string | null; heading?: boolean }): void {
  if (!mount) return;
  mount.innerHTML = renderApp(toPlayerView(state));
  if (state.settingsOpen) mount.querySelector<HTMLElement>('.settings-dialog')?.focus({ preventScroll: true });
  if (!focus) return;
  if (focus.heading) {
    const heading = mount.querySelector<HTMLElement>('.room-heading h1');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    return;
  }
  if (!focus.action) return;
  const candidates = [...mount.querySelectorAll<HTMLElement>('[data-action]')].filter((element) => {
    if (element.dataset.action !== focus.action) return false;
    if (focus.index != null && element.dataset.index !== focus.index) return false;
    if (focus.conclusion != null && element.dataset.conclusion !== focus.conclusion) return false;
    return true;
  });
  const candidate = candidates[0] || mount.querySelector<HTMLElement>('.room-heading h1');
  if (candidate) {
    if (candidate.tagName === 'H1') candidate.tabIndex = -1;
    candidate.focus({ preventScroll: true });
  }
}

function dispatch(action: GameAction, focus?: { action?: string; index?: string | null; conclusion?: string | null; heading?: boolean }): void {
  const before = state;
  state = reduceGame(state, action);
  galleryAudio.sync(state);

  if (action.type === 'SEND_PROBE' && state.observation) {
    if (state.observation.animationDone) galleryAudio.playOutcome(state.observation.outcome);
    else {
      if (animationTimer !== null) window.clearTimeout(animationTimer);
      animationTimer = window.setTimeout(() => {
        animationTimer = null;
        dispatch({ type: 'FINISH_ANIMATION' });
      }, 620);
    }
  }
  if (action.type === 'FINISH_ANIMATION' && before.observation && !before.observation.animationDone) {
    galleryAudio.playOutcome(before.observation.outcome);
  }
  if (action.type === 'CLASSIFY_LIVE' && !before.liveClassified && state.liveClassified) galleryAudio.playConfirm();
  if (action.type === 'CLASSIFY_REPORT' && state.reportIndex > before.reportIndex) galleryAudio.playConfirm();
  if ((action.type === 'CONFIRM_CALIBRATION' && state.calibrated && !before.calibrated) || (action.type === 'CONFIRM_PROTOCOL' && state.scene === 'ending' && before.scene !== 'ending')) galleryAudio.playConfirm();
  if (action.type === 'RESET_SCENE' || action.type === 'PREPARE_REPLICA' || action.type === 'INSPECT_ANOTHER' || action.type === 'REPLAY') {
    if (animationTimer !== null) window.clearTimeout(animationTimer);
    animationTimer = null;
  }

  render(focus);
}

function closeSettings(): void {
  if (state.settingsOpen) dispatch({ type: 'TOGGLE_SETTINGS' });
}

mount.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-action]') : null;
  const action = target?.dataset.action;
  if (!target || !action) return;
  const index = target.dataset.index;
  const conclusion = target.dataset.conclusion as Conclusion | undefined;
  const focus = { action, index: index ?? null, conclusion: conclusion ?? null };
  switch (action) {
    case 'start':
      dispatch({ type: 'START' }, { heading: true });
      break;
    case 'home':
    case 'replay':
      dispatch({ type: 'REPLAY' }, { heading: true });
      break;
    case 'sound':
      dispatch({ type: 'SET_SOUND', enabled: !state.soundEnabled }, focus);
      break;
    case 'settings':
      dispatch({ type: 'TOGGLE_SETTINGS' });
      break;
    case 'close-settings':
      closeSettings();
      break;
    case 'phase':
      if (index != null) dispatch({ type: 'SET_PHASE', index: Number(index) }, focus);
      break;
    case 'run-calibration':
      dispatch({ type: 'RUN_CALIBRATION' }, focus);
      break;
    case 'confirm-calibration':
      dispatch({ type: 'CONFIRM_CALIBRATION' }, { heading: true });
      break;
    case 'tab-predictions':
      dispatch({ type: 'SET_EVIDENCE_TAB', tab: 'predictions' }, focus);
      break;
    case 'tab-trial':
      dispatch({ type: 'SET_EVIDENCE_TAB', tab: 'trial' }, focus);
      break;
    case 'prepare':
      dispatch({ type: 'PREPARE_REPLICA' }, focus);
      break;
    case 'send-probe':
      dispatch({ type: 'SEND_PROBE' }, { heading: true });
      break;
    case 'skip-animation':
      if (animationTimer !== null) window.clearTimeout(animationTimer);
      animationTimer = null;
      dispatch({ type: 'FINISH_ANIMATION' }, { heading: true });
      break;
    case 'classify-live':
      if (conclusion) dispatch({ type: 'CLASSIFY_LIVE', conclusion }, focus);
      break;
    case 'classify-report':
      if (conclusion) dispatch({ type: 'CLASSIFY_REPORT', conclusion }, { heading: true });
      break;
    case 'continue':
      dispatch({ type: 'CONTINUE_PROTOCOL' }, { heading: true });
      break;
    case 'ensemble':
      dispatch({ type: 'RUN_ENSEMBLE' }, focus);
      break;
    case 'theta':
      if (index != null) dispatch({ type: 'SET_THETA', index: Number(index) }, focus);
      break;
    case 'confirm-protocol':
      dispatch({ type: 'CONFIRM_PROTOCOL' }, { heading: true });
      break;
    case 'compare':
      dispatch({ type: 'TOGGLE_COMPARE' }, focus);
      break;
    case 'hint':
      dispatch({ type: 'HINT' }, { heading: true });
      break;
    case 'reset':
      dispatch({ type: 'RESET_SCENE' }, { heading: true });
      break;
    case 'inspect-another':
      dispatch({ type: 'INSPECT_ANOTHER' }, { heading: true });
      break;
  }
});

mount.addEventListener('change', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.dataset.setting) return;
  switch (target.dataset.setting) {
    case 'music': dispatch({ type: 'SET_MUSIC_VOLUME', volume: Number(target.value) }); break;
    case 'effects': dispatch({ type: 'SET_EFFECTS_VOLUME', volume: Number(target.value) }); break;
    case 'reduced-motion': dispatch({ type: 'SET_REDUCED_MOTION', enabled: target.checked }); break;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state.settingsOpen) {
    event.preventDefault();
    closeSettings();
    return;
  }
  const target = event.target;
  if (state.scene !== 'calibrate' || !(target instanceof HTMLElement) || !target.closest('.phase-control')) return;
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
  event.preventDefault();
  const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
  const nextIndex = (state.phaseIndex + direction + 4) % 4;
  dispatch({ type: 'SET_PHASE', index: nextIndex }, { action: 'phase', index: String(nextIndex) });
});

mount.addEventListener('click', (event) => {
  if (event.target === mount.querySelector('.modal-backdrop')) closeSettings();
});

render();
