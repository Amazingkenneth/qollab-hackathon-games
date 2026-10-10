# Ghostlight Museum — autonomous prototype build guide

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

**Pitch:** A night conservator must locate a fragile light-sensitive exhibit without needlessly illuminating it. A detector that stays dark in an empty apparatus can sometimes reveal an exhibit's presence without the probe being absorbed in that successful branch.

Build a conservation mystery with one strong question: “What does this click actually prove?” The player calibrates the apparatus, interprets evidence, and chooses a gentler inspection protocol. The signature moment is a dark-port click that is impossible for an empty, correctly calibrated case. It is interaction-free detection in a small ideal model, not a claim of zero risk or a promise that every run leaves the exhibit untouched. Project folder: ghostlight-museum; port: 5175.

The exhibit is an original fictional “paper orchid” whose luminous pigment fades if it absorbs the probe. No weapons or explosive object are involved. Conservator Ivo is supervising a closing-time inventory. Trials use simulated replicas; a single absorption is acknowledged as a failed conservation outcome, and the player can prepare a fresh replica. The story never requires repeated destructive tests on the same unique living specimen.

Required flow: museum foyer → empty-case calibration → evidence desk → gentler protocol → conservation report and illuminated gallery. Three scenes, one room that changes composition, and one concluding reveal are enough.

## Display configuration

At 1280×800, header y=0…56 holds scene number and settings. The gallery/apparatus occupies x=24…866, y=80…550. The evidence rail occupies x=890…1256 over that height. Controls occupy y=578…702; dialogue and hints y=720…792.

Apparatus anchors: source (112,318), first rotation/splitter (270,318), reference arm along y=205, probe arm along y=425, sealed vitrine centered (500,425), recombiner (725,318), bright detector (814,244), dark detector (814,400). A separate absorption indicator sits below the vitrine at (500,512). The absorbed branch visually leaves the live apparatus into a labelled “energy absorbed” ledger; it must never travel onward to the recombiner.

Use clear named symbols: Bright/B is a filled circle with a short ray; Dark/D is an outlined diamond; Absorbed/A is a small leaf-shaped pigment mark. Never rely on red/green alone. A meter card shows all three exact probabilities. The two detectors can be dark in the literal artwork; their labels remain readable. The sealed vitrine's appearance, accessible label, glow, and sound are identical whether the hidden trial contains the orchid or is empty.

The evidence rail has two tabs: “Reference predictions” compares known empty and occupied apparatuses; “This trial” displays only allowed observations. These tabs must never confuse model hypotheses with a revealed secret. A compact calibration badge reports whether the empty apparatus has dark-port probability below the tolerance. If calibration is invalid, presence inference is disabled with a reason.

Controls: phase alignment dial in scene 1; Prepare replica, Send one probe, and classify evidence in scene 2; three coupling-angle buttons in scene 3. A separate optional ensemble run takes 128 fresh preparations and is labelled accordingly. Run animations last about 600 ms; allow Skip animation without skipping model evaluation.

## Exact model

Use a four-dimensional encoded space on two qubits, with basis index=q0+2*q1:

| Index | Displayed ket | Meaning |
|---:|---|---|
| 0 | ∣00⟩ | live reference arm |
| 1 | ∣01⟩ | live probe arm |
| 2 | ∣10⟩ | absorbed/environment flag |
| 3 | ∣11⟩ | unused |

The initial vector is [1,0,0,0]. The first unitary rotates only the live indices 0 and 1 by R(theta)=[[cos(theta),−sin(theta)],[sin(theta),cos(theta)]]. It is identity on indices 2 and 3. The empty case does nothing at the vitrine. The occupied case swaps basis indices 1 and 2, moving probe-arm amplitude into the loss flag. Recombine with R(−theta) on the live subspace only. The absorber is a unitary dilation in this encoded model; the lost branch is tracked explicitly.

With no phase misalignment, empty always produces Bright. Occupied gives:

- Bright: cos⁴(theta).
- Dark: sin²(theta)cos²(theta).
- Absorbed: sin²(theta).
- Unused: 0.

| Setting | Bright if occupied | Dark if occupied | Absorbed if occupied |
|---|---:|---:|---:|
| theta=π/4 | 0.25 | 0.25 | 0.50 |
| theta=π/6 | 0.5625 | 0.1875 | 0.25 |
| theta=π/12 | 0.8705127 | 0.0625 | 0.0669873 |

