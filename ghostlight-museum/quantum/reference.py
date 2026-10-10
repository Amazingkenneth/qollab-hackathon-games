"""Local Qiskit compiler/reference for Ghostlight Museum.

The browser's TypeScript model is the playable implementation. This file
provides an independently callable Qiskit circuit with the same four-state
basis order and chronological gate sequence for comparison or export.
"""

import argparse
import json
import math
import os
import sys


QOLLAB_ROOT = os.path.join(os.path.dirname(os.path.dirname(__file__)), "qollab")
if QOLLAB_ROOT not in sys.path:
    sys.path.insert(0, QOLLAB_ROOT)

from quantum.model import compile_circuit, estimate  # noqa: E402


def main():
    parser = argparse.ArgumentParser(description="Compile and preview a Ghostlight reference circuit.")
    parser.add_argument("--theta", type=float, default=math.pi / 4)
    parser.add_argument("--phase", type=float, default=0.0)
    parser.add_argument("--occupied", action="store_true")
    parser.add_argument("--draw", action="store_true", help="Print Qiskit's text circuit diagram.")
    args = parser.parse_args()
    result = {
        "basis_order": "index=q0+2*q1; displayed kets |q1 q0>",
        "theta": args.theta,
        "phase": args.phase,
        "occupied": args.occupied,
        "probabilities": estimate(args.theta, args.phase, args.occupied),
    }
    if args.draw:
        result["circuit"] = str(compile_circuit(args.theta, args.phase, args.occupied, True).draw(output="text"))
    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
