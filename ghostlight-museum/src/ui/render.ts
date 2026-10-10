import { ANGLES, PHASES, predict, type Outcome, type Probabilities } from '../model/ghostlight';
import type { PlayerView } from '../state/game';

const pct = (value: number): string => `${(value * 100).toFixed(2).replace(/\.?0+$/, '')}%`;
const phaseLabel = (index: number): string => `${index * 90}°`;
const thetaLabel = (index: number): string => ['π/4 · balanced', 'π/6 · gentle', 'π/12 · very gentle'][index];

function probabilityRow(label: string, probabilities: Probabilities, caption = ''): string {
  return `<div class="probability-row"><div class="probability-head"><span>${label}</span><span class="numeric">${caption}</span></div><div class="probability-bar" aria-label="${label}: Bright ${pct(probabilities.bright)}, Dark ${pct(probabilities.dark)}, Absorbed ${pct(probabilities.absorbed)}"><span class="seg bright" style="width:${probabilities.bright * 100}%"></span><span class="seg dark" style="width:${probabilities.dark * 100}%"></span><span class="seg absorbed" style="width:${probabilities.absorbed * 100}%"></span></div><div class="outcome-values"><span><i class="key bright-key"></i>B ${pct(probabilities.bright)}</span><span><i class="key dark-key"></i>D ${pct(probabilities.dark)}</span><span><i class="key absorbed-key"></i>A ${pct(probabilities.absorbed)}</span></div></div>`;
}

function outcomeName(outcome: Outcome): string {
  return ({ bright: 'Bright', dark: 'Dark', absorbed: 'Absorbed', unused: 'Unused' })[outcome];
}

function orchid(x: number, y: number, scale = 1): string {
  return `<g transform="translate(${x} ${y}) scale(${scale})" aria-hidden="true">
    <path d="M0 10 C-4 40 -2 68 -10 92 M2 31 C20 35 26 47 26 60 M-3 53 C-23 50 -30 61 -31 73" fill="none" stroke="#91a78e" stroke-width="4" stroke-linecap="round"/>
    <path d="M-9 52 C-31 41 -39 53 -30 64 C-23 67 -16 60 -9 52Z M8 39 C26 28 34 39 29 50 C20 53 13 47 8 39Z" fill="#91a78e" stroke="#647c69" stroke-width="1.5"/>
    <g transform="translate(0 4)">
      <path d="M0 8 C-41 8 -44 -19 -27 -29 C-15 -33 -6 -18 0 8Z" fill="#e5aab1" stroke="#9d687c" stroke-width="2"/>
      <path d="M0 8 C-30 -18 -17 -43 -1 -39 C12 -36 10 -14 0 8Z" fill="#f4c6c0" stroke="#9d687c" stroke-width="2"/>
      <path d="M0 8 C8 -31 35 -29 38 -12 C40 1 17 8 0 8Z" fill="#df92a5" stroke="#9d687c" stroke-width="2"/>
      <path d="M0 8 C25 18 21 42 5 42 C-8 41 -7 23 0 8Z" fill="#f1b6b8" stroke="#9d687c" stroke-width="2"/>
      <path d="M0 8 C-22 31 -42 18 -34 3 C-28 -8 -10 1 0 8Z" fill="#d98098" stroke="#9d687c" stroke-width="2"/>
      <circle cx="1" cy="7" r="6" fill="#f0cd86" stroke="#8e6471" stroke-width="1.5"/>
      <path d="M-10 13 Q1 26 11 13" fill="none" stroke="#fff1dc" stroke-width="2" opacity=".8"/>
    </g>
  </g>`;
}

function roomBackdrop(scene: PlayerView['scene']): string {
  const warm = scene === 'ending' || scene === 'foyer';
  return `<defs>
    <linearGradient id="wall" x1="0" x2="0.9" y1="0" y2="1"><stop stop-color="${warm ? '#35514d' : '#213a3b'}"/><stop offset="1" stop-color="#142a31"/></linearGradient>
    <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#c7b99e"/><stop offset="1" stop-color="#736e62"/></linearGradient>
    <linearGradient id="glass" x1="0" x2="1" y1="0" y2="0"><stop stop-color="#d5ede5" stop-opacity=".12"/><stop offset=".45" stop-color="#edfff2" stop-opacity=".25"/><stop offset="1" stop-color="#9dc5c2" stop-opacity=".1"/></linearGradient>
    <linearGradient id="gold" x1="0" x2="1"><stop stop-color="#c29454"/><stop offset=".5" stop-color="#efd194"/><stop offset="1" stop-color="#a67542"/></linearGradient>
    <pattern id="frost" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 3L18 15M-3 14L7 18" stroke="#f0f5e5" stroke-width="1" opacity=".15"/><circle cx="5" cy="7" r="1" fill="#fff" opacity=".22"/></pattern>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#93c5b9"/></marker>
    <marker id="lostArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#d99aa4"/></marker>
  </defs>
  <rect width="842" height="472" fill="url(#wall)"/>
  <path d="M25 0V235 Q25 42 153 42 Q281 42 281 235V0M306 0V235 Q306 42 434 42 Q562 42 562 235V0M586 0V235 Q586 42 714 42 Q842 42 842 235V0" fill="none" stroke="#b8ae94" stroke-width="10" opacity=".14"/>
  <path d="M0 338H842V472H0Z" fill="url(#floor)" opacity=".95"/>
  <path d="M0 339H842" stroke="#ded2b6" stroke-width="3" opacity=".38"/>
  <path d="M0 387H842M0 434H842M80 339L32 472M237 339L206 472M422 339L422 472M613 339L654 472M790 339L832 472" stroke="#615e56" stroke-width="1" opacity=".17"/>
  <g opacity=".7"><path d="M99 0V46" stroke="#b8ae94"/><path d="M88 46H110L99 64Z" fill="url(#gold)"/><circle cx="99" cy="68" r="3" fill="#f0cd86"/><path d="M751 0V32" stroke="#b8ae94"/><path d="M742 32H760L751 48Z" fill="url(#gold)"/></g>
  <path d="M50 336Q220 300 402 334T790 333" fill="none" stroke="#f1d7a2" stroke-width="2" opacity=".17"/>`;
}

