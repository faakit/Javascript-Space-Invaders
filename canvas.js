"use strict";

// --------- GUI
const board = document.getElementById("space");
const boardContext = board.getContext("2d");
const boardBorder = "Black";
const boardBackground = "Blue";


// Desenha o quadro
function drawBoard(){
    boardContext.fillStyle = boardBackground;
    boardContext.strokeStyle = boardBorder;
    boardContext.fillRect(0, 0, board.width, board.height);
    boardContext.strokeRect(0, 0, board.width, board.height);
}