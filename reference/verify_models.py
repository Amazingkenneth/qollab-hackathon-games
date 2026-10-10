"""Independent numerical oracles for the seven prototype guides.

Run: python reference/verify_models.py
Only NumPy is required. These are mathematical checks, not evidence that any
game, Qiskit adapter, browser integration, or remote backend has been tested.
Canonical ordering: integer basis index = q0 + 2*q1 + 4*q2 + ... .
"""
from pathlib import Path
import json
import math
import numpy as np

ROOT=Path(__file__).resolve().parent
H=np.array([[1,1],[1,-1]],complex)/np.sqrt(2)
X=np.array([[0,1],[1,0]],complex)
Z=np.diag([1,-1]).astype(complex)
S=np.diag([1,1j])

def gate(g,q,n=2):
    out=np.zeros((2**n,2**n),complex)
    for j in range(2**n):
        bit=(j>>q)&1
        for b in range(2):
            i=(j&~(1<<q))|(b<<q)
            out[i,j]=g[b,bit]
    return out

def cx(control,target,n=2):
    out=np.zeros((2**n,2**n),complex)
    for j in range(2**n):
        i=j^(1<<target) if (j>>control)&1 else j
        out[i,j]=1
    return out

def pure(v):return np.outer(v,v.conj())
def probs(v):return np.abs(v)**2
def chk(a,b,tol=1e-9):assert np.allclose(a,b,atol=tol,rtol=0),(a,b)
def clean(a):return np.asarray(a).real.tolist()
def partial_dephase(rho,q):
    out=rho.copy()
    for i in range(len(rho)):
        for j in range(len(rho)):
            if ((i>>q)&1)!=((j>>q)&1):out[i,j]=0
    return out

fixtures={"metadata":{"basis_order":"index=q0+2*q1+...","tolerance":1e-9,"scope":"independent ideal mathematical checks"}}
v0=np.array([1,0,0,0],complex);Hp=gate(H,0);C=cx(0,1)
last=[]
for phase in [0,np.pi/2,np.pi,3*np.pi/2]:
    P=gate(np.diag([1,np.exp(1j*phase)]),0)
    vals=[]
    for tagged,undo in [(False,False),(True,False),(True,True)]:
        v=Hp@v0
        if tagged:v=C@v
        v=P@v
        if undo:v=C@v
        v=Hp@v
        vals.append(float(sum(probs(v)[[0,2]])))
    chk(vals,[np.cos(phase/2)**2,.5,np.cos(phase/2)**2])
    last.append({"phase":phase,"coherent_P0":vals[0],"tagged_P0":vals[1],"uncomputed_P0":vals[2]})
rho=partial_dephase(pure(C@Hp@v0),1)
u=Hp@C;rho=u@rho@u.conj().T
chk(sum(np.diag(rho).real[[0,2]]),.5)
fixtures['last_light_and_palimpsest']={"phase_cases":last,"measured_record_then_uncompute_P0":.5,"palimpsest_fixed_phase_pi_over_2_corrective_phase":3*np.pi/2}

def rot(theta):return np.array([[np.cos(theta),-np.sin(theta)],[np.sin(theta),np.cos(theta)]],complex)
def live_rotation(theta):
    u=np.eye(4,dtype=complex);u[:2,:2]=rot(theta);return u
absorber=np.eye(4,dtype=complex);absorber[[1,2]]=absorber[[2,1]]
ghost=[]
for theta in [np.pi/12,np.pi/6,np.pi/4]:
    start=live_rotation(theta)@v0
    empty=live_rotation(-theta)@start
    occupied=live_rotation(-theta)@absorber@start
    p=probs(occupied)
    expected=[np.cos(theta)**4,(np.sin(theta)*np.cos(theta))**2,np.sin(theta)**2,0]
    chk(probs(empty),[1,0,0,0]);chk(p,expected)
    ghost.append({"theta":theta,"empty":clean(probs(empty)),"occupied_bright_dark_absorbed_unused":clean(p)})
fixtures['ghostlight_museum']={"cases":ghost,"gentle_setting_theta":np.pi/6,"gentle_target":{"dark_min":.18,"absorb_max":.30}}
calibration=[]
for delta in [0,np.pi/2,np.pi,3*np.pi/2]:
    phase=np.diag([1,np.exp(1j*delta),1,1])
    p=probs(live_rotation(-np.pi/4)@phase@live_rotation(np.pi/4)@v0)
    chk(p[1],np.sin(delta/2)**2)
    calibration.append({'delta':delta,'empty_dark':float(p[1])})
fixtures['ghostlight_museum']['calibration']=calibration

