# Palimpsest — autonomous prototype build guide

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

**Pitch:** Restore an unfinished illustrated book by arranging its panels. Two possible routes are drawn over the same page, but only routes with compatible final records can interfere. Ink direction, panel order, and a seemingly innocent postcard determine which ending becomes possible.

This is an interactive comic, not a circuit editor with a paper texture. The central pleasure is reading a visual clue, rearranging a small set of authored panels, and watching the illustration acquire a different meaning. The comic remains legible as a short story with sound off. Project folder: palimpsest; preferred port: 5174.

The protagonist is Neri, a book conservator. The unfinished traveler in the book seeks a house with two doors: Dawn, output 0, and Night, output 1. Neri's margin notes guide the player. The book contains a fictional quantum apparatus represented through visual storytelling; it does not claim that editing a real person's memories reverses measurement or that narrative alternatives are automatically quantum states.

Required flow: cover → page 1, order → page 2, phase → page 3, records → completed final illustration → replay and free composition. Three pages, one traveler silhouette, one conservator portrait, four environment layers, and two ending color treatments are enough. Do not build a general comic authoring application.

## Page composition and editor geometry

Use 1280×800. Header y=0…56 holds page number, notebook, sound, and motion. The illustrated spread occupies x=24…936, y=80…552. A marginalia rail occupies x=960…1256 over the same height. The panel editing rail occupies x=24…1256, y=576…704. Caption/continue controls occupy y=720…792.

The page contains a left input panel centered at (130,315), an upper route panel centered at (390,210), a lower route panel centered at (390,430), a convergence panel centered at (650,315), and two destination frames centered at (830,230) and (830,420). Each illustrated panel has its own clipping path. Gutters remain visible. Pale route ribbons cross the gutters; they are a deliberate model overlay, not baked into the background art. Label the destination frames Dawn/0 and Night/1 with icons and text.

The editing rail is the executable reading order, left to right. Page 1 has three 150×100 slots centered at x=300,520,740, y=636. Page 2 uses fixed Fork and Join bookends with two middle phase cells. Page 3 uses five smaller cells centered x=220,420,620,820,1020. Show short arrow connectors and a caption, “Panel order determines the model.” The illustrated page above renders the consequences; dragging arbitrary background images does not change physics.

Each executable card has an illustrated front and a readable operation label available without hovering: Fork/H, Turn/Z, Quarter-turn/P(π/2), Return stamp/CX, Join/H. The two H cards have different narrative names but identical matrices. Phase cards carry a small compass arrow with angle text. A record card displays an envelope icon with 0/1 stamp variants. Cards can be moved by drag, click-select/click-slot, or keyboard. Swap occupied slots rather than silently deleting a card. Undo restores the previous complete layout.

The marginalia rail contains the current objective, exact output bars, a small “What changed?” observation, and three optional hints. Do not fill it with equations initially. An Inspector tab shows the circuit, amplitudes, record labels, and sampling controls. The main page offers Preview ink and Commit page. Preview is exact; committing checks the authored puzzle target and then plays an illustration transition. A separate 64-readings histogram represents freshly prepared trials.

## Core model and visual grammar

Use q0 for the route and q1 for the coherent postcard record. Initial state is |00>. H, Z, P(phi), and CX use the standard definitions. Cards execute chronologically in the rail. Global phase has no visual consequence; relative phase changes the model arrows and the destination probabilities.

The route illustration may show two translucent traveler silhouettes, but label the overlay “model of possibilities” in the inspector. It is not a pair of independently measurable complete worlds. Ink arrows represent complex amplitudes. Their lengths and angles come from the state. Probability is squared amplitude magnitude and is shown separately as filled area in destination frames.

If route histories leave different postcard states, do not combine their arrows as though they ended identically. Group by the full route-and-record state. To recover interference, the relevant coherent record must be uncomputed. A folded-over paragraph or hidden envelope icon does not erase physical information. Once a scene explicitly measures a record, committing and starting again creates a fresh preparation, not a physical reversal of that measurement.

Retain two orthogonal outputs at the convergence. The visual “join” may bring route ribbons together, but the underlying H is unitary and sends amplitude into both Dawn and Night channels. Do not implement a nonunitary merge that simply adds every path into one ending and renormalizes it.

## Cover — A book that has not chosen its last line

