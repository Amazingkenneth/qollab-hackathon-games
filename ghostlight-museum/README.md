# Ghostlight Museum — playable prototype

The playable entry in this seven-game collection: an offline browser mystery about calibration, honest evidence, and gentle inspection. The paper orchid, Ivo, gallery, optical apparatus, interface, and procedural ambient score are original local code. The game needs no external images, fonts, music, accounts, APIs, or runtime network requests.

## Run locally

This folder contains the standalone prototype. Bun 1.3.5 was used for the recorded checks; Vite and TypeScript are pinned in `package.json` and `bun.lock`.

```sh
bun install --frozen-lockfile
bun run dev
```

Open `http://localhost:5175`. To create and serve a production build:

```sh
bun run typecheck
bun run test
bun run build
bun run preview
```

Vite's [setup guide](https://vite.dev/guide/) documents its current Node.js requirements. The pinned Vite 8.3.0 build and scripts ran under Bun 1.3.5. The browser game has no package runtime dependencies.

## Play

Start in the foyer, calibrate the explicitly empty case, prepare a fresh hidden replica, send and classify one probe, classify the three labelled reference reports, and select a coupling angle that meets both conservation budgets. **Reset** clears the active scene's editable attempt; **Replay story** resets the state without a reload. Hints are progressive. Sound is off until enabled, and the story remains understandable with sound off or reduced motion on.

Detector outcomes are sampled from exact model probabilities. The optional ensemble contains 128 fresh preparations at an equal prior. Exact predictions and sampled outcomes have separate labels. The hidden replica state and PRNG seed are not exposed to the renderer.

## Qollab export

`qollab/` contains the same three-scene story and a separate JS/Qiskit evidence panel. The upload source is `index.html`, `main.js`, `main.css`, `requirements.txt`, and the `quantum/` package. The HTML is a body fragment; scripts run from `main.js`; Python is imported by dotted name. The adapter sends the selected θ, δ, occupancy reference, and shot count through Qollab's documented `callPromising` bridge to the injected `backend`. It allows one backend submission per page run and labels returned finite counts separately from local exact predictions. The source byte count is in `qollab/SIZE_REPORT.md`.

The adapter follows the current [Qollab runtime](https://qollab.xyz/learn/docs/runtime-environment) and [JS/Qiskit project documentation](https://qollab.xyz/learn/docs/js-qiskit-projects). Local prediction and sampling need no Qiskit or remote service. The export has not been uploaded or executed on Qollab, and no remote result is claimed.

The local Qiskit reference compiler is `quantum/reference.py`. In an environment with Qiskit 2.5, it can be run as:

```sh
python3 quantum/reference.py --occupied --theta 0.5235987755982988 --draw
```

## Evidence and records

- `TEST_REPORT.md` records the checks that ran and those unavailable here.
- `DEMO.md` contains the judge route.
- `STATUS.md`, `DECISIONS.md`, `logs/`, and `ASSET_CREDITS.md` preserve implementation decisions and evidence.
- The annotated design reference is at `../layouts/03-Ghostlight-Museum-layout.svg`; the other six game guides are in `../guides/`.

## Scientific scope

The two-qubit encoded basis is index `q0 + 2*q1`: `|00⟩` live reference, `|01⟩` live probe, `|10⟩` absorbed/environment flag, `|11⟩` unused. The absorber swaps the probe amplitude into an explicit loss flag. Only live paths undergo the inverse rotation. A Dark click has zero likelihood for a calibrated, empty apparatus in this ideal model. Bright is inconclusive; absorption is conclusive presence evidence with a conservation cost. This is a teaching model, not a claim of zero risk or a noise model for a real apparatus.
