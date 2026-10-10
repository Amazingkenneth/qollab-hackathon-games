# Last Light — autonomous prototype build guide

A complete implementation brief for a six-to-eight-minute playable browser prototype. Prepared 10 October 2026.

## Instruction to the building agent

Build the complete playable prototype specified below. You are the implementation owner and supervisor. **Operate FULLY AUTONOMOUSLY after an optional clarification round at the start.** You may ask one batch of at most three questions before implementation if the answers would materially change the result. If the runner provides no answers, use the defaults below immediately. Do not require human design reviews, asset selection, debugging, playtesting, or milestone approvals. Make routine decisions, build, inspect, repair, and finish the experience yourself.

This instruction does not override your actual tool permissions, system instructions, or existing repository rules. Complete all permitted local work. If a paid service, unavailable account, permission, external asset, image generator, audio tool, package, or remote backend blocks one route, use a documented local fallback and continue. Do not fabricate downloads, backend results, test passes, licenses, or screenshots. Do not spend money, send messages, publish publicly, or overwrite unrelated work unless the user has already authorized that action. A genuine permission blocker belongs in the final handoff alongside the completed local prototype; it must not become an excuse to abandon the rest.

Optional opening questions: (1) existing repository/framework or a new folder? (2) existing team artwork/audio to integrate? (3) hard platform or runtime constraints? Default answers: a new isolated project folder, no supplied assets, a desktop-first browser game with responsive touch/keyboard support, an immediately runnable local version, and a Qollab export adapter. Build a six-to-eight-minute vertical slice, a replayable ending, and a ninety-second judge route. The detailed scenes below define the required experience; do not expand into an unfinished campaign.

### Technical and delivery defaults

Use TypeScript with Vite, semantic HTML controls, and SVG/Canvas for the stage. Use the existing project stack if one is supplied. Prefer a small dependency surface; no login, database, paid API, runtime language-model call, or remote asset fetch is required to play. Pin versions that you actually install or verify in the environment. If package installation is unavailable, produce a dependency-free browser implementation and document the changed launch command. Do not invent command flags for Codex, Claude Code, OpenCode, Qollab, or any agent runner.

