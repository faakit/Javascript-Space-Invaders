"use strict";

// ---------- Inimigo único

class Invader{
    size = 60;

    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    draw() {
        context.fillStyle = "grey";
        context.strokeStyle = "black";
        context.fillRect(this.x, this.y, this.size, this.size);
        context.strokeRect(this.x, this.y, this.size, this.size);       
    }
}

// ---------- Cluster

class Cluster{
    size = 0;
    invaders = [];
    relativeH = board.height/9

    constructor(rows){
        for(let i=0; i<9; i++){
            for(let j=0; j<rows; j++){
                let invader = new Invader( 2*this.relativeH - 30 + (i*this.relativeH) , 50 + j*100);
                this.invaders.push(invader);
            }
        }

    }



}