function detector(x: number, y: number, kind: 'bright' | 'dark', active: boolean): string {
  const symbol = kind === 'bright'
    ? `<circle cx="0" cy="0" r="12" fill="${active ? '#f0cd86' : '#152a31'}" stroke="#f0cd86" stroke-width="2"/><path d="M-18 -17L-23 -22M18 -17L23 -22M0 -24V-30" stroke="#f0cd86" stroke-width="2" stroke-linecap="round"/>`
    : `<path d="M0 -16L16 0L0 16L-16 0Z" fill="${active ? '#d6e9df' : '#152a31'}" stroke="#d6e9df" stroke-width="2.5"/><path d="M0 -25V-31M19 -19L23 -23M-19 -19L-23 -23" stroke="#d6e9df" stroke-width="1.6"/>`;
  return `<g transform="translate(${x} ${y})" class="detector ${active ? 'detector-active' : ''}">${active ? '<circle r="28" fill="#f0cd86" opacity=".12" filter="url(#softGlow)"/>' : ''}${symbol}<text y="40" text-anchor="middle" class="svg-label">${kind === 'bright' ? 'BRIGHT · B' : 'DARK · D'}</text></g>`;
}

function apparatus(view: PlayerView, mode: 'calibration' | 'trial' | 'protocol' | 'ending'): string {
  const outcome = view.trialObservation;
  const activeBright = outcome === 'bright';
  const activeDark = outcome === 'dark';
  const activeAbsorbed = outcome === 'absorbed';
  const absorberActive = mode === 'protocol' || mode === 'ending' || activeAbsorbed;
  const caseLabel = mode === 'calibration' ? 'KNOWN EMPTY' : mode === 'protocol' ? 'OCCUPIED REFERENCE' : mode === 'ending' ? 'OPEN REFERENCE CASE' : 'SEALED REPLICA';
  const frosted = mode === 'trial';
  const showOrchid = mode === 'protocol' || mode === 'ending';
  const lineClass = view.trialAnimating ? 'path pulse-path' : 'path';
  const ending = mode === 'ending';
  const phase = mode === 'calibration' ? PHASES[view.phaseIndex] : 0;
  const empty = predict(ANGLES.quarter, phase, false).probabilities;
  const theta = mode === 'protocol' || ending ? [ANGLES.quarter, ANGLES.sixth, ANGLES.twelfth][view.thetaIndex] : ANGLES.quarter;
  const occupied = predict(theta, 0, true).probabilities;
  const beam = view.scene === 'calibrate' && view.calibrationRun ? '<circle class="beam-point" cx="120" cy="238" r="7" fill="#f0cd86"/>' : '';
  const lowerRoute = absorberActive
    ? `<path d="M246 238L350 345L420 345" class="${lineClass}" marker-end="url(#lostArrow)"/>`
    : `<path d="M246 238L350 345L603 345L701 238L790 320" class="${lineClass}" marker-end="url(#arrow)"/>`;
  const probeGuide = absorberActive
    ? '<path d="M350 345L420 345" stroke="#93c5b9" stroke-width="2" stroke-dasharray="5 7" opacity=".38"/>'
    : '<path d="M350 345L603 345" stroke="#93c5b9" stroke-width="2" stroke-dasharray="5 7" opacity=".38"/>';
  const caseDetails = showOrchid
    ? `<g>${orchid(476, 283, .66)}<rect x="430" y="258" width="92" height="108" rx="6" fill="url(#glass)" stroke="#c3d1b9" stroke-width="1.2"/></g>`
    : `<rect x="420" y="294" width="112" height="94" rx="8" fill="#243d3e" stroke="#9c9d86" stroke-width="2"/><rect x="428" y="303" width="96" height="74" rx="5" fill="url(#glass)" stroke="#d6dcc6" stroke-opacity=".42"/><path d="M428 303L524 377M442 303L524 366" stroke="#eff4dd" stroke-opacity=".12" stroke-width="2"/>${frosted ? '<rect x="428" y="303" width="96" height="74" rx="5" fill="url(#frost)" opacity=".9"/>' : ''}<path d="M432 388H520L536 402H416Z" fill="#b5a884" stroke="#706d60" stroke-width="2"/>`;
  return `<g aria-label="Two-path interferometer; reference and probe paths, a sealed case, Bright and Dark detectors, and a separate absorption ledger">
    <path d="M88 238L246 238L350 125L603 125L701 238L790 164" class="${lineClass}" marker-end="url(#arrow)"/>
    ${lowerRoute}
    <path d="M350 125L603 125" stroke="#93c5b9" stroke-width="2" stroke-dasharray="5 7" opacity=".38"/>
    ${probeGuide}
    <circle cx="88" cy="238" r="25" fill="#f0cd86" fill-opacity=".13" stroke="#f0cd86" stroke-width="1.5"/><circle cx="88" cy="238" r="8" fill="#f0cd86"/>
    <text x="88" y="284" text-anchor="middle" class="svg-label">SOURCE</text>
    <g transform="translate(246 238)"><circle r="24" fill="#233c3d" stroke="#efd194" stroke-width="2"/><path d="M-13 -14L14 14M14 -14L-13 14" stroke="#efd194" stroke-width="2"/><text y="42" text-anchor="middle" class="svg-label">R(θ)</text></g>
    <text x="420" y="104" text-anchor="middle" class="svg-label svg-muted">REFERENCE ARM · q₀</text>
    <text x="366" y="372" text-anchor="middle" class="svg-label svg-muted">PROBE ARM · q₁</text>
    <g transform="translate(701 238)"><circle r="27" fill="#233c3d" stroke="#efd194" stroke-width="2"/><path d="M-15 -14L14 14M14 -14L-15 14" stroke="#efd194" stroke-width="2"/><text y="45" text-anchor="middle" class="svg-label">R(−θ)</text></g>
    ${caseDetails}
    <rect x="407" y="407" width="138" height="24" rx="12" fill="#182e33" stroke="#869280" stroke-opacity=".65"/>
    <text x="476" y="423" text-anchor="middle" class="svg-small">${caseLabel}</text>
    <path d="M476 388V425" stroke="#d99aa4" stroke-width="2" stroke-dasharray="4 5" marker-end="url(#lostArrow)"/>
    <g transform="translate(476 447)"><path d="M0 -13C-22 -8 -17 10 0 13C17 10 22 -8 0 -13Z" fill="${activeAbsorbed ? '#d99aa4' : '#253a3a'}" stroke="#e5adb1" stroke-width="1.8"/><path d="M0 -8V7M0 0L-7 5M0 -1L7 -5" stroke="#f5d0c5" stroke-width="1.1"/><text x="30" y="4" class="svg-small">ABSORBED · A / ENERGY LEDGER</text></g>
    ${detector(790, 164, 'bright', activeBright)}${detector(790, 320, 'dark', activeDark)}
    ${beam}
    ${view.trialAnimating ? '<circle class="whole-pulse" cx="439" cy="238" r="216" fill="none" stroke="#f0cd86" stroke-width="2" opacity=".6"/>' : ''}
    <g transform="translate(32 30)"><rect width="148" height="27" rx="13.5" fill="#10262b" stroke="#738779" stroke-opacity=".55"/><text x="14" y="18" class="svg-small">${mode === 'calibration' ? `PHASE ALIGNMENT · ${phaseLabel(view.phaseIndex)}` : mode === 'protocol' ? `POLICY PREVIEW · θ ${thetaLabel(view.thetaIndex).split(' · ')[0]}` : mode === 'ending' ? 'NIGHT INVENTORY · SIGNED' : 'MODEL PREVIEW · 2 QUBITS'}</text></g>
    <g transform="translate(642 28)"><rect width="170" height="64" rx="8" fill="#10262b" stroke="#65786f" stroke-opacity=".65"/><text x="14" y="20" class="svg-small">EXACT ${mode === 'calibration' ? 'EMPTY' : 'OCCUPIED'} PREDICTION</text><text x="14" y="40" class="svg-small">${mode === 'calibration' ? `B ${pct(empty.bright)} · D ${pct(empty.dark)}` : `B ${pct(occupied.bright)} · D ${pct(occupied.dark)}`}</text><text x="14" y="56" class="svg-small">A ${pct(mode === 'calibration' ? empty.absorbed : occupied.absorbed)} · U 0.0%</text></g>
    <g transform="translate(50 458)"><text class="svg-small" fill="#e4ddc7">CONSERVATION LAB · FRESH PREPARATIONS ONLY</text></g>
  </g>`;
}