Show a closed linen book, a conservator's brush, and a faint double-printed traveler on the cover. Text: “Three pages survived. Their order did not.” Start opens to the first spread. Neri says: “I can restore the ink. You will have to read what it is doing.” The first actionable cards appear immediately. No forced exposition modal.

## Page 1 — The order of the journey

Story image: a traveler approaches the two-door house at dusk. The brief says: “The missing caption ends at the Night door.” Required target is output 1 probability≥0.99.

Inventory is exactly H, H, Z. All three must occupy the three reading slots. Start with Z,H,H. The player sees Dawn=1 and Night=0. Valid arrangements reduce to three distinct sequences:

| Chronological order | Final route | Night probability |
|---|---|---:|
| Z,H,H | ∣0⟩ | 0 |
| H,H,Z | ∣0⟩ | 0 |
| H,Z,H | ∣1⟩ | 1 |

The two H cards are interchangeable mathematically, so do not require a particular card identity in a particular H slot. Score the computed result and inventory validity. The correct order lets the player see a fork, a relative sign change, and recombination into the other destination. The page animation places a thin red ink stroke on one route before the destination changes; the stroke is a phase marker, not a physical barrier.

Wrong feedback: if Z is first, “A turn before the traveler splits changes no relative ink direction.” If Z is last, “The turn arrives after the two routes have already rejoined.” Hint 1: “Order matters.” Hint 2: “A phase change needs two route amplitudes to compare.” Hint 3: “Place Turn between Fork and Join.” Completion line: “The same panels can tell a different arrival.” Notebook records the successful order and a tiny before/after thumbnail.

## Page 2 — The ink you cannot count

The next spread is an orchard printed in two translucent colors. The route is prepared by a fixed H. A fixed quarter-turn P(π/2) is already printed onto route 1. The editable correction card can add 0, π/2, π, or 3π/2. A fixed final H joins the routes. Goal: Dawn probability≥0.99.

In a small middle-of-page inset, show route probabilities immediately before the final H. They remain 1/2 and 1/2 for every correction. This inset is labelled “Before the Join.” Beside it, show the two amplitude arrows; their relative directions change with correction. Destination bars after the Join change accordingly. This distinction is the inference: equal intermediate counts do not imply identical quantum states.

Total phase is π/2 plus correction modulo 2π. Correction 3π/2 yields total 2π and Dawn=1. Correction π/2 gives total π and Dawn=0. Corrections 0 and π give equal destination probabilities. Do not confuse the unchanged middle inset with the changing final output.

Neri: “The amounts of ink match. The directions do not.” On a wrong commit: “Both routes are present, but their arrival strokes are not aligned for Dawn.” Hint 1 points at the arrows; hint 2 says the fixed turn must be included; hint 3 names the three-quarter-turn correction. When solved, the page's misregistered colors align into one crisp orchard scene. This crispness is the authored visual reward; it should follow the computed target, not a separate card-name check.

Optional inspector task: compare the states after H and after H,Z. Their Z probabilities are identical, but an X-basis test distinguishes them. Use a fresh preparation for each test. Do not make this optional explanation a fourth required puzzle.

## Page 3 — The postcard that keeps two stories apart

The traveler has written a postcard on each route. In the upper illustration the stamp reads 0; in the lower, 1. The five reading cells hold H, required CX recorder, phase correction initially 0, empty return-stamp slot, H. The route record is coherent and initially blank. Total phase is 0 unless changed. Dawn and Night each have probability 1/2 while the record is retained.

Objective: restore a chosen ending with predicted probability≥0.99 while keeping the printed postcard panel. The first time through, the story asks for Dawn; after completion, free composition allows either ending. Inventory offers Return stamp, a second CX on the same marker, and Fold caption, a purely visual paper flap. The fold can conceal the words, but it changes no quantum state.

The crucial display is a record-compatibility bracket beneath the two route panels. With the postcard retained it reads “Different final stamps.” As the player inserts Return stamp, animate both stamp glyphs becoming the same blank seal and change the bracket to “Same final stamp.” Only then animate amplitude arrows adding at Dawn. Explain that the reversal occurred before any irreversible readout. Avoid “deleting the past” language.

Wrong feedback after Fold caption: “We covered the writing. The record is still in the model.” Wrong phase without the return stamp: “Turning the ink cannot join different final records.” With the return stamp but phase π: “The page is coherent again, but it now ends at Night.” The player can inspect that valid alternate ending without satisfying the first-run Dawn objective.