memory=[]
for theta in [np.pi/12,np.pi/8,np.pi/6,np.pi/4]:
    a=np.array([np.cos(theta),np.sin(theta)],complex)
    b=np.array([np.cos(theta),-np.sin(theta)],complex)
    overlap=float(np.cos(2*theta));mu=1/(1+overlap)
    aperp=np.array([np.sin(theta),-np.cos(theta)],complex)
    bperp=np.array([np.sin(theta),np.cos(theta)],complex)
    ea=mu*pure(bperp);eb=mu*pure(aperp);eq=np.eye(2)-ea-eb
    effects=[ea,eb,eq];chk(sum(effects),np.eye(2))
    assert all(np.linalg.eigvalsh(e).min()>-1e-10 for e in effects)
    usd_a=[float(np.vdot(a,e@a).real) for e in effects]
    usd_b=[float(np.vdot(b,e@b).real) for e in effects]
    chk(usd_a,[1-overlap,0,overlap]);chk(usd_b,[0,1-overlap,overlap])
    vx=np.array([np.sqrt(mu)*bperp,np.sqrt(mu)*aperp,[np.sqrt(max(0,2*overlap/(1+overlap))),0],[0,0]],complex)
    chk(vx.conj().T@vx,np.eye(2))
    # Complete the isometry with a stable orthogonal null-space basis. A naive
    # single-pass Gram-Schmidt is ill-conditioned at the orthogonal endpoint.
    _,_,vh=np.linalg.svd(vx.conj().T,full_matrices=True)
    unitary=np.column_stack([vx,vh.conj().T[:,2:]])
    chk(unitary.conj().T@unitary,np.eye(4))
    chk(probs(unitary@np.r_[a,[0,0]]),usd_a+[0])
    xgood=float(abs(np.vdot(np.array([1,1])/np.sqrt(2),a))**2)
    chk(xgood,.5*(1+np.sin(2*theta)))
    chk(probs(a),probs(b))
    yplus=np.array([1,1j])/np.sqrt(2)
    chk(abs(np.vdot(yplus,a))**2,.5);chk(abs(np.vdot(yplus,b))**2,.5)
    chk(probs(np.array([1,1])/np.sqrt(2)),[.5,.5])
    memory.append({"theta":theta,"overlap":overlap,"Z_best_guess":.5,"X_Helstrom_success":xgood,"USD_A":usd_a,"USD_B":usd_b,"USD_unitary_real":unitary.real.tolist()})
fixtures['memory_thief']={"cases":memory}

ket0=np.array([1,0],complex);plus=H@ket0;minus=Z@plus
def sequence(gs):
    v=ket0.copy()
    for g in gs:v=g@v
    return v
kitchen={}
for name,gs in [('H_Z_H',[H,Z,H]),('Z_H_H',[Z,H,H]),('H_H_Z',[H,H,Z])]:
    kitchen[name]=clean(probs(sequence(gs)))
chk(kitchen['H_Z_H'],[0,1]);chk(kitchen['Z_H_H'],[1,0]);chk(kitchen['H_H_Z'],[1,0])
for name,gs,expected in [('H_S_S',[H,S,S],1),('S_H_S',[S,H,S],.5),('S_S_H',[S,S,H],0)]:
    f=float(abs(np.vdot(minus,sequence(gs)))**2);chk(f,expected);kitchen[name+'_minus_fidelity']=f
bell=C@Hp@v0;Hm=gate(H,1)@Hp
for name,v in [('bell_plus',bell),('bell_minus',gate(Z,0)@bell)]:
    kitchen[name]={'ZZ_same':float(sum(probs(v)[[0,3]])),'XX_same':float(sum(probs(Hm@v)[[0,3]]))}
chk(kitchen['bell_plus']['XX_same'],1);chk(kitchen['bell_minus']['XX_same'],0)
for name,rho in [('independent_plus',pure(np.kron(plus,plus))),('classical_equal_mixture',np.diag([.5,0,0,.5]))]:
    pz=np.diag(rho).real;px=np.diag(Hm@rho@Hm.conj().T).real
    kitchen[name]={'ZZ_same':float(sum(pz[[0,3]])),'XX_same':float(sum(px[[0,3]]))}
chk(list(kitchen['independent_plus'].values()),[.5,1])
chk(list(kitchen['classical_equal_mixture'].values()),[1,.5])
for name,gs in [('mint_before_H',[gate(Z,0),Hp,C]),('mint_between_H_CX',[Hp,gate(Z,0),C]),('mint_after_CX',[Hp,C,gate(Z,0)])]:
    v=v0.copy()
    for g in gs:v=g@v
    f=float(abs(np.vdot(bell,v))**2);kitchen[name+'_bell_plus_fidelity']=f
chk([kitchen[n+'_bell_plus_fidelity'] for n in ['mint_before_H','mint_between_H_CX','mint_after_CX']],[1,0,0])
fixtures['coherence_kitchen']=kitchen

