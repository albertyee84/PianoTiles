let a = document.getElementById("score_bar");
let contextScore = a.getContext("2d");
let b = document.getElementById("background");
let contextBackground = b.getContext("2d");
let c = document.getElementById("piano");
let context = c.getContext("2d");

let numOfTiles = 5;
let myScore = 0;
let eachState = [false, false, false, false, false];
let myTiles = [];
let highScore = localStorage.getItem("highscore") || 0;
let interval;
let generate;
let speed = 1;

document.getElementById("SwapMode2").addEventListener("click", e => {
    document.getElementById("piano1").style.display = "inline";
    let elements2;
    elements2 = document.getElementsByClassName("piano1");
    for (let i = 0; i < elements2.length; i++) {
        elements2[i].style.display = "inline";
    }
    let elements;
    elements = document.getElementsByClassName("piano2");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    document.getElementById("SwapMode2").style.display = "none";
    document.getElementById("SwapMode1").style.display = "inline";
});

paintWindow(); 

document.getElementById("increaseSpeed").addEventListener("click", e=>{
    speed = speed + 0.25;
    if(speed > 2) speed = 2;
    console.log(speed);
});

document.getElementById("decreaseSpeed").addEventListener("click", e=>{
    speed = speed - 0.25;
    if(speed < 1) speed = 1;
    console.log(speed);
});

document.addEventListener("DOMContentLoaded", ()=>{ //loads highscore after refresh
    highscore = document.getElementById("HighScore");
    highscore.innerHTML = "Hi Score: " + highScore;
});

document.getElementById('btn').addEventListener('click', function (e) {
    content = document.getElementById('start_btn');
    if (content.innerHTML === "START") {
        generate = window.setInterval(generateBlock, 600);
        interval = window.setInterval(update, 5);
        content.innerHTML = "PAUSE";
    }
    else if(content.innerHTML === "RESTART"){
        myScore = 0;
        myTiles.forEach(tile => {
            context.clearRect(tile.x, tile.y, tile.width, tile.height);
        });
        eachState = [false, false, false, false, false];
        myTiles = [];
        content.innerHTML = "START";
    } else {
        window.clearInterval(interval);
        window.clearInterval(generate);
        content.innerHTML = "START";
    }
    highscore = document.getElementById("HighScore"); //adds highscore to html element
    highscore.innerHTML = "Hi Score: " + highScore;

});

document.addEventListener("keypress", function onPress(event) {
    content = document.getElementById('start_btn');
    if (content.innerHTML === "START") {
        generate = window.setInterval(generateBlock, 600);
        interval = window.setInterval(update, 5);
        content.innerHTML = "PAUSE";
    }
    else if (content.innerHTML === "RESTART") {
        myScore = 0;
        myTiles.forEach(tile => {
            context.clearRect(tile.x, tile.y, tile.width, tile.height);
        });
        eachState = [false, false, false, false, false];
        myTiles = [];
        content.innerHTML = "START";
    } else {
        window.clearInterval(interval);
        window.clearInterval(generate);
        content.innerHTML = "START";
    }
    highscore = document.getElementById("HighScore"); //adds highscore to html element
    highscore.innerHTML = "Hi Score: " + highScore;
});



function generateBlock() {

    let randomPosition = Math.floor(Math.random()*numOfTiles);
    let flag = true;
    for( let i = 0; i < numOfTiles; i++){
        if(!eachState[i]){
            flag = false;
        }
    }
    if(flag) return;
    while (eachState[randomPosition])
        randomPosition = Math.floor(Math.random() * numOfTiles);
    myTiles[randomPosition] = new Block(randomPosition);
}

