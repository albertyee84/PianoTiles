
const WIDTH = 100;
const HEIGHT = 150;
let tiles = [];
let time;
let score;
let playing;
let lost;

function setup() {
    createCanvas(401, 600);
    time = 3;
    for (let i = 0; i < 4; i++){
        newRow();
    }
    score = 0;
    textAlign(CENTER);
    playing = false;
    lost = false;
}

function draw() {
    background(51);

    for (let i = 0; i < tiles.length; i++) {
        let x = (i % 4) * WIDTH + 1;
        let y = (Math.floor(i / 4) * HEIGHT);

        fill((tiles[i] !== 0 ) ? ((tiles[i] === 1) ? "#FFFFFF" : "#FF0000") : "#000000" );
        rect(x, y, WIDTH, HEIGHT);
    }
    if (!playing) {
        fill("#FF0000");
        textSize(60);
        text(time, width / 2, height / 2);

        if (frameCount % 60 === 0) {
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
        text(t, width / 2, height  / 4);

    }
    if (lost) {
        noLoop();
        fill("#FF0000");
        textSize(60);
        text("Game Over!", width / 2, height / 2);
        textSize(40);
        text("Press f5 to restart!", width / 2, height / 2 + 50);
        textSize(40);
        text("Your score is: " + score, width / 2, height / 2 + 100);
    }
}

function mousePressed() {
    if(!playing) return;
    if ( mouseY >= 3 * HEIGHT && mouseY <= 4* HEIGHT){
        let t = getClickedTile(mouseX);
        if (t === -1){
            return;
        }
        if (tiles[t] !== 0) {
            tiles[t] = -1;
            endGame(false);
        } else {
            score++;
            newRow();
        }
    }
}

function keyPressed() {
    if (!playing) return;
    let t;
        switch(keyCode){
            case 68:
                t = 12;
                break;
            case 70:
                t = 13;
                break;
            case 74:
                t = 14;
                break;
            case 75:
                t = 15;
                break;
            case 27:
                setup();
            default:
                return;
        }
    if (tiles[t] !== 0) {
        tiles[t] = -1;
        endGame(false);
    } else {
        score++;
        newRow();
    }
}

function endGame(won) {
    if (won) {

    } else {
        lost = true;
    }
    
}

function getClickedTile(mouseX) {
    for ( let i = 0; i < 4; i++) {
        if( mouseX >= i * WIDTH && mouseX <= (i + 1) * WIDTH){
            return i + 12;
        }
    }
    return -1;
}

function newRow() {
    let t = Math.floor(random(4));
    for (let i = 0; i < 4; i++) {
        tiles.unshift(( i === t ) ? 0 : 1);
    }
}