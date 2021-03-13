"use strict";

class Engine {

    constructor() {
        // Enemy Matrix

        let enemyMatrix = [ [0,1,0,0,1,0,1,1,1],
                            [0,1,0,0,1,0,1,0,0],
                            [0,1,1,1,1,0,1,1,1],
                            [0,1,0,0,1,0,1,0,0],
                            [0,1,0,0,1,0,1,1,1] ]

        ////////////////
        this.canvas = new Canvas();
        this.canvas.draw();
        this.player = new Player(this.canvas);
        this.rockets = [];
        this.cluster = new Cluster(this.canvas, enemyMatrix);
    }

    run() {
        document.addEventListener("keydown", ev => this.keyPress(ev));
        this.mainLoop();
    }

    mainLoop() {
        setTimeout(() => {
            this.canvas.draw(this.player.score, this.player.lifes);

            for (let i = 0; i < this.rockets.length; i++) {
                this.rockets[i].move();
                this.rockets[i].draw();
                if (this.rockets[i].y <= 0) {
                    this.rockets.splice(i, 1);
                }
            }

            this.player.draw();

            for (let invader of this.cluster.invaders) {
                invader.draw();
            }

            this.mainLoop();
        }, 7);
    }

    keyPress(event) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const SPACEBAR = 32;

        let keyPressed = event.keyCode;
        if(keyPressed === RIGHT_KEY) {
            this.player.move(20);
        } else if (keyPressed === LEFT_KEY) {
            this.player.move(-20);
        } else if (keyPressed === SPACEBAR) {
            this.rockets.push(this.player.shoot());
        }
    }
}