function foyerStage(): string {
  return `<g><path d="M421 113V271" stroke="#cfb688" stroke-width="3"/><path d="M406 270Q421 257 436 270L430 278H412Z" fill="#e7c890"/><ellipse cx="421" cy="279" rx="49" ry="13" fill="#f0cd86" opacity=".08"/><ellipse cx="421" cy="379" rx="123" ry="18" fill="#273a35" stroke="#b49d73" stroke-width="3"/><path d="M324 379H518L498 405H344Z" fill="#a99774" stroke="#756f5e" stroke-width="2"/><path d="M344 405H498L489 418H353Z" fill="#5a655c"/>${orchid(421, 249, 1.25)}<rect x="338" y="227" width="166" height="152" rx="18" fill="url(#glass)" stroke="#c4d4c2" stroke-width="1.4"/><path d="M349 244L398 358M492 244L458 337" stroke="#f6f4de" stroke-opacity=".25" stroke-width="4"/><g transform="translate(67 253)"><circle cx="58" cy="50" r="43" fill="#273e3d" stroke="#c6b691" stroke-width="2"/><path d="M24 117C30 83 87 81 94 117" fill="#597875" stroke="#c6b691" stroke-width="2"/><path d="M37 51Q58 37 79 51M45 65Q58 72 71 65" fill="none" stroke="#dcc6a1" stroke-width="3" stroke-linecap="round"/><circle cx="47" cy="54" r="2.2" fill="#132a30"/><circle cx="69" cy="54" r="2.2" fill="#132a30"/><rect x="11" y="124" width="112" height="26" rx="13" fill="#142c31" stroke="#ab9973"/><text x="67" y="141" text-anchor="middle" class="svg-small">IVO · CONSERVATOR</text></g><g transform="translate(547 159)"><text class="svg-kicker">CLOSING TIME · 23:47</text><text y="50" class="svg-heading">THE LAST</text><text y="93" class="svg-heading">LIGHT</text><path d="M0 112H205" stroke="#d4bd8c" stroke-width="1" opacity=".65"/><text y="139" class="svg-copy">A paper orchid is fading.</text><text y="162" class="svg-copy">Its pigment drinks light.</text><text y="201" class="svg-small">One click can tell us where it is.</text></g></g>`;
}

function chamberStage(view: PlayerView): string {
  if (view.scene === 'foyer') return foyerStage();
  if (view.scene === 'ending') return apparatus(view, 'ending');
  if (view.scene === 'gentler') return apparatus(view, 'protocol');
  if (view.scene === 'calibrate') return apparatus(view, 'calibration');
  return apparatus(view, 'trial');
}

export function renderStage(view: PlayerView): string {
  const headings: Record<PlayerView['scene'], string> = {
    foyer: 'A paper orchid waits in the museum after closing.',
    calibrate: 'An empty reference case teaches the instrument what Dark can mean.',
    classify: 'One fresh replica. Three possible records. No hidden answer on the glass.',
    gentler: 'A museum policy asks for useful evidence with a visible conservation cost.',
    ending: 'The report is signed. The light returns behind protective shutters.',
  };
  return `<svg class="stage-art stage-desktop" viewBox="0 0 842 472" role="img" aria-labelledby="stage-title stage-desc" xmlns="http://www.w3.org/2000/svg">
    <title id="stage-title">Ghostlight Museum — ${headings[view.scene]}</title>
    <desc id="stage-desc">Original vector illustration of a quiet museum, two live optical arms, a sealed display case, Bright and Dark detectors, and a separate absorbed-energy ledger. Hidden replica occupancy is never drawn.</desc>
    ${roomBackdrop(view.scene)}${chamberStage(view)}
    <rect x="1" y="1" width="840" height="470" rx="15" fill="none" stroke="#e2d8ba" stroke-opacity=".3" stroke-width="2"/>
  </svg>${renderMobileStage(view, headings[view.scene])}`;
}

