# The Last Bridge — autonomous prototype build guide

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

**Pitch:** A courier must send the last memory-light across a broken valley relay. Repair the couplings, guide a coherent excitation through three sites, and discover a slower route that barely occupies the fragile middle site. Then protect the phase relationships from a storm.

This is the closest concept to a circuit-completion/transport game. Its signature moment is a probability packet arriving strongly at the far bank while the middle-site population remains small throughout the transfer. The player reads a time plot, changes physical parameters, and reasons about dynamics rather than arranging named gates. Project folder: the-last-bridge; port: 5179.

The courier, An, carries a fictional memory-light rather than a person whose body is literally split into probabilities. The valley relay is a visual metaphor for a three-site quantum transport model. The middle platform's “load” is explicitly the model's site-population constraint, not a claim that a macroscopic bridge supports a fraction of a human. The story can be poignant while the physics note stays precise.

Required flow: valley overlook → balance the relay → cross with a middle-population cap → protect coherence → far-bank homecoming → free transport lab. Three scenes, one landscape with weather variants, and one courier silhouette are enough. Do not build platformer movement or real-time jumping controls.

## Stage, control, and plot geometry

At 1280×800, header y=0…56 holds scene/setting controls. The valley occupies x=24…1000, y=80…454. The objective/evidence rail occupies x=1024…1256. A population-history plot occupies x=24…1000, y=478…604. Transport controls occupy y=622…710. Dialogue occupies y=726…792.

Place three site platforms at L=(170,300), M=(500,260), R=(830,300). Give them labelled rings and probability discs whose area, not radius, is proportional to population. Thus disc radius scales with sqrt(p). Two coupling bridges connect L–M and M–R, with editable coupling sockets at (335,315) and (665,315). A central energy-offset pillar at (500,165) represents delta. The far-bank house occupies the right background behind R, while river/fog stays behind all labels.

Use three redundant site identities: L/circle/blue, M/triangle/amber, R/square/rose. The plot has one line per population, labelled directly near the right edge, a vertical current-time cursor, and a dashed middle-population cap in scene 2. The right rail shows current P(R), maximum P(M) over the interval so far, elapsed dimensionless time, and the scene objective. Never show only the current middle population when the requirement concerns its maximum over the entire trajectory.

Controls: left/right coupling choices where unlocked; delta setting; Play/Pause; time scrubber; Reset preparation; Predict full trace; Approve relay; noise/insulation setting in scene 3. Scrubbing is labelled “simulation time,” not time travel. It recomputes the model from the initial state or uses a valid cache. A optional Sample arrival button measures a fresh preparation at the selected time and never controls progression.

Show phase arrows on the three site amplitudes only in a pure-state preview. Under dephasing, use density-matrix coherence links with magnitude labels or a “mixed state” inspector; do not invent one pure amplitude vector for a mixed state. Animation interpolates a correctly computed model trajectory; it does not move a classical glowing dot along a path and infer probabilities from that motion.

## Hamiltonian and basis encoding

Encode L as basis index 0, M as 1, R as 2, and unused as 3 on two qubits. Displayed kets are |00>,|01>,|10>,|11> in that order. These are four encoded locations/states, not one physical qubit per site. Start in L=[1,0,0,0]. In units with ħ=1, use the Hermitian matrix:

~~~text
H = [[0,   JL,  0,  0],
     [JL,  delta, JR, 0],
     [0,   JR,  0,  0],
     [0,   0,   0,  0]]
~~~

Compute U(t)=exp(−iHt) by a stable Hermitian eigendecomposition or a verified matrix exponential. Do not use unnormalized forward Euler steps. All parameters and times are dimensionless model values. The browser may use a small verified Hermitian solver or a reliable matrix library; if dependency access is unavailable, implement a tested small-matrix exponential with scaling/squaring or spectral decomposition and compare against the independent oracle. Do not approximate the transport by a hand-authored sine curve once delta/noise changes.

For JL=JR=1 and delta=0:

- P(L)=(1+cos(sqrt(2)t))²/4.
- P(M)=sin²(sqrt(2)t)/2.
- P(R)=(1−cos(sqrt(2)t))²/4.
- First perfect arrival: t=π/sqrt(2)≈2.221441.

For delta=0 with unequal couplings, maximum far-site probability is 4 JL² JR²/(JL²+JR²)². With JL=1,JR=0.5, it is 0.64 at the first maximum t=π/sqrt(1.25)≈2.809926. Waiting alone cannot make that asymmetric setup reach 0.95.

## Low-middle-population transfer

For the second scene, hold JL=JR=1 and offer delta=0 or 4. With delta=4, the middle population never exceeds 4/(delta²+8)=1/6. A strong far-site maximum occurs near t=6.4125, with P(R)≈0.9833069. The selected trajectory reaches the far bank slowly while keeping the middle population at or below about 16.7%. These numbers were checked independently by diagonalizing the Hamiltonian.

