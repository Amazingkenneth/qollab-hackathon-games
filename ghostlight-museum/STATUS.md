# Build status

**Milestone:** M5 handoff complete. The local game, production build, tests, Qollab source export, and handoff records are present.

- **Launch:** from this folder, run `bun install --frozen-lockfile && bun run dev`, then open `http://localhost:5175`.
- **Last passing checkpoint:** `bun run typecheck && bun run test && bun run build` (exit 0; 16 tests, 108 assertions, production build generated). The Qollab JavaScript bundle and Python syntax checks also passed.
- **Owner:** supervisor/integrator; model, experience, and QA roles were completed sequentially in this run.
- **Open verification limits:** browser interaction and screenshots could not be verified in the available browser environment. Qiskit was unavailable, and the Qollab adapter was not uploaded or run against a backend. See [TEST_REPORT.md](TEST_REPORT.md).
- **Fallbacks:** original inline SVG/CSS art and procedural Web Audio; the browser model remains self-contained; Qollab source is a separate documented export.
- **Known issues:** none found in model, state-flow, typecheck, or build checks. Browser-only layout, keyboard, touch, and audio behavior still need a real browser pass.

## Gate record

| Gate | Result | Evidence |
| --- | --- | --- |
| M0 contract | Passed | `README.md`, `DECISIONS.md` |
| M1 physics | Passed | `tests/model.test.ts`, `reference/expected_results.json` fixtures |
| M2 complete flow | Passed in reducer checks | `tests/state.test.ts` |
| M3 presentation | Implemented; browser visual QA unavailable | `src/ui/render.ts`, `src/style.css`, `src/audio/audio.ts` |
| M4 repair and QA | Local checks passed; browser checks unverified | `TEST_REPORT.md`, `logs/errors.jsonl` |
| M5 handoff | Passed | `README.md`, `DEMO.md`, `TEST_REPORT.md`, `ASSET_CREDITS.md` |
