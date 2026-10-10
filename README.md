# Seven Quantum Game Prototypes

A collection of seven narrative game designs about quantum mechanics, with one playable browser prototype so far: **Ghostlight Museum**. Each concept has a full build guide and an annotated 1280×800 layout. The other six are design specifications, not implemented games.

## Games

| Game | Experience | Status |
| --- | --- | --- |
| [Last Light](guides/01-Last-Light.md) | Repair a lighthouse by reversing a coherent route | Guide and layout |
| [Palimpsest](guides/02-Palimpsest.md) | Reorder illustrated panels to reveal a phase-sensitive ending | Guide and layout |
| [Ghostlight Museum](guides/03-Ghostlight-Museum.md) | Calibrate an optical exhibit and judge what a detector click proves | **Playable prototype** |
| [The Memory Thief](guides/04-The-Memory-Thief.md) | Decide when evidence justifies a conclusive claim | Guide and layout |
| [Coherence Kitchen](guides/05-Coherence-Kitchen.md) | Build recipes whose phase matters in a different measurement basis | Guide and layout |
| [Quantum Forgery](guides/06-Quantum-Forgery.md) | Audit a claimed quantum copier with complementary tests | Guide and layout |
| [The Last Bridge](guides/07-The-Last-Bridge.md) | Tune coherent transport through a valley relay | Guide and layout |

## Play Ghostlight Museum

From the repository root:

```sh
cd ghostlight-museum
bun install --frozen-lockfile
bun run dev
```

Open `http://localhost:5175`. The game walks through empty-case calibration, a hidden replica trial, evidence classification, and a conservation protocol. It can reach the ending after any live outcome when the player interprets the evidence correctly. [`ghostlight-museum/DEMO.md`](ghostlight-museum/DEMO.md) gives a ninety-second route.

For checks and a production build:

```sh
bun run typecheck
bun run test
bun run build
bun run preview
```

The tested environment used Bun 1.3.5 and pinned Vite 8.3.0. Vite's [current setup guide](https://vite.dev/guide/) documents its Node.js version requirements. The full implementation and verification limits are in [`ghostlight-museum/README.md`](ghostlight-museum/README.md) and [`ghostlight-museum/TEST_REPORT.md`](ghostlight-museum/TEST_REPORT.md).

## Repository map

- `guides/`: seven independent game specifications, including scene flow, model, feedback, art, audio, and acceptance details.
- `layouts/`: annotated scene composition maps; these are design references, not screenshots.
- `ghostlight-museum/`: playable TypeScript/Vite game, tests, Qiskit reference, and separate Qollab JS/Qiskit export.
- `reference/`: independent numerical fixtures, NumPy verification script, and scene contracts.
- `shared/`: implementation supervision, asset/audio, Qollab, and evaluation guidance.
- `schemas/`: JSON schemas for asset manifests and progress events.
- `SOURCES.md` and `VALIDATION.md`: technical references and provenance for the design pack.

## Model and evidence convention

All guides use basis index `q0 + 2*q1 + …`; two-qubit kets display as `|q1 q0⟩`. Exact predictions, finite samples, and remote backend results must remain distinct and labelled. The reference script checks the mathematical examples; it is not a game engine or browser test.

Ghostlight's deterministic suite currently passes 16 tests with 108 assertions. Browser interaction and screenshots, Qiskit execution, and Qollab/backend execution have not been verified in the recorded environment. See the [test report](ghostlight-museum/TEST_REPORT.md) for details.

The seven concepts are original design proposals, not official judging criteria or predictions of a contest result.
