let gameseqvence = [];
let userseqvence = [];
let btncolor = ["red","blue","green","yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start Game
function startGame() {
    if (!started) {
        started = true;
        levelup();
    }
}

// Support all devices
document.addEventListener("click", startGame);
document.addEventListener("touchstart", startGame);
document.addEventListener("keypress", startGame);

// Flash effects
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 300);
}

// Level up
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

// Button press
function btnpress() {
    let btn = this;
    let usercolor = btn.getAttribute("id");

    userseqvence.push(usercolor);
    userFlash(btn);

    checkAns(userseqvence.length - 1);
}

// Prevent double trigger
function handler(e) {
    e.preventDefault();
    btnpress.call(this);
}

// Check answer
function checkAns(idx) {
    if (userseqvence[idx] === gameseqvence[idx]) {
        if (userseqvence.length == gameseqvence.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.textContent = "❌ Game Over! Tap to restart";

        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "#f5f5f5";
        }, 200);

        reset();
    }
}

// Reset
function reset() {
    started = false;
    gameseqvence = [];
    userseqvence = [];
    level = 0;
}

// Add events
let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", handler);
    btn.addEventListener("touchstart", handler);
}
