"use strict";

class Canvas {
    constructor() {
        this.board = document.getElementById("space");
        this.context = this.board.getContext("2d");
        this.border = "Black";
        this.background = "Blue";
    }

    // Desenha o quadro
    draw(score, lifes) {
        this.context.fillStyle = this.background;
        this.context.strokeStyle = this.border;
        this.context.fillRect(0, 0, this.board.width, this.board.height);
        this.context.strokeRect(0, 0, this.board.width, this.board.height);

        this.drawPoints(score);
        this.drawLifes(lifes);
    }

    drawPoints(score){
        this.context.font = "30px Courier New";
        this.context.strokeStyle = "Black";
        this.context.strokeText("Score: " + score , 800, 40);
    }

    drawLifes(lifes){
        this.context.font = "30px Courier New";
        this.context.strokeStyle = "Black";
        this.context.strokeText("Lifes: " + lifes, 60, 40);
    }
}
