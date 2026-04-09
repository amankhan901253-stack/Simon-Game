let gameseqvence = [];
let userseqvence = [];
let btncolor = ["red","blue","green","yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// ---------------- START GAME ----------------
function startGame() {
    if (!started) {
        console.log("game started");
        started = true;
        levelup();
    }
}

// Keyboard (PC)
document.addEventListener("keypress", startGame);

// Click (PC + Mobile)
document.addEventListener("click", startGame);

// Touch (Mobile)
document.addEventListener("touchstart", startGame);

// ---------------- FLASH EFFECTS ----------------
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 300);
}

// ---------------- LEVEL UP ----------------
function levelup() {
    userseqvence = [];
    level++;
    h2.textContent = `Level ${level}`;

    let randomnum = Math.floor(Math.random() * 4);
    let randomcolor = btncolor[randomnum];
    let randombtn = document.querySelector(`.${randomcolor}`);

    gameseqvence.push(randomcolor);

    btnFlash(randombtn);
}

// ---------------- BUTTON PRESS ----------------
function btnpress() {
    let btn = this;
    let usercolor = btn.getAttribute("id");

    userseqvence.push(usercolor);

    userFlash(btn);

    checkAns(userseqvence.length - 1);
}

// Prevent double trigger (touch + click)
function btnpressHandler(e) {
    e.preventDefault();
    btnpress.call(this);
}

// ---------------- CHECK ANSWER ----------------
function checkAns(idx) {
    if (userseqvence[idx] === gameseqvence[idx]) {

        if (userseqvence.length == gameseqvence.length) {
            setTimeout(levelup, 1000);
        }

    } else {
        h2.textContent = "❌ Game Over! Press or Tap to restart";

        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 200);

        reset();
    }
}

// ---------------- RESET ----------------
function reset() {
    started = false;
    gameseqvence = [];
    userseqvence = [];
    level = 0;
}

// ---------------- ADD EVENT LISTENERS ----------------
let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnpressHandler);
    btn.addEventListener("touchstart", btnpressHandler);
}
