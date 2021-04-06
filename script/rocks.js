"use strict";

class Rock{
    width = 40;
    height = 40;

    constructor(canvas, x, rockIndex){
        this.rockIndex = rockIndex;
        this.canvas = canvas;
        this.x = x;
        this.y = 600;
        this.sprite = new Sprite(this.canvas, "img/rock.png", [this.width, this.height], 1, [0, 1, 2, 3]);
        this.frame = 0;
    }

    draw() {
        this.sprite.renderStatic(this.x,this.y, this.frame);    
    }
}

class RocksCluster{
    size = 0;

    constructor(canvas){
        this.rocks = [];

        for(let i=1; i<5; i++){
            for(let j=0; j<3 ; j++){
                let rock = new Rock(canvas, i*144+j*40, this.size);
                this.size++;
                this.rocks.push(rock);
            }
        }
    }
}