The authored goal is P(R)≥0.90 by t≤8 and max over 0≤s≤t of P(M,s)≤0.18. Delta=0 can transfer perfectly and quickly but reaches middle population 0.5, violating the cap. Delta=4 has a slower qualifying route. Accept any configuration/time satisfying the predicates; do not require the exact reference time.

For the balanced required model, compute the continuous-time middle maximum accurately: P(M,t)=4/(delta²+8)×sin²(sqrt(delta²+8)t/2). Over [0,T], use the full peak value once sqrt(delta²+8)T/2≥π/2; before that, use the endpoint value. This prevents a coarse plot from hiding an unsafe intermediate peak. The far-site probability still comes from U(t).

Describe the scene as coherent transport through a detuned intermediate site, or a tunneling-like small-system model. Do not say that the excitation “borrows energy,” jumps by teleportation, or proves a macroscopic bridge can be bypassed this way.

## Dephasing model

Scene 3 uses density matrices. For a step dt≤0.01, apply U(dt)ρU†(dt), then Dp(ρ)=(1−p)ρ+p diag(ρ), with p=1−exp(−gamma dt). This is a fully specified discrete operator-splitting model of site-basis dephasing. It leaves populations unchanged at the instant of the channel but changes subsequent coherent transport. It is not amplitude loss and is not claimed to match a particular hardware device's noise.

For time T, choose n=ceil(T/0.01), dt=T/n, and perform n steps from the initial density matrix. T=0 returns the initial state without division by zero. Advance cumulatively during play; do not reinitialize every animation frame and then apply only one tiny step. Scrubbing may recompute from the initial state deterministically. Cache by the complete parameter set, including gamma.

At balanced couplings, delta=0, and T=π/sqrt(2), reference far-site populations for that stepping convention are approximately:

| gamma | P(R) |
|---:|---:|
| 0 | 1 |
| 0.2 | 0.8580110 |
| 0.8 | 0.5804783 |
| 2 | 0.3282277 |

Maintain trace 1, Hermiticity, positive semidefiniteness within numerical tolerance, and zero unused population. Show off-diagonal coherence diminishing separately from total probability, which remains 1.

## Opening — A light on the far bank

The valley is blue-grey, with a single warm house across the gap. An holds a small lantern-shaped memory capsule. Caption: “The relay has one message left to carry.” Start reveals the three platform labels and the initial population at L. The objective states: “Design a reliable transfer. Test the model before approving the route.” Approval is an engineering/story decision based on predicted reliability, not a secretly forced successful sample.

## Scene 1 — Balance before waiting

Initial parameters JL=1,JR=0.5,delta=0. The player can choose JR=0.5 or 1 and scrub time 0…4 in steps of 0.01. Goal P(R)≥0.95. Start the time cursor at 0 and offer Play. The first trace shows probability sloshing but the far bank never reaches the threshold. The right rail includes “Best possible with this coupling: 64%,” unlocked after Predict full trace, not hidden behind repeated failure.

An: “The right span is weaker. Waiting does not make it equal.” The player changes JR to 1, resetting or explicitly recomputing the displayed trace from a fresh initial preparation. They find the first peak around 2.22. A ghost cursor can mark a requested hint time; the user still presses Approve relay.

Wrong feedback for asymmetric configuration: “This coupling imbalance caps the far-bank population at 64%.” For balanced but wrong timing: “The route is capable. Catch its arrival peak.” Hints: compare spans; match couplings; choose time near 2.22. On approval, a steady link lights the first segment of the route and the notebook records balance and timing.

## Scene 2 — The fragile middle

The middle site's amber ring develops visible cracks, but no person stands on it. Explain the new model constraint: “Middle-site population may never exceed 18% during the transfer.” Lock both couplings at 1. Offer delta=0 or 4, and a time range 0…8. Show the whole trace and historical middle maximum prominently.

The fast balanced route still arrives perfectly near 2.22 but fails because its earlier middle peak was 50%. The player raises the middle site's energy offset to 4. The animation shows a small middle disc, oscillatory phase arrows, and a much later strong R peak near 6.41. Draw no direct L–R bridge or unmodelled hopping term; the Hamiltonian still couples through M.

The critical inference is temporal: a small middle population at the final instant does not prove a low-load trajectory. On the failed fast route, highlight the earlier 50% peak in the history plot. On the detuned route, shade the entire middle trace below the 18% cap. The right rail compares arrival time, final P(R), and maximum P(M), using the same scales.

Wrong feedback if cap fails: “The middle site exceeded the limit earlier, even though it is nearly empty now.” If arrival is too early: “This gentler route transfers more slowly. Follow the far-bank trace.” Hints: change the middle energy rather than drawing a new connection; choose delta=4; inspect the peak near 6.41. Approval requires both target conditions. Notebook: “A route can transfer strongly while keeping an intermediate site only weakly populated.”

## Scene 3 — Protect the relation

