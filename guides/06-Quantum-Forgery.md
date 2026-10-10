# Quantum Forgery — autonomous prototype build guide

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

**Pitch:** An apprentice in a fictional seal-printing atelier is asked to audit a machine that claims to duplicate any unknown quantum token. It looks flawless on familiar symbols. A better test reveals the difference between copying an orthogonal label and cloning an arbitrary unknown state.

Build an investigation with a deliberately tempting false conclusion. The player's final achievement is exposing the copier's limitation and producing a correct audit, not accomplishing impossible perfect cloning. The signature moment is a copier that passes both Z-basis examples, passes both-copy verification only half the time for one X-basis token, and never passes it for the other. Project folder: quantum-forgery; port: 5178.

The setting uses original moon-seal tokens, an imaginary institution, and an artisan workshop. No real currency, bank credentials, payment system, or actual counterfeiting process is involved. The master engraver, Vale, is proud of the machine; the player is its careful auditor. The tone is curious rather than accusatory.

Required flow: atelier → convincing easy tests → complementary-basis audit → alternate copier comparison → no-cloning verdict → token gallery. Three substantial investigation scenes can include the short final proof as an ending interaction. Keep the cast to Vale and the player.

## Bench and audit layout

Use 1280×800. Header y=0…56 shows test phase and settings. Workbench x=24…856, y=80…548; audit rail x=880…1256; controls y=574…704; dialogue y=720…792.

Input token sits at (150,300), blank output carrier at (150,440), copier at (430,330), outputs A and B at (690,250) and (690,440). Draw separate output wires with labels q0 original carrier and q1 blank carrier. The default copier is CX(q0→q1). A small inspector diagram beneath it shows the actual operation. Tokens have a sealed outer sleeve in live mode; their identifying state symbol is revealed only by an allowed issuer audit or in explicitly known-reference mode.

The audit rail shows the selected input family, issuer's measurement basis, expected outcome, exact joint result grid, and a “Both accepted” meter. Put individual-copy pass rates beneath that meter, visually subordinate. This prevents the player from confusing two 50% marginal success rates with an independent 25% joint probability. For entangled outputs, compute the joint distribution directly.

Controls: choose known reference 0,1,+,−; choose CNOT copier or Measure-Z/reprepare; run exact preview; send one sealed trial; sample 128 fresh tokens; choose audit conclusion; reset. A toggle clearly distinguishes “Known laboratory reference” from “Sealed random token.” Switching modes clears prior results. Optional input states outside the four-state family belong only in free mode after the story.

## Core model and correct scoring

Input q0 is uniformly chosen from |0>, |1>, |+>, |−>. Blank q1 starts |0>. The issuer knows the preparation basis and bit; the copier does not receive those classical labels in sealed mode. Default operation is CX(q0→q1). The purported two copies are then each tested against the original state ψ. Joint acceptance is the projector |ψψ><ψψ|, so probability is |<ψψ|output>|² for a pure output.

The canonical input vector is kron(blank,ψ), since q0 is the least significant qubit. The target vector is kron(ψ,ψ). For Z states the issuer measures Z; for +/- states it measures X, implemented by H on each output before computational measurement. The expected joint bit is 00 for input 0 or + and 11 for input 1 or −, in the corresponding basis.

| Input | CNOT: both copies accepted | Measure Z, prepare two results: both accepted |
|---|---:|---:|
| 0 | 1 | 1 |
| 1 | 1 | 1 |
| + | 0.5 | 0.25 |
| − | 0 | 0.25 |
| Uniform four-state average | 0.625 | 0.625 |

CNOT sends + to Φ+ and − to Φ−. For + tested in X, the output is ++ or −− with equal probability, and only ++ passes both checks. For −, the X results are +− or −+, so the required −− never occurs. Each individual copy has mean fidelity 0.75 across the four states, but joint acceptance is 0.625. Do not multiply marginal fidelities to obtain joint acceptance.

The alternative strategy measures the input in Z and prepares both output carriers in the observed Z state. It destroys the original input as part of its strategy. For X inputs each output passes with probability 1/2 and joint acceptance is 1/4. Compute this as a mixture over the Z observation, not as a coherent sum over measurement outcomes. Formally sum over m of p(m|ψ)×|<ψ|m>|⁴.

The value 0.625 describes these two specified strategies on this ensemble. It is not asserted to be the optimal forgery bound among all possible quantum machines. Do not add an “optimal universal cloner” claim without implementing and verifying a separate model.

