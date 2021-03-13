"use strict";

class Engine {

    constructor() {
        // Enemy Matrix

        let enemyMatrix = [ [1,1,1,1,0,0,1,1,1],
                            [1,0,1,1,0,0,1,0,0],
                            [1,1,1,1,0,0,1,1,1],
                            [1,0,0,1,0,0,0,0,1],
                            [1,0,0,1,1,1,1,1,1] ]

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

            for(let i = 0; i< this.cluster.invaders.length; i++){
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

    // Checa a colisão de dois objetos retangulares
    isColision(one, two){
        if( one.x < two.x + two.width &&
            one.x + one.width > two.x &&
            one.y < two.y + two.height &&
            one.y + one.height > two.y 
            ) return true         
    }
}
