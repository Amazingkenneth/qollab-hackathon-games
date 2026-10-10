# The Memory Thief — autonomous prototype build guide

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

**Pitch:** An archive detective has one fragile quantum memory fragment and two possible owners. Asking a better question improves the odds of identifying it, but certainty requires accepting that some fragments cannot be identified at all.

Build an inference mystery about the difference between a good guess and a justified claim. Its signature moment is the appearance of a third answer—“inconclusive”—that makes the two conclusive answers error-free in the ideal model. The emotional ending rewards restraint as a competent choice. Project folder: the-memory-thief; port: 5176.

The detective is Sera. The archivist, Oren, wants a stolen fragment returned to its owner, Aster or Bryn. These are fictional archive signatures encoded in a qubit, not a theory that real autobiographical memories are one-qubit states. Do not imply that a face, emotion, or personality can be measured from an actual quantum state. Keep the setting poetic and the formal model explicit in the inspector.

Required flow: rainy archive → wrong question → best guess → certainty with abstention → return/hold decision → closing archive. The hidden owner is sampled only for live specimen trials. Known reference preparations are openly labelled and used to teach the distributions. The story works for either owner and every valid observation.

## Display and inference layout

Use 1280×800. Header y=0…56 holds case name and settings. The desk occupies x=24…864, y=80…552. The evidence notebook occupies x=888…1256 in that region. Controls occupy y=578…704, dialogue y=720…792.

On the desk, place Aster's reference card at (220,220), Bryn's at (640,220), the sealed specimen at (430,390), and the instrument ring around it with radius 115 px. The two reference cards have equally prominent art and neutral colors. Their known preparation arrows can be inspected, but the live specimen never displays its actual state vector, identifying hue, private name, or revealing sound. A lock glyph and “Unknown specimen” label remain identical across owners.

The evidence notebook has a two-column likelihood table headed “If Aster” and “If Bryn.” Rows are outcomes of the selected measurement. A separate conclusion area asks what the observation supports. Keep prior, likelihood, posterior confidence, and hidden truth distinct in the data model. The live outcome lights one table row; it does not secretly choose a different instrument after seeing the owner.

Scene 1 offers a Z instrument; scene 2 adds X and Y; scene 3 adds a three-output USD instrument. Name them narratively—Weight, Interference, Quarter-turn, and Certain-or-unknown—but retain Z/X/Y/USD labels in smaller type. The three-output instrument appears as a Y-shaped desk device with outlets A, B, and ?. Use text plus shapes: square A, triangle B, ring ?. The ? outlet is visually dignified, not a red failure bin.

Actions: inspect reference predictions, prepare a fresh reference batch, choose instrument, commit one measurement, submit a conclusion, request hint, retry with a new specimen, and open the model. Once a live specimen is measured, lock its initial preparation. Another measurement on that specimen must use the collapsed state if supported. “New specimen” makes a fresh preparation and says so.

## Exact states and measurements

Use equal prior probabilities. Let theta=π/8 for the story:

ψA=cos(theta)|0>+sin(theta)|1>.

ψB=cos(theta)|0>−sin(theta)|1>.

Their overlap s=cos(2 theta)=1/√2. They are different, nonorthogonal states. In Z, both have probabilities [cos²(theta),sin²(theta)]≈[0.853553,0.146447], giving no information about which owner was chosen. Do not mistake the 85.4% probability of the Z=0 result for 85.4% owner-identification accuracy; the latter remains 50% with equal priors.

In X, outcome + suggests A and outcome − suggests B. Correct guessing probability is (1+sin(2 theta))/2≈0.853553, the optimal minimum-error result for these equally likely pure states. The wrong guess probability is about 0.146447. With this symmetry, confidence after either outcome is also about 85.4%, not certainty. Y provides equal 1/2 outcome probabilities for both states and no owner information.

If X is measured, the conditional state becomes |+> or |−>. A subsequent Z measurement on that same state yields [1/2,1/2]. It does not recover the original [0.853553,0.146447]. This is an optional sequential-measurement demonstration, using actual state updates, not two independent fresh samples presented as one fragment.

## The certain-or-unknown instrument

For the story's theta range 0<theta≤π/4, define mu=1/(1+s), ψBperp=(sin(theta),cos(theta)), and ψAperp=(sin(theta),−cos(theta)). Use effects EA=mu|ψBperp><ψBperp|, EB=mu|ψAperp><ψAperp|, and E?=I−EA−EB. Outcome A has zero probability on ψB; outcome B has zero probability on ψA. Each correct conclusive probability is 1−s≈0.292893, while inconclusive probability is s≈0.707107.

