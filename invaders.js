"use strict";

// ---------- Inimigo único

class Invader{
    size = 60;

    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    draw() {
        boardContext.fillStyle = "grey";
        boardContext.strokeStyle = "black";
        boardContext.fillRect(this.x, this.y, this.size, this.size);
        boardContext.strokeRect(this.x, this.y, this.size, this.size);       
    }
}

// ---------- Cluster