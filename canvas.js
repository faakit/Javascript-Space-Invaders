"use strict";

class Canvas {
    constructor() {
        this.board = document.getElementById("space");
        this.context = this.board.getContext("2d");
        this.border = "Black";
        this.background = "Blue";
    }

    // Desenha o quadro
    draw() {
        this.context.fillStyle = this.background;
        this.context.strokeStyle = this.border;
        this.context.fillRect(0, 0, this.board.width, this.board.height);
        this.context.strokeRect(0, 0, this.board.width, this.board.height);
    }

}