| Input | Outcome A | Outcome B | Outcome ? |
|---|---:|---:|---:|
| Aster | 0.292893 | 0 | 0.707107 |
| Bryn | 0 | 0.292893 | 0.707107 |

The browser can evaluate these POVM probabilities directly. Treat this instrument as a destructive terminal reading; do not promise to preserve the unknown fragment afterward. For the Qiskit implementation, initialize data q0 and auxiliary q1=0. Construct an isometry V with four rows:

1. sqrt(mu)×(sin(theta),cos(theta)).
2. sqrt(mu)×(sin(theta),−cos(theta)).
3. (sqrt(2s/(1+s)),0).
4. (0,0).

Its two columns are orthonormal. Complete them to a 4×4 unitary U using an SVD/null-space basis, preserving V as the first two columns. Verify U†U=I. Input vector is [ψ0,ψ1,0,0]. Measure outputs: basis index 0=A, 1=B, 2=?, 3=unused. Do not use a naive unguarded Gram–Schmidt at theta=π/4; near-zero residuals can produce an invalid unitary. The supplied reference oracle demonstrates a stable completion.

In optional free mode, show theta values π/12,π/8,π/6,π/4. Minimum-error success is respectively 0.75,0.853553,0.933013,1; conclusive USD success is 0.133975,0.292893,0.5,1. Each comparison uses new reference preparations. No slider can retroactively change the identity of a specimen already measured.

## Scene 0 — The sealed fragment

Rain runs down a tall archive window. Oren places a frosted shard on the desk: “Two owners. One fragment. Please do not turn a guess into a name.” Start unlocks sound and the desk controls. Show the two known reference cards and equal-prior badge. The immediate objective is “Find out whether this instrument can distinguish the two signatures.”

## Scene 1 — A precise answer to the wrong question

Only Z is available. Display the two identical reference distributions. Let the player run an optional fresh batch of 128 references for each owner; sample variation is visible but the exact predictions remain above the bars. If the player runs one live specimen, its result lights the shared row.

Ask: “Does this reading favor Aster, favor Bryn, or leave the owners equally likely?” Correct answer is equally likely for either Z outcome. Success depends on recognizing identical likelihoods, not drawing a particular outcome. A player selecting Aster after the common 0 result receives: “That result is common for both owners. It does not favor one over the other.”

Hint 1: compare the same outcome across the two hypothesis columns. Hint 2: identical columns contain no distinguishing information. Hint 3: choose equally likely. Notebook records “A frequent outcome can still reveal nothing about the question I care about.” Sera: “The instrument was precise. Our question was wrong.”

## Scene 2 — The best guess still risks a mistake

Unlock X and Y. Objective: select an instrument whose equal-prior owner-identification success is at least 0.85, then label the result honestly. Reference columns change immediately with the selected basis. X is the only available basis that meets the threshold; Z and Y yield 0.5 accuracy.

Place a likelihood-row magnifier between the reference cards. For X=+, it shows A likelihood≈0.853553 and B likelihood≈0.146447. Under equal priors, the conclusion is “Aster is more likely, about 85.4% confidence.” For X=−, reverse the names. Display a small remaining-error wedge in the confidence ring. Do not fill the ring to 100% or use the word “identified” without qualification.

After a live X measurement, offer “Tentative: Aster,” “Tentative: Bryn,” and “Certain identification.” Correct tentative name follows the outcome; choosing certainty receives “This outcome is possible for both signatures.” Even when the hidden truth happens to match the guess, certainty remains unjustified. Do not grade the confidence claim by peeking at the hidden owner.

The optional “Ask again on this fragment” Z test demonstrates disturbance: the current |+> or |−> state gives equal Z results. Label it “same measured specimen.” A separate “Prepare fresh reference” button restores the original state with explicit language. This distinction is a key QA case.

Hints: compare differing likelihoods; choose X; then acknowledge the nonzero wrong-owner likelihood. Completion line: “I can make the best guess. I cannot make its error vanish.” The notebook preserves that distinction before the final scene.

## Scene 3 — The answer the archive can accept

The fictional archive's rule is now explicit: no false conclusive ownership label in the ideal model; withholding a label is allowed. Unlock the USD instrument. Show its three outcomes and the table above. The player compares it with the X instrument: X decides every time but sometimes errs; USD never gives the wrong conclusive name but often says ?.

Ask the player to choose a policy for the archive. X fails the no-false-label requirement even if a particular sample happened to be right. USD meets it because the wrong-owner conclusive probabilities are zero. Show conclusive rate 29.3% and inconclusive rate 70.7% side by side. Never hide the ? outcomes when reporting success.

