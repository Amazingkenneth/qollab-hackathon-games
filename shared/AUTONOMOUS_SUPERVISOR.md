# Autonomous supervisor operating guide

Use this file with any of the seven standalone build guides. The standalone guide remains sufficient to build; this file expands the engineering workflow. The user has requested autonomous prototype production after optional initial clarifiers. Do not turn the workflow into a chain of human approvals.

## Execution contract

The agent owns a complete playable vertical slice. At startup, inspect the explicitly supplied repository and its applicable instructions, tools, installed dependencies, and available asset directory. Ask at most one batch of three material questions, then choose documented defaults if no answers arrive. Do not wait for artists, a login, an image generator, an audio generator, or a quantum computer to finish the local game.

Work within actual permissions. Never interpret autonomy as permission to bypass access controls, expose secrets, purchase assets, message people, or publish externally. Build and package locally when an external action is unavailable. Preserve unrelated files and user changes. If working in an existing repository, use a task branch/worktree when appropriate and allowed. Avoid concurrent writes to the same files.

## Roles and ownership

| Role | Owns | Required output | Does not own |
|---|---|---|---|
| Supervisor/integrator | interfaces, scene reducer, launch/build configuration, release checklist | running integrated game, STATUS.md, final handoff | silently changing scientific targets |
| Quantum engineer | model, circuit compiler, oracle cases, outcome mapping | pure functions, fixture tests, model explanation | hardcoding story success from a click |
| Experience engineer | layouts, controls, art, audio, dialogue rendering | complete scenes, accessible controls, asset manifest | leaking hidden trial state |
| QA reviewer | independent checks, browser route, failure recovery, screenshots | TEST_REPORT.md, reproducible failures and evidence | claiming execution without tools |

If real delegation is available and permitted, give each worker its own file set and a written contract. Example: quantum owns src/model and quantum; experience owns src/render and assets; supervisor owns src/state and app entry; QA owns tests and evidence. A shared type/interface file has one owner. Workers propose interface changes to that owner rather than overwriting it. Integrate one milestone at a time. If delegation is unavailable, execute these roles in successive passes. A role is useful even without a separate process.

## Repository contract

Recommended paths: src/model, src/state, src/scenes, src/render, src/audio, src/adapters, quantum/reference.py, qollab/index.html, qollab/main.js, qollab/quantum/model.py, assets, tests, evidence, logs. Equivalent layouts are allowed if documented. Keep configuration and story content out of the numerical kernel.

Define these concepts before splitting work:

- Configuration: player-chosen gate order, phase, basis, coupling, or detector settings.
- ModelResult: exact probabilities, state/density data for the permitted preview, metrics, and validity.
- Observation: fresh-shot seed, sampled outcomes/counts, measurement basis, and preparation ID.
- SceneState: scene ID, unlocked controls, hints used, notebook entries, committed state, and ending flags.
- PlayerView: only information currently allowed to appear, including accessible text and sound cues.
- BackendEvidence: backend identity, circuit/configuration hash, job state, counts, and errors.

Do not store all six as one mutable object. Rendering must not advance physics. A frame timestamp must not change a discrete puzzle result. Sampling must not mutate an exact preview. Pending backend jobs must not overwrite newer configurations; compare the request's configuration hash before displaying results.

## Milestones and stop conditions

| Gate | Required evidence | Continue only when |
|---|---|---|
| M0: contract | assumptions, file ownership, scene list, available tools | scope has a complete ending and a known fallback |
| M1: physics | independent oracle cases, normalization and phase-sensitive checks | every required numerical case passes |
| M2: complete flow | start → all puzzles → ending → replay | no placeholder scene blocks progression |
| M3: presentation | readable composition, coherent fallback art, sound controls | core clue remains understandable with sound off |
| M4: repair pass | wrong attempts, reset, keyboard, narrow view, error paths | no open P0/P1 issue remains on primary path |
| M5: handoff | build, README, demo route, credits, report | claims match evidence and limitations are explicit |

