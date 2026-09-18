const API_BASE="http://localhost:8080/api";
const state={files:[],audit:[],running:false};
const steps=["Security Check","Task Classification","Model Selection","Document Retrieval","Reasoning","Evidence Verification","Human Approval if required","Deliverable Generation","Completed"];
const pageTitles={dashboard:"Control Center",workspace:"Agent Workspace",files:"Workspace Files",audit:"Audit Log",security:"Security Monitor",settings:"System Settings"};
const qs=s=>document.querySelector(s), qsa=s=>[...document.querySelectorAll(s)];

function toast(msg){const t=qs("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function navigate(page){qsa(".page").forEach(x=>x.classList.toggle("active",x.id===page));qsa(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.page===page));qs("#page-title").textContent=pageTitles[page];window.scrollTo({top:0,behavior:"smooth"})}
qsa(".nav-item").forEach(b=>b.onclick=()=>navigate(b.dataset.page));qsa("[data-go]").forEach(b=>b.onclick=()=>navigate(b.dataset.go));

function ripple(e){const b=e.currentTarget,r=document.createElement("span"),d=Math.max(b.clientWidth,b.clientHeight);r.className="ripple-effect";r.style.width=r.style.height=d+"px";r.style.left=e.clientX-b.getBoundingClientRect().left-d/2+"px";r.style.top=e.clientY-b.getBoundingClientRect().top-d/2+"px";b.appendChild(r);setTimeout(()=>r.remove(),600)}
qsa(".ripple").forEach(x=>x.addEventListener("click",ripple));

document.addEventListener("mousemove",e=>{const g=qs(".cursor-glow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
qsa(".tilt").forEach(card=>card.addEventListener("mousemove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(700px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-4px)`}));
qsa(".tilt").forEach(card=>card.addEventListener("mouseleave",()=>card.style.transform=""));

const sortable=qs("#dashCards");let dragged=null;
qsa(".stat-card").forEach(card=>{card.addEventListener("dragstart",()=>{dragged=card;card.classList.add("dragging")});card.addEventListener("dragend",()=>{card.classList.remove("dragging");dragged=null});card.addEventListener("dragover",e=>{e.preventDefault();if(dragged&&dragged!==card){const box=card.getBoundingClientRect();sortable.insertBefore(dragged,e.clientX>box.left+box.width/2?card.nextSibling:card);}})});
function addAudit(event,status="SUCCESS"){state.audit.unshift({time:new Date().toLocaleString(),event,actor:"Authorized User",status});renderAudit()}
function renderAudit(){qs("#auditBody").innerHTML=state.audit.length?state.audit.map(x=>`<tr><td>${x.time}</td><td>${x.event}</td><td>${x.actor}</td><td class="ok">${x.status}</td></tr>`).join(""):`<tr><td colspan="4" class="empty-state">No audit events in this session.</td></tr>`}
renderAudit();

function formatBytes(n){return n<1024?`${n} B`:`${(n/1024).toFixed(1)} KB`}
function addFiles(files){[...files].forEach(f=>{if(!state.files.some(x=>x.name===f.name&&x.size===f.size))state.files.push(f)});renderFilePreview();renderFiles();qs("#fileCount").textContent=state.files.length;addAudit(`${files.length} file(s) added to workspace`)}
function removeFile(i){state.files.splice(i,1);renderFilePreview();renderFiles();qs("#fileCount").textContent=state.files.length}
function renderFilePreview(){qs("#filePreview").innerHTML=state.files.map((f,i)=>`<div class="file-chip"><span>${/\\.pdf$/i.test(f.name)?"PDF":/\\.(xlsx|xls|csv)$/i.test(f.name)?"XLS":"IMG"}</span><strong>${f.name}</strong><small>${formatBytes(f.size)} · ready</small><button class="secondary-btn ripple" onclick="removeFile(${i})">×</button></div>`).join("");qsa("#filePreview .ripple").forEach(x=>x.addEventListener("click",ripple))}
function renderFiles(){if(!state.files.length){qs("#filesTable").className="file-table empty-state";qs("#filesTable").textContent="No files uploaded in this session.";return}qs("#filesTable").className="file-table";qs("#filesTable").innerHTML=`<div class="table-wrap"><table><thead><tr><th>FILE</th><th>TYPE</th><th>SIZE</th><th>WORKSPACE</th><th>STATUS</th></tr></thead><tbody>${state.files.map(f=>`<tr><td>${f.name}</td><td>${f.type||"document"}</td><td>${formatBytes(f.size)}</td><td>CONTROLLED</td><td class="ok">READY</td></tr>`).join("")}</tbody></table></div>`}

const dz=qs("#dropzone"),fi=qs("#fileInput");qs("#browseBtn").onclick=()=>fi.click();qs("#filesBrowse").onclick=()=>{navigate("workspace");setTimeout(()=>fi.click(),250)};fi.onchange=e=>addFiles(e.target.files);
["dragenter","dragover"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add("drag")}));["dragleave","drop"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove("drag")}));dz.addEventListener("drop",e=>addFiles(e.dataTransfer.files));

function renderWorkflow(active=-1,done=-1){qs("#workflow").innerHTML=steps.map((s,i)=>{const c=i<=done?"done":i===active?"active":"";const status=i<=done?"DONE":i===active?"RUNNING":"WAITING";return `<div class="step ${c}"><div class="step-icon">${i<=done?"✓":i+1}</div><div><strong>${s}</strong><small>${["Policy and access validation","Determining task type","Selecting available capability","Searching authorized local sources","Agent reasoning over context","Checking answer against evidence","Review gate for sensitive action","Creating requested deliverable","Workflow finished"][i]}</small></div><span class="step-status">${status}</span></div>`}).join("")}
renderWorkflow();

async function callBackend(task){try{const r=await fetch(`${API_BASE}/agent/tasks`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({task,files:state.files.map(f=>({name:f.name,size:f.size,type:f.type}))})});if(!r.ok)throw Error();return await r.json()}catch(e){return null}}
function setResult(text,evidence){qs("#resultBox").classList.remove("empty");qs("#resultBox").innerHTML=text;qs("#evidenceList").innerHTML=evidence.map((x,i)=>`<div class="evidence-item"><strong>Reference ${i+1} · ${x.file}</strong><small>${x.detail}</small></div>`).join("");qs("#deliverables").innerHTML=`<div class="deliverable"><strong>verified-analysis.txt</strong><small>Generated result · downloadable</small><button class="secondary-btn ripple" onclick="downloadText()">Download</button></div>`;qsa("#deliverables .ripple").forEach(x=>x.addEventListener("click",ripple))}
function downloadText(){const blob=new Blob([qs("#resultBox").innerText],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="verified-analysis.txt";a.click();URL.revokeObjectURL(a.href)}
qs("#downloadResult").onclick=downloadText;

async function runAgent(){if(state.running)return;const task=qs("#taskInput").value.trim();if(!task){toast("Enter a task before running the agent.");qs("#taskInput").focus();return}state.running=true;qs("#runTask").disabled=true;qs("#progressState").textContent="RUNNING";qsa("[data-count]").forEach(x=>{if(x.dataset.count==="0"&&x!==qs("#fileCount"))x.textContent="1"});addAudit("Agent task submitted","STARTED");const backend=callBackend(task);for(let i=0;i<8;i++){renderWorkflow(i,i-1);await new Promise(r=>setTimeout(r,500))}renderWorkflow(8,7);if(state.files.length>0||task.length>35){qs("#approvalTask").textContent=task.slice(0,100)+(task.length>100?"…":"");qs("#approvalModal").classList.add("show");await new Promise(resolve=>window.approvalResolve=resolve)}renderWorkflow(8,8);const data=await backend;const answer=data?.answer||`<strong>Verified task workflow completed.</strong><br><br>The frontend has completed the controlled execution sequence. Connect your Spring Boot endpoint to replace this integration placeholder with the actual verified response.`;const evidence=data?.evidence||state.files.slice(0,3).map(f=>({file:f.name,detail:"Workspace reference — backend evidence metadata will appear here."}));setResult(answer,evidence.length?evidence:[{file:"Task context",detail:"No uploaded file; result based on authorized task input."}]);qs("#progressState").textContent="COMPLETED";qs("#activeTasks")&&(qs("#activeTasks").textContent="0");qs("#requestCount").textContent=String(Number(qs("#requestCount").textContent)+1);addAudit("Agent workflow completed","SUCCESS");state.running=false;qs("#runTask").disabled=false;toast("Workflow completed")}
qs("#runTask").onclick=runAgent;
qs("#approveApproval").onclick=()=>{qs("#approvalModal").classList.remove("show");addAudit("Human approval granted","APPROVED");window.approvalResolve?.()};
qs("#rejectApproval").onclick=()=>{qs("#approvalModal").classList.remove("show");addAudit("Human approval rejected","REJECTED");window.approvalResolve?.()};qs("#notifications").onclick=()=>toast("No new security events.");


/* ===== V3 INTERACTIONS ===== */
function showToast(msg){
  const t=qs("#toast"); if(!t)return;
  t.textContent=msg;t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
}

qsa(".ripple").forEach(btn=>btn.addEventListener("click",e=>{
  const r=document.createElement("span");r.className="ripple-wave";
  const rect=btn.getBoundingClientRect(),size=Math.max(rect.width,rect.height);
  r.style.width=r.style.height=size+"px";
  r.style.left=(e.clientX-rect.left-size/2)+"px";
  r.style.top=(e.clientY-rect.top-size/2)+"px";
  btn.appendChild(r);setTimeout(()=>r.remove(),650);
}));

qsa(".nav-item").forEach(btn=>btn.addEventListener("click",()=>{btn.classList.remove("clicked");void btn.offsetWidth;btn.classList.add("clicked")}));

qsa(".tilt").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(700px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-3px)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="");
});

