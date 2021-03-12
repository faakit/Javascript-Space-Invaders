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

    constructor(size){
        this.size = size;

        for(let i=0; i<size; i++){
            
            let invader = new Invader( 80+(i*80) , (i%3)*80  );
            this.invaders.push(invader);

        }
    }



}