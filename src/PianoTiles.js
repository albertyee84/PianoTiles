const WIDTH = 100;
const HEIGHT = 150;
let tiles = [];
let time;
let score;

function setup() {
    createCanvas(401, 600);
    time = 0;
    for (let i = 0; i < 4; i++){
        newRow();
    }
    score = 0;
    textAlign(CENTER);
}

function draw() {
    background(51);

    for (let i = 0; i < tiles.length; i++) {
        let x = (i % 4) * WIDTH + 1;
        let y = (Math.floor(i / 4) * HEIGHT);

        fill((tiles[i] !== 0 ) ? ((tiles[i] === 1) ? "#FFFFFF" : "#FF0000") : "#000000" );
        rect(x, y, WIDTH, HEIGHT);
    }
}

function mousePressed() {
    console.log(mouseX, mouseY);
    if ( mouseY >= 3 * HEIGHT && mouseY <= 4* HEIGHT){
        let t = getClickedTile(mouseX);
        console.log(t);
        if (t === -1){
            return;
        }
        if (tiles[t] !== 0) {
            
            gameOver(t);
        } else {
            score++;
            newRow();
        }
    }
}

function gameOver(t) {
    tiles[t] = -1;
    noLoop();
    fill("#FF0000");
    textSize(60);
    text("Game Over!", width / 2, height / 2);
    textSize(40);
    text("Press f5 to restart!", width / 2, height / 2 + 50);
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