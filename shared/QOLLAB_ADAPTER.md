# Qollab adapter and evidence plan

These instructions supplement the local browser prototype. They are an integration plan, not evidence that a Qollab upload has been tested. Documentation was consulted during preparation of this pack on 10 October 2026. Recheck it when implementing.

## Documented platform constraints

[Runtime documentation](https://qollab.xyz/learn/docs/runtime-environment): Qollab uses top-level index.html and main.js, with optional main.css. HTML is body content; script tags there do not execute. Python runs through Pyodide with Qiskit available and an injected backend. Platform storage/network restrictions differ from an ordinary browser app: no persistent browser storage, GET/CORS restrictions, and no POST, WebSockets, or workers. Individual project files have a 2 MB limit. JavaScript cannot fetch project data using ordinary relative URLs; Python can read project files and return data. IonQ execution permits one job per run, while the local backend permits more.

[JavaScript/Qiskit documentation](https://qollab.xyz/learn/docs/js-qiskit-projects): Python project modules can be imported from JavaScript with dotted module names. Python functions are called asynchronously through callPromising; returned Python objects can be converted using toJs. Follow the documented bridge rather than substituting a Node/Python subprocess interface.

## Proposed architecture

Use the same scene data, configuration values, outcome labels, and model conventions in two front ends:

1. Local browser build: exact model and honest seeded sampling run in JavaScript. This is the main prototype, available without accounts or hardware.
2. Qollab export: a compact bundle renders the same scenes. A separate adapter passes the player's committed configuration to a Python circuit compiler and displays returned backend counts as evidence.

Create an adapter boundary with initialize, compile, estimate, execute, and cancelDisplay methods. CancelDisplay may merely mark a stale result as obsolete; do not claim to cancel a paid/remote job unless the platform actually supports cancellation. Return objects with source, configurationHash, basis, shots, counts, probabilities, circuitDescription, error, and backendLabel. Exact estimates and sampled counts occupy different fields.

Use a configuration hash to prevent a response for an earlier circuit appearing beside a later layout. Disable the remote Run button while its one allowed execution is pending or spent. Keep local scene controls usable and show the configuration that produced the evidence. Never silently run a second remote experiment, assume credit replenishment, or substitute simulator output with a hardware label.

## Export procedure

Build the local experience first, then implement the adapter before final handoff. Keep the export small: inline critical SVG, CSS, scene data, and a small procedural score. Avoid service workers, runtime CDN dependencies, and browser-storage-based progress in the export. In-memory progress is enough for the short prototype. If binary assets require conversion, use the documented Python file-reading route or appropriately small inlined data; do not guess that relative JavaScript fetch will work.

Produce one top-level HTML fragment, one executable JavaScript entry, optional CSS, and the Python package. Do not upload a generated Vite index file containing unsupported module/script assumptions. Check every export file's byte size. Keep an automated size report with the build. If a background exceeds the cap, resize/re-encode or use the original vector fallback. For audio, a short locally encoded loop or procedural music is sufficient.

The Python compiler must receive the actual player's values. Reconstruct the circuit from explicit operations and parameters, not from a winning preset. If a control is unsupported in the remote route, visibly mark that limitation and keep its local explanation accurate. Output a human-readable circuit or operation list for inspection. Respect basis order index=q0+2*q1 and translate count strings deliberately.

## Circuit mapping by concept

| Prototype | Compact ideal experiment | Measurement/evidence | Important limit |
|---|---|---|---|
| Last Light | H on path, optional path→record CX, P(phi), optional second CX, H | path marginal in Z; sum over record | discarded/dephased record needs a channel, not a pure state shortcut |
| Palimpsest | compile valid panel sockets to H/P/CX | final route histogram and circuit order | decorative panel overlap is not an operation |
| Ghostlight Museum | live-subspace rotation, optional absorber SWAP, inverse live rotation | 00 bright, 01 dark, 10 absorbed, 11 unused | implement the full four-dimensional unitary; do not rotate lost amplitude back |
| Memory Thief | state preparation plus basis change; USD uses a four-dimensional unitary dilation | X for minimum error; three outcome codes for USD | USD input preparation differs by hypothesis; never confuse a known reference trial with a secret instance |
| Coherence Kitchen | compile ingredient sequence; Bell recipe adds CX | Z or X basis on fresh preparations | one Z histogram does not certify a relative phase or Bell target |
| Quantum Forgery | prepare selected reference token, apply copier, measure both in issuer's basis | joint both-pass outcome | joint success is not the product of separately measured marginals |
| The Last Bridge | compute ideal exp(-iHt), append as a two-qubit unitary, transpile as required | site probabilities in Z | local dephasing model is separate from a particular device's noise |

For Ghostlight and Bridge, the four basis states encode a small logical space; they do not represent two independent physical paths each. A generic unitary gate may need transpilation into the backend's supported gate set. Record compilation failure honestly and retain the local experience.

For Memory Thief USD, use the explicit isometry in its guide, complete the orthonormal columns with an SVD/null-space method, and verify U†U=I. For controlled live rotations, use a tested matrix or correct control-on-zero construction; an ordinary unconditional RY on q0 will also rotate the loss subspace and is incorrect.

## One remote execution, useful demo

The safest presentation plan uses local exact previews and local sampling throughout the story, then one final chosen reference circuit for remote evidence if access is available. Choose the circuit before submitting; do not spend the job on tutorial navigation. For phase-sensitive claims, include the appropriate basis rotation in that circuit. If the complete scientific claim requires multiple settings, the single remote run demonstrates only the chosen setting; the rest remains supported by the local model and reference tests.

Label the remote result with backend, shots, basis, circuit/configuration, and error bars or a plain finite-sample caveat. Hardware disagreement is a chance to discuss noise, not a reason to relabel a prediction as measured data. No remote execution is necessary to complete the local story.

## Verification checklist

Run the Python reference locally if Qiskit is available. Compare its ideal probabilities with the supplied independent NumPy fixtures. Verify the export starts in Qollab, all three scenes are reachable, assets load, sound can be muted, reset works, and the backend button receives actual player parameters. Test backend rejection or timeout as an ordinary recoverable state.

If Qollab cannot be accessed in the building environment, provide the adapter, export folder, upload instructions, and an explicit “Qollab integration not executed here” entry in TEST_REPORT.md. Do not invent a deployed URL. Keep the locally tested browser build as the reliable handoff.
