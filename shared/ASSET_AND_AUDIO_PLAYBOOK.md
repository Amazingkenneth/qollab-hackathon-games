# Background, animation, and audio production playbook

The seven guides include individual art directions, scene prompts, layer plans, music arrangements, and sound cues. This file explains how an autonomous agent can obtain or create assets without leaving the team blocked.

## Acquisition ladder

1. Use assets explicitly supplied in the current project, preserving their credits and usage instructions.
2. Create original SVG/Canvas illustrations using the scene's palette, composition, and safe zones. This is the guaranteed complete fallback, not a temporary wireframe.
3. If a generation tool is available, generate only atmospheric painted layers or decorative character sprites. Keep puzzle geometry, UI, text, arrows, and probability marks in code.
4. Download a small number of compatible licensed assets from the sources below. Verify the individual item before bundling it. Do not spend the project searching for a perfect background.

Timebox an asset search to twenty minutes per concept, then use original procedural work. A coherent limited palette is more valuable than mismatched expensive imagery. Never require the human artists to rescue the prototype; give them clean replacement slots after it is playable.

## Verified starting points

| Source | Candidate use | Acquisition instruction |
|---|---|---|
| [Kenney Background Elements](https://kenney.nl/assets/background-elements) | clouds, landscape/structure silhouettes, environmental pieces | assemble into a new composition and recolor; download the pack |
| [Kenney UI Audio](https://kenney.nl/assets/ui-audio) | clicks, switches, menu confirmations | pick a small consistent subset; keep a local copy |
| [Poly Haven assets and license](https://polyhaven.com/license) | paper/wood/stone surface texture or a rendered environment | use actual asset downloads; preserve the source URL |
| [Contemplation — Joth](https://opengameart.org/content/contemplation-0) | quiet reflection, archive, gallery | CC0 candidate; audition and derive a short loop if suitable |
| [Deeper Sea — Umplix](https://opengameart.org/content/deeper-sea) | harbor/water mood | CC0 candidate; large source audio needs a compact derivative |
| [Within the Abandoned Castle — SpringSpring](https://opengameart.org/content/within-the-abandoned-castle) | museum/ruin ambience | CC0 candidate; preserve listed source credits and audition |

The three music items were selected from their metadata, not auditioned in this guide-writing session. Their mood descriptions are search leads, not a guarantee of fit. A fully original Web Audio score specified in each guide avoids that dependency. Reconfirm licensing at download time. The site hosting an asset and the creator of that asset are different fields in the manifest.

## Background and sprite contract

Use a 1280×800 reference composition with a 1280×560 illustration/stage layer unless the guide specifies a different inner viewport. Export opaque backgrounds at 1600×1000 or a similar modest resolution, then crop responsively. A WebP/JPEG background around 150–500 KB is usually sufficient; inspect actual quality. Avoid embedding baked-in UI, letters, fake equations, or puzzle pieces.

Suggested replacement contract: background_far, background_mid, foreground_left, foreground_right, character_idle, character_reaction, prop_static, and effect_mask. Record each asset's design size, anchor, safe crop, opacity, and stage coordinates in the scene data. Use the same anchors for fallback vectors and later artist images. Give the team a labelled contact sheet or screenshot showing those slots.

Prefer CSS transforms and SVG for fog drift, swaying lamps, paper flutter, glass glints, heat shimmer, and river flow. These effects need no downloaded animation. Use a capped number of particles and pause decorative animation when the tab is hidden. Keep physics state independent of frame rate. For sprite sheets, provide frame dimensions, frame count, pivot, frame rate, and transparent padding; validate bounds before rendering.

Generation prompts in the guides describe compositions, not an imitation of a living artist. Keep a generation record with tool, prompt, date, source references if any, and usage conditions actually supplied by the provider. Do not assign a made-up CC0 license to generated or team-owned artwork.

## Procedural score recipe

Implement a shared AudioBus with music, ambience, and SFX gains. On the first Start gesture, create/resume the context. Schedule short notes ahead of playback, with cancellation on scene exit. Use soft sine/triangle oscillators, short attack and release ramps, low-pass filtering, and conservative gain. A small compressor can prevent stacked notes from clipping; inspect levels and listen if audio output is available. If you cannot audition, state that limitation and keep levels low by design.

Each guide specifies tempo, pitch material, phrase, instrumentation, and dynamic changes. Notes may be entered as MIDI values; frequency is 440×2^((m−69)/12). One beat lasts 60/BPM seconds. Add small seeded variation only to cosmetic ambience, never to scientific outcomes. Loop phrases cleanly and vary orchestration between scenes instead of stacking seven simultaneous tracks.

SFX should acknowledge actions: pickup, valid placement, invalid placement, run, inconclusive result, confirmed observation, success, and notebook entry. Keep wrong-attempt sounds informative and gentle. A statistically inconclusive event is not a failure buzzer. Equal hypotheses must not receive different identifying motifs in a hidden trial. All clues remain available as text and graphics.

## Provenance and export

For each external or generated file, record local path, source URL, creator, license/status, acquisition date, modifications, SHA-256, and usage. Original code-generated art/audio records the responsible project role and recipe. The supplied asset manifest schema is a starting point. Include credits even when attribution is optional; it helps the team replace and audit media.

Use local assets for the browser build. For Qollab, obey the file-size and loading constraints in QOLLAB_ADAPTER.md. Inspect exported bytes, not only source files. Do not hotlink music, depend on a streaming player, or embed a random social-media image. If any acquisition fails, the game still has the complete original vector scene and procedural score.
