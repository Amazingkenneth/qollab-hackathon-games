# Verification of the seven-game guide pack

Prepared 10 October 2026. This is the historical validation report for the design guides and numerical reference. It does not report execution of a game prototype. The separately maintained `ghostlight-museum/TEST_REPORT.md` records checks for the implemented Ghostlight game.

## Completed checks

- Seven standalone guides are present, each between 4,036 and 4,309 words; together they contain 29,232 words. Each includes its own autonomous-agent instruction and implementation/experience specification.
- Fourteen local Markdown links resolve within the extracted pack.
- Seventeen Markdown tables have consistent column counts, including ket notation converted to Unicode where a literal vertical bar would break a table.
- Four JSON files parse successfully: numerical fixtures, scene contracts, progress schema, and asset manifest schema. Schema files were checked for JSON syntax; no claim of an external JSON Schema validator run is made.
- All seven SVG composition maps parse and render successfully. A contact sheet was visually inspected, and the Memory Thief and Bridge maps were inspected individually after correcting the third outcome outlet and layout labels.
- The independent numerical program reference/verify_models.py ran successfully using Python 3.12.14 and NumPy 2.3.5. It generated reference/expected_results.json. Its checks cover the seven concepts' specified ideal mathematical examples and the explicitly defined bridge dephasing steps.

## Numerical examples checked

| Concept | Checked evidence |
|---|---|
| Last Light | phase-dependent path output; retained record gives 1/2; coherent uncomputation restores interference; dephasing the record before uncomputation does not |
| Palimpsest | shared interference/record model; phase compensation; card-order examples also covered by the kitchen gate-sequence checks |
| Ghostlight Museum | empty and occupied outcome distributions at three angles; calibration phase mismatch; signal/absorption tradeoff |
| The Memory Thief | identical Z likelihoods; X minimum-error success; Y provides no owner information; USD effects, positivity, completeness, zero wrong conclusive probabilities, and unitary dilation |
| Coherence Kitchen | H/Z and H/S orders; phase-sensitive target fidelities; Bell ZZ/XX correlations; independent and classical-mixture comparisons; mint placement |
| Quantum Forgery | joint acceptance for both specified strategies; four-state means; individual-copy averages; nonorthogonal overlap mismatch |
| The Last Bridge | analytic balanced transport; asymmetric cap; detuned middle population and far-site peak; density-matrix trace, Hermiticity, positivity, unused-state invariant, and noise cases |

The bridge's selected detuned reference time is 6.4125 in dimensionless units. At delta=4 and balanced unit couplings, the far-site probability is approximately 0.9833069, and the maximum middle population up to that time is approximately 0.1666667. The guide accepts any time/configuration meeting its thresholds rather than requiring this exact grid point.

## Implementation status

The guide-writing task did not implement games. The collection now includes a playable Ghostlight Museum prototype; the other six concepts remain guides and layouts. Its browser interaction, Qiskit execution, Qollab upload, and remote backend limits are documented in the prototype's test report. The design pack contains no third-party media binaries or fabricated game screenshots. Its SVG maps are annotated design references. Art and music directions in the guides are specifications; Ghostlight's original SVG/CSS art and procedural audio are implemented separately.

The NumPy oracle is intentionally independent of Qiskit and browser engines. Passing it checks the specified mathematical examples; it does not replace each implemented game's own model and interaction tests.
