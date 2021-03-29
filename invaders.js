"use strict";

// ---------- Inimigo único

class Invader{
    size = 60;
    width = this.size;
    height = this.size;

    constructor(canvas, x,y, clusterIndex){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.clusterIndex = clusterIndex;
    }

    draw() {
        this.canvas.context.fillStyle = "grey";
        this.canvas.context.strokeStyle = "black";
        this.canvas.context.fillRect(this.x, this.y, this.size, this.size);
        this.canvas.context.strokeRect(this.x, this.y, this.size, this.size);       
    }

    shoot() {
        let roll = Math.floor(Math.random() * 100);
        if (roll < 5) {
            let rocket = new Rocket(this.canvas, this.x + this.size / 2, this.y);
            rocket.from = "invader";
            return rocket;
        }
        return null;
    }
}

// ---------- Cluster

class Cluster{
    size = 0;
    

    constructor(canvas, enemyMatrix){
        this.canvas = canvas;
        this.invaders = [];
        this.x = 2 * canvas.board.height/9 - 30;
        this.y=50;
        

        //Cria cada invader individualmente
        for(let i=0; i<5; i++){
            for(let j=0; j<9; j++){
                if(enemyMatrix[i][j] === 1){
                    this.size++;
                    let invader = new Invader(canvas, this.x + (j*canvas.board.height/9) , this.y + i*100 , this.size-1);
                    this.invaders.push(invader);
                }
            }
        }
    }

    move(x, y){
        //Move cada invader individualmente
        for(let i = this.invaders.length - 1; i >= 0; i--) {
            this.invaders[i].x+=x;
            this.invaders[i].y+=y;
        }
    }

    shoot() {
        let rockets = [];
        let roll = Math.floor(Math.random() * 100);
        if (roll < 40) {
            let j = Math.floor(Math.random() * this.invaders.length);
            let rocket = this.invaders[j].shoot();
            if (rocket)
                rockets.push(rocket);
        }
        return rockets;
    }

}
