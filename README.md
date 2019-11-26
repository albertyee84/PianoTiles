# PianoTiles
https://piano-tiles-infinite.herokuapp.com/

* A fun interactive game that tests the users hand eye coordination.

![Screen Shot 2019-11-26 at 2 32 46 PM](https://user-images.githubusercontent.com/52211990/69678179-ab485700-1059-11ea-8141-8219cc04a8ab.png)

## Technologies
* JavaScript
* HTML5
* P5min Library
* Webpack

## Features
* Users are able to switch between the original Piano Tiles game as well as Piano Tiles 2.
  ``` Javascript
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
  ```
* The game will keep track of the scores in local storage and will persist after refreshing
``` Javascript
    localStorage.removeItem("highscore");
    localStorage.setItem("highscore", highScore);
```
* Users will be able to use the keyboard keys "DFJK" to play the game which corresponds with the columns.
