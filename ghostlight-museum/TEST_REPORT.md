# Test report

## Environment

- Bun 1.3.5 and Vite 8.3.0 ran locally.
- Python 3.6.8 was available for syntax compilation. Qiskit and NumPy were not installed.
- Firefox 115 ESR was present, but headless capture failed at the rendering layer. Playwright browser automation was not available: a Chromium download attempt failed with `ERR_TLS_CERT_ALTNAME_INVALID`.
- The project was not uploaded to Qollab, and no remote backend or hardware job was submitted.

## Run and passed

| Check | Result |
| --- | --- |
| `bun run typecheck` | Passed, exit 0. |
| `bun run test` | Passed: 16 tests, 0 failures, 108 assertions. Includes model formulas, fixture comparison, normalization, phase calibration, absorption-flag regression, hidden-state separation, classification, policy thresholds, reset/replay, and fresh-preparation ensemble behavior. |
| `bun run build` | Passed with Vite 8.3.0; production files generated in `dist/`. |
| `bun build qollab/main.js --target browser --external=quantum.model --outfile=/tmp/ghostlight-qollab-check.js` | Passed; Qollab JavaScript parsed and bundled with Python import externalized. |
| `python3 -X pycache_prefix=/tmp/ghostlight-python-cache -m py_compile quantum/reference.py qollab/quantum/model.py` | Passed syntax compilation only. This does not verify Qiskit execution. |
| Local dev-server HTTP smoke | Passed earlier in this run: served app HTML contained the game title and `/src/main.ts` entry. |
| Production preview HTTP smoke | Passed: Vite preview returned HTTP 200 for `dist/index.html` and both bundled CSS/JS assets. |

The browser model tests compare against the checked-in independent values in `../reference/expected_results.json`. The NumPy oracle script itself was not run because NumPy is unavailable.

## Not run or unavailable

- Interactive browser route, screenshots of each scene, visual overlap inspection, narrow-screen layout, keyboard and touch completion, reduced-motion behavior, muted/audio playback, and console-error inspection: **not verified**. See `logs/errors.jsonl` for capture failures.
- Qiskit circuit execution: **not run**; Qiskit is not installed.
- Qollab local backend, injected backend, IonQ, or other remote hardware: **not run**. The adapter was syntax/bundle checked only; no job or result is claimed.

## Result

Local implementation checks pass. Core physics and story-state transitions are covered by deterministic tests. Browser interaction and the quantum runtime adapter remain external-environment checks, not passing results.
