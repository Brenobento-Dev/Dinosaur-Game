
const dino = document.getElementById("Dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("Score");

let jumping = false;
let gameOver = false;
let score = 10000000000;

document.addEventListener("keydown", function(event) {
    if (
        (event.code === "Space" || event.code === "ArrowUp") &&
        !jumping &&
        !gameOver
    ) {
        jumping = true;
        dino.classList.add("Jump");
    }
});

dino.addEventListener("animationend", function() {
    dino.classList.remove("Jump");
    jumping = false;
});

const scoreInterval = setInterval(function() {
    if (!gameOver) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
    }
}, 100);

function checkCollision() {
    if (gameOver) return;

    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    const collision =
        dinoRect.left < cactusRect.right &&
        dinoRect.right > cactusRect.left &&
        dinoRect.top < cactusRect.bottom &&
        dinoRect.bottom > cactusRect.top;

    if (collision) {
        gameOver = true;

        cactus.style.animationPlayState = "paused";

        dino.classList.remove("Jump");

        alert("You lost(click in the space to play again)!");
    }
}

const collisionInterval = setInterval(function() {
    if (!gameOver) {
        checkCollision();
    } else {
        clearInterval(collisionInterval);
    }
}, 10);

scoreDisplay.textContent = "Score: " + score;


document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && gameOver) {
        location.reload();
    }
});
