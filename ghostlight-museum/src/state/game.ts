import {
  ANGLES,
  PHASES,
  conclusionFor,
  nextRandom,
  predict,
  sampleMany,
  sampleOutcome,
  type ModelResult,
  type Outcome,
} from '../model/ghostlight';

export type Scene = 'foyer' | 'calibrate' | 'classify' | 'gentler' | 'ending';
export type Conclusion = 'gentle-presence' | 'inconclusive' | 'costly-presence';
export type EvidenceTab = 'predictions' | 'trial';

export interface TrialObservation {
  outcome: Outcome;
  preparationId: number;
  animationDone: boolean;
}

export interface GameState {
  scene: Scene;
  phaseIndex: number;
  calibrated: boolean;
  calibrationRun: { exact: ModelResult; counts: Record<Outcome, number> | null; seed: number | null } | null;
  evidenceTab: EvidenceTab;
  settingsOpen: boolean;
  compareOpen: boolean;
  soundEnabled: boolean;
  musicVolume: number;
  effectsVolume: number;
  reducedMotion: boolean;
  rngSeed: number;
  preparationCount: number;
  hiddenTrial: { occupied: boolean; preparationId: number } | null;
  observation: TrialObservation | null;
  liveClassified: boolean;
  reportIndex: number;
  hints: Record<'calibrate' | 'classify' | 'gentler', number>;
  feedback: { kind: 'neutral' | 'success' | 'wrong'; message: string };
  ensemble: { shots: number; counts: Record<Outcome, number> } | null;
  thetaIndex: number;
  signedProtocol: { theta: number; probabilities: ModelResult['probabilities'] } | null;
}

export type GameAction =
  | { type: 'START' }
  | { type: 'SET_PHASE'; index: number }
  | { type: 'RUN_CALIBRATION' }
  | { type: 'CONFIRM_CALIBRATION' }
  | { type: 'SET_EVIDENCE_TAB'; tab: EvidenceTab }
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'TOGGLE_COMPARE' }
  | { type: 'SET_SOUND'; enabled: boolean }
  | { type: 'SET_MUSIC_VOLUME'; volume: number }
  | { type: 'SET_EFFECTS_VOLUME'; volume: number }
  | { type: 'SET_REDUCED_MOTION'; enabled: boolean }
  | { type: 'PREPARE_REPLICA' }
  | { type: 'SEND_PROBE' }
  | { type: 'FINISH_ANIMATION' }
  | { type: 'CLASSIFY_LIVE'; conclusion: Conclusion }
  | { type: 'CLASSIFY_REPORT'; conclusion: Conclusion }
  | { type: 'CONTINUE_PROTOCOL' }
  | { type: 'RUN_ENSEMBLE' }
  | { type: 'SET_THETA'; index: number }
  | { type: 'CONFIRM_PROTOCOL' }
  | { type: 'HINT' }
  | { type: 'RESET_SCENE' }
  | { type: 'INSPECT_ANOTHER' }
  | { type: 'REPLAY' };

const REPORTS: readonly Outcome[] = ['dark', 'bright', 'absorbed'];
const THETAS = [ANGLES.quarter, ANGLES.sixth, ANGLES.twelfth] as const;
export function createInitialState(seed: number): GameState {
  return {
    scene: 'foyer',
    phaseIndex: 1,
    calibrated: false,
    calibrationRun: null,
    evidenceTab: 'predictions',
    settingsOpen: false,
    compareOpen: false,
    soundEnabled: false,
    musicVolume: 0.35,
    effectsVolume: 0.55,
    reducedMotion: false,
    rngSeed: seed >>> 0 || 0x5eed1234,
    preparationCount: 0,
    hiddenTrial: null,
    observation: null,
    liveClassified: false,
    reportIndex: 0,
    hints: { calibrate: 0, classify: 0, gentler: 0 },
    feedback: { kind: 'neutral', message: 'The museum is quiet. The paper orchid is not a clue until the apparatus is calibrated.' },
    ensemble: null,
    thetaIndex: 0,
    signedProtocol: null,
  };
}

function draw(seed: number): { value: number; seed: number } {
  return nextRandom(seed);
}

function reportConclusion(outcome: Outcome): Conclusion {
  const result = conclusionFor(outcome);
  return result === 'impossible' ? 'inconclusive' : result;
}

