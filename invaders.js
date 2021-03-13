"use strict";

// ---------- Inimigo único

class Invader{
    size = 60;

    constructor(canvas, x,y){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.canvas.context.fillStyle = "grey";
        this.canvas.context.strokeStyle = "black";
        this.canvas.context.fillRect(this.x, this.y, this.size, this.size);
        this.canvas.context.strokeRect(this.x, this.y, this.size, this.size);       
    }
}

// ---------- Cluster

class Cluster{
    size = 0;

    constructor(canvas, rows){
        this.canvas = canvas;
        this.invaders = [];
        this.relativeH = canvas.board.height/9
        for(let i=0; i<9; i++){
            for(let j=0; j<rows; j++){
                let invader = new Invader(canvas, 2*this.relativeH - 30 + (i*this.relativeH) , 50 + j*100);
                this.invaders.push(invader);
            }
        }

    }



}