forgery=[]
for name,psi in [('0',ket0),('1',X@ket0),('+',plus),('-',minus)]:
    out=C@np.kron(ket0,psi);target=np.kron(psi,psi)
    both=float(abs(np.vdot(target,out))**2)
    rho=pure(out);projector=pure(psi)
    original_pass=float(np.trace(rho@np.kron(np.eye(2),projector)).real)
    blank_pass=float(np.trace(rho@np.kron(projector,np.eye(2))).real)
    reprepare=0
    for m in [ket0,X@ket0]:
        weight=float(abs(np.vdot(m,psi))**2)
        reprepare+=weight*float(abs(np.vdot(psi,m))**4)
    forgery.append({'input':name,'CNOT_both_pass':both,'CNOT_original_pass':original_pass,'CNOT_blank_pass':blank_pass,'measure_Z_reprepare_both_pass':reprepare})
chk([r['CNOT_both_pass'] for r in forgery],[1,1,.5,0])
chk(np.mean([r['CNOT_both_pass'] for r in forgery]),.625)
chk(np.mean([r['measure_Z_reprepare_both_pass'] for r in forgery]),.625)
chk(np.mean([r['CNOT_original_pass'] for r in forgery]),.75)
chk(np.mean([r['CNOT_blank_pass'] for r in forgery]),.75)
fixtures['quantum_forgery']={"cases":forgery,"both_pass_mean":.625,"claim_scope":"these specified strategies only; not an optimal counterfeiting bound","nonorthogonal_overlap":1/np.sqrt(2),"hypothetical_cloned_overlap":.5}

def bridge_h(jl=1,jr=1,delta=0):return np.array([[0,jl,0,0],[jl,delta,jr,0],[0,jr,0,0],[0,0,0,0]],complex)
def evolution(ham,t):
    w,v=np.linalg.eigh(ham);return (v*np.exp(-1j*w*t))@v.conj().T
def bridge_prob(t,jl=1,jr=1,delta=0):return probs(evolution(bridge_h(jl,jr,delta),t)@v0)
ideal_time=np.pi/np.sqrt(2);chk(bridge_prob(ideal_time),[0,0,1,0])
for t in np.linspace(0,5,41):
    c=np.cos(np.sqrt(2)*t)
    chk(bridge_prob(t),[(1+c)**2/4,.5*np.sin(np.sqrt(2)*t)**2,(1-c)**2/4,0])
    chk(bridge_prob(t,delta=4)[1],4/24*np.sin(np.sqrt(24)*t/2)**2)
asym_time=np.pi/np.sqrt(1.25);chk(bridge_prob(asym_time,jr=.5)[2],.64)
times=np.linspace(0,10,20001)
barrier_probs=np.array([bridge_prob(t,delta=4) for t in times])
# First broad transfer maximum with a meaningful dwell-time ceiling.
mask=(times>=5)&(times<=8)
idx=np.flatnonzero(mask)[np.argmax(barrier_probs[mask,2])]
barrier_time=float(times[idx]);peak=float(barrier_probs[idx,2]);middle_max=float(barrier_probs[:idx+1,1].max())
assert peak>.90 and middle_max<=.18
def dephased(t,gamma,jl=1,jr=1,delta=0,dt=.01):
    rho=pure(v0);steps=max(1,int(np.ceil(t/dt)));step=t/steps;u=evolution(bridge_h(jl,jr,delta),step);p=1-np.exp(-gamma*step)
    for _ in range(steps):
        rho=u@rho@u.conj().T;rho=(1-p)*rho+p*np.diag(np.diag(rho))
    chk(np.trace(rho),1);chk(rho,rho.conj().T)
    assert np.linalg.eigvalsh(rho).min()>-1e-9
    chk(rho[3,3],0)
    return np.diag(rho).real
noise_cases=[]
for gamma in [0,.2,.8,2]:noise_cases.append({'gamma':gamma,'at_ideal_time':clean(dephased(ideal_time,gamma))})
fixtures['last_bridge']={"balanced_time":ideal_time,"balanced_probs":clean(bridge_prob(ideal_time)),"asymmetric_time":asym_time,"asymmetric_best_PR":.64,"barrier_delta":4,"barrier_reference_time":barrier_time,"barrier_probs":clean(barrier_probs[idx]),"barrier_middle_max_so_far":middle_max,"noise_dt":.01,"noise_cases":noise_cases}

(ROOT/'expected_results.json').write_text(json.dumps(fixtures,indent=2)+'\n')
print(json.dumps({'verified_models':7,'fixtures':str(ROOT/'expected_results.json'),'bridge_barrier_time':barrier_time,'bridge_barrier_PR':peak,'bridge_middle_max':middle_max,'noise_cases':noise_cases},indent=2))
