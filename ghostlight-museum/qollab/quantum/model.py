"""Four-state Ghostlight Museum circuit for Qollab's injected backend."""

import math
import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector


def live_rotation(angle):
    """Matrix for R(angle) on live basis indices 0,1 only."""
    c = math.cos(angle)
    s = math.sin(angle)
    return np.array([
        [c, -s, 0, 0],
        [s, c, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ], dtype=complex)


def compile_circuit(theta, phase, occupied, measure=False):
    """Build gates chronologically: split, phase, optional loss swap, recombine."""
    if not math.isfinite(theta) or not math.isfinite(phase):
        raise ValueError("theta and phase must be finite")
    circuit = QuantumCircuit(2, 2 if measure else 0)
    circuit.unitary(live_rotation(theta), [0, 1], label="R(theta) live")
    phase_matrix = np.diag([1, np.exp(1j * phase), 1, 1]).astype(complex)
    circuit.unitary(phase_matrix, [0, 1], label="phase delta")
    if occupied:
        # q0 + 2*q1 basis index: SWAP maps |01> to the absorbed flag |10>.
        circuit.swap(0, 1, label="probe to absorption")
    circuit.unitary(live_rotation(-theta), [0, 1], label="R(-theta) live")
    if measure:
        # Classical count strings read as |q1 q0>, matching the displayed kets.
        circuit.measure([0, 1], [0, 1])
    return circuit


def estimate(theta, phase, occupied):
    """Return exact probabilities from the same Qiskit circuit used for shots."""
    circuit = compile_circuit(theta, phase, occupied, False)
    probabilities = Statevector.from_instruction(circuit).probabilities()
    result = {
        "bright": float(probabilities[0]),
        "dark": float(probabilities[1]),
        "absorbed": float(probabilities[2]),
        "unused": float(probabilities[3]),
    }
    total = sum(result.values())
    if any((not math.isfinite(value) or value < -1e-12) for value in result.values()):
        raise ArithmeticError("invalid model probability")
    if abs(total - 1.0) > 1e-10:
        raise ArithmeticError("model probabilities do not sum to one")
    return result


def execute(backend, theta, phase, occupied, shots):
    """Run the selected parameters on the backend injected by Qollab."""
    shots = int(shots)
    if shots < 1 or shots > 10000:
        raise ValueError("shots must be between 1 and 10000")
    circuit = compile_circuit(float(theta), float(phase), bool(occupied), True)
    job = backend.run(circuit, shots=shots)
    result = job.result()
    counts = result.get_counts()
    backend_name = getattr(backend, "name", "Qollab selected backend")
    if callable(backend_name):
        backend_name = backend_name()
    operations = [
        "R(theta) on live subspace",
        "phase(delta)",
    ]
    if occupied:
        operations.append("SWAP probe into absorption flag")
    operations.extend(["R(-theta) on live subspace", "measure q0,q1 into c0,c1"])
    return {
        "source": str(backend_name),
        "shots": shots,
        "basis": "|q1 q0>",
        "counts": dict(counts),
        "probabilities": estimate(float(theta), float(phase), bool(occupied)),
        "operations": operations,
        "configuration": {
            "theta": float(theta),
            "phase": float(phase),
            "occupied": bool(occupied),
            "shots": shots,
        },
    }