Commit one live USD measurement on a fresh specimen. If A occurs, the valid action is “Return to Aster.” If B occurs, “Return to Bryn.” If ? occurs, “Hold without assigning an owner.” All three lead to a complete ending when the evidence is handled correctly. Do not loop until a conclusive result appears; that would erase the experience's central lesson and create a demo lottery.

Provide a clearly labelled reference report for each possible outcome so players can inspect branches they did not sample. Wrong ? handling: “Neither conclusive label is supported by this reading.” Wrong conclusive handling: “This outcome has zero likelihood under the other signature in our ideal model.” Hints identify the zero entries, explain abstention, and finally name the appropriate action for the observed outcome.

## Ending and replay

If conclusive, Sera places the labelled fragment in the owner's drawer. If inconclusive, she places it in a protected unassigned drawer with equal dignity and warm lighting. Oren: “You returned what the evidence allowed. You did not steal the rest by guessing.” A final card shows the selected protocol, its average error/conclusive properties, and the actual observed outcome. It explicitly distinguishes those from the secret truth.

Buttons: Reopen case, Compare signatures, View measurement model. Free mode exposes theta and all known-reference distributions. The ending text must adapt to A/B/? without inventing a fourth outcome or implying that abstention is failure.

## Art, background, and music

Palette: archive charcoal #26343B, rain blue #60839A, warm amber #D9A862, paper #EEE2C8, muted lavender #9C8DAF. Make the evidence table the brightest, cleanest readable area. Use two equally framed owner cards; avoid villain-coded coloring or an obviously suspicious portrait that undermines the quantum evidence.

Assets: rainy archive background, desk foreground, neutral sealed shard, two owner emblems, Oren/Sera portrait busts or silhouettes, three outcome glyphs, drawer ending overlay. The guaranteed SVG fallback draws window mullions, rain strokes, book spines, frosted polygon shards, and paper cards. Sealed shard art is identical for both hidden hypotheses.

Background prompt: “Original illustrated archive detective scene at night, rain-streaked window in upper background, warm desk lamp, dark bookcases at edges, broad uncluttered wooden desk in center and lower half for separate interface objects, restrained blue amber lavender palette, thoughtful rather than sinister, no text, no documents with writing, no identifiable symbols, 16:10.” Generate owner emblems separately with equal visual weight; do not bake identifying marks into the unknown shard.

Animate rain and dust slowly. On measurement, contract the instrument ring once and reveal one output. On ?, use a soft open circle, not a shatter effect. The same-fragment disturbance demo can replace the initial abstract arrows with |+> or |−> labels only after measurement, when the state is known from that outcome.

Music: 72 BPM, C minor, four-bar loop. Low C3/G3 pad, plucked motif G4–Eb4–D4–C4 across bars 1–2, then two bars of sparse suspended G4 and D5. Resolve to C4 only when the player submits a justified conclusion, including ?. Use sine/triangle timbres, 30 ms attack, 700 ms release, bus gain around 0.06. Rain is filtered noise with slow gain modulation. A measurement is a soft glass click; a notebook finding a pencil stroke; a valid abstention receives the same warm completion cadence as a valid return. Contemplation is a possible CC0 substitute after audition.

## Implementation and tests

Keep hypothesis, preparation ID, physical state, instrument, observation, player claim, and revealed truth separate. A claim evaluator uses public evidence and the selected rule, never whether a lucky guess matched the secret. Lock the chosen instrument during a committed live reading. Clear stale posteriors when a new specimen is prepared.

Verify identical Z distributions; X success≈0.853553; Y provides no owner information; X→Z on the same measured specimen gives 1/2; EA+EB+E?=I and each effect is positive; wrong conclusive probabilities are zero within 1e-9; U is unitary and matches the POVM; unused outcome is zero; all A/B/? endings are reachable; live hidden state never reaches visible/accessible/audio view data. Verify an erroneous guess that happens to be correct still cannot be called certain.

Ninety-second route: compare identical Z columns; switch to X and point out the remaining error wedge; choose USD and reveal the third outcome; complete whichever live branch occurs; show the two other reference reports. The memorable statement is: “To make some answers certain, this instrument must sometimes refuse to name an owner.”

Cut first: interrogation dialogue trees, procedurally generated suspects, multiple fragments, voice acting, and elaborate crime lore. Preserve the exact difference between information, confidence, certainty, and abstention. For formal background see [IBM's state-discrimination lesson](https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information/general-measurements/discrimination-and-tomography) and [Naimark's theorem lesson](https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information/general-measurements/naimark-theorem).

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
