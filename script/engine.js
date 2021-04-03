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
                return;
            }

            this.cooldown = 25;
            this.rockets.push(this.player.shoot());
        }
    };

    constructor() {
        // Canvas
        this.canvas = new Canvas();

        document.addEventListener("keydown", ev => this.keyPress(ev));
        document.addEventListener("keyup", ev => this.keyPress(ev));

        //this.actualScore = 0;
        this.highScore = 0;
        this.gameStatus = "running"
    }

    run() {
        // Enemies
        let enemyMatrix = [[1,1,1,1,0,0,1,1,1],
                           [1,0,1,1,0,0,1,0,0],
                           [1,1,1,1,0,0,1,1,1],
                           [1,0,0,1,0,0,0,0,1],
                           [1,0,0,1,1,1,1,1,1]];
        this.cluster = new Cluster(this.canvas, enemyMatrix);
        this.moveDirec = {dx: 1, dy: 0};

        // Player
        this.player = new Player(this.canvas);
        this.rockets = [];
        this.isPressed = {};

        this.mainLoop();
    }

    mainLoop() {
        setTimeout(() => {
            if (this.gameStatus === "running") {
                this.gameStep();
                if (this.gameOver()) {
                    this.actualScore = this.player.score;
                    if (this.actualScore > this.highScore)
                        this.highScore = this.actualScore;
                    this.run();
                }
                else
                    this.mainLoop();
            }
            else if (this.gameStatus === "replay") {
                this.canvas.drawReplay(this.actualScore);
                this.mainLoop();
            }
        }, 10);
    }

    gameStep() {
            this.canvas.draw(this.player.score, this.highScore, this.player.lifes);

            //Caso hajam rockets na cena, os desenha e os move
            for (let i = 0; i < this.rockets.length; i++) {
                this.rockets[i].move();
                this.rockets[i].draw();
                //Deleta os rockets que saem da cena
                if (this.rockets[i].y <= 0 || this.rockets[i].y >= this.canvas.board.height) {
                    this.rockets.splice(i, 1);
                }
            }

            //Desenha o player
            this.player.draw();

            for(let i = this.cluster.invaders.length - 1; i >= 0; i--) {
                //Desenha invaders
                this.cluster.invaders[i].draw();

                if (this.isColision(this.player, this.cluster.invaders[i]))
                    this.player.lifes = 0;

                if( (this.cluster.invaders[i].x + this.cluster.invaders[i].width >= (this.canvas.board.width)) && this.moveDirec.dx > 0
                    || this.cluster.invaders[i].x <= 0 && this.moveDirec.dx < 0){
                    this.moveDirec.dx = -this.moveDirec.dx*1.06;
                    this.moveDirec.dy = 0;
                    this.cluster.move(0,10);
                }
                 //Checa a colisão com todos rockets da cena
                 for (let j = 0; j < this.rockets.length; j++) {
                    //Caso haja colisão deleta o rocket, o invader e acrescenta 10 ao score
                    if(this.rockets[j].from === "player"
                       && this.isColision(this.cluster.invaders[i], this.rockets[j])){ 
                        this.cluster.invaders.splice(i, 1);
                        this.rockets.splice(j, 1);
                        this.player.score+=10;
                        continue;
                    }

                    if(this.rockets[j].from === "invader"
                       && this.isColision(this.player, this.rockets[j])){ 
                        this.player.lifes -= 1;
                        this.rockets.splice(j, 1);
                        continue;
                    }
                }
            }
            
            this.cluster.move( this.moveDirec.dx , this.moveDirec.dy );
            //if (this.cluster.invaders.length)
            //    this.rockets = this.rockets.concat(this.cluster.shoot());

            //Checa as teclas pressionadas e faz a ação
            for (let key in this.isPressed) {
                if (this.isPressed[key]) {
                    this.action = this.validActions[key];
                    if (this.action)
                        this.action();
                }
            }

            if (this.cooldown > 0)
                this.cooldown--;

    }

    keyPress(event) {
        let keyPressed = event.key;
        if (keyPressed === "Enter")
            this.gameStatus = "running"
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

    gameOver() {
        if (!this.player.lifes) {
            this.gameStatus = "replay";

            return true;
        }
        return false;
    }
}
