"use strict";

// ---------- Inimigo único

class Invader{
    size = 60;
    width = size;
    height = size;

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

    constructor(canvas, enemyMatrix){
        this.canvas = canvas;
        this.invaders = [];
        this.relativeH = canvas.board.height/9

        for(let i=0; i<5; i++){
            for(let j=0; j<9; j++){
                if(enemyMatrix[i][j] === 1){
                    this.size++;
                    let invader = new Invader(canvas, 2*this.relativeH - 30 + (j*this.relativeH) , 50 + i*100);
                    this.invaders.push(invader);
                }
            }
        }

    }



}
