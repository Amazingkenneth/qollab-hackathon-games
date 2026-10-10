# Coherence Kitchen — autonomous prototype build guide

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

**Pitch:** Run a tiny midnight kitchen where the order of ingredients is a quantum circuit. Some dishes look identical to one taster and completely different to another. The final order is a pair of plates whose correlations matter more than either plate alone.

This is the most immediately playful concept: three customers, three compact recipes, tactile ingredient cards, warm character art, and a satisfying service animation. Its key reveal is that a phase mistake is invisible to a Z-basis taster but obvious to an X-basis taster. Project folder: coherence-kitchen; port: 5177.

The player is an apprentice at a lantern-lit food stall. Chef Miso may be an original cat character or a simple human silhouette; do not imitate a teammate's existing character without supplied permission/assets. Customers are Lark, who wants a flipped dish; Nami, who wants a specific phase flavor; and twins Sol and Ori, who want a correlated pair. These are metaphorical quantum dishes. The inspector maps every ingredient to a real gate.

Required flow: stall opening → order 1 → order 2 → shared order → service ending → recipe replay. No time limit or twitch requirement. Customer patience never penalizes reading. The game should be understandable by moving one ingredient within fifteen seconds.

## Counter layout and controls

Use 1280×800. Header y=0…56 holds shift progress, sound, notebook, and settings. The customer and order card occupy x=24…324, y=80…310. The cooking stage occupies x=344…1000, y=80…540. The taster/results rail occupies x=1024…1256. Ingredient rail and circuit slots occupy x=24…1000, y=568…704. Dialogue occupies y=720…792.

For single-plate orders, center the bowl at (650,300). Three chronological sockets are centered at (430,630), (650,630), and (870,630). The initial state |0> is shown as an empty bowl icon at the left end. Ingredient cards are 140×100 with a picture, name, and H/Z/S letter. Arrows mark left-to-right order. For the paired order, use two bowls centered (530,280) and (830,280), labelled q0 and q1, with a clear linking spoon graphic for CX.

The taster has a Z/X toggle with two distinct utensil icons and text. Under it, display exact outcome bars and an optional “Taste 64 fresh portions” histogram. The order target remains visible beside the customer's portrait. Serving uses the exact target-state fidelity and scene constraints; random taste counts are evidence, not the completion gate.

Core interactions: select ingredient; place/swap in socket; undo; reset recipe; change taster basis; preview; serve. Drag has click and keyboard equivalents. A wrong serve returns the plate to the counter with specific feedback and no lost life, ingredient, or money. Keep the ingredient inventory fixed per scene; no crafting economy or procedural recipe generation.

## Quantum ingredient dictionary

| Ingredient | Gate | Meaning in the model | Visual cue |
|---|---|---|---|
| Whisk | H | creates/recombines route amplitudes | split spiral that can rejoin |
| Mint leaf | Z | phase π on the ∣1⟩ component | arrow reversal, not extra brightness |
| Citrus zest | S=diag(1,i) | phase π/2 on the ∣1⟩ component | quarter-turn compass |
| Pairing spoon | CX(q0→q1) | controlled bit flip linking two qubits | directed link from q0 to q1 |

Use q0 as the single plate's qubit. For two plates, both begin |0>. The main art may show swirls and toppings, but the actual model is a normalized state/density matrix. Taste probabilities come from measurement in the chosen basis. Fidelity to a pure target is |<target|ψ>|² or <target|ρ|target> for mixed states.

Do not claim that a phase ingredient adds a visible classical flavor before interference. The story's “flavor” is a metaphor for measurement behavior. A phase arrow and basis-specific taster make that metaphor inspectable. A dish can have the same Z histogram as another and a different X histogram.

## Opening — The midnight shift

The stall curtain rises, a lamp turns on, and Miso sets down three ingredient cards. “The ingredients are simple. Their order is the recipe.” Start unlocks sound. The first customer's request appears in a speech bubble and as a persistent objective card. Show one brief instruction: “Swap ingredients. Preview the dish. Serve when it matches.”

## Order 1 — The flipped bowl

Lark asks: “One Night bowl, please.” Explain that Night means target |1>, while the fresh bowl starts |0>. Inventory contains exactly H,H,Z. Initial order is H,H,Z, producing |0>. Goal fidelity to |1>≥0.999 with all three ingredients used.