function renderMobileStage(view: PlayerView, heading: string): string {
  if (view.scene === 'foyer') {
    return `<svg class="stage-art stage-mobile" viewBox="0 0 420 560" role="img" aria-labelledby="mobile-stage-title mobile-stage-desc" xmlns="http://www.w3.org/2000/svg"><title id="mobile-stage-title">Ghostlight Museum foyer</title><desc id="mobile-stage-desc">A paper orchid in a glass display and conservator Ivo in a quiet museum at night.</desc><rect width="420" height="560" fill="#213a3b"/><path d="M20 0V363Q20 62 210 62T400 363V0" fill="none" stroke="#b8ae94" stroke-width="12" opacity=".18"/><path d="M0 418H420V560H0Z" fill="#a99e82"/><path d="M0 468H420M85 418L54 560M210 418V560M330 418L367 560" stroke="#655e50" opacity=".3"/><path d="M210 74V132M193 132H227L210 149Z" fill="#e0c18a"/><ellipse cx="210" cy="379" rx="107" ry="17" fill="#263b38" stroke="#b49d73" stroke-width="3"/><path d="M125 379H295L281 408H139Z" fill="#a99774" stroke="#756f5e" stroke-width="2"/>${orchid(210, 215, .94)}<rect x="140" y="184" width="140" height="196" rx="18" fill="url(#glass)" stroke="#c4d4c2" stroke-width="1.4"/><path d="M151 201L202 354M269 201L232 335" stroke="#f6f4de" stroke-opacity=".25" stroke-width="4"/><g transform="translate(38 319)"><circle cx="31" cy="28" r="26" fill="#273e3d" stroke="#c6b691" stroke-width="2"/><path d="M9 83C14 61 49 59 54 83" fill="#597875" stroke="#c6b691" stroke-width="2"/><path d="M17 28Q31 20 45 28M22 37Q31 42 40 37" fill="none" stroke="#dcc6a1" stroke-width="2"/><circle cx="24" cy="30" r="1.8" fill="#132a30"/><circle cx="38" cy="30" r="1.8" fill="#132a30"/></g><text x="210" y="42" text-anchor="middle" class="svg-kicker">CLOSING TIME · 23:47</text><text x="210" y="475" text-anchor="middle" class="svg-heading" style="font-size:29px">THE LAST LIGHT</text><text x="210" y="503" text-anchor="middle" class="svg-copy">A paper orchid is fading. Its pigment drinks light.</text><text x="210" y="528" text-anchor="middle" class="svg-small">IVO · NIGHT CONSERVATOR</text><rect x="1" y="1" width="418" height="558" rx="15" fill="none" stroke="#e2d8ba" stroke-opacity=".3" stroke-width="2"/></svg>`;
  }
  const mode = view.scene === 'calibrate' ? 'calibration' : view.scene === 'gentler' ? 'protocol' : view.scene === 'ending' ? 'ending' : 'trial';
  const outcome = view.trialObservation;
  const caseIsKnownOccupied = mode === 'protocol' || mode === 'ending';
  const caseTag = mode === 'calibration' ? 'KNOWN EMPTY' : caseIsKnownOccupied ? 'OCCUPIED REFERENCE' : 'SEALED REPLICA · FROSTED';
  const showFlower = caseIsKnownOccupied;
  const phase = mode === 'calibration' ? PHASES[view.phaseIndex] : 0;
  const p = mode === 'calibration'
    ? predict(ANGLES.quarter, phase, false).probabilities
    : predict([ANGLES.quarter, ANGLES.sixth, ANGLES.twelfth][view.thetaIndex], 0, true).probabilities;
  const active = (key: Outcome): boolean => outcome === key;
  const topLine = `<text x="22" y="30" class="svg-kicker">${heading.toUpperCase()}</text><text x="22" y="52" class="svg-small">${mode === 'calibration' ? `EMPTY REFERENCE · PHASE ${phaseLabel(view.phaseIndex)}` : mode === 'protocol' ? `OCCUPIED REFERENCE · θ ${['π/4','π/6','π/12'][view.thetaIndex]}` : 'TWO-LIVE-ARM INTERFEROMETER · q₀ + 2q₁'}</text>`;
  const mobileRoute = showFlower || view.trialObservation === 'absorbed'
    ? `<path d="M108 187L157 260L162 260" class="path" marker-end="url(#lostArrow)"/>`
    : `<path d="M108 187L157 260L247 260L306 187L363 231" class="${view.trialAnimating ? 'path pulse-path' : 'path'}" marker-end="url(#arrow)"/>`;
  const apparatusMarkup = `<path d="M42 187L108 187L157 120L247 120L306 187L363 145" class="${view.trialAnimating ? 'path pulse-path' : 'path'}" marker-end="url(#arrow)"/>${mobileRoute}<circle cx="42" cy="187" r="16" fill="#f0cd86" fill-opacity=".16" stroke="#f0cd86" stroke-width="2"/><circle cx="42" cy="187" r="5" fill="#f0cd86"/><g transform="translate(108 187)"><circle r="17" fill="#233c3d" stroke="#efd194" stroke-width="2"/><path d="M-9 -9L9 9M9 -9L-9 9" stroke="#efd194" stroke-width="2"/></g><g transform="translate(306 187)"><circle r="18" fill="#233c3d" stroke="#efd194" stroke-width="2"/><path d="M-10 -9L10 9M10 -9L-10 9" stroke="#efd194" stroke-width="2"/></g><text x="108" y="219" text-anchor="middle" class="svg-label">R(θ)</text><text x="306" y="219" text-anchor="middle" class="svg-label">R(−θ)</text><text x="203" y="106" text-anchor="middle" class="svg-label svg-muted">REFERENCE ARM · q₀</text><text x="203" y="284" text-anchor="middle" class="svg-label svg-muted">PROBE ARM · q₁</text><text x="42" y="221" text-anchor="middle" class="svg-small">SOURCE</text><g transform="translate(363 145)" class="detector ${active('bright') ? 'detector-active' : ''}"><circle r="12" fill="${active('bright') ? '#f0cd86' : '#152a31'}" stroke="#f0cd86" stroke-width="2"/><path d="M0 -18V-23M-14 -14L-18 -18M14 -14L18 -18" stroke="#f0cd86" stroke-width="1.5"/><text x="-30" y="-27" class="svg-label">BRIGHT · B</text></g><g transform="translate(363 231)" class="detector ${active('dark') ? 'detector-active' : ''}"><path d="M0 -12L12 0L0 12L-12 0Z" fill="${active('dark') ? '#d6e9df' : '#152a31'}" stroke="#d6e9df" stroke-width="2"/><text x="-30" y="-18" class="svg-label">DARK · D</text></g><rect x="162" y="230" width="82" height="63" rx="7" fill="#263f3d" stroke="#b5b49a" stroke-width="2"/><rect x="168" y="236" width="70" height="51" rx="4" fill="url(#glass)" stroke="#d6dcc6" stroke-opacity=".5"/>${showFlower ? orchid(203, 229, .38) : '<rect x="168" y="236" width="70" height="51" rx="4" fill="url(#frost)" opacity=".9"/>'}<path d="M171 293H235L248 305H158Z" fill="#b5a884" stroke="#706d60"/><text x="203" y="323" text-anchor="middle" class="svg-small">${caseTag}</text><path d="M203 307V335" stroke="#d99aa4" stroke-width="2" stroke-dasharray="4 5" marker-end="url(#lostArrow)"/><g transform="translate(203 357)"><path d="M0 -11C-16 -6 -12 8 0 11C12 8 16 -6 0 -11Z" fill="${active('absorbed') ? '#d99aa4' : '#253a3a'}" stroke="#e5adb1" stroke-width="1.8"/><path d="M0 -7V6M0 0L-5 4M0 -1L5 -4" stroke="#f5d0c5" stroke-width="1"/></g><text x="226" y="361" class="svg-label">ABSORBED · A</text>${view.trialAnimating ? '<circle class="whole-pulse" cx="205" cy="190" r="145" fill="none" stroke="#f0cd86" stroke-width="2" opacity=".6"/>' : ''}`;
  const bottom = `<rect x="16" y="414" width="388" height="112" rx="9" fill="#13282c" stroke="#829083" stroke-opacity=".75"/><text x="30" y="438" class="svg-kicker">${mode === 'calibration' ? 'EXACT EMPTY REFERENCE PREDICTION' : 'EXACT OCCUPIED REFERENCE PREDICTION'}</text><text x="30" y="465" class="svg-small">BRIGHT</text><text x="128" y="465" class="svg-label">${pct(p.bright)}</text><text x="230" y="465" class="svg-small">DARK</text><text x="292" y="465" class="svg-label">${pct(p.dark)}</text><path d="M30 478H390" stroke="#596e68"/><text x="30" y="501" class="svg-small">ABSORBED · ENERGY LEDGER</text><text x="230" y="501" class="svg-label">${pct(p.absorbed)}</text><text x="30" y="518" class="svg-small">Exact preview · not a sampled click count</text>`;
  return `<svg class="stage-art stage-mobile" viewBox="0 0 420 560" role="img" aria-labelledby="mobile-stage-title mobile-stage-desc" xmlns="http://www.w3.org/2000/svg"><title id="mobile-stage-title">Ghostlight Museum · ${heading}</title><desc id="mobile-stage-desc">Readable mobile diagram of the reference and probe arms, the ${caseTag.toLowerCase()} case, two detectors and an isolated absorption ledger. Trial occupancy is not shown.</desc><defs><linearGradient id="wall" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#27413f"/><stop offset="1" stop-color="#142a31"/></linearGradient><linearGradient id="glass" x1="0" x2="1"><stop stop-color="#d5ede5" stop-opacity=".12"/><stop offset=".45" stop-color="#edfff2" stop-opacity=".25"/><stop offset="1" stop-color="#9dc5c2" stop-opacity=".1"/></linearGradient><pattern id="frost" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 2L14 11" stroke="#f0f5e5" stroke-width="1" opacity=".18"/></pattern><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#93c5b9"/></marker><marker id="lostArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#d99aa4"/></marker><filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="420" height="560" fill="url(#wall)"/><path d="M18 0V392Q18 50 210 50T402 392V0" fill="none" stroke="#b8ae94" stroke-width="11" opacity=".12"/><path d="M0 400H420V560H0Z" fill="#867f6c" opacity=".55"/><path d="M0 447H420M0 495H420" stroke="#c9bda1" opacity=".13"/>${topLine}${apparatusMarkup}${bottom}<rect x="1" y="1" width="418" height="558" rx="15" fill="none" stroke="#e2d8ba" stroke-opacity=".3" stroke-width="2"/></svg>`;
}

