export type Complex = Readonly<{ re: number; im: number }>;
export type Outcome = 'bright' | 'dark' | 'absorbed' | 'unused';

export interface Probabilities {
  bright: number;
  dark: number;
  absorbed: number;
  unused: number;
}

export interface ModelResult {
  theta: number;
  phase: number;
  occupied: boolean;
  state: readonly Complex[];
  probabilities: Probabilities;
  norm: number;
}

const zero = (): Complex => ({ re: 0, im: 0 });
const plus = (a: Complex, b: Complex): Complex => ({ re: a.re + b.re, im: a.im + b.im });
const scale = (a: Complex, n: number): Complex => ({ re: a.re * n, im: a.im * n });
const multiply = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});
const modulusSquared = (a: Complex): number => a.re * a.re + a.im * a.im;

/** Rotate only live paths |00> and |01>; encoded integer index is q0 + 2*q1. */
function rotateLive(state: readonly Complex[], angle: number): Complex[] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const next = state.map((entry) => ({ ...entry }));
  next[0] = plus(scale(state[0], c), scale(state[1], -s));
  next[1] = plus(scale(state[0], s), scale(state[1], c));
  return next;
}

function validate(result: ModelResult): void {
  if (result.state.length !== 4) throw new Error('The encoded state must have four amplitudes.');
  if (![...result.state.flatMap((z) => [z.re, z.im]), ...Object.values(result.probabilities)].every(Number.isFinite)) {
    throw new Error('The model produced a non-finite amplitude or probability.');
  }
  if (Object.values(result.probabilities).some((p) => p < -1e-12)) {
    throw new Error('The model produced a negative probability.');
  }
  if (Math.abs(result.norm - 1) > 1e-10) throw new Error(`State lost normalization (norm ${result.norm}).`);
}

/**
 * Four-dimensional unitary dilation of a fragile absorber.
 * Index 0=live reference, 1=live probe, 2=absorbed/environment, 3=unused.
 */
export function predict(theta: number, phase: number, occupied: boolean): ModelResult {
  if (!Number.isFinite(theta) || !Number.isFinite(phase)) throw new TypeError('Angles must be finite.');

  let state: Complex[] = [{ re: 1, im: 0 }, zero(), zero(), zero()];
  state = rotateLive(state, theta);
  const phaseFactor = { re: Math.cos(phase), im: Math.sin(phase) };
  state[1] = multiply(state[1], phaseFactor);

  if (occupied) {
    // The absorber is a unitary swap in the enlarged live+environment space.
    [state[1], state[2]] = [state[2], state[1]];
  }

  // The inverse beam splitter acts on live paths only. The absorbed branch
  // stays in the environment ledger and can never return to the apparatus.
  state = rotateLive(state, -theta);

  const probabilities: Probabilities = {
    bright: modulusSquared(state[0]),
    dark: modulusSquared(state[1]),
    absorbed: modulusSquared(state[2]),
    unused: modulusSquared(state[3]),
  };
  const norm = Object.values(probabilities).reduce((sum, p) => sum + p, 0);
  const result = { theta, phase, occupied, state, probabilities, norm };
  validate(result);
  return result;
}

export function sampleOutcome(probabilities: Probabilities, random: number): Outcome {
  if (!(random >= 0 && random < 1)) throw new RangeError('A sample must be in [0, 1).');
  const entries: readonly [Outcome, number][] = [
    ['bright', probabilities.bright],
    ['dark', probabilities.dark],
    ['absorbed', probabilities.absorbed],
    ['unused', probabilities.unused],
  ];
  let edge = 0;
  for (const [outcome, probability] of entries) {
    edge += probability;
    if (random < edge) return outcome;
  }
  // Floating-point sums may finish a few ulps below one; the normalized model
  // makes this branch unreachable except at the upper rounding edge.
  return 'unused';
}

/** A tiny explicit PRNG makes every observed shot reproducible from its seed. */
export function nextRandom(seed: number): { value: number; seed: number } {
  let next = seed >>> 0;
  if (next === 0) next = 0x6d2b79f5;
  next ^= next << 13;
  next ^= next >>> 17;
  next ^= next << 5;
  next >>>= 0;
  return { value: next / 0x100000000, seed: next };
}

export function sampleMany(
  probabilities: Probabilities,
  shots: number,
  seed: number,
): { counts: Record<Outcome, number>; seed: number } {
  if (!Number.isInteger(shots) || shots < 1) throw new RangeError('shots must be a positive integer');
  const counts: Record<Outcome, number> = { bright: 0, dark: 0, absorbed: 0, unused: 0 };
  let currentSeed = seed >>> 0;
  for (let i = 0; i < shots; i += 1) {
    const next = nextRandom(currentSeed);
    currentSeed = next.seed;
    counts[sampleOutcome(probabilities, next.value)] += 1;
  }
  return { counts, seed: currentSeed };
}

/** Deliberately wrong all-subspace q0 rotation, kept for a regression guard. */
export function applyNaiveQ0Rotation(state: readonly Complex[], angle: number): Complex[] {
  const c = Math.cos(angle / 2);
  const s = Math.sin(angle / 2);
  const next = state.map((entry) => ({ ...entry }));
  for (const [a, b] of [[0, 1], [2, 3]] as const) {
    next[a] = plus(scale(state[a], c), scale(state[b], -s));
    next[b] = plus(scale(state[a], s), scale(state[b], c));
  }
  return next;
}

export const ANGLES = {
  quarter: Math.PI / 4,
  sixth: Math.PI / 6,
  twelfth: Math.PI / 12,
} as const;

export const PHASES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2] as const;

export const OUTCOME_ORDER: readonly Outcome[] = ['bright', 'dark', 'absorbed', 'unused'];

export function conclusionFor(outcome: Outcome): 'gentle-presence' | 'inconclusive' | 'costly-presence' | 'impossible' {
  if (outcome === 'dark') return 'gentle-presence';
  if (outcome === 'bright') return 'inconclusive';
  if (outcome === 'absorbed') return 'costly-presence';
  return 'impossible';
}