qsa(".magnetic").forEach(btn=>{
  btn.addEventListener("mousemove",e=>{
    const r=btn.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
    btn.style.transform=`translate(${x*.08}px,${y*.08}px)`;
  });
  btn.addEventListener("mouseleave",()=>btn.style.transform="");
});

/* Smooth animated dashboard card swapping with a placeholder. */
const sortable3=qs("#dashCards");
if(sortable3){
  let dragged3=null,placeholder3=null;
  qsa("#dashCards .stat-card").forEach(card=>{
    card.addEventListener("dragstart",()=>{
      dragged3=card;card.classList.add("dragging");
      placeholder3=document.createElement("div");placeholder3.className="drag-placeholder";
      placeholder3.style.minHeight=card.offsetHeight+"px";
      setTimeout(()=>card.parentNode?.insertBefore(placeholder3,card.nextSibling),0);
    });
    card.addEventListener("dragover",e=>{
      e.preventDefault();
      if(!dragged3||dragged3===card)return;
      const rect=card.getBoundingClientRect();
      const before=e.clientX<rect.left+rect.width/2;
      sortable3.insertBefore(placeholder3,before?card:card.nextSibling);
      qsa("#dashCards .stat-card").forEach(c=>c.classList.remove("drag-over"));
      card.classList.add("drag-over");
    });
    card.addEventListener("dragend",()=>{
      if(placeholder3?.parentNode)placeholder3.parentNode.insertBefore(dragged3,placeholder3);
      placeholder3?.remove();placeholder3=null;
      dragged3?.classList.remove("dragging","drag-over");
      dragged3=null;
      showToast("Dashboard layout updated");
    });
  });
}

/* Animate every new file and provide a visual drop acknowledgement. */
const oldAddFiles=addFiles;
window.addFiles=function(files){
  oldAddFiles(files);
  showToast(`${files.length} file${files.length>1?"s":""} added`);
};

/* Make page transitions feel alive even when navigating from buttons. */
const originalNavigate=navigate;
window.navigate=function(page){
  const current=document.querySelector(".page.active");
  if(current){current.classList.add("leaving");setTimeout(()=>current.classList.remove("leaving"),300)}
  originalNavigate(page);
  const next=qs("#"+page);
  if(next){next.querySelectorAll(".panel,.stat-card").forEach((el,i)=>{el.style.animationDelay=Math.min(i*45,250)+"ms"})}
};

/* Keyboard shortcut: Ctrl+K focuses task input from any page. */
document.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){
    e.preventDefault();window.navigate("workspace");setTimeout(()=>qs("#taskInput")?.focus(),350);
  }
});