function Block(position) {
    if(!eachState[position]){
        eachState[position] = true;
    }
    this.position = position;
    this.appearPosition = Math.floor(Math.random()*4);

    this.width = 70;
    this.height = 120;
    this.color = "black";
    switch (this.appearPosition) {
        case 0:
            this.x = 0;
            this.y = -120;
            break;
        case 1:
            this.x = 75;
            this.y = -120;
            break;
        case 2:
            this.x = 152;
            this.y = -120;
            break;
        case 3:
            this.x = 228;
            this.y = -120;
            break;
    }
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    this.live = true;

    window.addEventListener("keydown", e => {
        myTiles[position].keyCode = e.keyCode;
    });
    window.addEventListener("keyup", e => {
        myTiles[position].keyCode = false;
    });
}

function correctKeyPress(index) {
    myScore++;
    context.clearRect(myTiles[index].x, myTiles[index].y, 70, 120);
    myTiles[index].live = false;
    eachState[index] = false;
}

function update() {
    let textWidth = contextScore.measureText(myScore.toString()).width;
    contextScore.clearRect(0, 0, 300, 70);
    contextScore.font = "30px Verdana";
    contextScore.textAlign = 'center';
    contextScore.fillStyle = "rgba(88,38,255,0.8)";
    contextScore.fillText(myScore.toString(), (a.width / 2) - (textWidth / 2) + 9, 50);

    for (let i = 0; i < numOfTiles; ++i) {
        if (eachState[i]) {
            myTiles[i].y += speed;
            context.fillStyle = "black";
            context.fillRect(myTiles[i].x, myTiles[i].y, 70, 120);
            context.clearRect(myTiles[i].x, myTiles[i].y - 2, 70, 2);
        }
    }
    for (let i = 0; i < numOfTiles; ++i) {
        if (eachState[i]) {
            if (myTiles[i].y < 470 && myTiles[i].y > 350) {
                switch (myTiles[i].keyCode) {
                    case 68: //A
                        if (myTiles[i].x === 0)
                            correctKeyPress(i);
                        break;
                    case 70: //S
                        if (myTiles[i].x === 75)
                            correctKeyPress(i);
                        break;
                    case 74: //D
                        if (myTiles[i].x === 152)
                            correctKeyPress(i);
                        break;
                    case 75: //F
                        if (myTiles[i].x === 228)
                            correctKeyPress(i);
                        break;
                }
            }
            if (myTiles[i].y > 470) {
                context.clearRect(myTiles[i].x, myTiles[i].y, 70, 120);
                context.fillStyle = "rgba(245,13,13,0.8)";
                context.fillRect(myTiles[i].x, myTiles[i].y, 70, 120);
                myTiles[i].live = false;
                eachState[i] = false;
                window.clearInterval(interval);
                window.clearInterval(generate);
                content.innerHTML = "RESTART";
                if(myScore > highScore){
                    highScore = myScore;
                    localStorage.removeItem("highscore");
                    localStorage.setItem("highscore", highScore); //adds highscore to localstorage
                }
            }
        }
        else {//not alive
        }
    }
}



function paintWindow() {
    let myGradient;
    myGradient = contextBackground.createLinearGradient(0, 0, 0, 600);
    myGradient.addColorStop(0, "rgba(65,234,246,0.6)");
    myGradient.addColorStop(1, "rgba(254,74,251,0.5)");

    contextBackground.fillStyle = myGradient;
    contextBackground.fillRect(0, 0, 300, 600);

    contextBackground.beginPath();
    contextBackground.moveTo(72, 0);
    contextBackground.lineTo(72, 600);
    contextBackground.strokeStyle = "white";
    contextBackground.stroke();

    contextBackground.beginPath();
    contextBackground.moveTo(148, 0);
    contextBackground.lineTo(148, 600);
    contextBackground.strokeStyle = "white";
    contextBackground.stroke();

    contextBackground.beginPath();
    contextBackground.moveTo(226, 0);
    contextBackground.lineTo(226, 600);
    contextBackground.strokeStyle = "white";
    contextBackground.stroke();

    contextBackground.beginPath();
    contextBackground.moveTo(0, 470);
    contextBackground.lineTo(300, 470);
    contextBackground.strokeStyle = "white";
    contextBackground.stroke();
}