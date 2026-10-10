const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const phases=[0,Math.PI/2,Math.PI,Math.PI*1.5], labels=["0","π/2","π","3π/2"];
const scenes=[
 {title:"A light that adds to darkness",kicker:"FIRST SIGNAL",phase:2,record:false,coil:false,offset:0,dialogue:"Mara: Both routes carry light. Why is the harbor dark?",note:"Two route arrows arrive opposite. The harbor goes dark."},
 {title:"The price of a record",kicker:"THE MISSING CONTRAST",phase:0,record:true,coil:false,offset:0,dialogue:"Mara: Someone fitted a route recorder to the lens room. Since then, the beam has refused to focus.",note:"Different records: route totals add as probabilities."},
 {title:"The final adjustment",kicker:"STORM-DAMAGED LENS",phase:0,record:true,coil:false,offset:1,dialogue:"Mara: The storm left a phase in the lens. We need both a shared ending and the right arrival.",note:"The fixed storm phase is π/2. The correction must make the routes meet at Harbor."}
];
let state={scene:0,phase:2,record:false,coil:false,cloth:false,shots:null,history:[],hints:0,muted:false,reduced:false};
function model(){
 const s=scenes[state.scene]||scenes[2], total=phases[(s.offset+state.phase)%4];
 let harbor=state.record&&!state.coil?.5:Math.cos(total/2)**2;
 return {harbor,reef:1-harbor,total};
}
function render(){
 const s=scenes[state.scene], m=model();
 $("#scene-title").textContent=s.title;$("#scene-kicker").textContent=s.kicker;$("#scene-label").textContent=`REPAIR ${state.scene+1} / 3`;
 $("#progress").style.width=`${(state.scene+1)*33.333}%`;$("#phase-readout").textContent=labels[state.phase];
 $("#harbor-pct").textContent=`${Math.round(m.harbor*100)}%`;$("#reef-pct").textContent=`${Math.round(m.reef*100)}%`;
 $("#harbor-meter").style.width=`${m.harbor*100}%`;$("#reef-meter").style.width=`${m.reef*100}%`;$("#harbor-light").style.opacity=m.harbor>.95?1:.15;
 $("#model-note").textContent=m.harbor>.95?"Aligned arrows add at Harbor. The signal has a clear way through.":s.note;
 $("#dialogue").textContent=state.scene===1&&state.coil?"Mara: The return coil reverses the recorder's interaction. The routes can share an ending again.":state.scene===2&&state.coil&&state.phase===3?"Mara: Both findings hold. Now the storm phase is answered too.":s.dialogue;
 $$("#dial-buttons button").forEach((b,i)=>b.classList.toggle("active",i===state.phase));
 $("#coil").classList.toggle("active",state.coil);$("#coil").innerHTML=state.coil?"✓ Return coil placed <small>coherent reversal</small>":"＋ Return coil <small>reversible</small>";
 $("#record-device").classList.toggle("hidden-device",state.scene!==1&&state.scene!==2);$("#coil-device").classList.toggle("hidden-device",!state.coil);
 $("#record-caption").textContent=state.cloth?"record glyph hidden · mechanism unchanged":state.record?"route remembered · marker states differ":"no route record";
 $("#shot-results").classList.toggle("hidden",!state.shots);if(state.shots)$("#shot-results").textContent=`64 fresh preparations · Harbor ${state.shots.harbor} · Reef ${state.shots.reef} (sample, not used for success)`;
 $("#confirm").textContent=state.scene===2&&m.harbor>.95?"Light the harbor →":"Confirm repair →";
}
function snapshot(){state.history.push({phase:state.phase,coil:state.coil,cloth:state.cloth});if(state.history.length>8)state.history.shift()}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
function exactSuccess(){const m=model();return m.harbor>=.95&&(state.scene===0||state.scene===2?true:state.coil)}
function sample(){let m=model(),h=0;for(let i=0;i<64;i++)if(Math.random()<m.harbor)h++;state.shots={harbor:h,reef:64-h};render()}
function confirm(){
 if(!exactSuccess()){const msg=state.scene===0?"The harbor receives only "+Math.round(model().harbor*100)+"% of the predicted light. Try changing how the route arrows meet.":state.scene===1&&!state.coil?"The label is hidden, but the apparatus still holds the record. The return coil can reverse it.":state.scene===2&&!state.coil?"The route record still divides the arrivals evenly.": "The routes can interfere again. Now align their arrival arrows.";toast(msg);return}
 if(state.scene<2){toast(state.scene===0?"Repair accepted. But someone fitted a route recorder to the lens room.":"We did not persuade the light. We gave the routes the same ending.");state.scene++;state.history=[];state.phase=scenes[state.scene].phase;state.record=scenes[state.scene].record;state.coil=false;state.cloth=false;state.shots=null;render()}else{$("#game").classList.add("hidden");$("#ending").classList.remove("hidden")}
}
$("#start").onclick=()=>{$("#title-screen").classList.add("hidden");$("#game").classList.remove("hidden");render()};
$$("[data-phase]").forEach(b=>b.onclick=()=>{snapshot();state.phase=+b.dataset.phase;state.shots=null;render()});
$("#coil").onclick=()=>{if(state.scene===0){toast("There is no route record to reverse yet.");return}snapshot();state.coil=!state.coil;render()};
$("#cloth").onclick=()=>{snapshot();state.cloth=!state.cloth;toast("The cloth changes visibility only. It does not erase the record.");render()};
$("#undo").onclick=()=>{let p=state.history.pop();if(p){Object.assign(state,p);render()}else toast("Nothing to undo in this scene.")};
$("#reset").onclick=()=>{const s=scenes[state.scene];state.phase=s.phase;state.coil=false;state.cloth=false;state.shots=null;state.history=[];render();toast("Fresh preparation ready.")};
$("#preview").onclick=()=>{render();toast(`Exact preview: Harbor ${Math.round(model().harbor*100)}%, Reef ${Math.round(model().reef*100)}%.`)};
$("#shots").onclick=sample;$("#confirm").onclick=confirm;
$("#hint").onclick=()=>{state.hints++;const h=state.scene===0?["Brightness is not enough. Compare the directions of the arrows.","At the Harbor, matching directions add.","Try the 0 stop."][Math.min(state.hints-1,2)]:state.scene===1?["What else distinguishes the two routes?","The return coil reverses the recorder's interaction.","Place the coil before the light returns."][Math.min(state.hints-1,2)]:["The notebook holds two findings: contrast needs a shared ending and the right phase.","The record is reversed, but the storm phase remains.","Choose 3π/2 and place the return coil."][Math.min(state.hints-1,2)];$("#dialogue").textContent="Mara: "+h};
$("#replay").onclick=()=>{state={scene:0,phase:2,record:false,coil:false,cloth:false,shots:null,history:[],hints:0,muted:false,reduced:false};$("#ending").classList.add("hidden");$("#game").classList.remove("hidden");render()};
$("#explore").onclick=()=>{$("#ending").classList.add("hidden");$("#game").classList.remove("hidden");state.scene=2;state.record=true;state.phase=0;state.coil=false;render();toast("Explore mode: adjust the ideal apparatus freely.")};
$("#circuit").onclick=()=>toast("H → CX(record) → P(phase) → CX(return) → H");
$("#mute").onclick=()=>{state.muted=!state.muted;$("#mute").textContent=state.muted?"○":"◖";toast(state.muted?"Sound muted":"Sound enabled")};
$("#motion").onclick=()=>{state.reduced=!state.reduced;document.body.classList.toggle("reduced-motion",state.reduced);toast(state.reduced?"Reduced motion on":"Reduced motion off")};
$("#notebook").onclick=()=>toast("Notebook: Relative phase changes where light arrives. / Interference needs indistinguishable final records.");
document.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){snapshot();state.phase=(state.phase+(e.key==="ArrowRight"?1:3))%4;render()}if(e.key==="Enter"&&document.activeElement.tagName==="BUTTON")document.activeElement.click()});
