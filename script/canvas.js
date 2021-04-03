"use strict";

class Canvas {
    constructor() {
        this.board = document.getElementById("space");
        this.context = this.board.getContext("2d");
        this.border = "Black";
        this.background = "Blue";
    }

    // Desenha o quadro
    draw(score, highScore, lifes) {
        this.drawBackground();

        this.write("Lifes: ", lifes, 120, 40);
        this.write("Score: ", score, this.board.width / 2, 40);
        this.write("Hi Score: ", highScore, 900, 40);
    }

    write(label, score, x, y){
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "30px Courier New";
        this.context.strokeStyle = "Black";
        this.context.strokeText(label + score , x, y);
        //this.context.strokeText("Score: " + score , x, y);
    }

    drawLifes(lifes, x, y){
        this.context.font = "30px Courier New";
        this.context.strokeStyle = "Black";
        this.context.strokeText("Lifes: " + lifes, x, y);
    }

    drawBackground() {
        this.context.fillStyle = this.background;
        this.context.strokeStyle = this.border;
        this.context.fillRect(0, 0, this.board.width, this.board.height);
        this.context.strokeRect(0, 0, this.board.width, this.board.height);
    }

    drawReplay(score) {
        this.drawBackground(score)

        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "100px Courier New";
        this.context.fillStyle = "Black";
        this.context.fillText("GAME OVER", this.board.width / 2, this.board.height / 4);

        this.context.font = "50px Courier New";
        this.context.fillText(`Score: ${score}`, this.board.width / 2, this.board.height / 2);

        this.context.font = "25px Courier New";
        this.context.fillText("Press ENTER to restart", this.board.width / 2, 150 + this.board.height / 2);
    }
}