function calibrationEvidence(view: PlayerView): string {
  const exact = predict(ANGLES.quarter, PHASES[view.phaseIndex], false).probabilities;
  const occupied = predict(ANGLES.quarter, 0, true).probabilities;
  const valid = exact.dark <= 1e-9;
  const badge = `<div class="calibration-badge ${valid ? 'is-valid' : 'is-invalid'}"><span class="badge-dot"></span><span><strong>${valid ? 'Reference calibrated' : 'Alignment not certified'}</strong><small>${valid ? 'Empty-case D ≤ 1 × 10⁻⁹' : `Empty-case D = ${pct(exact.dark)} · inference locked`}</small></span></div>`;
  if (view.scene === 'calibrate') {
    const sample = view.calibrationRun?.counts
      ? `<div class="sample-card"><div class="sample-heading"><span>64-shot sample</span><span>fresh empty preparations</span></div><div class="mini-counts"><span>B ${view.calibrationRun.counts.bright}</span><span>D ${view.calibrationRun.counts.dark}</span><span>A ${view.calibrationRun.counts.absorbed}</span></div><p>Sampled clicks are not the calibration proof. The exact empty model decides whether D is possible.</p></div>`
      : `<div class="note-card"><strong>Exact model check</strong><p>At θ=π/4: P(D)=sin²(2θ) sin²(δ/2). The 64-shot sampler is optional; a zero sample count alone is not a certificate.</p></div>`;
    return `${badge}<div class="evidence-subhead"><span>Known reference · empty</span><span class="numeric">θ = π/4</span></div>${probabilityRow('Empty-case prediction', exact, `δ ${phaseLabel(view.phaseIndex)}`)}${sample}${probabilityRow('Occupied reference at δ = 0', occupied, 'comparison row')}<div class="basis-note"><strong>Model basis</strong><span>|00⟩ reference · |01⟩ probe · |10⟩ absorbed · |11⟩ unused</span></div>`;
  }
  if (view.scene === 'classify') {
    if (view.evidenceTab === 'trial') {
      const current = view.trialObservation;
      const observed = current
        ? `<div class="observed-card outcome-${current}"><span class="outcome-emblem">${current === 'bright' ? '●' : current === 'dark' ? '◇' : '❧'}</span><div><small>OBSERVED · REPLICA ${String(view.observation?.preparationId || 0).padStart(2, '0')}</small><strong>${outcomeName(current)}</strong><p>${current === 'bright' ? 'An inconclusive click. Keep both hypotheses open.' : current === 'dark' ? 'Impossible for a calibrated empty reference in this ideal model.' : 'Presence confirmed, with absorbed energy recorded.'}</p></div></div>`
        : `<div class="note-card"><strong>${view.trialPrepared ? 'Replica prepared · contents still hidden' : 'No trial observation yet'}</strong><p>${view.trialPrepared ? 'A 50:50 prior is not a revealed state. Send one probe to record B, D, or A.' : 'Prepare one fresh replica. The frosted glass looks and sounds the same under either hypothesis.'}</p></div>`;
      const ensemble = view.ensemble ? `<div class="sample-card ensemble-card"><div class="sample-heading"><span>Ensemble sample</span><span>${view.ensemble.shots} fresh preparations</span></div><div class="mini-counts"><span>B ${view.ensemble.counts.bright}</span><span>D ${view.ensemble.counts.dark}</span><span>A ${view.ensemble.counts.absorbed}</span></div><p>Equal 50:50 prior · finite sample. These counts do not reveal a per-trial hidden label.</p></div>` : '';
      return `${badge}${observed}${ensemble}<div class="note-card slim"><strong>Evidence boundary</strong><p>Only the detector record appears here. No amplitude drawing or case tint reveals occupancy.</p></div>`;
    }
    return `${badge}<div class="evidence-subhead"><span>Reference predictions</span><span class="numeric">θ = π/4 · δ = 0</span></div>${probabilityRow('Empty case', predict(ANGLES.quarter, 0, false).probabilities)}${probabilityRow('Occupied case', occupied)}<div class="inference-key"><div><span class="key-shape dark-shape">◇</span><span><strong>Dark</strong><small>zero empty likelihood</small></span></div><div><span class="key-shape bright-shape">●</span><span><strong>Bright</strong><small>both hypotheses allow it</small></span></div><div><span class="key-shape absorbed-shape">❧</span><span><strong>Absorbed</strong><small>presence plus cost</small></span></div></div><div class="note-card slim"><strong>Posterior at equal priors</strong><p>After Bright, occupied = 20% in this ideal model. Bright never proves absence.</p></div>`;
  }
  if (view.scene === 'gentler') {
    const theta = [ANGLES.quarter, ANGLES.sixth, ANGLES.twelfth][view.thetaIndex];
    const p = predict(theta, 0, true).probabilities;
    return `${badge}<div class="policy-copy"><span class="eyebrow">FICTIONAL MUSEUM POLICY</span><strong>Find a setting that meets both budgets.</strong><p>Dark signal ≥ 18% per prepared probe. Absorption ≤ 30% per prepared probe.</p></div><div class="budget-meter"><div class="budget-label"><span>Conclusive Dark signal</span><strong>${pct(p.dark)} <small>/ 18% min</small></strong></div><div class="budget-track"><i class="dark-fill" style="width:${Math.min(100,p.dark / 0.3 * 100)}%"></i><b style="left:60%"></b></div><small>${p.dark >= .18 ? 'meets minimum' : 'below policy floor'}</small></div><div class="budget-meter"><div class="budget-label"><span>Absorption risk</span><strong>${pct(p.absorbed)} <small>/ 30% max</small></strong></div><div class="budget-track"><i class="absorb-fill" style="width:${Math.min(100,p.absorbed / .5 * 100)}%"></i><b style="left:60%"></b></div><small>${p.absorbed <= .30 ? 'within ceiling' : 'exceeds policy ceiling'}</small></div>${probabilityRow('All exact outcomes', p, thetaLabel(view.thetaIndex))}<div class="note-card slim"><strong>Per prepared probe</strong><p>Absorbed branches stay in the denominator; surviving shots are not scored alone.</p></div>`;
  }
  if (view.scene === 'ending') {
    const signed = view.signedProtocol;
    const p = signed?.probabilities || predict(ANGLES.sixth, 0, true).probabilities;
    return `<div class="signed-seal"><span>✦</span><div><small>CONSERVATION PROTOCOL</small><strong>Signed · ready for the gallery</strong></div></div><div class="report-lines"><div><span>Empty reference Dark probability</span><strong>0.000%</strong></div><div><span>Selected coupling</span><strong>θ = π/6</strong></div><div><span>Dark · conclusive, no absorption in branch</span><strong>${pct(p.dark)}</strong></div><div><span>Bright · inconclusive</span><strong>${pct(p.bright)}</strong></div><div><span>Absorbed · conservation cost</span><strong>${pct(p.absorbed)}</strong></div></div><div class="ending-note"><strong>What the click proves</strong><p>A dark click can be conclusive; a bright click cannot prove the case was empty.</p></div><a class="paper-link" href="https://arxiv.org/abs/hep-th/9305002" target="_blank" rel="noreferrer">Read the original interaction-free measurement paper <span aria-hidden="true">↗</span></a>`;
  }
  return `<div class="note-card"><p>Start by making the known-empty reference trustworthy.</p></div>`;
}