function reportSuccess(outcome: Outcome, conclusion: Conclusion): string | null {
  if (conclusion === reportConclusion(outcome)) return null;
  if (outcome === 'bright') return 'Both an empty and an occupied case can produce Bright. This report stays inconclusive.';
  if (outcome === 'dark') return 'Our calibrated empty model assigns this outcome zero probability, so Dark confirms presence without absorption in this branch.';
  return 'Presence is certain in this model, but the probe was absorbed. That is a conservation cost.';
}

export function reduceGame(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START':
      if (state.scene !== 'foyer') return state;
      return { ...state, scene: 'calibrate', feedback: { kind: 'neutral', message: 'This is a model with fresh replicas. First, prove an empty case cannot make the Dark detector click.' } };
    case 'SET_PHASE': {
      if (state.scene !== 'calibrate' || !Number.isInteger(action.index) || action.index < 0 || action.index > 3) return state;
      return { ...state, phaseIndex: action.index, calibrationRun: null, feedback: { kind: 'neutral', message: 'The empty reference has changed. Check the exact prediction before you sign it.' } };
    }
    case 'RUN_CALIBRATION': {
      if (state.scene !== 'calibrate') return state;
      const phase = PHASES[state.phaseIndex];
      const exact = predict(ANGLES.quarter, phase, false);
      const sampled = sampleMany(exact.probabilities, 64, state.rngSeed);
      return {
        ...state,
        rngSeed: sampled.seed,
        calibrationRun: { exact, counts: sampled.counts, seed: sampled.seed },
        feedback: { kind: 'neutral', message: '64 fresh empty-reference preparations sampled. The calibration decision still uses the exact model, not a lucky zero-count histogram.' },
      };
    }
    case 'CONFIRM_CALIBRATION': {
      if (state.scene !== 'calibrate') return state;
      const exact = predict(ANGLES.quarter, PHASES[state.phaseIndex], false);
      if (exact.probabilities.dark > 1e-9) {
        return { ...state, feedback: { kind: 'wrong', message: 'This alignment still predicts a Dark click for an empty case. Reverse the phase mismatch until the exact Dark probability is zero.' } };
      }
      return {
        ...state,
        calibrated: true,
        calibrationRun: state.calibrationRun || { exact, counts: null, seed: null },
        scene: 'classify',
        feedback: { kind: 'success', message: 'Calibration signed: the ideal empty case sends every probe to Bright. Now one Dark click has a meaning.' },
      };
    }
    case 'SET_EVIDENCE_TAB':
      return { ...state, evidenceTab: action.tab };
    case 'TOGGLE_SETTINGS':
      return { ...state, settingsOpen: !state.settingsOpen };
    case 'TOGGLE_COMPARE':
      return { ...state, compareOpen: !state.compareOpen };
    case 'SET_SOUND':
      return { ...state, soundEnabled: action.enabled };
    case 'SET_MUSIC_VOLUME':
      return { ...state, musicVolume: Math.max(0, Math.min(1, action.volume)) };
    case 'SET_EFFECTS_VOLUME':
      return { ...state, effectsVolume: Math.max(0, Math.min(1, action.volume)) };
    case 'SET_REDUCED_MOTION':
      return { ...state, reducedMotion: action.enabled };
    case 'PREPARE_REPLICA': {
      if (state.scene !== 'classify') return state;
      const occupancy = draw(state.rngSeed);
      const preparationId = state.preparationCount + 1;
      return {
        ...state,
        rngSeed: occupancy.seed,
        preparationCount: preparationId,
        hiddenTrial: { occupied: occupancy.value < 0.5, preparationId },
        observation: null,
        liveClassified: false,
        ensemble: null,
        feedback: { kind: 'neutral', message: `Replica ${String(preparationId).padStart(2, '0')} is prepared. Its case stays frosted; the 50:50 prior does not reveal its contents.` },
      };
    }
    case 'SEND_PROBE': {
      if (state.scene !== 'classify' || !state.calibrated || !state.hiddenTrial || state.observation) return state;
      const exact = predict(ANGLES.quarter, 0, state.hiddenTrial.occupied);
      const next = draw(state.rngSeed);
      const outcome = sampleOutcome(exact.probabilities, next.value);
      return {
        ...state,
        rngSeed: next.seed,
        observation: { outcome, preparationId: state.hiddenTrial.preparationId, animationDone: state.reducedMotion },
        feedback: { kind: 'neutral', message: state.reducedMotion ? 'The observation is ready. Classify only what the detector recorded.' : 'The probe crosses the apparatus. You may skip the animation without changing its model result.' },
      };
    }
    case 'FINISH_ANIMATION':
      return state.observation ? { ...state, observation: { ...state.observation, animationDone: true } } : state;
    case 'CLASSIFY_LIVE': {
      if (state.scene !== 'classify' || !state.observation || !state.observation.animationDone) return state;
      const outcome = state.observation.outcome;
      if (action.conclusion !== reportConclusion(outcome)) {
        return { ...state, feedback: { kind: 'wrong', message: reportSuccess(outcome, action.conclusion) || 'That interpretation does not match the model.' } };
      }
      const message = outcome === 'dark'
        ? 'Correct. The calibrated empty apparatus cannot make Dark; in this ideal model that click confirms presence, and this branch was not absorbed.'
        : outcome === 'bright'
          ? 'Correct. Bright is inconclusive: the empty and occupied models both allow it.'
          : 'Correct. Absorbed confirms presence, and it records a conservation cost. Prepare a fresh replica for another run.';
      return { ...state, liveClassified: true, feedback: { kind: 'success', message } };
    }
    case 'CLASSIFY_REPORT': {
      if (state.scene !== 'classify' || !state.liveClassified || state.reportIndex >= REPORTS.length) return state;
      const outcome = REPORTS[state.reportIndex];
      const message = reportSuccess(outcome, action.conclusion);
      if (message) return { ...state, feedback: { kind: 'wrong', message } };
      const nextIndex = state.reportIndex + 1;
      const final = nextIndex === REPORTS.length;
      return {
        ...state,
        reportIndex: nextIndex,
        feedback: {
          kind: 'success',
          message: final
            ? 'All three reference reports are classified. Certainty and gentleness are separate questions.'
            : outcome === 'dark'
              ? 'Reference report understood: Dark has zero likelihood in the calibrated empty case.'
              : outcome === 'bright'
                ? 'Reference report understood: Bright cannot tell the two hypotheses apart.'
                : 'Reference report understood: absorption is conclusive evidence with an acknowledged cost.',
        },
      };
    }
    case 'CONTINUE_PROTOCOL':
      if (state.scene !== 'classify' || !state.liveClassified || state.reportIndex < REPORTS.length || !state.calibrated) return state;
      return { ...state, scene: 'gentler', thetaIndex: 0, feedback: { kind: 'neutral', message: 'The museum policy is a fictional task budget: find useful Dark signal while keeping absorption visible.' } };
    case 'RUN_ENSEMBLE': {
      if (state.scene !== 'classify' || !state.calibrated) return state;
      let current = state.rngSeed;
      const counts: Record<Outcome, number> = { bright: 0, dark: 0, absorbed: 0, unused: 0 };
      for (let shot = 0; shot < 128; shot += 1) {
        const occupancy = draw(current);
        current = occupancy.seed;
        const exact = predict(ANGLES.quarter, 0, occupancy.value < 0.5);
        const measurement = draw(current);
        current = measurement.seed;
        counts[sampleOutcome(exact.probabilities, measurement.value)] += 1;
      }
      return {
        ...state,
        rngSeed: current,
        ensemble: { shots: 128, counts },
        feedback: { kind: 'neutral', message: '128 fresh preparations were sampled at the stated equal prior. These are finite-sample observations, separate from the exact reference predictions.' },
      };
    }
    case 'SET_THETA':
      if (state.scene !== 'gentler' || action.index < 0 || action.index >= THETAS.length) return state;
      return { ...state, thetaIndex: action.index, feedback: { kind: 'neutral', message: 'The meters update from the exact occupied-reference model. Compare both limits before signing.' } };
    case 'CONFIRM_PROTOCOL': {
      if (state.scene !== 'gentler' || !state.calibrated) return state;
      const theta = THETAS[state.thetaIndex];
      const exact = predict(theta, 0, true);
      if (exact.probabilities.dark < 0.18) {
        return { ...state, feedback: { kind: 'wrong', message: 'The useful Dark signal is below the museum policy floor of 18% per prepared probe.' } };
      }
      if (exact.probabilities.absorbed > 0.30) {
        return { ...state, feedback: { kind: 'wrong', message: 'Absorption risk exceeds the museum policy ceiling of 30% per prepared probe.' } };
      }
      return {
        ...state,
        scene: 'ending',
        signedProtocol: { theta, probabilities: exact.probabilities },
        feedback: { kind: 'success', message: 'Protocol signed. Each successful Dark branch preserves the exhibit in this ideal model; the risk on all prepared probes remains visible.' },
      };
    }
    case 'HINT': {
      if (state.scene === 'calibrate') {
        const count = Math.min(3, state.hints.calibrate + 1);
        const hints = ['Compare the exact empty-case Dark probability in the evidence rail.', 'The dial offsets a phase mismatch. Reverse that offset.', 'Set the phase alignment to 0°; only that stop returns the empty case to zero Dark probability.'];
        return { ...state, hints: { ...state.hints, calibrate: count }, feedback: { kind: 'neutral', message: hints[count - 1] } };
      }
      if (state.scene === 'classify') {
        const count = Math.min(3, state.hints.classify + 1);
        const hints = ['Compare the empty and occupied reference rows, then classify what this observation permits.', 'A conclusion is conclusive only when the competing reference assigns the outcome probability zero.', 'Dark means presence without absorption in this branch; Bright is inconclusive; Absorbed means presence with a conservation cost.'];
        return { ...state, hints: { ...state.hints, classify: count }, feedback: { kind: 'neutral', message: hints[count - 1] } };
      }
      if (state.scene === 'gentler') {
        const count = Math.min(3, state.hints.gentler + 1);
        const hints = ['The probe-arm amplitude controls both risk and useful Dark clicks.', 'Meet both fixed lines: Dark at least 18%, Absorbed no more than 30%.', 'Use θ=π/6: Dark 18.75%, Absorbed 25%, Bright 56.25%.'];
        return { ...state, hints: { ...state.hints, gentler: count }, feedback: { kind: 'neutral', message: hints[count - 1] } };
      }
      return state;
    }
    case 'RESET_SCENE':
      if (state.scene === 'calibrate') return { ...state, phaseIndex: 1, calibrationRun: null, feedback: { kind: 'neutral', message: 'Calibration controls reset to the documented starting mismatch.' } };
      if (state.scene === 'classify') return { ...state, hiddenTrial: null, observation: null, liveClassified: false, ensemble: null, feedback: { kind: 'neutral', message: 'The current simulator attempt is cleared. Prepare a fresh replica when ready.' } };
      if (state.scene === 'gentler') return { ...state, thetaIndex: 0, feedback: { kind: 'neutral', message: 'Protocol controls reset to the balanced setting.' } };
      return state;
    case 'INSPECT_ANOTHER':
      if (state.scene !== 'ending') return state;
      return { ...state, scene: 'classify', hiddenTrial: null, observation: null, liveClassified: false, ensemble: null, evidenceTab: 'predictions', feedback: { kind: 'neutral', message: 'A new replica is prepared independently. The signed calibration remains in force.' } };
    case 'REPLAY':
      return createInitialState(state.rngSeed ^ 0x9e3779b9);
  }
}

