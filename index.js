let gameseqvence = [];
let userseqvence = [];
let btncolor = ["red","blue","green","yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game
document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game started");
        started = true;
        levelup();
    }
});

// Flash for game
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

// Flash for user
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 300);
}

// Level up logic
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

// Button click
function btnpress() {
    let btn = this;
    let usercolor = btn.getAttribute("id");

    userseqvence.push(usercolor);

    userFlash(btn);

    checkAns(userseqvence.length - 1);
}

// Check answer
function checkAns(idx) {
    if (userseqvence[idx] === gameseqvence[idx]) {

        if (userseqvence.length == gameseqvence.length) {
            setTimeout(levelup, 1000);
        }

    } else {
        h2.textContent = "❌ Game Over! Press any key to restart";

        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 200);

        reset();
    }
}

// Reset game
function reset() {
    started = false;
    gameseqvence = [];
    userseqvence = [];
    level = 0;
}

// Add event listeners
let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}