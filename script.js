/* =========================================================
   ELEMENTS
========================================================= */

const farStars = document.getElementById("farStars");
const midStars = document.getElementById("midStars");
const nearStars = document.getElementById("nearStars");

const fireflies = document.getElementById("fireflies");

const moon = document.getElementById("moon");

const sky = document.getElementById("sky");

/* =========================================================
   STAR GENERATOR
========================================================= */

function createStars(layer, amount, minSize, maxSize){

    for(let i = 0; i < amount; i++){

        const star = document.createElement("div");

        star.className = "star";

        const size = Math.random() * (maxSize - minSize) + minSize;

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";

        star.style.animationDuration =
            (2 + Math.random() * 5) + "s";

        star.style.animationDelay =
            Math.random() * 5 + "s";

        star.style.boxShadow = `
            0 0 ${size * 3}px white,
            0 0 ${size * 8}px rgba(255,255,255,.8),
            0 0 ${size * 14}px rgba(255,255,255,.35)
        `;

        layer.appendChild(star);

    }

}

/* Three layers */

createStars(farStars, 220, 0.5, 1.5);

createStars(midStars, 140, 1.5, 2.5);

createStars(nearStars, 80, 2.5, 4);

/* =========================================================
   FIREFLIES
========================================================= */

for(let i = 0; i < 22; i++){

    const fly = document.createElement("div");

    fly.className = "firefly";

    fly.style.left = Math.random() * 100 + "vw";

    fly.style.animationDelay =
        Math.random() * 12 + "s";

    fly.style.animationDuration =
        (8 + Math.random() * 6) + "s";

    fireflies.appendChild(fly);

}

/* =========================================================
   SHOOTING STAR
========================================================= */

function shootingStar(){

    const star = document.createElement("div");

    star.className = "shooting";

    star.style.left =
        Math.random() * window.innerWidth + "px";

    star.style.top =
        Math.random() * 220 + "px";

    sky.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },1400);

}

setInterval(shootingStar,4500);

/* =========================================================
   PARALLAX
========================================================= */

document.addEventListener("mousemove",(e)=>{

    const x =
        (e.clientX / window.innerWidth - 0.5);

    const y =
        (e.clientY / window.innerHeight - 0.5);

    farStars.style.transform =
        `translate(${x*8}px,${y*8}px)`;

    midStars.style.transform =
        `translate(${x*18}px,${y*18}px)`;

    nearStars.style.transform =
        `translate(${x*30}px,${y*30}px)`;

    moon.style.transform =
        `translate(${x*12}px,${y*12}px)`;

});

/* =========================================================
   INTRO & MEMORY NAVIGATION
========================================================= */

const intro = document.getElementById("intro");
const memories = document.getElementById("memories");

const beginBtn = document.getElementById("beginBtn");

const music = document.getElementById("music");

const memoryCards = document.querySelectorAll(".memory");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const counter = document.getElementById("counter");

let current = 0;

/* ==========================================
   SHOW MEMORY
========================================== */

function showMemory(index){

    memoryCards.forEach(card=>{

        card.classList.remove("active");

    });

    memoryCards[index].classList.add("active");

    counter.textContent = `${index+1} / ${memoryCards.length}`;

    prev.disabled = index===0;

    if(index===0){

        prev.style.opacity=".35";

    }

    else{

        prev.style.opacity="1";

    }

    if(index===memoryCards.length-1){

        next.textContent="Finish 💖";

    }

    else{

        next.textContent="Next →";

    }

}

/* ==========================================
   BEGIN BUTTON
========================================== */

beginBtn.addEventListener("click",()=>{

    if(music){

        music.volume=.35;

        music.play().catch(()=>{});

    }

    intro.classList.add("fadeOut");

    setTimeout(()=>{

        intro.style.display="none";

        memories.style.display="flex";

        showMemory(0);

    },900);

});

/* ==========================================
   NEXT BUTTON
========================================== */

next.addEventListener("click",()=>{

    if(current < memoryCards.length-1){

        memoryCards[current].classList.remove("active");

        current++;

        setTimeout(()=>{

            showMemory(current);

        },250);

    }

    else{

        memories.classList.add("fadeOut");

        setTimeout(()=>{

            memories.style.display="none";

            document.getElementById("ending").style.display="flex";

            startEnding();

        },900);

    }

});

/* ==========================================
   PREVIOUS BUTTON
========================================== */

prev.addEventListener("click",()=>{

    if(current>0){

        memoryCards[current].classList.remove("active");

        current--;

        setTimeout(()=>{

            showMemory(current);

        },250);

    }

});

/* ==========================================
   INITIAL STATE
========================================== */

showMemory(0);
/* =========================================================
   FINAL LETTER + TYPEWRITER
========================================================= */

const ending = document.getElementById("ending");
const letter = document.getElementById("letter");
const timer = document.getElementById("timer");

const finalMessage = `I honestly don't think words will ever be enough to tell you how much I love you, but I'll spend the rest of my life trying. These 365 days with you have been the most beautiful days of my life, and somehow, every day has made me fall even harder for you.
Your hugs have become my home, and your kisses have left a mark on my heart that time could never erase. Your love is everything I've ever needed, and I'm so incredibly grateful that you chose me.
I REALLY sorry for the times I haven't understood you or haven't been the boyfriend you deserve. I know I've made mistakes, but I hope you know that I try every single day to be better, because you deserve to feel the most loved, every single day.
I love you with all my heart, Akhila. More than words could ever express. If I had to choose again, I'd choose you every single time.
Happy one year, my pretty girl. I love you endlessly. ❤️
Forever and always. ❤️`;

function startEnding(){

    typeWriter();

    startCounter();

}

/* =========================================================
   TYPEWRITER
========================================================= */

function typeWriter(){

    letter.innerHTML="";

    let i=0;

    function type(){

        if(i>=finalMessage.length) return;

        if(finalMessage[i]=="\n"){

            letter.innerHTML+="<br>";

        }

        else{

            letter.innerHTML+=finalMessage[i];

        }

        i++;

        setTimeout(type,28);

    }

    type();

}

/* =========================================================
   RELATIONSHIP COUNTER
========================================================= */

/*
CHANGE THIS DATE TO YOUR ANNIVERSARY

Year, Month(0-11), Day, Hour, Minute, Second

Example:
July 5 2025

new Date(2025,6,5,0,0,0)

*/

const togetherSince = new Date(2025,6,5,23,35,0);

function startCounter(){

    updateCounter();

    setInterval(updateCounter,1000);

}

function updateCounter(){

    const now=new Date();

    let diff=now-togetherSince;

    const seconds=Math.floor(diff/1000)%60;

    const minutes=Math.floor(diff/(1000*60))%60;

    const hours=Math.floor(diff/(1000*60*60))%24;

    const days=Math.floor(diff/(1000*60*60*24));

    timer.innerHTML=`

        ❤️ ${days} Days <br>

        ⏰ ${hours} Hours

        ${minutes} Minutes

        ${seconds} Seconds

    `;

}

/* =========================================================
   FLOATING HEARTS
========================================================= */

function createHeart(){

    const heart=document.createElement("div");

    heart.innerHTML="❤️";

    heart.className="heart";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(18+Math.random()*18)+"px";

    ending.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },6000);

}

setInterval(()=>{

    if(ending.style.display==="flex"){

        createHeart();

    }

},700);