The unique order up to the identity of the two H cards is H,Z,H. It produces |1>. Z,H,H and H,H,Z produce |0>. The player sees a split swirl after the first H, a phase-arrow reversal if Z occurs between H gates, and a recombined filled Night bowl after the last H. If Z is used before a split, it does not create a relative phase on the initial |0>.

Wrong feedback depends on placement. Z first: “The mint arrived before there were two amplitudes to turn relative to one another.” Z last: “The whisks had already recombined the dish.” Hints: order matters; put phase change between split and recombine; use H,Z,H. Serve success produces a quick bowl slide, Lark's pleased reaction, and a notebook recipe card showing the actual gate order.

Do not require the named Whisk A rather than Whisk B in a particular socket. Test inventory count and output, not arbitrary card IDs. When a card is swapped, preserve all three cards exactly once.

## Order 2 — Two dishes that look the same

Nami asks for the minus dish |−>=(|0>−|1>)/√2. Inventory is H,S,S. Initial order is S,S,H. All three distinct placements of H give Z probabilities [1/2,1/2], so the initially selected Z taster cannot distinguish their success. The target card shows both an abstract phase-arrow motif and a small X-taster icon.

| Chronological recipe | Target ∣−⟩ fidelity | X outcome “−” probability |
|---|---:|---:|
| H,S,S | 1 | 1 |
| S,H,S | 0.5 | 0.5 |
| S,S,H | 0 | 0 |

When the player previews the starting recipe, the Z bars look plausible. Nami says: “That taster counts portions. I asked for their relation.” The player must switch to X or inspect the phase arrows, then move H first so the two quarter-turns become a half-turn on an existing superposition. The two S cards before H act on |0> and have no relevant effect.

Make the contrast unmistakable: pin the Z histogram while the player changes ingredient order, and show the X histogram beside it once unlocked. Use the same chart scales. The phase arrow on the |1> component rotates through 0, π/2, π as the S operations occur. Global phase is not scored or decorated as a different dish.

Wrong serve with Z-only reasoning: “The Z counts match, but they cannot certify this phase.” With the middle-H recipe: “You have only one quarter-turn after the split.” Hints: use the taster named on the order; count turns after H; choose H,S,S. Success line: “Same portions. Different relation.” Notebook records both histograms and the correct sequence.

## Order 3 — A table for two

Sol and Ori ask for the Bell target Φ+=(|00>+|11>)/√2. The order explains their test in ordinary language: “When both plates are tasted in the same Z basis, their results agree. When both are tasted in X, they also agree.” Neither individual plate has a predetermined outcome in both bases.

Start with H(q0), CX(q0→q1), Z(q0). This is Φ−, which agrees in ZZ but disagrees in XX. Keep H before CX as a fixed recipe backbone. The editable mint Z(q0) can occupy one of three labelled positions: before H, between H and CX, or after CX. All ingredients are used. Moving Z before H leaves the initial |00> unchanged, so the final state becomes Φ+ and meets target fidelity≥0.999. Moving Z into either later position yields Φ−. This is an order puzzle with a clear phase consequence.

Display two paired taster boards, ZZ and XX, as separate experiments on fresh pairs. Each board shows the joint outcomes 00,01,10,11 or ++,+−,−+,−−. Draw correlation links only after sampling a pair. Do not generate the two plate outcomes independently; sample the joint distribution. Individual marginal meters remain 1/2 and 1/2 for both Bell states.

| Reference preparation | ZZ agreement | XX agreement |
|---|---:|---:|
| Φ+ | 1 | 1 |
| Φ− | 1 | 0 |
| Independent ∣++⟩ | 0.5 | 1 |
| Classical equal mixture of ∣00⟩ and ∣11⟩ | 1 | 0.5 |

Include the last two rows as optional reference cards. They explain why copying a classical label or making independent plus plates does not satisfy both tests. If presenting the averaged agreement witness (pZZsame+pXXsame)/2, label the separable-state bound as 0.75 and the ideal Φ+ value as 1; do not infer exact entanglement from a tiny unqualified sample. The main local scoring remains target fidelity, avoiding a noisy certification detour.

