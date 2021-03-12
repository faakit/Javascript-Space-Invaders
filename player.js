"use strict";

class Player {
    size = 50;

    constructor(board) {
        this.board = board;
        this.x = board.width / 2;
        this.y = board.height - (this.size * 2);
        this.lifes = 3;
        this.score = 0;
    }

    draw() {
        this.board.context.fillStyle = "grey";
        this.board.context.strokeStyle = "black";
        this.board.context.fillRect(this.x, this.y, this.size, this.size);
        this.board.context.strokeRect(this.x, this.y, this.size, this.size);
    }

    move(dx) {
        this.x += dx;
    }
}