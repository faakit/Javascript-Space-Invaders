"use strict";

class Invader {
    size = 40;
    width = this.size;
    height = this.size;

    invaderGlowDic = {1:"#83368a", 2:"#ff0080", 3:"#e73029", 4:"#20639b"};
    constructor(canvas, x, y, clusterIndex, type) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.clusterIndex = clusterIndex;
        this.sprite = new Sprite(this.canvas, "img/invader" + type + ".png", [this.size, this.size], 10, [0, 1, 2, 3, 4, 3, 2, 1], [this.invaderGlowDic[type], 10]);
    }

    draw() {
        this.sprite.render(this.canvas.offset + this.x, this.y);
    }

    shoot() {
        let roll = Math.floor(Math.random() * 100);
        // Chance do invader atirar
        if (roll < 5) {
            let rocket = new Rocket("invader", this.canvas, this.x + this.size / 2, this.y);
            return rocket;
        }
        return null;
    }
}

class Cluster {
    size = 0;
    shootChance = 0;

    constructor(canvas, enemyMatrix) {
        this.canvas = canvas;
        this.invaders = [];
        this.x = 0;
        this.y = 0;

        //Cria cada invader individualmente
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 9; j++) {
                if (enemyMatrix[i][j] !== 0) {
                    this.size++;
                    let invader = new Invader(canvas, this.x + (j * canvas.height / 14), this.y + i * 50, this.size - 1, enemyMatrix[i][j]);
                    this.invaders.push(invader);
                }
            }
        }
    }

    move(x, y) {
        //Move cada invader individualmente
        for (let i = this.invaders.length - 1; i >= 0; i--) {
            this.invaders[i].x += x;
            this.invaders[i].y += y;
        }
        this.x += x;
    }

    shoot() {
        let rockets = [];
        let roll = Math.floor(Math.random() * 100);
        // Chance de haver fogo inimigo
        if (roll < this.shootChance) {
            let j = Math.floor(Math.random() * this.invaders.length);
            let rocket = this.invaders[j].shoot();
            if (rocket)
                rockets.push(rocket);
        }
        return rockets;
    }

    append(type) {
        //Cria cada invader individualmente
        for (let i = 0; i < 9; i++) {
            this.size++;
            let invader = new Invader(this.canvas, this.x + (i * this.canvas.height / 14), this.y, this.size - 1, type);
            this.invaders.push(invader);
        }
    }

}
