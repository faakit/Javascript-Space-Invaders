"use strict";

class Player {
    size = 50;
    width = this.size;
    height = this.size;

    constructor(canvas) {
        this.canvas = canvas
        this.x = canvas.width / 2; // Posição relativa do player (não considera o offset)
        this.y = canvas.height - (this.size * 2);
        this.lifes = 3;
        this.score = 0;
        this.sprite = new Sprite(this.canvas, "img/player.png", [this.size, this.size], 0, [0], ["#23cad5", 3]);
    }

    draw() {
        // Desenha o player considerando o offset
        this.sprite.renderStatic(this.canvas.offset + this.x, this.y, 0);
    }

    move(dx) {
        this.x += dx;
    }

    shoot() {
        let rocket = new Rocket("player", this.canvas, this.x + this.size / 2, this.y);
        return rocket;
    }
}

class Rocket {
    constructor(from, canvas, x, y) {
        this.from = from;

        if (this.from === "player") {
            this.width = 5;
            this.height = 20;
        } else {
            this.width = 5;
            this.height = 10;
        }

        this.canvas = canvas;
        this.x = x;
        this.y = y;
    }

    draw() {
        if (this.from === "player"){
            this.canvas.context.shadowColor = "#12ff00";
            this.canvas.context.fillStyle = "#12ff00";
        }else{
            this.canvas.context.shadowColor = "#ff2d15";
            this.canvas.context.fillStyle = "#ff2d15";
        }
        this.canvas.context.shadowBlur = 5;
        this.canvas.context.fillRect(this.canvas.offset + this.x, this.y, this.width, this.height);
        this.canvas.context.shadowBlur = 0;
    }

    move() {
        if (this.from === "player") {
            this.y -= 10;
            return
        }

        this.y += 2;
    }
}
