const WIDTH = 100;
const HEIGHT = 150;
let tiles = [];
let time = 0;
let score;
let playing;
let lost;
let notes = ["E", 'E', 'F', 'G', 'G', 'F', 'E', 'D', 'C', 'C', "D", "E", 'E', 'F', 'G', 'G', 'F', 'E', 'D', 'C', 'C', 'D', 'E', 'D', 'C', 'C'];
let noteIndex = 0;

// //Hides current game canvas and displays PianoTiles2 canvas
// document.getElementById("SwapMode1").addEventListener("click", e => {
//     let elements;
//     elements = document.getElementsByClassName("piano2");
//     for(let i = 0; i < elements.length; i++){
//         elements[i].style.display = "inline";
//     }
//     let elements2;
//     elements2 = document.getElementsByClassName("piano1");
//     for (let i = 0; i < elements2.length; i++) {
//         elements2[i].style.display = "none";
//     }
//     document.getElementById("SwapMode1").style.display = "none";
//     document.getElementById("SwapMode2").style.display = "inline";
// });

//setup canvas with p5min library
function setup() {
    let infinite = createCanvas(401, 600); //canvas width and height
    infinite.parent("infinite"); //nests canvas into div with id "infinite"
    for (let i = 0; i < 4; i++) { //inserts 4 new rows of tiles
        newRow();
    }
    score = 0; //resets score
    textAlign(CENTER); //aligns inner text to center
    playing = false;
    lost = false;
}

function draw() {
    background(51);

    for (let i = 0; i < tiles.length; i++) { //continually draws each tile
        let x = (i % 4) * WIDTH + 1;
        let y = (Math.floor(i / 4) * HEIGHT);

        fill((tiles[i] !== 0) ? ((tiles[i] === 1) ? "#FFFFFF" : "#FF0000") : "#000000");
        rect(x, y, WIDTH, HEIGHT);
    }
    if (!playing) { 
        fill("#FF0000");
        textSize(60);
        text("Hit Enter", width / 2, height / 2);
        text("To Start", width / 2, height / 2 + 100);
    }
    if (playing) {
        time++;
        fill("#FF0000");
        textSize(60);
        let t = Math.floor(time / 60) + ":" + time % 60;
        text(t, width / 2, height / 4);

    }
    if (lost) {

        document.getElementsByClassName("instructions1")[0].style.display = "flex";
        document.getElementsByClassName("info")[0].innerHTML = 'Your score is:' + score;
        noLoop(); //stops the draw loop
        fill("#FF0000");
        // textSize(60);
        // text("Game Over!", width / 2, height / 2);
        // textSize(40);
        // text("Press esc to restart!", width / 2, height / 2 + 50);
        // textSize(40);
        // text("Your score is: " + score, width / 2, height / 2 + 100);
        if (score > localStorage.getItem("beestScore")){ //saves best score to local storage
            localStorage.removeItem("beestScore");
            localStorage.setItem("bestScore", score);
        }
        let bestScore = localStorage.getItem("bestScore");
        // textSize(40);
        // text("The Best score is: " + bestScore, width / 2, height / 2 + 150);
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
    if (!playing){
        switch (keyCode) {
        case 13:
            playing = true;
        default:
            return;
        }
    }
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
            time = 0;
            document.getElementsByClassName("instructions1")[0].style.display = "none";
        case 13:
            setup();
            draw();
            loop();
            time = 0;
            document.getElementsByClassName("instructions1")[0].style.display = "none";
        default:
            return;
    }
    if (tiles[t] !== 0) {
        tiles[t] = -1;
        endGame(false);
        noteIndex = 0;
    } else {
        score++;
        newRow();
        removeRow();
        playNote();
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

// document.getElementById("start").addEventListener("click", e => {
//     playing = true;
// });

document.getElementsByClassName("instructions")[0].addEventListener("click", e => {
    e.target.style.display = "none";
    document.getElementsByTagName('h2')[0].style.backdropFilter = 'none';
    document.getElementsByClassName("instructions1")[0].style.display = "none";
})

document.getElementsByClassName("board")[0].addEventListener("click", e => {
    document.getElementsByClassName("board")[0].firstElementChild.style.display = 'none';
    document.getElementsByTagName('h2')[0].style.backdropFilter = 'none';
    document.getElementsByClassName("instructions1")[0].style.display = "none";
})
document.getElementsByClassName("header")[0].addEventListener("click", e => {
    document.getElementsByClassName("board")[0].firstElementChild.style.display = 'none';
    document.getElementsByTagName('h2')[0].style.backdropFilter = 'none';
    document.getElementsByClassName("instructions1")[0].style.display = "none";
})

function playNote(key) {
    const noteAudio = document.getElementById(notes[noteIndex]);
    noteAudio.currentTime = 0;
    noteAudio.play();
    // key.classList.add('active');
    // noteAudio.addEventListener('ended', () => {
    //     key.classList.remove('active');
    // });
    noteIndex++;
    noteIndex = (noteIndex % notes.length);
}

document.addEventListener('keydown', e => {
    if (e.repeat) return;
});