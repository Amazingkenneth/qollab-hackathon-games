import { describe, expect, test } from 'bun:test';
import { ANGLES, nextRandom } from '../src/model/ghostlight';
import { createInitialState, reduceGame, toPlayerView, type GameState } from '../src/state/game';
import { renderApp } from '../src/ui/render';

function seedFor(valueMin: number, valueMax: number): number {
  for (let seed = 1; seed < 100_000; seed += 1) {
    const value = nextRandom(seed).value;
    if (value >= valueMin && value < valueMax) return seed;
  }
  throw new Error('Could not find a deterministic seed in the requested interval.');
}

function calibrate(state: GameState): GameState {
  let next = reduceGame(state, { type: 'START' });
  next = reduceGame(next, { type: 'SET_PHASE', index: 0 });
  next = reduceGame(next, { type: 'CONFIRM_CALIBRATION' });
  return next;
}

describe('museum narrative reducer', () => {
  test('invalid alignment blocks inference, while exact zero unlocks the next scene', () => {
    let state = reduceGame(createInitialState(17), { type: 'START' });
    state = reduceGame(state, { type: 'CONFIRM_CALIBRATION' });
    expect(state.scene).toBe('calibrate');
    expect(state.calibrated).toBe(false);
    expect(state.feedback.kind).toBe('wrong');
    state = reduceGame(state, { type: 'SET_PHASE', index: 0 });
    state = reduceGame(state, { type: 'CONFIRM_CALIBRATION' });
    expect(state.scene).toBe('classify');
    expect(state.calibrated).toBe(true);
  });

  test('hidden occupancy and random seed are absent from the player view', () => {
    let state = calibrate(createInitialState(32));
    state = reduceGame(state, { type: 'PREPARE_REPLICA' });
    expect(state.hiddenTrial).not.toBeNull();
    const view = toPlayerView(state);
    expect('hiddenTrial' in view).toBe(false);
    expect('rngSeed' in view).toBe(false);
    expect(JSON.stringify(view)).not.toContain('hiddenTrial');
    expect(view.trialPrepared).toBe(true);
  });

  test('occupied and empty hidden replicas render identically before a recorded outcome', () => {
    const calibrated = { ...calibrate(createInitialState(52)), evidenceTab: 'trial' as const, preparationCount: 1 };
    const emptySecret = { ...calibrated, hiddenTrial: { occupied: false, preparationId: 1 } };
    const occupiedSecret = { ...calibrated, hiddenTrial: { occupied: true, preparationId: 1 } };
    expect(renderApp(toPlayerView(emptySecret))).toBe(renderApp(toPlayerView(occupiedSecret)));
  });

  test('protocol meters render the authored percentages without hiding their trade-off', () => {
    const state = { ...calibrate(createInitialState(92)), scene: 'gentler' as const, thetaIndex: 1 };
    const html = renderApp(toPlayerView(state));
    expect(html).toContain('18.75%');
    expect(html).toContain('56.25%');
    expect(html).toContain('25%');
  });

  test('the measured outcome stays off-screen until animation completes', () => {
    let state = calibrate(createInitialState(41));
    state = { ...state, hiddenTrial: { occupied: true, preparationId: 1 }, rngSeed: seedFor(0.25, 0.5) };
    state = reduceGame(state, { type: 'SEND_PROBE' });
    expect(state.observation?.outcome).toBe('dark');
    expect(toPlayerView(state).trialObservation).toBeNull();
    state = reduceGame(state, { type: 'FINISH_ANIMATION' });
    expect(toPlayerView(state).trialObservation).toBe('dark');
  });

  test('Bright, Dark, and Absorbed observations all accept their justified classifications', () => {
    const cases = [
      { range: [0, .25] as const, outcome: 'bright' as const, conclusion: 'inconclusive' as const },
      { range: [.25, .5] as const, outcome: 'dark' as const, conclusion: 'gentle-presence' as const },
      { range: [.5, 1] as const, outcome: 'absorbed' as const, conclusion: 'costly-presence' as const },
    ];
    for (const item of cases) {
      let state = calibrate(createInitialState(73));
      state = { ...state, reducedMotion: true, hiddenTrial: { occupied: true, preparationId: 1 }, rngSeed: seedFor(item.range[0], item.range[1]) };
      state = reduceGame(state, { type: 'SEND_PROBE' });
      expect(state.observation?.outcome).toBe(item.outcome);
      state = reduceGame(state, { type: 'CLASSIFY_LIVE', conclusion: item.conclusion });
      expect(state.liveClassified).toBe(true);
    }
  });

  test('the live report, three illustrative cases, trade-off, and ending all resolve', () => {
    let state = calibrate(createInitialState(11));
    state = {
      ...state,
      reducedMotion: true,
      hiddenTrial: { occupied: true, preparationId: 1 },
      preparationCount: 1,
      rngSeed: seedFor(0.25, 0.5),
    };
    state = reduceGame(state, { type: 'SEND_PROBE' });
    expect(state.observation?.outcome).toBe('dark');
    state = reduceGame(state, { type: 'CLASSIFY_LIVE', conclusion: 'inconclusive' });
    expect(state.liveClassified).toBe(false);
    state = reduceGame(state, { type: 'CLASSIFY_LIVE', conclusion: 'gentle-presence' });
    expect(state.liveClassified).toBe(true);

    state = reduceGame(state, { type: 'CLASSIFY_REPORT', conclusion: 'costly-presence' });
    expect(state.reportIndex).toBe(0);
    state = reduceGame(state, { type: 'CLASSIFY_REPORT', conclusion: 'gentle-presence' });
    expect(state.reportIndex).toBe(1);
    state = reduceGame(state, { type: 'CLASSIFY_REPORT', conclusion: 'gentle-presence' });
    expect(state.reportIndex).toBe(1);
    state = reduceGame(state, { type: 'CLASSIFY_REPORT', conclusion: 'inconclusive' });
    expect(state.reportIndex).toBe(2);
    state = reduceGame(state, { type: 'CLASSIFY_REPORT', conclusion: 'costly-presence' });
    expect(state.reportIndex).toBe(3);
    state = reduceGame(state, { type: 'CONTINUE_PROTOCOL' });
    expect(state.scene).toBe('gentler');

    state = reduceGame(state, { type: 'CONFIRM_PROTOCOL' });
    expect(state.scene).toBe('gentler');
    expect(state.feedback.message).toContain('Absorption risk');
    state = reduceGame(state, { type: 'SET_THETA', index: 2 });
    state = reduceGame(state, { type: 'CONFIRM_PROTOCOL' });
    expect(state.scene).toBe('gentler');
    expect(state.feedback.message).toContain('Dark signal');
    state = reduceGame(state, { type: 'SET_THETA', index: 1 });
    state = reduceGame(state, { type: 'CONFIRM_PROTOCOL' });
    expect(state.scene).toBe('ending');
    expect(state.signedProtocol?.theta).toBe(ANGLES.sixth);
    expect(Math.abs((state.signedProtocol?.probabilities.dark ?? 0) - 0.1875)).toBeLessThan(1e-12);
    expect(Math.abs((state.signedProtocol?.probabilities.absorbed ?? 0) - 0.25)).toBeLessThan(1e-12);
  });

  test('the optional ensemble samples 128 fresh preparations and leaves the secret out of its report', () => {
    let state = calibrate(createInitialState(145));
    state = reduceGame(state, { type: 'RUN_ENSEMBLE' });
    expect(state.ensemble?.shots).toBe(128);
    expect(Object.values(state.ensemble!.counts).reduce((a, b) => a + b, 0)).toBe(128);
    expect(toPlayerView(state).ensemble?.shots).toBe(128);
    expect(ANGLES.quarter).toBe(Math.PI / 4);
  });

  test('ending can start a fresh replica or replay without reloading', () => {
    let state = calibrate(createInitialState(19));
    state = { ...state, scene: 'ending', signedProtocol: { theta: ANGLES.quarter, probabilities: { bright: .25, dark: .25, absorbed: .5, unused: 0 } } };
    state = reduceGame(state, { type: 'INSPECT_ANOTHER' });
    expect(state.scene).toBe('classify');
    expect(state.calibrated).toBe(true);
    state = reduceGame(state, { type: 'REPLAY' });
    expect(state.scene).toBe('foyer');
    expect(state.calibrated).toBe(false);
    expect(state.hiddenTrial).toBeNull();
  });
});