export interface PlayerView extends Omit<GameState, 'hiddenTrial' | 'rngSeed'> {
  trialPrepared: boolean;
  trialObservation: Outcome | null;
  trialAnimating: boolean;
  reportOutcome: Outcome | null;
}

/** Public renderer contract. Hidden occupancy and the PRNG seed never cross it. */
export function toPlayerView(state: GameState): PlayerView {
  return {
    scene: state.scene,
    phaseIndex: state.phaseIndex,
    calibrated: state.calibrated,
    calibrationRun: state.calibrationRun,
    evidenceTab: state.evidenceTab,
    settingsOpen: state.settingsOpen,
    compareOpen: state.compareOpen,
    soundEnabled: state.soundEnabled,
    musicVolume: state.musicVolume,
    effectsVolume: state.effectsVolume,
    reducedMotion: state.reducedMotion,
    preparationCount: state.preparationCount,
    observation: state.observation ? { ...state.observation } : null,
    liveClassified: state.liveClassified,
    reportIndex: state.reportIndex,
    hints: { ...state.hints },
    feedback: { ...state.feedback },
    ensemble: state.ensemble,
    thetaIndex: state.thetaIndex,
    signedProtocol: state.signedProtocol,
    trialPrepared: state.hiddenTrial !== null,
    trialObservation: state.observation?.animationDone ? state.observation.outcome : null,
    trialAnimating: Boolean(state.observation && !state.observation.animationDone),
    reportOutcome: REPORTS[state.reportIndex] || null,
  };
}