The dark detector has zero probability for the calibrated empty apparatus, making its click conclusive for presence within this ideal model. Bright is inconclusive. Absorbed confirms presence but fails the no-absorption conservation goal. Do not call an absorption a successful interaction-free result. Do not say that an object was certainly absent after a Bright click.

At theta=π/4 and equal prior probabilities of empty/occupied, Dark implies occupied with probability 1, while Bright gives posterior occupied=0.2. This Bayesian number is optional inspector content, not a required arithmetic test for the player. A real imperfect apparatus would require an error/noise model; the game labels its conclusive inference as an ideal-model statement.

## Scene 0 — Closing time

The foyer is lit by reflected moonlight. One case has a covered label. Ivo: “The pigment drinks light. We need to know which case holds it before we move anything.” Start opens the apparatus and states: “You are testing a model with fresh replicas. Learn what each outcome can prove.” A small visual legend explains the three outcome icons.

## Scene 1 — Earn the dark detector

The case is explicitly known empty. Set theta=π/4. A phase misalignment delta=π/2 exists between the live-arm rotation and its inverse. Implement diag(1,exp(i delta),1,1) between them. The alignment dial has delta=0,π/2,π,3π/2. Empty-case Dark probability is sin²(2 theta)sin²(delta/2), so at the starting setting it is 1/2, and only delta=0 among these stops restores Dark=0.

Objective: establish an empty reference with exact Dark probability≤1e-9. The player sees a known-empty vitrine and a dark detector that sometimes clicks under the misaligned setting. This prevents the later inference from feeling like a magic rule. A 64-shot calibration histogram is optional; zero sampled dark clicks alone does not certify exact zero, so the objective uses the ideal model.

Ivo: “A dark click means something only if an empty case cannot make one.” Wrong Confirm: “This alignment still predicts a dark click for an empty case.” Hint 1 points to the empty-case badge; hint 2 says to reverse the phase mismatch; hint 3 names delta=0. On completion, lock the alignment to zero for the story's later scenes, save the calibration in the notebook, and slide the known-empty label out of view.

## Scene 2 — What the click proves

Use theta=π/4 and delta=0. Prepare a hidden replica with equal priors for empty or occupied. The player may send one probe. Sample exactly one of B/D/A from the correct model. Before the run, show two hypothesis cards with their reference distributions, not the hidden truth. Afterward, light only the observed detector/absorption icon.

Offer three conclusion buttons: “Presence confirmed without absorption,” “Inconclusive,” and “Presence confirmed by absorption.” Correct mapping: D→first, B→second, A→third. The player progresses by interpreting the observation correctly, whichever random outcome occurred. This removes luck from completion. Revealing the hidden truth is optional after the conclusion and explicitly separate from the evidence the player had.

To guarantee exposure to the distinctive dark-port inference, also provide three fixed teaching reports, one for each outcome, labelled “Reference reports: illustrative outcomes, not additional live trials.” These reports show what the model permits and ask the same classification. They must not masquerade as fabricated backend data. Require classification of the three report types before continuing; the live trial is a concrete interaction, not a gambling gate.

Bright wrong inference feedback: “Both an empty and an occupied case can produce Bright.” Dark wrong inference feedback: “Our calibrated empty model assigns this outcome zero probability.” Absorption wrong inference feedback: “Presence is known, but the probe was absorbed.” Hints progress from comparing the two reference rows, to identifying zero likelihood, to the correct category. Do not use a failure buzzer for an inconclusive but correctly interpreted event.

Notebook summary: “Dark: conclusive, no absorption in this branch. Bright: inconclusive. Absorbed: conclusive, conservation cost.” Ivo: “Certainty and gentleness are separate questions.”

## Scene 3 — A gentler inspection

The museum asks for a repeatable protocol on known occupied reference replicas: dark detection probability at least 0.18 per prepared probe, and absorption probability no greater than 0.30. Give three labelled settings: balanced π/4, gentle π/6, very gentle π/12. The calibration remains locked at zero. Explain the target as a museum policy for this fictional task, not a universal optimality result.

Display two horizontal budget meters: “Conclusive dark signal per probe” and “Absorption risk per probe.” Include exact percentages. A third meter shows inconclusive Bright probability. The player must trade useful signal against risk. Balanced has enough signal but too much absorption; very gentle has low absorption but insufficient signal; gentle π/6 meets both. Do not score only conditional success among surviving probes, which would hide the cost of absorbed branches.

On selecting a setting, animate the live-arm split proportions and update all three values from the actual model. The threshold lines remain fixed. Confirm validates dark≥0.18 and absorbed≤0.30. Wrong feedback identifies the failed policy condition. Hint 1: “Reducing probe-arm amplitude lowers both risk and useful dark clicks.” Hint 2 points at the pair of thresholds. Hint 3 names π/6 and its values 18.75% and 25%.

