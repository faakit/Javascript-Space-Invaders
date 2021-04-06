"use strict";

class Canvas {
    //width = this.widthZero + 1024;
    width = 1024;
    height = 768;

    constructor() {
        this.board = document.getElementById("space");
        this.context = this.board.getContext("2d");
        this.border = "Black";
        this.background = "#111f28";

        this.resize();
        window.addEventListener("resize", ev => this.resize(ev), false)
    }

    resize() {
        this.widthZero = (window.innerWidth - 1024) / 2;
        this.board.width  = window.innerWidth;
        this.board.height = window.innerHeight;
    }

    // Desenha o quadro
    draw(score, highScore, lifes) {
        this.drawBackground();

        this.write("Lifes: ", lifes, this.widthZero + 120, 730);
        this.write("Score: ", score, this.widthZero + this.width / 2, 730);
        this.write("Hi Score: ", highScore, this.widthZero + 900, 730);
    }

    write(label, score, x, y){
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "30px Courier New";
        this.context.fillStyle = "#de1c4e";
        this.context.strokeStyle = "#de1c4e";
        label += score;
        this.context.fillText(label, x, y);
        this.context.strokeText(label, x, y);
    }

    stars = [];
    starTimer = 0;

    drawBackground() {
        this.context.fillStyle = this.background;
        //this.context.strokeStyle = this.border;
        this.context.fillRect(0, 0, this.board.width, this.board.height);
        //this.context.strokeRect(0, 0, this.board.width, this.board.height);

        if (!this.starTimer) {
            let n = Math.floor(Math.random() * 10);
            let m = Math.floor(Math.random() * 2);

            for (let i = 0; i < n; i++) {
                let star = {
                    size: 2 + Math.floor(Math.random() * 4),
                    x: Math.floor(Math.random() * this.board.width),
                    y: 0,
                    dy: 1 + Math.floor(Math.random() * 5)
                };

                this.stars.push(star);
            }

            for (let i = 0; i < m; i++) {
                let star = {
                    size: 1 + Math.floor(Math.random() * 2),
                    x: Math.floor(Math.random() * this.board.width),
                    y: this.board.height,
                    dy: - 1 - Math.floor(Math.random() * 2)
                };

                this.stars.push(star);
            }

            this.starTimer = 30;
        } else {
            this.starTimer--;
        }

        for (let [i, star] of this.stars.entries()) {
            if (star.y < 0 || star.y > this.board.height) {
                this.stars.splice(i, 1);
            }
            star.y += star.dy;
            this.context.fillStyle = "#59a3d2";
            this.context.fillRect(star.x, star.y, star.size, star.size);
        }
    }

    drawWaiting(status, action, score, hiScore) {
        this.drawBackground()

        this.context.font = "100px Courier New";
        this.context.fillStyle = "#ff2d15";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(status, this.widthZero + this.width / 2, this.height / 4);

        this.context.font = "50px Courier New";
        this.context.fillText(`Your Score: ${score}`, this.widthZero + this.width / 2, this.height / 2);
        this.context.fillText(`Hi Score: ${hiScore}`, this.widthZero + this.width / 2, 60 + this.height / 2);

        this.context.font = "25px Courier New";
        this.context.fillText(`Press ENTER/ESC to ${action}`, this.widthZero + this.width / 2, 150 + this.height / 2);
    }
}
