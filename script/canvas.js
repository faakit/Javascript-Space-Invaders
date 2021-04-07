"use strict";

class Canvas {
    width = 1024;
    height = 768;

    globalGlow = 0;
    glowUp = true;

    constructor() {
        this.sprite = new Sprite(this, 'img/firstScreen.png', [1024, 768], 32, [0, 1]);

        this.board = document.getElementById("space");
        this.context = this.board.getContext("2d");
        this.background = "#111f28";

        // Escala o canvas ao tamanho da janela
        this.resize();
        window.addEventListener("resize", () => this.resize(), false)
    }

    resize() {
        this.board.width = window.innerWidth;
        this.board.height = window.innerHeight;

        // Deslocamento entre borda da janela e área jogável
        this.offset = (this.board.width - this.width) / 2;

        // Meio do canvas
        this.middle = this.board.width / 2;
    }

    // Desenha o quadro
    draw(score, highScore, lifes) {
        this.drawBackground();

        this.write("LIFES: ", lifes, this.offset + 120, 730);
        this.write("SCORE: ", score, this.middle, 730);
        this.write("HI SCORE: ", highScore, this.offset + 900, 730);
    }

    write(label, score, x, y) {
        this.context.shadowBlur = 3;
        this.context.shadowColor = "#de1c4e";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "20px Press Start";
        this.context.fillStyle = "#de1c4e";
        //this.context.strokeStyle = "#de1c4e";
        label += score;
        this.context.fillText(label, x, y);
        //this.context.strokeText(label, x, y);
        this.context.shadowBlur = 0;
    }

    stars = [];
    starTimer = 0;

    // Animação de fundo
    drawBackground() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.board.width, this.board.height);

        if (!this.starTimer) {
            // Cria n estrelas "descendo" e m "subindo"
            let n = Math.floor(Math.random() * 10);
            let m = Math.floor(Math.random() * 2);

            // Estrelas tem tamanho, velocidade e posição inicial diferentes
            for (let i = 0; i < n; i++) {
                let star = {
                    size: 2 + Math.floor(Math.random() * 4),
                    x: Math.floor(Math.random() * this.board.width),
                    y: 0,
                    dy: 2 + Math.floor(Math.random() * 10)
                };

                this.stars.push(star);
            }

            for (let i = 0; i < m; i++) {
                let star = {
                    size: 1 + Math.floor(Math.random() * 2),
                    x: Math.floor(Math.random() * this.board.width),
                    y: this.board.height,
                    dy: - 2 - Math.floor(Math.random() * 4)
                };

                this.stars.push(star);
            }

            // Pausa entre cada fornada de estrelas
            this.starTimer = 15;
        } else {
            this.starTimer--;
        }

        // Desenha estrelas e as mata caso saiam do canvas
        for (let [i, star] of this.stars.entries()) {
            if (star.y < 0 || star.y > this.board.height) {
                this.stars.splice(i, 1);
            }

            this.context.shadowBlur = 5 + this.globalGlow;
            this.context.shadowColor = "#59a3d2";

            star.y += star.dy;
            this.context.fillStyle = "#59a3d2";
            this.context.fillRect(star.x, star.y, star.size, star.size);

            this.context.shadowBlur = 0;
        }
    }

    drawWaiting(status, action, score, hiScore) {
        this.drawBackground()

        this.context.shadowBlur = 5;
        this.context.shadowColor = "#ff2d15";
        this.context.font = "80px Press Start";
        this.context.fillStyle = "#ff2d15";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(status, this.middle, this.height / 4);

        this.context.font = "30px Press Start";
        this.context.fillText(`Your Score: ${score}`, this.middle, this.height / 2);
        this.context.fillText(`Hi Score: ${hiScore}`, this.middle, 60 + this.height / 2);

        this.context.font = "15px Press Start";
        this.context.fillText(`Press ENTER/ESC to ${action}`, this.middle, 150 + this.height / 2);
        this.context.shadowBlur = 0;
    }

    drawStartingScreen(){
        this.drawBackground()
        this.sprite.render(this.offset, 0);

        /* Insert magic here */
    }

}