Once valid, show a signed conservation protocol with the exact setting, all three predicted outcomes, and “successful dark branches preserve the exhibit from absorption in this model.” Ivo: “We have a method, and we know its price.” No hidden perfect-efficiency upgrade, unsupported Zeno circuit, or claim of risk-free inspection belongs in the core prototype.

## Ending and free mode

The gallery's labels return, the paper orchid is shown in an openly revealed reference case, and warm conservation lights appear behind protective shutters. The report summarizes calibration, evidence categories, and the chosen tradeoff. Buttons: Inspect another replica, Compare settings, Replay story. Free mode may change priors and theta continuously, but must keep the calibration prerequisite and show both numerator and conditioning when reporting conditional statistics.

An optional short historical note can link to [Elitzur and Vaidman's original interaction-free measurement paper](https://arxiv.org/abs/hep-th/9305002). Keep the narrative explanation original and concise. The game demonstrates a basic ideal arrangement, not the highest-efficiency version of the protocol.

## Art, animation, and music

Palette: midnight #152832, oxidized teal #397C7B, museum stone #B5B4A0, orchid rose #DFA1B0, warm gold #F0CD86. The orchid is a folded-paper luminous sculpture, avoiding photorealistic animal distress. Use glass reflections sparingly so detector indicators remain dominant.

Required art slots: gallery wall/arches, vitrine base, transparent glass foreground, orchid sprite, shutter, conservator portrait, outcome icons. The hidden case uses a uniform frosted overlay in both possible states. Never leak the orchid silhouette through differing alpha or a warm glow. For the original SVG fallback, draw repeating arches, a plinth, clipped glass highlights, and a radial folded-petal orchid.

Background prompt: “Original atmospheric nocturnal museum gallery, tall restrained arches, one empty central display zone, pale stone, oxidized teal shadows and muted rose reflections, cinematic but readable storybook illustration, large quiet space for separately rendered optical apparatus, no lettering, no signs, no diagrams, no visible object behind central glass, 16:10.” Generate the orchid separately on a transparent background if a tool supports it; otherwise draw it as vector petals.

Motion: slow hanging-light sway, a brief probe pulse, a small detector glint, and a gentle pigment fade for absorption. Do not animate a photon travelling through the object branch on a successful dark event as if the full which-path history were known. Use an abstract whole-apparatus pulse and outcome illumination instead; optional amplitude overlays remain labelled model views.

Music: 62 BPM in E minor, eight-bar sparse ambient loop. Pad E3/B3 with a low-pass filter; bell motif E5–G5–F#5–B4 spaced every two beats across two bars, followed by two bars of near silence. Use sine bells with 15 ms attack and 1.8 s decay; bus gain around 0.055. A correctly interpreted Dark gets one clear bell, Bright a neutral soft wooden tick, Absorbed a low breath-like noise with no jump scare. Do not equate “conclusive” with “good”: the absorption outcome's sound remains restrained. Contemplation or Within the Abandoned Castle are candidates from the shared playbook after audition; the procedural score is the guaranteed fallback.

## Implementation and acceptance

Scene state stores calibration, theta, known/hidden mode, preparation ID, hidden occupancy, observed outcome, submitted conclusion, and protocol choice. The player-facing view model excludes hidden occupancy until a permitted reveal. Each new trial resets to the initial state. An absorbed trial is terminal; do not continue rotating its lost amplitude back into the live arms.

Verify R(−theta)R(theta)=I on the live subspace; empty outcomes are [1,0,0,0] when aligned; all occupied rows in the table; normalization; unused state stays zero; misalignment causes false dark clicks; calibration blocks invalid inference; classifier maps B/D/A correctly; every live outcome allows progression; π/6 uniquely meets the authored thresholds. Include a test that applying an ordinary RY to both live and loss subspaces would fail, guarding against that tempting implementation mistake.

Ninety-second route: show the known-empty dark click under misalignment, align it to zero, open the three reference reports, classify Dark as conclusive and Bright as inconclusive, then compare π/4 and π/6 to show the conservation tradeoff. End on the signed report. The sentence to remember is: “A dark click can be conclusive; a bright click cannot prove the case was empty.”

Cut first: additional exhibits, 3D navigation, advanced Zeno protocols, voiceover, and a large Bayesian calculator. Keep calibration, honest evidence, and the risk/signal tradeoff visible.

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