## Scene 0 — A machine that seems too good

Vale places two blank moon seals on a velvet-lined desk. “It copies every mark I have tried.” Start reveals the machine and the two Z reference tokens. The player's task reads: “Audit the claim: can this machine copy every unknown state?” The game does not ask the player to steal or spend tokens.

## Scene 1 — The easy test that hides the problem

Only known references 0 and 1 are initially available. The player runs both through the CNOT machine. Exact both-accepted probability is 1 in each case, and actual sampled outcomes also pass deterministically in the ideal model. Animate matching symbols on the two output carriers only after verification; before that, keep them sealed.

Ask the player to choose a report: “Works on these two orthogonal references,” “Copies every possible unknown state,” or “Never copies any state.” Correct is the limited first statement. If the player selects universal copying, Vale asks, “What did we test that could disagree with that claim?” A new envelope marked “Different basis” becomes visible.

Hints: two examples are not all states; these two labels are perfectly distinguishable; report the tested scope. Success records a green check beside Z references and a blank unresolved row for X. The scene should make the tempting conclusion understandable, then leave a clear unanswered question.

## Scene 2 — The audit changes basis

Unlock + and − reference tokens and show the issuer's X-basis test. Start with +, then let the player choose −. The joint grid is essential: for +, highlight ++ and −− equally; for −, highlight +− and −+. Label both the output outcomes and the required acceptance cell. A small “one accepted / one rejected” badge on the − case makes its perfect failure of joint copying visually immediate.

Objective: find a counterexample to the universal claim and explain why both-copy acceptance fails. The − reference is the clearest deterministic counterexample, with joint acceptance 0. The + reference also refutes perfection, with probability 0.5; accept either as a scientifically valid counterexample, while the notebook specifically invites inspection of − for the stronger visual reveal.

Do not infer that the machine always returns the wrong individual state. For the − input each marginal passes with probability 1/2, but the two pass events are anticorrelated. Show a traceable sampled pair from the joint distribution. If sampling 128 fresh tokens, preserve the exact comparison so a small sample is not the sole basis of the claim.

Wrong report “Each is 50%, therefore both are 25%”: “That multiplication assumes independence. These output results are correlated.” Wrong report “The machine made two copies because both carriers exist”: “Two outputs are not the same as two correct states.” Hints progress from the required joint cell, to complementary-basis outcomes, to the − counterexample. Success stores the selected input, expected acceptance cell, actual distribution, and failure rate in an audit card.

For a sealed random token, the machine runs without state labels; only the issuer's test reveals basis/expected bit after the copying operation is committed. The same circuit and sampling code must run as in reference mode. Do not pass hidden labels to a strategy that is supposed to lack them.

## Scene 3 — Measure it first?

Vale proposes an alternative: “Then read the seal and print what you read.” Unlock Measure-Z/reprepare. Show the process as three distinct stages: destructive Z observation, classical bit on a small receipt, and two freshly prepared Z outputs. The original quantum state is no longer intact.

The player compares both strategies across the four reference states. The average both-copy acceptance is the same, 5/8, but the X-state rows differ: CNOT has 1/2 and 0; measure/reprepare has 1/4 and 1/4. Display the full table and a mean row. Ask: “Does reading first solve universal cloning?” Correct: no; measuring in Z loses the phase information needed for arbitrary unknown X states.

Wrong reasoning “Same average means same machine”: highlight the different +/- rows. Wrong reasoning “The receipt stores the whole state”: show that both + and − produce the same Z receipt distribution. Hint 1 compares the two X inputs; hint 2 notes their indistinguishable Z measurement statistics; hint 3 states that the readout is a classical bit, not a full unknown-state description.

Optional known-state control: if the issuer openly supplies a classical preparation label before production, a separate “Prepare two known states” operation can make two correct outputs. Label this as fresh preparation from a known description, not cloning an unknown token. Keep it distinct from the sealed-token challenge so it clarifies the theorem rather than seeming like an exploit.

## Final proof — What a perfect copier would have to change

Present a compact two-card argument with states a=0 and b=+. Their overlap magnitude is s=1/√2. A hypothetical perfect copier with the same blank input would map |a,0> to |a,a> and |b,0> to |b,b>. The input overlap is s; the proposed output overlap is s²=1/2. A unitary preserves inner products, so both mappings cannot hold for these nonorthogonal states.