Wrong serve on initial Φ−: “The plates agree in Z, but the phase reverses their X relation.” Hint 1 points to the X board; hint 2 points to the mint; hint 3 says to move mint before the first whisk. Miso: “A shared recipe is more than two matching bowls.” Success serves the two plates together, with the paired outcomes visualized as one joint event.

## Closing shift and replay

All three customers appear in small warm portraits along the counter. A recipe book opens to the three successful circuits. Final line: “Order. Phase. Correlation. Three ways to cook with what you cannot see directly.” Buttons: Cook again, Revisit a recipe, Inspect the quantum kitchen. The notebook can explain each metaphor in one paragraph. No claim that entanglement lets one diner signal to the other.

Free mode offers only the existing ingredients and one/two-qubit recipes. Do not expand to dozens of gates or a universal circuit editor. Preserve the approachable visual vocabulary.

## Art and animation direction

Palette: dark plum #342E42, cream #F4E5C7, persimmon #E78D65, mint #79B9A2, butter #F1CB6A. Use a hand-drawn menu style with thick readable outlines and rounded shapes. The food illustrations should look appealing at thumbnail size. Avoid photorealistic food pasted into a flat vector UI.

Asset slots: stall background, countertop foreground, chef bust, three customer portrait cards, empty/full bowls, whisk, mint, citrus, spoon, lantern. The original SVG fallback can deliver all of them with simple expressive faces and layered bowl ellipses. Keep bowl state marks and phase arrows in code so artist replacement does not change puzzle meaning.

Background prompt: “Original cozy midnight street-food stall illustration, lantern light, plum shadows, warm cream wood counter, persimmon and mint accents, cheerful hand-drawn storybook style, uncluttered central counter reserved for separate bowls and controls, no text, no menu lettering, no logos, 16:10.” Character prompt: “Original small friendly chef character, clear silhouette and three expressions neutral/thoughtful/pleased, simple rounded forms, matching plum cream persimmon palette, no text, separate transparent sprite if supported.”

Animate ingredient placement with a 120 ms bounce, whisk with a 450 ms arc, steam with three slow curves, and service with a 500 ms slide. The steam is cosmetic and never encodes a hidden phase. Show gate-by-gate arrows in an optional slow preview; otherwise finish the recipe quickly. Reduce motion to fades and static steam.

Music: 92 BPM in C major, eight-bar light groove. Bass notes C3,C3,F3,G3 on bar downbeats; plucked melody E4–G4–A4–G4 in bar 1, D4–E4–G4–E4 in bar 2, F4–A4–G4–E4 in bar 3, D4–G4–C5 in bar 4, then repeat with a softer octave variation. Use eighth-note plucks with rests, triangle bass, and a quiet brushed-noise tap on beats 2 and 4. Keep bus gain around 0.07 and avoid constant busy percussion under captions. Recipe 3 adds a second melody voice only after service, not as a hidden-state clue. SFX: ceramic tap, leaf flick, citrus tick, spoon link, gentle “not yet” wobble, and a short major service cadence. Kenney UI Audio can supply interface taps; the original score needs no external music.

## Implementation and tests

Ingredient descriptors compile directly to gates; recipe state stores card instances, socket order, target, basis selection, and current preparation. Sampling uses freshly prepared portions/pairs. Scene 3 must compute a joint two-qubit distribution and then derive marginals; separate independent coin flips would destroy the intended correlation.

Verify all recipe rows above, Z histograms for order 2, Bell target fidelity, Φ−'s opposite XX relation, independent-plus and classical-mixture comparison rows, normalization, and invariant ingredient count under swaps/undo. Check that a wrong phase is rejected even with a matching Z histogram. Check that all three customer scenes complete with muted audio and keyboard input. Serving twice must not duplicate the transition or skip the next order.

Ninety-second route: solve H,Z,H; move H in the second recipe while showing that Z bars do not change, then switch to X for the reveal; show Φ− agreeing in Z but failing X; move mint before H and serve the pair. The hook is: “The wrong dish can look perfect to the wrong taster.”

Cut first: kitchen timers, currency, upgrades, custom recipe saving, multiplayer dining, and a large ingredient collection. Keep tactile ordering, two complementary tasters, and the joint-plate finale.

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