The storm arrives. For a focused final comparison, explicitly switch to the reinforced fast relay: JL=JR=1,delta=0,T=π/sqrt(2). State that the middle platform has now been repaired; the previous cap no longer applies. Do not silently ignore the old constraint. The final challenge is coherence, not simultaneously re-solving the detuned route under noise.

Start with gamma=0.8. Offer three insulation settings: none/gamma0.8, partial/gamma0.2, full/gamma0. A decorative brighter-lamp control changes only artwork and is labelled as such after testing. Goal P(R)≥0.98 at the fixed arrival time. None gives about 0.5805, partial about 0.8580, full 1. The player sees that brightness does not repair dephasing; protecting phase relations does.

Show a compact density/coherence inset: populations still sum to 1, while off-diagonal links weaken under noise. Do not draw a single pure-state phase arrow for the mixed state. A side-by-side trace compares the selected noise with the ideal reference. Explain the channel in one line: “Random phase information is lost between sites; later interference changes.”

Wrong feedback with brighter lamp: “The display is brighter. The model's dephasing rate is unchanged.” With partial insulation: “Coherence lasts longer, but this route still misses the reliability target.” Hints identify the phase links, then gamma, then full insulation. Approval leads to a clearly authored narrative beam crossing, followed by the exact predicted result. If a separate sampled arrival is shown, label and sample it honestly; it is not needed to unlock the ending.

## Ending and free lab

The far-bank window answers with a warm lantern. An: “A message is more than its pieces. It needed their relation to arrive.” The notebook summarizes balance, intermediate population, and coherence. Buttons: Replay crossing, Explore transport, Inspect Hamiltonian. Free mode may unlock both couplings, delta, gamma, and time, but must retain the unused-state check and distinguish ideal from noisy results.

The story's visual light is a metaphor for a single excitation's state distribution. Include a short explanation that measuring a site's occupancy gives a discrete outcome; the plotted distribution is a model prediction across preparations. Do not render a literal half-person on multiple platforms.

## Art, landscape, and music

Palette: slate #273D4A, mist #91ABB2, amber #DAB576, muted rose #BD8793, home-light cream #FFE4A1. Favor broad silhouettes and a strong negative-space valley. The three sites and plots must remain readable against the environment. Reserve the right rail for text on opaque panels.

Assets: far mountains, river/mist midground, three platform silhouettes, courier/lantern sprite, far-bank house, storm overlay, insulation icons. Original SVG fallback uses layered mountain polygons, a curved river ribbon, platform arches, and a small cloak/lantern silhouette. Art replacement anchors match L/M/R exactly; do not let a painting imply a fourth site.

Background prompt: “Original quiet storybook mountain valley at dusk, wide river gap, distant warm house on far right, dark rocky banks at left and right, broad clear middle space for three separately rendered relay platforms, slate blue mist and muted amber accents, emotional but restrained, no bridge already spanning the gap, no text, no diagrams, 16:10.” Create storm as a separate translucent cloud/rain layer. The courier belongs on the left bank, outside the probability discs.

Animate river highlights slowly, mist in two layers, and a subtle lantern sway. Model discs and phase/coherence overlays update from computed time. Decouple visual frame rate from physics steps. Reduced motion replaces Play animation with a scrubber and static snapshots; all goals remain achievable.

Music: 66 BPM in D minor, eight-bar suspended score. Low D3/A3 pad, sparse bell motif D4–F4–A4–E5 spread over four bars, then E5–D5–A4–D4. Scene 2 slows note density rather than changing model time. Storm adds quiet filtered noise and a low A2 pulse; full insulation removes that noisy layer as a metaphor after the control changes, while visible gamma explains the real cause. Ending resolves to D4/F4/A4 with a high D5. Use 100 ms pad attack, 1.5 s release, and bus gain around 0.055. Add river ambience at low level. No loud thunder jump scares.

## Implementation and acceptance

Separate Hamiltonian construction, unitary evolution, dephasing channel, trajectory metrics, rendering, and story predicates. Cache spectra for fixed ideal parameters, and trajectories for complete noisy parameter sets. Calculate continuous middle maxima for the required balanced scene using the analytic expression above. Never let the plot's sampling resolution define the safety constraint.

Verify the ideal analytic populations at multiple times; perfect balanced arrival; asymmetric maximum0.64; delta4's far-site value near6.4125 and middle cap1/6; trace/positivity under noise; the four gamma values within about1e-5 using the specified step convention; unused population0; scrubbing and forward play agree; repeated resets do not accumulate noise; brighter-lamp control changes no model values. A shorter-step convergence check is useful if the implementation changes the integration convention; document any approximation error.

Ninety-second route: show the weak right coupling capped at64%; balance it and find the first peak; add the middle cap and expose the earlier50% load; detune to4 and scrub near6.41 for the low-middle reveal; then show dephasing and restore coherence with insulation. End on the warm far-bank window and the plotted evidence.

Cut first: free movement, terrain generation, additional sites, time-dependent adiabatic protocols, and elaborate 3D effects. Preserve the full history plot, accurate transport, and the distinction between probability conservation and coherence loss.

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