Make this a readable interaction: the player drags the “overlap preserved” seal onto the proposed copier. Two bars labelled 0.7071 before and 0.5 after fail to align. Do not require algebra entry. The proof panel states the assumptions: arbitrary unknown input, fixed initial blank/ancilla, deterministic perfect copies. It does not prohibit copying a known classical description, cloning orthogonal states, approximate cloning, or probabilistic restricted protocols.

Final report has three completed fields: tested scope, counterexample, and corrected claim. Corrected claim: “This machine copies the tested orthogonal labels. It cannot perfectly clone every unknown quantum state.” Vale: “The flaw was not in the extra seal. It was in what we promised it could hold.” End with the atelier's machine relabelled “Reference-state demonstrator.” Buttons: Reaudit, Compare strategies, Inspect proof.

## Art, background, and sound

Palette: deep aubergine #30273D, antique gold #C8A765, parchment #EADBB9, cool cyan #72AFBB, rose #B9768D. Use original geometric moon seals rather than currency imagery. The apparatus can resemble a brass stamp press, but its operation labels remain quantum gates, not a real-world copying mechanism.

Assets: atelier background, velvet mat, stamp press silhouette, blank and sealed token frames, four openly revealed reference glyphs, Vale portrait, approval/correction stamps. Vector fallback uses concentric rings, crescent cutouts, etched lines, and a clear two-output press. The hidden token sleeve is exactly identical across inputs, including highlights and accessible names.

Background prompt: “Original illustrated artisan seal-printing atelier at night, brass tools at edges, dark aubergine velvet and warm gold lamp light, broad empty central work surface for a separate fictional apparatus, elegant geometric moon motifs only at margins, no banknotes, no real logos, no text, no labels, no diagrams, 16:10.” Generate the press and tokens separately if image tools are available; otherwise construct them as SVG with the same anchors.

Motion: press descends once, two carriers emerge, then the audit opens them. Never reveal both as identical before verification in a failed-copy case. Draw entanglement/correlation as a labelled joint-outcome connector, not as a magical beam that permits signalling. A wrong conclusion gets a pencilled correction, not an alarming red fraud banner.

Music: 84 BPM in G minor, eight-bar understated plucked loop. Bass G2–Eb3–D3–G2 on alternating bars; melody D4–G4–Bb4–A4, then G4–F4–D4 with rests. Use a short triangle pluck, muted sine bass, and one soft woodblock on selected offbeats; bus gain around 0.06. The press sound is a low wooden clack; verification uses two separate ticks so the player can attend to both outcomes. A final warm G4/Bb4/D5 chord accompanies the corrected report. Do not play a success fanfare after only one copy passes. Procedural music is the default; Kenney UI Audio can supply small interface sounds.

## Implementation and verification

Define strategies as pure transformations receiving only the permitted quantum input state and fixed blank carrier, not the secret classical state label. The issuer verifier is a separate function that receives the known preparation and evaluates outputs. For measure/reprepare, use a density matrix or explicit classical mixture. In live mode the renderer receives only a sealed view until the audit permits disclosure.

Apply the same specified operator/instrument to every input. Do not inspect numerical amplitudes, recognize a reference vector, and branch to a bespoke state-preparation routine; that would give the simulated copier forbidden classical knowledge instead of modelling the proposed physical strategy.

Test all rows in the table, both mean values, individual average fidelity 0.75 for CNOT, the − state's zero joint pass probability, and the difference between joint and marginal statistics. Verify measurement basis rotations and bitstring mapping. Test that known-state preparation is labelled separately; a hidden input label cannot alter a copier circuit; a counterexample report is accepted on exact nonunit fidelity even if one sampled trial happened to pass. Validate the overlap proof numerically without presenting it as an experiment on the actual game machine.

Ninety-second route: show perfect 0/1 copying, switch to − and reveal anticorrelated X outcomes with zero both-copy success, compare measure/reprepare's 1/4, then show the overlap bars. The memorable line is: “Two output carriers do not mean two copies of the unknown state.”

Cut first: additional copier algorithms, a large token marketplace, online verification, multiplayer, and elaborate heist scenes. Preserve the deceptive easy test, joint-outcome reveal, and corrected claim. Formal background: [IBM's limitations on quantum information lesson](https://eu-de.quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/quantum-circuits/limitations-on-quantum-information).

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