function evidenceRail(view: PlayerView): string {
  const sceneLabel: Record<PlayerView['scene'], string> = {
    foyer: 'NIGHT INVENTORY · CASE 07',
    calibrate: 'REFERENCE DESK · EMPTY CASE',
    classify: 'EVIDENCE DESK · FRESH REPLICA',
    gentler: 'CONSERVATION POLICY · REFERENCE',
    ending: 'FINAL REPORT · CONSERVATOR COPY',
  };
  const tabs = view.scene === 'classify' ? `<div class="rail-tabs" role="tablist" aria-label="Evidence view"><button role="tab" aria-selected="${view.evidenceTab === 'predictions'}" class="${view.evidenceTab === 'predictions' ? 'active' : ''}" data-action="tab-predictions">Reference predictions</button><button role="tab" aria-selected="${view.evidenceTab === 'trial'}" class="${view.evidenceTab === 'trial' ? 'active' : ''}" data-action="tab-trial">This trial</button></div>` : '';
  return `<aside class="evidence-rail"><div class="rail-topline"><span class="rail-index">03</span><div><span class="eyebrow">FIELD NOTE</span><h2>${sceneLabel[view.scene]}</h2></div></div>${tabs}<div class="rail-content">${calibrationEvidence(view)}</div><div class="rail-foot"><span class="status-lamp ${view.calibrated ? 'on' : ''}"></span><span>${view.calibrated ? 'CALIBRATION LOCKED' : 'CALIBRATION REQUIRED'}</span><span class="rail-lock">${view.calibrated ? '◇' : '⌑'}</span></div></aside>`;
}

function answerButtons(action: 'classify-live' | 'classify-report'): string {
  return `<div class="answer-grid" role="group" aria-label="Classify this evidence">
    <button class="answer-button" data-action="${action}" data-conclusion="gentle-presence"><span class="answer-mark dark-mark">◇</span><span>Presence confirmed<br><small>without absorption</small></span></button>
    <button class="answer-button" data-action="${action}" data-conclusion="inconclusive"><span class="answer-mark bright-mark">●</span><span>Inconclusive<br><small>keep both hypotheses</small></span></button>
    <button class="answer-button" data-action="${action}" data-conclusion="costly-presence"><span class="answer-mark absorbed-mark">❧</span><span>Presence confirmed<br><small>by absorption</small></span></button>
  </div>`;
}

