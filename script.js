// ===== CRITICAL LOGIC: how quiz runs =====
let current=0, score=0, active=[];

function startQuiz(set){
active = [...set].sort(() => Math.random() - 0.5);
  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";
  document.getElementById("homeBtn").style.display="inline";
  showQuestion();
}

function showQuestion(){
  let q=active[current];
  document.getElementById("question").textContent=q.q;
  let box=document.getElementById("options");
  box.innerHTML="";
  q.a.sort(()=>Math.random()-0.5); // randomize order
  q.a.forEach(opt=>{
    let b=document.createElement("button");
    b.textContent=opt; b.className="option-btn";
    b.onclick=()=>check(b,opt===q.c,q.c);
    box.appendChild(b);
  });
}

// === highlight correct answer for 1 sec before moving next ===
function check(btn,correct,correctAnswer){
  let all=document.querySelectorAll(".option-btn");
  all.forEach(b=>b.disabled=true); // disable all
  btn.classList.add(correct?"correct":"wrong");

  // always show correct one for learning
  all.forEach(b=>{ if(b.textContent===correctAnswer) b.classList.add("correct"); });

  if(correct)score++;

  setTimeout(()=>{
    current++;
    current<active.length?showQuestion():showResult();
  },1000); // wait 1 second
}

function showResult(){
  document.getElementById("quiz").innerHTML=
    `<h2>You got ${score} out of ${active.length}!</h2>
     <button onclick="goHome()">Back Home</button>`;
}

function goHome(){
  document.getElementById("home").style.display="block";
  document.getElementById("quiz").style.display="none";
  document.getElementById("homeBtn").style.display="none";
}