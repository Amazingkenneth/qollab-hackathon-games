import { describe, expect, test } from 'bun:test';
import {
  ANGLES,
  PHASES,
  applyNaiveQ0Rotation,
  conclusionFor,
  predict,
  sampleOutcome,
  type Complex,
} from '../src/model/ghostlight';

const oracle = await Bun.file(new URL('../../reference/expected_results.json', import.meta.url)).json() as {
  ghostlight_museum: {
    cases: Array<{ theta: number; empty: number[]; occupied_bright_dark_absorbed_unused: number[] }>;
    gentle_target: { dark_min: number; absorb_max: number };
  };
};

const close = (actual: number, expected: number, tolerance = 1e-10): void => {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
};

describe('Ghostlight four-state model', () => {
  test('aligned empty case recombines to Bright and preserves normalization', () => {
    const result = predict(ANGLES.quarter, 0, false);
    close(result.probabilities.bright, 1);
    close(result.probabilities.dark, 0);
    close(result.probabilities.absorbed, 0);
    close(result.probabilities.unused, 0);
    close(result.norm, 1);
    close(result.state[0].re, 1);
    close(result.state[1].re, 0);
  });

  test('occupied reference matches all three documented outcome rows', () => {
    const cases = [
      [ANGLES.quarter, 0.25, 0.25, 0.5],
      [ANGLES.sixth, 0.5625, 0.1875, 0.25],
      [ANGLES.twelfth, 0.8705127018922193, 0.0625, 0.0669872981077807],
    ] as const;
    for (const [theta, bright, dark, absorbed] of cases) {
      const result = predict(theta, 0, true);
      close(result.probabilities.bright, bright);
      close(result.probabilities.dark, dark);
      close(result.probabilities.absorbed, absorbed);
      close(result.probabilities.unused, 0);
      close(result.norm, 1);
    }
  });

  test('browser model agrees with the pack’s independent NumPy oracle fixtures', () => {
    for (const fixture of oracle.ghostlight_museum.cases) {
      const empty = predict(fixture.theta, 0, false).probabilities;
      const occupied = predict(fixture.theta, 0, true).probabilities;
      const actualEmpty = [empty.bright, empty.dark, empty.absorbed, empty.unused];
      const actualOccupied = [occupied.bright, occupied.dark, occupied.absorbed, occupied.unused];
      fixture.empty.forEach((expected, index) => close(actualEmpty[index], expected));
      fixture.occupied_bright_dark_absorbed_unused.forEach((expected, index) => close(actualOccupied[index], expected));
    }
    expect(oracle.ghostlight_museum.gentle_target).toEqual({ dark_min: 0.18, absorb_max: 0.3 });
  });

  test('only zero phase calibrates the empty case among the four dial stops', () => {
    const dark = PHASES.map((phase) => predict(ANGLES.quarter, phase, false).probabilities.dark);
    close(dark[0], 0);
    close(dark[1], 0.5);
    close(dark[2], 1);
    close(dark[3], 0.5);
  });

  test('a sampled zero is not used as an exact likelihood', () => {
    const phase = Math.PI / 2;
    const exact = predict(ANGLES.quarter, phase, false).probabilities;
    expect(exact.dark).toBeGreaterThan(0);
    expect(sampleOutcome(exact, 0.001)).toBe('bright');
    expect(sampleOutcome(exact, 0.75)).toBe('dark');
  });

  test('the loss flag must not be rotated back into a live unused basis state', () => {
    const lost: Complex[] = [{ re: 0, im: 0 }, { re: 0, im: 0 }, { re: 1, im: 0 }, { re: 0, im: 0 }];
    const temptingButWrong = applyNaiveQ0Rotation(lost, Math.PI / 2);
    close(temptingButWrong[3].re ** 2, 0.5);
    close(predict(ANGLES.quarter, 0, true).probabilities.unused, 0);
  });

  test('outcome language keeps certainty separate from conservation', () => {
    expect(conclusionFor('dark')).toBe('gentle-presence');
    expect(conclusionFor('bright')).toBe('inconclusive');
    expect(conclusionFor('absorbed')).toBe('costly-presence');
  });
});
