"use strict";

class Engine {
    cooldown = 0;
    pauseDelay = 0;
    validActions = {
        ArrowLeft() {
            if (this.gameStatus != "running")
                return;

            if (this.player.x - 5 > 0)
                this.player.move(-5);
        },
        ArrowRight() {
            if (this.gameStatus != "running")
                return;

            if (this.player.x + 5 < this.canvas.width - this.player.size)
                this.player.move(5);
        },
        " "() {
            if (this.cooldown || this.gameStatus != "running") {
                return;
            }

            this.shoot.play();
            this.cooldown = 45;
            this.rockets.push(this.player.shoot());
        },
        Enter() {
            this.gameStatus = "running";
        },
        Escape() {
            if (this.gameStatus === "running" && !this.pauseDelay) {
                this.gameStatus = "paused";
                this.pauseDelay = 30;
            } else if (!this.pauseDelay) {
                this.gameStatus = "running";
                this.pauseDelay = 30;
            }
        }
    };

    constructor() {
        // Canvas
        this.canvas = new Canvas();

        document.addEventListener("keydown", ev => this.keyPress(ev));
        document.addEventListener("keyup", ev => this.keyPress(ev));

        this.shoot = new Sound("soundfx/shoot.wav");
        this.invaderKill = new Sound("soundfx/invaderkilled.wav");
        this.playerHit = new Sound("soundfx/explosion.wav");
        this.music = [];
        this.music.push(new Sound("soundfx/fastinvader1.wav"));
        this.music.push(new Sound("soundfx/fastinvader2.wav"));
        this.music.push(new Sound("soundfx/fastinvader3.wav"));
        this.music.push(new Sound("soundfx/fastinvader4.wav"));

        this.highScore = 0;
        this.gameStatus = "running";
    }

    run() {
        // Rocks
        this.rocksCluster = new RocksCluster(this.canvas);

        // starting enemies
        let enemyMatrix = [[3, 3, 3, 3, 3, 3, 3, 3, 3],
                           [2, 2, 2, 2, 2, 2, 2, 2, 2],
                           [1, 1, 1, 1, 1, 1, 1, 1, 1]];
        this.cluster = new Cluster(this.canvas, enemyMatrix);
        this.moveDirec = { dx: 1, dy: 0 };

        // Player
        this.player = new Player(this.canvas);
        this.rockets = [];
        this.isPressed = {};

        this.levelCooldown = 600;

        this.mainLoop();
    }

