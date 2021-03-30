"use strict";

class Player {
    size = 50;
    width = this.size;
    height = this.size;

    constructor(canvas) {
        this.canvas = canvas
        this.x = canvas.board.width / 2;
        this.y = canvas.board.height - (this.size * 2);
        this.lifes = 3;
        this.score = 0;
    }

    draw() {
        this.canvas.context.fillStyle = "grey";
        this.canvas.context.strokeStyle = "black";
        this.canvas.context.fillRect(this.x, this.y, this.size, this.size);
        this.canvas.context.strokeRect(this.x, this.y, this.size, this.size);       
    }

    move(dx) {
        this.x += dx;
    }

    shoot() {
        let rocket = new Rocket(this.canvas, this.x + this.size / 2, this.y);
        rocket.from = "player";
        return rocket;
    }
}

class Rocket {
    size = 5;
    width = this.size;
    height = this.size*4;

    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.canvas.context.fillStyle = "red";
        this.canvas.context.strokeStyle = "crimson";
        this.canvas.context.fillRect(this.x, this.y, this.size, this.height);
        this.canvas.context.strokeRect(this.x, this.y, this.size, this.height);       
    }

    move() {
        if (this.from === "player") {
            this.y -= 10;
            return
        }
        this.y += 5;
    }
}
