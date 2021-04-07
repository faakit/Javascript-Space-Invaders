"use strict";

class Rock {
    width = 40;
    height = 40;

    constructor(canvas, x, rockIndex) {
        this.rockIndex = rockIndex;
        this.canvas = canvas;
        this.x = x;
        this.y = 600;
        this.sprite = new Sprite(this.canvas, "img/rock.png", [this.width, this.height], 1, [0, 1, 2, 3], ["#6f3f3a", 5]);
        this.frame = 0;
    }

    draw() {
        this.sprite.renderStatic(this.canvas.offset + this.x, this.y, this.frame);
    }
}

class RocksCluster {
    size = 0;

    constructor(canvas) {
        this.rocks = [];
        this.rockPos =[144.8, 184.8, 224.8, 452, 492, 532, 759.2, 799.2, 839.2];


        for (let i = 0; i < 9; i++) {
            let rock = new Rock(canvas, this.rockPos[i] , this.size);
            this.size++;
            this.rocks.push(rock);
        }
    }
}