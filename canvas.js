"use strict";

class Board {
    // --------- GUI
    board = document.getElementById("space");
    context = this.board.getContext("2d");
    border = "Black";
    background = "Blue";

    // Desenha o quadro
    draw() {
        this.context.fillStyle = this.background;
        this.context.strokeStyle = this.border;
        this.context.fillRect(0, 0, this.board.width, this.board.height);
        this.context.strokeRect(0, 0, this.board.width, this.board.height);
    }
}
