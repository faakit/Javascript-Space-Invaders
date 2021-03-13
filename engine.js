"use strict";

class Engine {
    cooldown = 0;
    validActions = {
        ArrowLeft() {
            if (this.player.x - 5 > 0)
                this.player.move(-5);
        },
        ArrowRight() {
            if (this.player.x + 5 < this.canvas.board.width - this.player.size)
                this.player.move(5);
        },
        " "() {
            if (this.cooldown) {
                this.cooldown--;
                return;
            }

            this.cooldown = 25;
            this.rockets.push(this.player.shoot());
        }
    };

    constructor() {
        // Enemy Matrix
        let enemyMatrix = [[1,1,1,1,0,0,1,1,1],
                           [1,0,1,1,0,0,1,0,0],
                           [1,1,1,1,0,0,1,1,1],
                           [1,0,0,1,0,0,0,0,1],
                           [1,0,0,1,1,1,1,1,1]];

        ////////////////
        this.canvas = new Canvas();
        this.canvas.draw();
        this.player = new Player(this.canvas);
        this.rockets = [];
        this.cluster = new Cluster(this.canvas, enemyMatrix);
        this.isPressed = {};
    }

    run() {
        document.addEventListener("keydown", ev => this.keyPress(ev));
        document.addEventListener("keyup", ev => this.keyPress(ev));
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

            for(let i = this.cluster.invaders.length - 1; i >= 0; i--) {
                this.cluster.invaders[i].draw();

                 //Checa a colisão com todos rockets da cena
                 for (let j = 0; j < this.rockets.length; j++) {

                    if(this.isColision(this.cluster.invaders[i], this.rockets[j])){
                        this.cluster.invaders.splice(i, 1);
                        this.rockets.splice(j, 1);
                        this.player.score+=10;
                    }
                }
            }

            for (let key in this.isPressed) {
                if (this.isPressed[key]) {
                    this.action = this.validActions[key];
                    if (this.action)
                        this.action();
                }
            }

            this.mainLoop();
        }, 10);
    }


    keyPress(event) {
        let keyPressed = event.key;
        this.isPressed[keyPressed] = event.type == "keydown";
    }

    // Checa a colisão de dois objetos retangulares
    isColision(one, two){
        if (one && two)
            if(one.x < two.x + two.width &&
               one.x + one.width > two.x &&
               one.y < two.y + two.height &&
               one.y + one.height > two.y)
                return true;
    }
}
