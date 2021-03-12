"use strict";

// --------- GUI
let board = document.getElementById("space");
let context = board.getContext("2d");
let border = "Black";
let background = "Blue";

// Desenha o quadro
function drawBoard() {
    context.fillStyle = background;
    context.strokeStyle = border;
    context.fillRect(0, 0, board.width, board.height);
    context.strokeRect(0, 0, board.width, board.height);
}

function keyPress(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const SPACEBAR = 32;

    let keyPressed = event.keyCode;
    switch (keyPressed) {
        case RIGHT_KEY:
            player.move(20);
            break;
        case LEFT_KEY:
            player.move(-20);
            break;
        case SPACEBAR:
            rockets.push(player.shoot());
            break;
    }
}