function controls(view: PlayerView): string {
  if (view.scene === 'foyer') return `<section class="control-deck foyer-controls"><div class="control-copy"><span class="eyebrow">A QUIET MYSTERY IN THREE ROOMS</span><strong>What does one click actually prove?</strong></div><button class="button button-primary button-wide" data-action="start">Enter the gallery <span>→</span></button></section>`;
  if (view.scene === 'calibrate') {
    return `<section class="control-deck"><div class="control-heading"><div><span class="eyebrow">01 · EARN THE DARK DETECTOR</span><strong>Align the empty reference</strong></div><button class="text-button" data-action="hint">Need a hint <span>· ${view.hints.calibrate}/3</span></button></div><div class="control-row"><fieldset class="phase-control"><legend>Phase alignment · δ</legend><div class="segmented" role="radiogroup" aria-label="Phase alignment dial">${PHASES.map((_, index) => `<button role="radio" aria-checked="${view.phaseIndex === index}" tabindex="${view.phaseIndex === index ? '0' : '-1'}" class="phase-stop ${view.phaseIndex === index ? 'selected' : ''}" data-action="phase" data-index="${index}"><span>${phaseLabel(index)}</span>${index === 1 ? '<small>start</small>' : ''}</button>`).join('')}</div></fieldset><div class="button-stack"><button class="button button-secondary" data-action="run-calibration">Send 64 fresh calibration probes</button><button class="button button-primary" data-action="confirm-calibration">Sign empty reference <span>→</span></button></div><button class="icon-button" aria-label="Reset this scene" title="Reset controls" data-action="reset">↺</button></div></section>`;
  }
  if (view.scene === 'classify') {
    const samplePhase = view.trialObservation && !view.liveClassified
      ? `<div class="classification-box"><div class="classify-prompt"><span class="eyebrow">LIVE TRIAL · REPLICA ${String(view.observation?.preparationId || 0).padStart(2, '0')}</span><strong>What does this record justify?</strong></div>${answerButtons('classify-live')}</div>`
      : view.trialObservation && view.liveClassified
        ? `<div class="classified-record"><span class="record-check">✓</span><span><small>LIVE RECORD · CLASSIFIED</small><strong>${outcomeName(view.trialObservation)} · ${view.trialObservation === 'bright' ? 'inconclusive' : view.trialObservation === 'dark' ? 'presence without absorption in branch' : 'presence with absorption cost'}</strong></span></div>`
      : view.trialAnimating
        ? `<div class="animation-strip"><span class="running-mark"></span><div><strong>Model evaluated · display pulse playing</strong><small>Skipping changes only the animation, never the sampled result.</small></div><button class="button button-secondary" data-action="skip-animation">Skip animation</button></div>`
        : `<div class="control-row classify-actions"><div class="button-stack"><button class="button button-secondary" data-action="prepare">${view.trialPrepared ? 'Prepare a fresh replica' : 'Prepare one replica'} <span>＋</span></button><button class="button button-primary" data-action="send-probe" ${!view.trialPrepared ? 'disabled' : ''}>Send one probe <span>→</span></button></div><button class="button button-quiet" data-action="ensemble">128 fresh preparations <small>optional ensemble</small></button><button class="text-button" data-action="hint">Hint · ${view.hints.classify}/3</button></div>`;
    const report = view.liveClassified && view.reportOutcome ? `<div class="report-quiz"><div class="report-top"><span class="eyebrow">REFERENCE REPORT ${view.reportIndex + 1} OF 3</span><span class="report-icon ${view.reportOutcome}">${view.reportOutcome === 'dark' ? '◇' : view.reportOutcome === 'bright' ? '●' : '❧'}</span></div><strong>Classify the illustrative ${outcomeName(view.reportOutcome)} report.</strong><small>Reference reports are model examples, not additional live trials.</small>${answerButtons('classify-report')}</div>` : '';
    const continueButton = view.liveClassified && view.reportIndex >= 3 ? `<div class="advance-row"><button class="button button-primary" data-action="continue">Choose a gentler protocol <span>→</span></button><button class="button button-quiet" data-action="prepare">Inspect another replica</button></div>` : '';
    return `<section class="control-deck classify-deck"><div class="control-heading"><div><span class="eyebrow">02 · WHAT THE CLICK PROVES</span><strong>${view.liveClassified ? 'Now compare the three reference reports' : 'One observation, carefully interpreted'}</strong></div>${view.observation && !view.trialAnimating && !view.liveClassified ? '<button class="text-button" data-action="reset">Clear attempt</button>' : ''}</div>${samplePhase}${report}${continueButton}</section>`;
  }
  if (view.scene === 'gentler') {
    return `<section class="control-deck"><div class="control-heading"><div><span class="eyebrow">03 · A GENTLER INSPECTION</span><strong>Balance evidence against risk</strong></div><button class="text-button" data-action="hint">Need a hint <span>· ${view.hints.gentler}/3</span></button></div><div class="control-row"><fieldset class="theta-control"><legend>Coupling angle · θ</legend><div class="theta-options">${[0,1,2].map((index) => `<button class="theta-option ${view.thetaIndex === index ? 'selected' : ''}" data-action="theta" data-index="${index}" aria-pressed="${view.thetaIndex === index}"><strong>${['π/4','π/6','π/12'][index]}</strong><small>${['balanced','gentle','very gentle'][index]}</small></button>`).join('')}</div></fieldset><div class="button-stack"><button class="button button-primary" data-action="confirm-protocol">Confirm protocol <span>→</span></button><button class="button button-secondary" data-action="compare">${view.compareOpen ? 'Hide' : 'Compare'} all settings</button></div><button class="icon-button" aria-label="Reset this scene" title="Reset controls" data-action="reset">↺</button></div>${view.compareOpen ? compareTable() : ''}</section>`;
  }
  return `<section class="control-deck ending-deck"><div class="control-copy"><span class="eyebrow">SIGNED · CONSERVATOR IVO</span><strong>A gentler inventory, with its risk stated plainly.</strong></div><div class="ending-actions"><button class="button button-secondary" data-action="inspect-another">Inspect another replica</button><button class="button button-primary" data-action="replay">Replay story <span>↺</span></button></div></section>`;
}

function compareTable(): string {
  const rows = [
    { label: 'π/4 · balanced', theta: ANGLES.quarter },
    { label: 'π/6 · gentle', theta: ANGLES.sixth },
    { label: 'π/12 · very gentle', theta: ANGLES.twelfth },
  ];
  return `<div class="comparison-table" role="table" aria-label="Exact occupied-reference setting comparison"><div class="comparison-row comparison-header" role="row"><span>SETTING</span><span>DARK SIGNAL</span><span>BRIGHT</span><span>ABSORBED</span></div>${rows.map((row) => { const p = predict(row.theta, 0, true).probabilities; return `<div class="comparison-row" role="row"><span>${row.label}</span><span>${pct(p.dark)}</span><span>${pct(p.bright)}</span><span>${pct(p.absorbed)}</span></div>`; }).join('')}</div>`;
}