    notPlay = 0;
    musicId = 0;
    mainLoop() {
        setTimeout(() => {
            if (this.gameStatus === "running") {
                this.gameStep();
                if (this.gameOver()) {
                    this.actualScore = this.player.score;
                    if (this.actualScore > this.highScore)
                        this.highScore = this.actualScore;
                    // Reseta o jogo.
                    this.run();
                    // Mata o jogo que foi perdido
                    return;
                }
            } else if (this.gameStatus === "over") {
                this.canvas.drawWaiting("GAME OVER", "restart", this.actualScore, this.highScore);
            } else if (this.gameStatus === "paused") {
                this.canvas.drawWaiting("PAUSED", "continue", this.player.score, this.highScore);
            }

            // Evita flickering e "ruído" caso ESC seja segurado
            if (this.pauseDelay > 0)
                this.pauseDelay--;

            //Checa as teclas pressionadas e faz a ação
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

    gameStep() {
        // Global Glow
        if(this.canvas.glowUp){
            if(this.canvas.globalGlow == 40) this.canvas.glowUp = false;
            this.canvas.globalGlow += 1;
        } else {
            if(this.canvas.globalGlow == 0) this.canvas.glowUp = true;
            this.canvas.globalGlow -= 1;
        }

        // Desenha os elementos da HUD
        this.canvas.draw(this.player.score, this.highScore, this.player.lifes);

        // Desenhar os rocks
        for (let i = 0; i < this.rocksCluster.rocks.length; i++) {
            this.rocksCluster.rocks[i].draw();
        }

        // Busca rockets em cena, os desenha, move e checa colisão com player e pedras
        for (let i = 0; i < this.rockets.length; i++) {
            this.rockets[i].move();
            this.rockets[i].draw();
            //Deleta os rockets que saem da cena
            if (this.rockets[i].y <= 0 || this.rockets[i].y >= this.canvas.height) {
                this.rockets.splice(i, 1);
                continue;
            }

            // Colisão com player diminui 1 vida
            if (this.rockets[i].from === "invader"
            && this.isColision(this.player, this.rockets[i])) {
                this.playerHit.play();
                this.player.lifes -= 1;
                this.rockets.splice(i, 1);
                continue;
            }
            // Colisão com a pedra passa um frame, se for o último frame a destrói
            for(let j = 0; j<this.rocksCluster.size; j++){
                if (this.isColision(this.rocksCluster.rocks[j], this.rockets[i])) {
                    this.rocksCluster.rocks[j].frame++;
                    this.rockets.splice(i, 1);
                    if(this.rocksCluster.rocks[j].frame === 4){
                        this.rocksCluster.rocks.splice(j,1);
                        continue;
                    }
                }
            }
        }

        // Desenha o player
        this.player.draw();

        // Checks dos invaders
        if(this.cluster.invaders.length < 6){
            this.cluster.move(0, 40);
            let rand = 1 + Math.floor(Math.random() * 3)
            this.cluster.append(rand)
        }
        for (let i = this.cluster.invaders.length - 1; i >= 0; i--) {
            // Desenha invaders
            this.cluster.invaders[i].draw();

            if (this.isColision(this.player, this.cluster.invaders[i]))
                this.player.lifes = 0;

            // Quando o cluster bate na parede vira ao lado contrário, desce uma linha e cria uma linha nova
            if ((this.cluster.invaders[i].x + this.cluster.invaders[i].width >= this.canvas.width) && this.moveDirec.dx > 0
                || this.cluster.invaders[i].x <= 0 && this.moveDirec.dx < 0) {

                this.moveDirec.dx = -this.moveDirec.dx
                this.cluster.move(0, 40);

                let rand = 1 + Math.floor(Math.random() * 3)
                this.cluster.append(rand)
                this.moveDirec.dx = this.moveDirec.dx * 1.03;
            }

            // Checa a colisão com todos rockets da cena
            for (let j = 0; j < this.rockets.length; j++) {
                // Caso haja colisão com invader acrescenta 10 ao score
                if (this.rockets[j].from === "player"
                    && this.isColision(this.cluster.invaders[i], this.rockets[j])) {
                    this.invaderKill.play();
                    this.cluster.invaders.splice(i, 1);
                    this.cluster.size--;
                    this.rockets.splice(j, 1);
                    this.player.score += 10;
                    continue;
                }    
            }
        }

        if (!this.notPlay) {
            this.music[this.musicId].play();
            if (this.musicId < 3)
                this.musicId++;
            else
                this.musicId = 0;
            this.notPlay = 60;
        } else {
            this.notPlay--;
        }

        this.cluster.move(this.moveDirec.dx, this.moveDirec.dy);
        if (this.cluster.invaders.length)
            this.rockets = this.rockets.concat(this.cluster.shoot());

        // Evita span de tiros
        if (this.cooldown > 0)
            this.cooldown--;

        // Mudanças no nível
        if (this.levelCooldown > 0){
            this.levelCooldown--;
        }else{
            this.cluster.shootChance++;
            this.levelCooldown = 600;
        }
    }

    keyPress(event) {
        let keyPressed = event.key;

        // Reseta o delay se o player soltar o ESC
        // (permite pause/continue rapidamente se for a intenção do jogador)
        if (keyPressed === "Escape" && event.type === "keyup")
            this.pauseDelay = 0;

        this.isPressed[keyPressed] = event.type == "keydown";
    }

    // Checa a colisão de dois objetos retangulares
    isColision(one, two) {
        if (one && two)
            if (one.x < two.x + two.width &&
                one.x + one.width > two.x &&
                one.y < two.y + two.height &&
                one.y + one.height > two.y)
                return true;
    }

    gameOver() {
        if (!this.player.lifes) {
            // f
            this.gameStatus = "over";

            return true;
        }

        return false;
    }
}
