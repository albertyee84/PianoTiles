const WIDTH = 100;
const HEIGHT = 150;
let tiles = [];
let time;
let score;
let playing;
let lost;
let start = false;

document.getElementById("SwapMode1").addEventListener("click", e => {
    document.getElementById("piano2").style.display = "block";
    document.getElementById("piano1").style.display = "none";
    document.getElementById("SwapMode1").style.display = "none";
    document.getElementById("SwapMode2").style.display = "block";
});
function setup() {
    let infinite = createCanvas(401, 600);
    infinite.parent("infinite");
    time = 3;
    for (let i = 0; i < 4; i++) {
        newRow();
    }
    score = 0;
    textAlign(CENTER);
    playing = false;
    lost = false;
    start = false;
}

function draw() {
    background(51);

    for (let i = 0; i < tiles.length; i++) {
        let x = (i % 4) * WIDTH + 1;
        let y = (Math.floor(i / 4) * HEIGHT);

        fill((tiles[i] !== 0) ? ((tiles[i] === 1) ? "#FFFFFF" : "#FF0000") : "#000000");
        rect(x, y, WIDTH, HEIGHT);
    }
    if (!playing) {
        fill("#FF0000");
        textSize(60);
        text("Press Start", width / 2, height / 2);

        if (start) {
            time--;
            if (time === 0) {
                playing = true;
            }
        }
    }
    if (playing) {
        time++;
        fill("#FF0000");
        textSize(60);
        let t = Math.floor(time / 60) + ":" + time % 60;
        text(t, width / 2, height / 4);

    }
    if (lost) {
        noLoop();
        fill("#FF0000");
        textSize(60);
        text("Game Over!", width / 2, height / 2);
        textSize(40);
        text("Press esc to restart!", width / 2, height / 2 + 50);
        textSize(40);
        text("Your score is: " + score, width / 2, height / 2 + 100);
        if (score > localStorage.getItem("beestScore")){
            localStorage.removeItem("beestScore");
            localStorage.setItem("bestScore", score);
        }
        let bestScore = localStorage.getItem("bestScore");
        textSize(40);
        text("The Best score is: " + bestScore, width / 2, height / 2 + 150);
    }
}

function mousePressed() {
    if (!playing) return;
    if (mouseY >= 3 * HEIGHT && mouseY <= 4 * HEIGHT) {
        let t = getClickedTile(mouseX);
        if (t === -1) {
            return;
        }
        if (tiles[t] !== 0) {
            tiles[t] = -1;
            endGame(false);
        } else {
            score++;
            newRow();
            removeRow();
        }
    }
}

function keyPressed() {
    if (!playing) return;
    let t;
    switch (keyCode) {
        case 68: //D
            t = 12;
            break;
        case 70: //F
            t = 13;
            break;
        case 74: //J
            t = 14;
            break;
        case 75: //K
            t = 15;
            break;
        case 27:
            setup();
            draw();
            loop();
        default:
            return;
    }
    if (tiles[t] !== 0) {
        tiles[t] = -1;
        endGame(false);
    } else {
        score++;
        newRow();
        removeRow();
    }
}

function endGame(won) {
    if (won) {

    } else {
        lost = true;
    }

}

function getClickedTile(mouseX) {
    for (let i = 0; i < 4; i++) {
        if (mouseX >= i * WIDTH && mouseX <= (i + 1) * WIDTH) {
            return i + 12;
        }
    }
    return -1;
}

function newRow() {
    let t = Math.floor(random(4));
    for (let i = 0; i < 4; i++) {
        tiles.unshift((i === t) ? 0 : 1);
    }
}

function removeRow() {
    for (let i = 0; i < 4; i++) {
        tiles.pop();
    }
}

document.getElementById("start").addEventListener("click", e => {
    start = true;
});