Hint 1: “What remains different after the routes meet?” Hint 2: “A hidden postcard is still a postcard.” Hint 3: “Return the coherent stamp to blank before Join, and set phase to 0.” Success adds a final line to the notebook: “The routes can interfere when they end with the same record.”

For a post-completion experiment, offer Measure postcard. It dephases the marker in a density-matrix simulation. The second CX then fails to restore interference. Show “New preparation” as the retry button. This optional mode must be clearly separated from the reversible stamp used in the story.

## Completed spread and endings

The three restored pages shrink into a short sequence, then the traveler reaches Dawn. Neri's final line: “A page can hold possibilities. A record can keep them apart.” Offer Read again, Try the Night ending, and Open the model. The Night ending uses coherent phase π and a different color treatment/one-line caption, not a second campaign. Both endings are valid artistic choices in free mode; neither changes the physics.

The ending should show the player's own restored panel layouts. Persist in memory for the session. Do not create a screenshot export or share action unless it is easy and permitted; those are optional polish.

## Art, background, and motion plan

Palette: warm paper #EFE5CF, graphite #28343C, faded cobalt #456E98, vermilion #C96554, moss #71836C. Use two complementary drawing treatments: crisp traveler/prop silhouettes and textured environment washes. A single shared palette and paper grain ties the teammates' future illustrations together. Page borders and interface marks remain clean vectors.

Required layers: desk/book cover, road/house, orchard, letter/return spread, traveler silhouette, conservator portrait, postcard glyphs, paper fold mask. Reuse the house layer for the ending. SVG fallback draws torn-edge paper with subtle filters, a simple house with two distinct door icons, tree silhouettes, and a cloaked traveler; avoid heavy blur that obscures text.

Background prompt: “Original illustrated storybook spread on aged cream paper, quiet road toward a small two-door house, restrained cobalt and vermilion washes, delicate graphite outlines, central and side areas reserved for separate comic panels, no lettering, no speech bubbles, no panel numbers, no equations, flat scanned-paper composition, 16:10.” Orchard variant replaces the road with sparse trees and keeps the same empty safe zones. Generate backgrounds separately from the traveler so the character can appear in both routes without inconsistent faces.

Animate page turns as a 350–500 ms mask/fold, card placement as a 120 ms settle, and ink registration as a slow crossfade. Do not let decorative frame overlap hide the route labels or imply that spatial overlap alone creates interference. Reduced motion uses a 150 ms fade and static paper.

Music: 76 BPM, A minor pentatonic, four-bar loop. Plucked triangle notes A3, E4, G4, C5 on beats 1, 2.5, 3, and 4 of bar 1; repeat with E4, G4, A4, E4 in bar 2; leave bar 3 sparse; resolve C5–B4–A4 across bar 4. B4 is a passing note outside the pentatonic core. Use a quiet A2 drone and paper-brush noise. Gain approximately 0.06 for the music bus. Add a soft second voice only after the page is committed. SFX: paper slide, stamp tap, brush stroke, and a two-note page-complete phrase. A hidden record must not emit a distinctive sound that reveals its value.

## Implementation and verification

Store authored cards as operation descriptors with card ID, allowed slots, matrix/gate kind, parameter, and visual metadata. Compile the reading rail into a circuit. Validate inventory counts and socket restrictions before simulation. Scene completion depends on the compiled state and objective, not a string match to one arrangement; identical H cards must be interchangeable.

Required numerical checks: all page-1 orders; fixed π/2 plus correction 3π/2 gives Dawn=1; intermediate pre-Join Z probabilities remain 1/2; H|0> and ZH|0> differ in X basis; coherent tag destroys path contrast; second CX restores it; hiding a caption does nothing; measured tag then uncompute remains mixed in the relevant path output. Test two orthogonal output totals sum to 1 and no card duplication occurs after swapping/undo.

Ninety-second judge route: rearrange H,Z,H and watch the house door change; on the orchard page show identical middle counts while phase arrows turn; align the correction; fold the postcard caption and show that hiding it does nothing; use Return stamp and reveal the completed spread. The concept wins attention through a readable visual inference, not through a long explanation of the metaphor.

Cut first: extra pages, arbitrary comic uploads, freehand drawing, voice acting, and export/share features. Preserve the three authored inferences and the final spread. If the comic reads clearly without the inspector, the prototype has achieved its main goal.

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
