"use strict";

class Player {
    size = 50;

    constructor() {
        this.x = board.width / 2;
        this.y = board.height - (this.size * 2);
        this.lifes = 3;
        this.score = 0;
    }

    draw() {
        context.fillStyle = "grey";
        context.strokeStyle = "black";
        context.fillRect(this.x, this.y, this.size, this.size);
        context.strokeRect(this.x, this.y, this.size, this.size);       
    }

    move(dx) {
        this.x += dx;
    }

    shoot() {
        let rocket = new Rocket(this.x, this.y);
        return rocket;
    }
}

class Rocket {
    size = 5;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        context.fillStyle = "red";
        context.strokeStyle = "crimson";
        context.fillRect(this.x, this.y, this.size, this.size * 2);
        context.strokeRect(this.x, this.y, this.size, this.size * 2);       
    }

    move() {
        this.y -= 10;
    }
}