function narrator(view: PlayerView): { quote: string; speaker: string } {
  const lines: Record<PlayerView['scene'], { quote: string; speaker: string }> = {
    foyer: { quote: 'The pigment drinks light. We need to know which case holds it before we move anything.', speaker: 'Ivo · night conservator' },
    calibrate: { quote: 'A dark click means something only if an empty case cannot make one.', speaker: 'Ivo · at the empty reference' },
    classify: { quote: 'Certainty and gentleness are separate questions.', speaker: 'Ivo · at the evidence desk' },
    gentler: { quote: 'The museum needs a signal we can use, and a cost we can name.', speaker: 'Ivo · conservation policy' },
    ending: { quote: 'We have a method, and we know its price.', speaker: 'Ivo · signed report' },
  };
  if (view.feedback.kind !== 'neutral') return lines[view.scene];
  return lines[view.scene];
}

function settingsDialog(view: PlayerView): string {
  if (!view.settingsOpen) return '';
  return `<div class="modal-backdrop" data-action="close-settings"><section class="settings-dialog" role="dialog" aria-modal="true" aria-labelledby="settings-title" tabindex="-1"><div class="dialog-head"><div><span class="eyebrow">ACCESSIBILITY & SOUND</span><h2 id="settings-title">Gallery settings</h2></div><button class="icon-button" data-action="close-settings" aria-label="Close settings">×</button></div><label class="range-setting"><span><strong>Music</strong><small>Procedural ambient score · starts after a gesture</small></span><input type="range" min="0" max="1" step="0.05" value="${view.musicVolume}" data-setting="music" aria-label="Music volume"></label><label class="range-setting"><span><strong>Effects</strong><small>Soft detector tones; all clues remain in text</small></span><input type="range" min="0" max="1" step="0.05" value="${view.effectsVolume}" data-setting="effects" aria-label="Sound effects volume"></label><label class="check-setting"><span><strong>Reduced motion</strong><small>Use short fades instead of moving pulses</small></span><input type="checkbox" data-setting="reduced-motion" ${view.reducedMotion ? 'checked' : ''}></label><div class="dialog-note"><strong>About this model</strong><p>A four-state unitary dilation keeps absorbed energy outside the live paths. The vector is a model view, not an extra measurement. Probabilities are exact previews; clicks and 128-shot counts are finite samples.</p></div><button class="button button-primary dialog-done" data-action="close-settings">Done</button></section></div>`;
}

const stepNames = ['CALIBRATE', 'INTERPRET', 'CONSERVE'];

export function renderApp(view: PlayerView): string {
  const step = view.scene === 'calibrate' ? 0 : view.scene === 'classify' ? 1 : view.scene === 'gentler' || view.scene === 'ending' ? 2 : -1;
  const progress = view.scene === 'foyer' ? 'A NIGHT AT THE MUSEUM' : view.scene === 'ending' ? 'PROTOCOL SIGNED' : `ROOM 0${step + 1} / 03`;
  const dialogue = narrator(view);
  const sceneHeading: Record<PlayerView['scene'], string> = {
    foyer: 'After-hours inventory',
    calibrate: 'Make the empty case trustworthy',
    classify: 'What does this click prove?',
    gentler: 'Find the gentler protocol',
    ending: 'The gallery can reopen',
  };
  const bodyClass = `${view.reducedMotion ? 'reduced-motion ' : ''}scene-${view.scene}`;
  return `<div class="museum-app ${bodyClass}">
    <header class="topbar"><a class="wordmark" href="#" data-action="home" aria-label="Ghostlight Museum home"><span class="wordmark-glyph">G</span><span>GHOSTLIGHT<small>MUSEUM · NIGHT INVENTORY</small></span></a><div class="top-progress"><span class="progress-label">${progress}</span><div class="step-track" aria-label="Story progress">${stepNames.map((name, index) => `<span class="step ${index < step ? 'complete' : ''} ${index === step ? 'current' : ''}"><i>${index < step ? '✓' : `0${index + 1}`}</i><small>${name}</small></span>`).join('')}</div></div><div class="top-actions"><button class="top-button ${view.soundEnabled ? 'sound-on' : ''}" data-action="sound" aria-label="${view.soundEnabled ? 'Mute sound' : 'Enable sound'}"><span>${view.soundEnabled ? '♫' : '♪'}</span><small>${view.soundEnabled ? 'SOUND ON' : 'SOUND OFF'}</small></button><button class="top-button" data-action="settings" aria-label="Open gallery settings"><span>☷</span><small>SETTINGS</small></button></div></header>
    <main class="game-main"><div class="room-heading"><div><span class="eyebrow">${progress}</span><h1>${sceneHeading[view.scene]}</h1></div>${view.scene !== 'foyer' ? `<span class="room-counter">MUSEUM WING <i>·</i> 03</span>` : ''}</div>
      <div class="scene-layout"><div class="stage-column"><figure class="stage-frame">${renderStage(view)}<figcaption class="sr-only">An original vector scene of the museum and its scientific apparatus. The evidence rail distinguishes exact model predictions from sampled observations.</figcaption></figure>${view.scene === 'classify' && view.trialAnimating ? '<div class="animation-caption"><span></span>One model-evaluated probe · outcome in motion</div>' : ''}</div>${evidenceRail(view)}</div>
      ${controls(view)}
      <section class="dialogue-bar" aria-live="polite"><div class="ivo-token" aria-hidden="true"><span>I</span><i></i></div><div class="dialogue-copy"><span class="eyebrow">${dialogue.speaker}</span><p>“${dialogue.quote}”</p></div><div class="feedback ${view.feedback.kind}" role="status"><span class="feedback-mark">${view.feedback.kind === 'wrong' ? '↺' : view.feedback.kind === 'success' ? '✦' : '·'}</span><span>${view.feedback.message}</span></div></section>
      <footer class="game-footer"><span>IDEAL FOUR-STATE MODEL <i>·</i> FRESH REPLICAS</span><span>Bright cannot prove absence <b>·</b> Dark can prove presence after calibration</span><button data-action="settings">MODEL & ACCESSIBILITY</button></footer>
    </main>${settingsDialog(view)}</div>`;
}