Consult the current [Vite setup guide](https://vite.dev/guide/) for runtime compatibility. Use [Playwright](https://playwright.dev/docs/intro) for browser checks when it is available; otherwise use the runner's supported browser tools and report what actually ran.

Keep a pure quantum/model layer separate from narrative state, rendering, sampling, and sound. Build scene definitions as data. A reducer or equivalent state machine must own transitions and undo/reset behavior. Keep the exact prediction, sampled observations, and actual backend output in separate fields with visible labels. If a remote job fails, keep the exact local preview playable and display the backend error only in the optional evidence panel.

Use this canonical basis convention everywhere: integer basis index = q0 + 2*q1 + 4*q2 + …; displayed computational kets are |q1 q0> for two qubits. Label semantic roles beside qubits. Read operation lists chronologically from left to right; matrix multiplication applies the rightmost matrix first. Validate finite, normalized states and nonnegative probabilities. Density matrices are required wherever loss of coherence or discarded measurement records matter. An amplitude diagram is a teaching visualization of the model, not an extra physical measurement by the human viewer.

Implement a Qiskit reference/compiler file with the same parameters and gate order as the browser model. Keep the playable browser version independent of a Python server. Provide a separate Qollab adapter using the platform's current documented Python bridge and injected backend; consult the official runtime and JavaScript/Qiskit docs linked at the end. Do not assume a Vite build can be uploaded unchanged. The shared adapter guide in the full pack has further details, but this document contains enough physics and gameplay requirements to build independently.

### Work supervision and finish criteria

Use four roles: supervisor/integrator, quantum engineer, experience/art/audio engineer, and QA reviewer. If your runner permits real subagents, delegate independent work with explicit file ownership and frozen interfaces. Otherwise perform the same roles sequentially yourself. Do not pretend that unavailable subagents ran. The supervisor owns integration and the final playable result, not merely a task list.

Create STATUS.md, DECISIONS.md, logs/progress.jsonl, logs/errors.jsonl, TEST_REPORT.md, and ASSET_CREDITS.md. Each progress event records UTC time, run ID, role, phase, action, result, evidence path, and next action. Update STATUS.md after every milestone and before switching strategies. Record actual commands, exit codes, and meaningful test results. Keep engineering logs out of the story interface. Never write credentials to logs.

Work in this order: mathematical model and independent fixtures; complete unstyled start-to-ending flow; scene composition and readable controls; art and audio; browser QA and repairs; final package. Run bounded recovery: reproduce an error, identify its owner, try a targeted fix, verify, and record the result. After two failed attempts at the same approach, change approach or use the specified fallback. Do not silently remove a core mechanic or loosen an acceptance threshold to make a test pass.

Deliver the source, a runnable build, README with exact launch commands, original/generated or licensed local assets, asset provenance, a Qiskit reference, Qollab adapter, a short demo script, screenshots of every scene if browser capture is available, and an honest test report. A completed prototype must start, teach its controls, support a meaningful wrong attempt, allow recovery, reach its ending, and replay without reloading. Missing optional tools may be documented; broken core physics or an unreachable ending may not be called complete.

## The experience to build

**Pitch:** A harbor keeper has one night to bring a lost ferry home. Repair a lighthouse whose light can take two coherent routes. The crucial discovery is that learning which route the light took can destroy the interference needed to guide it.

This is an intimate optical puzzle story, with a visible harbor responding to the same model as the apparatus. Its signature moment is removing a reversible path record and seeing a washed-out pair of outputs become one bright destination again. Aim for quiet emotional clarity, not a generic neon circuit editor. Project folder: last-light; preferred local port: 5173.

The player is the keeper's apprentice. The keeper, Mara, speaks through short captions. A ferry approaches a split channel: Harbor is output 0, Reef beacon is output 1. These are two detector/output labels, not claims that every incorrect optical run physically wrecks a boat. Testing occurs on the workbench; the final confirmed rig powers the fictional signal. There is no countdown, death, or random loss of progress.

The complete arc is title → workshop tutorial → missing contrast → final beacon repair → homecoming → replay/inspect. Three repair scenes are mandatory. Limit optional dialogue to one extra line per interactable. The player should manipulate a meaningful control within fifteen seconds.

## Display and interaction contract

Use a 1280×800 reference canvas. The top 56 px holds title, scene 1/3 indicator, mute, motion setting, and notebook. The left 880 px from y=80 to 570 is the apparatus; the right x=904…1256 area shows a harbor vignette and two labelled probability bars. Inventory and controls occupy y=584…700. Dialogue occupies y=720…792. Never place text directly on moving fog.

Apparatus anchors: source (112,330); first splitter (284,330); upper arm through (442,224) and (670,224); lower arm through (442,432) and (670,432); recombiner (824,330). Lines continue to output labels near (875,250) and (875,430). The small output icons fit at the edge of the apparatus; detailed meters remain in the right panel. Use arrows to show travel direction. Draw the two arms as labelled basis routes 0 and 1, with relative phase indicated on route 1. The visual splitter/recombiner implements the H convention specified below; do not add unmodelled optical phase shifts merely because a real mirror would have them.

The phase lens is a four-stop dial in a socket centered (544,432), with 0, π/2, π, 3π/2 text and a rotating arrow. The path-record device sits at (420,535), linked to the route with a dotted control wire. Its two small memory glyphs distinguish record 0 and record 1. The uncompute device sits at (688,535). Record and uncompute are CX operations on the same marker, not measurements. Label them in the inspector. A dark cloth button hides the drawn record glyph as a teaching counterexample; it changes visibility only and is explicitly identified as cosmetic after use.

Use three visualization layers: an always-visible apparatus; optional model amplitudes as arrows; sampled detector clicks as separate brief sparks. The source pulse animation is an illustration of a trial, not an independently simulated classical light ray. When a record exists, group amplitudes by marker value so orthogonal records do not appear to cancel. The inspector can show the joint basis and reduced path state. Main UI uses words: “Same final record: routes can interfere” or “Different records: route totals add as probabilities.”

Primary controls: select a tile, choose a socket, turn the phase dial, Preview, Send 64 test pulses, Confirm repair, Undo, Reset scene. All have keyboard equivalents. Preview updates exact probabilities instantly. A 64-shot run displays an honest count histogram beside the exact bars and never controls story success. Confirm repair checks the exact configuration target. It must not wait for a lucky sample.

## Core quantum model

Let q0 be the route and q1 the coherent marker, initialized |00>. H acts on q0. P(phi)=diag(1,exp(i phi)) acts on q0. CX has control q0 and target q1. The record device begins with its marker in |0>.

Without a record, the operation sequence is H → P(phi) → H. Harbor probability is cos²(phi/2); Reef probability is sin²(phi/2). With a record retained, H → CX → P(phi) → H produces Harbor=Reef=1/2 after summing over the marker. With reversible erasure, H → CX → P(phi) → CX → H restores the original interference.

| Relative phase | No record: Harbor | Record retained: Harbor | Record uncomputed: Harbor |
|---|---:|---:|---:|
| 0 | 1 | 0.5 | 1 |
| π/2 | 0.5 | 0.5 | 0.5 |
| π | 0 | 0.5 | 0 |
| 3π/2 | 0.5 | 0.5 | 0.5 |

Compute Harbor by summing basis indices 0 and 2, since q0=0. The joint state stays normalized. The record changes the reduced path state; it does not merely add a UI flag. Do not multiply probabilities from the two arms or add absolute amplitudes before including their phases.

An optional inspector experiment can dephase the marker after recording: set matrix elements connecting different marker values to zero. Applying CX afterward does not restore Harbor=1; it remains 1/2. “Forget the label” and “reverse a still-coherent interaction” are different operations. Keep this experiment behind an Explain button so the core three scenes remain focused. It must use a density matrix and start a fresh preparation when reset.

## Scene 0 — The window in the fog

Show a dark harbor, one warm keeper's window, and a weak ferry lantern. The title fades in without blocking Start. Caption: “The ferry knows this coast by one light. Tonight, ours is pointing the wrong way.” Start lights the workbench and unlocks audio. A compact instruction says: “Repair the signal. Test freely. Nothing leaves the workshop until you confirm.”

The camera transition can be a crossfade between two layered illustrations. Do not build free movement or a 3D lighthouse. Persistent notebook initially contains an empty three-line repair checklist.

## Scene 1 — A light that adds to darkness

Initial configuration: no marker; H, phase lens fixed initially at π, H. Both arms visibly have nonzero amplitude before recombination, but Harbor is dark and Reef bright. Mara: “Both routes carry light. Why is the harbor dark?” Objective: raise exact Harbor probability to at least 0.95.

The player turns the phase dial. At π/2 the meters become equal; at 0 Harbor reaches 1. The phase arrows meet in a small recombination inset: aligned arrows add at Harbor, opposite arrows cancel there. Show a second inset or toggle for Reef so amplitude is not portrayed as disappearing from the entire system. The light went to the other output.

First wrong Confirm: “The harbor receives only {p} of the predicted light. Try changing how the two route arrows meet.” The expression is formatted as a percentage, not a raw float. Hint 1 after request: “Brightness is not enough. Compare the directions of the arrows.” Hint 2: “At the harbor, matching directions add.” Hint 3: highlight the 0 stop without moving it automatically. Successful Confirm locks the configuration, restores the first harbor window, and writes “Relative phase changes where light arrives” to the notebook.

Transition line: “Good. But someone fitted a route recorder to the lens room. Since then the beam has refused to focus.”

## Scene 2 — The price of a record

Initial configuration: phi=0, required CX recorder after the first H, no second CX. Harbor and Reef are both 1/2. Keep the phase control usable so the player can discover that turning it no longer changes the marginal outputs. Show two distinguishable marker glyphs below the arms, with “route remembered” beside them. Goal: Harbor≥0.95 while keeping the required recorder in the apparatus.


Inventory contains a reversible return coil and a cloth. The coil applies the second CX to the same q1 before recombination. The cloth only hides the label. The recorder cannot be removed; attempting removal gets “This safety recorder is part of the rig. Can its interaction be reversed before the light returns?” A disabled slot must explain its constraint, not silently refuse a drag.

Expected inference: a phase change cannot make distinguishable histories interfere; reversing the coherent record makes their marker states identical again. On placing the return coil, animate the two marker glyphs becoming the same blank ring before the route amplitudes recombine. Exact Harbor jumps from 1/2 to 1. This is the main visual reveal.

Cloth feedback: “The label is hidden, but the apparatus still holds the record.” Phase-only feedback: “The arrows turn, but their records remain different.” Hint 1: “What else distinguishes the two routes?” Hint 2: “The return coil reverses the recorder's interaction.” Hint 3: highlight the coil socket. Success line: “We did not persuade the light. We gave the routes the same ending.” Notebook adds “Interference needs indistinguishable final records.”

## Scene 3 — The final adjustment

The harbor returns to the background, larger and warmer. The final rig has H, a required coherent record CX, a storm-damaged fixed phase offset π/2, one adjustable phase lens, an optional return-coil socket, and H. The phase lens can add 0, π/2, π, or 3π/2. Total phase is fixed offset plus chosen correction modulo 2π. Display both terms with arrows; do not conceal the offset as a gotcha.

Initial correction=0 and return coil absent. Goal: Harbor≥0.95. Correct solution: insert the return coil and choose correction 3π/2, making total phase 2π. The two requirements are independent: the coil restores contrast; the correction steers that contrast to Harbor. Coil only gives Harbor=1/2 because total phase is π/2. Phase correction only also gives 1/2 because the route record remains. Both produce 1.

On wrong Confirm, give diagnostic feedback tied to the actual model. If the record remains: “The route record still divides the arrivals evenly.” If uncomputed but phase wrong: “The routes can interfere again. Now align their arrival arrows.” Never emit a canned failure regardless of configuration. Hint 1 points to the notebook's two findings; hint 2 identifies the remaining failed condition; hint 3 names the correction and coil.

Once correct, Confirm becomes “Light the harbor.” Clicking it commits the repaired rig and starts a three-second beam sweep. Show a few illustrative path pulses labelled “signal illustration,” then focus on the harbor. Do not use a fake 64-shot perfect histogram as the ending animation.

## Ending and replay

The ferry lantern reaches the warm dock. Mara: “There. A way home.” The apprentice's final notebook line appears: “The routes mattered together, until a record told them apart.” Buttons: Replay repairs, Explore apparatus, View the circuit. Include a concise physics note: this story uses a small ideal quantum circuit to model interference and a coherent path record; the harbor is fictional. No claim that human attention collapses the state.

Explore mode exposes phase, record, uncompute, and optional dephasing controls without story constraints. A reset creates a fresh preparation. Keep scene completion flags separate from free-play configurations so exploring does not break Replay.

## Art and sound direction

Palette: ink navy #142532, fog blue #607D8B, brass #C99B58, warm cream #FFE8B0, coral #DE7C65. Use warm light sparingly so the repaired harbor is a meaningful change. One artist can later replace Mara's portrait/expressions; the other can replace harbor/workbench layers and prop illustrations. The prototype must supply its own coherent equivalents first.

Generate or draw two backgrounds: harbor exterior and brass optical workbench. Harbor prompt: “Original hand-painted storybook coastal harbor at blue hour, distant ferry light on right, low town silhouettes along bottom, lighthouse window glow on left, broad quiet foggy center, layered paper texture, navy and muted brass, no words, no signs, no diagrams, 16:10 landscape.” Workbench prompt: “Top-down and slightly angled antique optical workbench, worn dark wood, brass edge details, soft lamp light at upper left, central 80 percent intentionally uncluttered for a separately rendered apparatus, no tools crossing center, no lettering, no circuit diagram, painterly 16:10.” Use code-rendered glass discs, path lines, and ports on top.

Animate three parallax fog strips at 8–18 px/s, a very slow water highlight, and the keeper's lamp breathing with a period above four seconds. These are cosmetic. The ferry only advances during scene transitions, never in response to individual random detections. Reduced motion uses static fog and a short warm crossfade.

Music: 68 BPM, D minor/add9, eight bars of four beats. Use a low D3/A3 pad and a soft bell phrase D4–A4–F4–E4, one note per two beats, repeated with the final E4 resolving to D4 in the ending. Begin with only pad; add bell at scene 2; add a quiet high A5 at homecoming. Triangle/sine oscillators, 80 ms attack, 1.2 s release, music gain around 0.08 before the master. Create low-passed noise for wind at a much lower level. Use a short glass tick for dial detents, a wooden click for placement, and a two-note warm chime for a completed repair. The CC0 Deeper Sea candidate in the shared asset playbook may replace the ambience after audition, but the original score is sufficient.

## Implementation and acceptance cases

Represent each rig with phaseOffset, phaseCorrection, recordEnabled, uncomputeEnabled, markerDephased, and shots. Permit only scene-valid controls. Derive total phase and quantum output from that configuration. Narrative success predicates use exact probabilities and required device constraints. An amplitude illustration must read the computed state, not a separately authored “win” flag.

Required checks: all four phase rows above; retained record gives 1/2 for arbitrary phase; two CX gates restore interference; dephase then uncompute does not restore it; Harbor+Reef=1; phase correction in scene 3 is evaluated modulo 2π; hiding the marker label changes no probability; replay removes committed-state locks; samples converge statistically and never gate completion.

Ninety-second judge route: start and set phase from π to 0; confirm; turn the dial with a record and show that output contrast stays flat; hide the label and show no change; insert the return coil for the bright reveal; in the final rig choose 3π/2 correction and the coil; light the harbor. End with the circuit inspector briefly visible. The memorable sentence is: “A hidden record is still a record; a reversible interaction can be undone.”

Cut first: extra keeper dialogue, boat animations beyond the ending, weather variants, and optional dephasing exploration. Preserve the contrast-loss/recovery reveal. This concept should feel finished with two paintings, one portrait, several vector props, and three thoughtful puzzles.

## Cross-scene implementation requirements

### Art, backgrounds, animation, and music acquisition

Use the project-specific art briefs above as the primary direction. Check an explicitly provided assets directory first; do not scrape the teammates' social profiles or assume their public posts are licensed for reuse. The prototype must finish without waiting for either artist. Use a restrained, consistent original SVG/Canvas illustration system as the guaranteed fallback. Keep backgrounds, foreground occluders, characters, interactive devices, light/particle overlays, and UI in separate layers so the team can replace artwork without changing the model.

For ready-made background components, use [Kenney Background Elements](https://kenney.nl/assets/background-elements), whose asset pack is CC0. For small switch/click sounds, use [Kenney UI Audio](https://kenney.nl/assets/ui-audio), also CC0. These are ingredient packs; assemble and recolor them into the specified scene. If textured surfaces help, [Poly Haven](https://polyhaven.com/license) offers CC0 asset downloads; its website preview renders and branding have separate terms, so download the actual licensed asset instead of copying a preview image. No asset is required if downloading fails.

Each guide supplies a concrete score brief and a procedural fallback. A quiet ambient candidate is [Contemplation by Joth](https://opengameart.org/content/contemplation-0), listed as CC0. Audition downloaded audio before deciding it fits; do not claim to have listened if you have not. Trim and re-encode a local derivative when necessary. Preserve source-page URLs, creator, license, download date, modifications, file hash, and usage in ASSET_CREDITS.md and assets/manifest.json. Confirm the individual asset's license at acquisition time; a collection title is insufficient. If licensing cannot be verified, replace the asset with original procedural work.

Do not depend on generated images for precise puzzle geometry, numbers, text, ports, or arrows. If an image tool is available, use the scene prompt, then put all readable/control elements in code. If it is unavailable, follow the same composition with vectors. Never leave a missing-image icon or an unattributed internet image. Bundle all final media locally; a cold offline reload of the local build should work after the build has been served once with its files available. The Qollab exporter may need to inline small assets separately.

Start/resume audio only after the player presses Start or Enable sound. Handle rejected playback and suspended AudioContext states, show a working mute/volume control, and continue silently if necessary. Follow [MDN's autoplay guidance](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay). Generate music with Web Audio if no usable recording is available: schedule notes against AudioContext.currentTime, keep at least 100 ms of scheduling lookahead, fade oscillators with short attack/release envelopes, and stop/disconnect nodes when leaving a scene. No autoplay surprise, leaked loops, or clipping. Sound must never be the only carrier of a clue.

### Interaction, accessibility, and truthful feedback

At 1280×800, honor the scene geometry in this guide. Scale the illustration inside a stable aspect-ratio frame. At widths below 900 px, stack the stage, controls, notebook, and dialogue rather than shrinking labels into illegibility. Support 390×844 and 1024×768 without clipped buttons. Keep main touch targets at least 44×44 CSS px. All drag actions also need click-select/click-place and keyboard alternatives. Use visible focus, labelled buttons, arrow-key dial controls, and Escape to close overlays. Do not trap focus in the scene art.

Use shape, text, line pattern, and position as well as color. Give phase arrows a text angle, paths a name, and probability bars a number. Provide reduced-motion and independent music/SFX volume. Reduced motion substitutes static arrows and short fades for moving particles and parallax. Captions and the notebook must convey every required story and inference clue. Decorative flicker must be gentle; do not use rapid full-screen flashes.

The exact-preview mode may reveal an explicitly selected laboratory state. A hidden trial must not leak its secret through debug labels, color, amplitudes, accessibility text, or audio before an authorized reveal. Keep secret state separate from the player-facing view model. Client-side secrecy is only a game mechanic, not a security guarantee. Sample with a seeded PRNG for reproducible QA, and record the seed in development logs; do not force desired outcomes in ordinary play. Every shot in an ensemble represents a freshly prepared system unless a scene explicitly models sequential measurements on one state.

Undo before a committed measurement may restore the simulator's prior editable configuration. A new attempt after measurement is a fresh preparation and must be described that way. Deleting a displayed record is not physical recoherence. A detector count is not an amplitude. A hardware result is not a theoretical guarantee. A one- or two-qubit game makes no computational-speedup claim.

### Acceptance and final handoff

In addition to the guide-specific cases, verify a full start-to-ending route, every scene's wrong-attempt feedback, reset/retry, keyboard completion, touch-size layout, muted play, unavailable audio/assets, and reduced motion. Test that changing a relevant control changes the actual model rather than only an animation. Compare model outputs to the independent numerical values in this guide; use tolerances appropriate to floating-point calculations, not rounded UI text. Use meaningful statistical tolerance for sampled counts; do not assert an exact random histogram.

Where browser automation is available, run it, inspect screenshots, and correct overlap, unreadable clues, hidden controls, and console errors. If it is unavailable, run available model/build checks and clearly label browser QA as unverified. Never manufacture screenshots or test evidence. Keep a tested primary path and record optional limitations separately.

The final agent message must include: what was built; the exact run command and local location; the ninety-second route; the actual tests and their results; asset provenance; whether Qiskit, Qollab, and any remote hardware were truly executed; and remaining limitations. Finish with a working artifact, not a proposal to build later.

Official integration references: [Qollab runtime](https://qollab.xyz/learn/docs/runtime-environment), [Qollab JavaScript/Qiskit projects](https://qollab.xyz/learn/docs/js-qiskit-projects), [IBM Qiskit quantum_info](https://quantum.cloud.ibm.com/docs/en/api/qiskit/quantum_info). Recheck documentation at implementation time. These specifications are original design proposals, not official judging criteria or a guarantee of a prize.
