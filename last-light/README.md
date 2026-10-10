# Last Light — playable prototype

An offline browser game about repairing a lighthouse signal with interference. The three-scene story demonstrates phase alignment, the difference between hiding and reversing a coherent path record, and compensation for a fixed storm phase.

## Run locally

This prototype has no package or runtime dependencies. From this directory, run:

```sh
python3 -m http.server 5173
```

Open `http://localhost:5173`.

## 90-second route

1. Begin the watch, choose `0` in Repair 1, and confirm.
2. Place the `Return coil` in Repair 2 and confirm.
3. Place the `Return coil` in Repair 3, choose `3π/2`, and select `Light the harbor`.

`Preview` displays exact probabilities. `Send 64 test pulses` displays fresh sampled preparations and never gates story success. Undo, reset, progressive hints, replay, reduced motion, mute, and keyboard phase controls are included.

## Implementation

- `index.html`: semantic game structure and SVG apparatus
- `style.css`: responsive storybook visual system and animation
- `app.js`: scene reducer, exact model, sampling, feedback, and replay

The model uses `P(Harbor) = cos²(total phase / 2)` when no route record remains, while a retained record produces equal marginal outputs. Scene 3 combines the fixed `π/2` storm phase with the selected correction.