P0: invalid core physics, impossible completion, destructive action, exposed secret/credential. Stop optional work and fix. P1: broken input, scene transition, absent necessary clue, unrecoverable audio error. Fix before handoff. P2: minor alignment, optional backend unavailable, cosmetic animation missing. Use fallback or document. Do not label a P0 as a known limitation and say the game is complete.

## Time allocation and scope reduction

Default initial build budget: six focused agent-hours per concept if the runner supports long jobs; adapt to the actual remaining deadline. Suggested shares: 20% model and contract, 30% full flow, 25% presentation, 20% QA/fixes, 5% handoff. These are planning estimates, not required sleeps or fabricated elapsed time. Maintain a complete playable checkpoint as early as possible.

If behind, cut optional particles, voice acting, remote backend execution, bonus galleries, procedural level generation, multiplayer, and alternate endings, in that order. Keep the three authored puzzles, readable visual evidence, exact model, undo/retry, and ending. Fewer excellent screens beat an incomplete world. Do not replace the mechanism with scripted animations to save time.

## Recovery policy

1. Capture the actual error, affected command/action, and current checkpoint.
2. Reduce to the smallest failing case. Classify model, integration, resource, layout, or permission.
3. Assign one owner and one concrete fix hypothesis. Preserve a known working state.
4. Retry the targeted check. Two failed attempts at the same approach trigger a changed approach.
5. Use an explicit fallback: local vectors for unavailable art; synthesized music for unavailable audio; browser math for unavailable Python service; exact local preview for failed backend; serial roles for unavailable subagents.
6. Rerun only the affected checks plus the complete primary route if the change touches state/flow.
7. Record resolution, fallback, or remaining hard blocker. Never erase the failure history to imply a clean run.

Use command timeouts and capture process IDs. If a dev server fails to start because its port is occupied, choose another available port and record it; do not kill unrelated servers. Default ports for simultaneous prototypes: 5173 through 5179 in list order. A heartbeat every milestone or roughly five minutes is enough for machine logs; concise user-facing updates should follow the runner's communication requirements. Do not use long sleeps to simulate progress.

## Log format

Each line of logs/progress.jsonl is one JSON event. Required keys: timestamp_utc, run_id, role, phase, event, status, summary, evidence_paths, next_action. Optional: error_id, duration_ms, command, exit_code, configuration_hash. Status is started, passed, failed, blocked, or fallback. Time must be real UTC when available; do not invent timestamps for unexecuted work.

Example schema lives in schemas/progress.schema.json. Evidence paths must exist if claimed. Summaries should say what changed and what proves it: “USD wrong-state conclusive probability below 1e-9 on both hypotheses” is useful; “quantum done” is not. Log dependency versions actually used. Store secrets nowhere in the pack.

STATUS.md contains current milestone, working launch command, last passing checkpoint, current owner, blockers/fallbacks, next action, and open issues. DECISIONS.md explains choices that matter: geometry, accessibility, model simplification, asset substitution, and scope cuts. TEST_REPORT.md distinguishes run/passed, run/failed, not run, and not applicable.

## Independent QA

The model author should not be the only source of expected results. Use the supplied NumPy oracle and analytic formulas as independent checks. The browser model may use different implementation machinery. Add transition and input tests for the actual risks: hidden-state leakage, reset after measurement, stale backend responses, phase-sensitive scoring, asynchronous audio cleanup, and probability conservation.

Do not build a large test suite for decorative CSS. Inspect meaningful screenshots instead. Do not test a function by duplicating its own logic in the assertion. Validate scientific endpoints, narrative progression, and a few adversarial interactions: double-click Run, change configuration while a job is pending, close the notebook mid-animation, turn off sound, reload without network, and replay after an ending.

At handoff, state whether each environment actually ran: browser, Qiskit, Qollab local backend, IonQ backend. A local mathematical test is not proof that a remote adapter works. A screenshot is not proof of quantum correctness. Both numerical and interaction evidence are needed for the strongest handoff.
