"use strict";

class Canvas {
    constructor() {
        this.board = document.getElementById("space");
        this.context = this.board.getContext("2d");
        this.border = "Black";
        this.background = "Blue";
        this.sprite = new Sprite(this, 'img/background.png', [1024, 768], 20, [0, 1, 0, 1, 2, 1, 0, 1,2,3,2,1])
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
        label += score;
        this.context.strokeText(label, x, y);
    }

    drawBackground() {
        this.sprite.render(0, 0);
    }

    drawWaiting(status, action, score, hiScore) {
        this.drawBackground()

        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "100px Courier New";
        this.context.fillStyle = "Black";
        //this.context.fillText("GAME OVER", this.board.width / 2, this.board.height / 4);
        this.context.fillText(status, this.board.width / 2, this.board.height / 4);

        this.context.font = "50px Courier New";
        this.context.fillText(`Your Score: ${score}`, this.board.width / 2, this.board.height / 2);
        this.context.fillText(`Hi Score: ${hiScore}`, this.board.width / 2, 60 + this.board.height / 2);

        this.context.font = "25px Courier New";
        //this.context.fillText("Press ENTER to restart", this.board.width / 2, 150 + this.board.height / 2);
        this.context.fillText(`Press ENTER/ESC to ${action}`, this.board.width / 2, 150 + this.board.height / 2);
    }
}
