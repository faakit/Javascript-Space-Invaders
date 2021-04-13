"use strict";

class Engine {
    cooldown = 0;
    defaultCooldown = 45;
    holdingKey = false;
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
            this.shoot = new Sound("soundfx/shoot.wav");
            this.shoot.play();
            this.cooldown = this.defaultCooldown;
            this.rockets.push(this.player.shoot());
        },
        Enter() {
            if (this.gameStatus === "paused") {
                this.resume();
            } else if (this.gameStatus === "over" || this.gameStatus === "startScreen") {
                this.start();
            }
        },
        Escape() {
            if (this.holdingKey)
                return;

            if (this.gameStatus === "running") {
                this.pause();
            } else if (this.gameStatus === "over") {
                this.start();
            } else if (this.gameStatus === "paused"){
                this.resume();
            }

            this.holdingKey = true;
        },
        m() {
            if (this.holdingKey)
                return;

            Sound.muteGame()
            this.holdingKey = true;
        },
        p() {
            if (this.holdingKey)
                return;

            this.performanceMode = !this.performanceMode;
            this.holdingKey = true;
        }
    };

    resume() {
        this.gameMusic.play();
        this.pauseMusic.pause();
        this.gameStatus = "running";
    }

    pause() {
        this.pauseMusic.play();
        this.gameMusic.pause();
        this.gameStatus = "paused";
    }

    start() {
        this.gameMusic.stop();
        this.gameMusic.play();
        this.gameStatus = "running";
    }

    constructor() {
        this.rankingApi = new RankingApi();
        this.rankingApi.generate_table();

        // Canvas
        this.canvas = new Canvas();

        document.addEventListener("keydown", ev => this.keyPress(ev));
        document.addEventListener("keyup", ev => this.keyPress(ev));

        
        this.playerHit = new Sound("soundfx/explosion.wav");
        this.gameMusic = new Sound("soundfx/goosebumps.mp3");
        this.pauseMusic = new Sound("soundfx/bladerunner2049.mp3");

        this.gameMusic.loop();
        this.pauseMusic.loop();

        this.highScore = 0;
        this.gameStatus = "startScreen";
        this.performanceMode = false;
    }

    run() {
        // Rocks
        this.rocksCluster = new RocksCluster(this.canvas);

        // starting enemies
        let enemyMatrix = [[4, 4, 4, 4, 4, 4, 4, 4, 4],
                           [3, 3, 3, 3, 3, 3, 3, 3, 3],
                           [2, 2, 2, 2, 2, 2, 2, 2, 2],
                           [1, 1, 1, 1, 1, 1, 1, 1, 1]];
        this.cluster = new Cluster(this.canvas, enemyMatrix);
        this.moveDirec = { dx: 1, dy: 0 };

        // Player
        this.player = new Player(this.canvas);
        this.rockets = [];
        this.isPressed = {};
        this.defaultCooldown = 45;
        this.shieldTimer = 0;

        this.levelCooldown = 600;

        this.mainLoop();
    }

    notPlay = 0;
    musicId = 0;
    mainLoop() {
        setTimeout(() => {
            if (this.gameStatus === "startScreen") {
                this.canvas.drawStartingScreen(this.performanceMode);
            } else if (this.gameStatus === "running") {
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
                this.glowPulse();
                this.canvas.drawWaiting("GAME OVER", "restart", this.actualScore, this.highScore);
                    
            } else if (this.gameStatus === "paused") {
                this.canvas.drawWaiting("PAUSED", "continue", this.player.score, this.highScore);
            }

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

    glowPulse() {
        if(this.canvas.glowUp){
            if(this.canvas.globalGlow == 40) this.canvas.glowUp = false;
            this.canvas.globalGlow += 2;
        } else {
            if(this.canvas.globalGlow == 0) this.canvas.glowUp = true;
            this.canvas.globalGlow -= 2;
        }
    }

    gameStep() {
        this.glowPulse();

        // Desenha os elementos da HUD
        this.canvas.draw(this.player.score, this.highScore, this.player.lifes);

        // Desenhar os rocks
        for (let i = 0; i < this.rocksCluster.rocks.length; i++) {
            this.rocksCluster.rocks[i].draw(this.performanceMode);
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
                if (!this.player.isShielded) {
                    this.playerHit.play();
                    this.player.lifes -= 1;
                    this.player.move(-this.player.x + 512);
                    this.player.toggleShield();
                    this.shieldTimer = 200;
                } else {
                    this.shieldHit = new Sound("soundfx/shield.wav")
                    this.shieldHit.play();
                }
                this.rockets.splice(i, 1);
                continue;
            }
            // Colisão com a pedra passa um frame, se for o último frame a destrói
            for(let j = 0; j<this.rocksCluster.rocks.length; j++){
                if (this.isColision(this.rocksCluster.rocks[j], this.rockets[i])) {
                    this.rockHit = new Sound("soundfx/bang.wav");
                    this.rockHit.play();
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
        this.player.draw(this.performanceMode);

        // Checks dos invaders
        if(this.cluster.invaders.length < 2){     // Caso um invader fique sozinho, outra linha será spawnada acrescentando velocidade e +20 pontos
            this.cluster.move(0, 40);
            let rand = 1 + Math.floor(Math.random() * 3)
            this.cluster.append(rand)
            this.moveDirec.dx = this.moveDirec.dx * 1.02;
            this.player.score += 20;
        }
        for (let i = this.cluster.invaders.length - 1; i >= 0; i--) {
            // Desenha invaders
            this.cluster.invaders[i].draw(this.performanceMode);

            if (this.isColision(this.player, this.cluster.invaders[i]))
                this.player.lifes = 0;

            // Quando o cluster bate na parede vira ao lado contrário, desce uma linha e cria uma linha nova
            if ((this.cluster.invaders[i].x + this.cluster.invaders[i].width >= this.canvas.width) && this.moveDirec.dx > 0
                || this.cluster.invaders[i].x <= 0 && this.moveDirec.dx < 0) {

                this.moveDirec.dx = -this.moveDirec.dx
                this.cluster.move(0, 40);

                let rand = 1 + Math.floor(Math.random() * 4)
                this.cluster.append(rand)
                if(this.moveDirec.dx < 3.5 && this.moveDirec.dx > -3.5) this.moveDirec.dx = this.moveDirec.dx * 1.03;
            }

            // Checa a colisão com todos rockets da cena
            for (let j = 0; j < this.rockets.length; j++) {
                // Caso haja colisão com invader acrescenta 10 ao score
                if (this.rockets[j].from === "player"
                    && this.isColision(this.cluster.invaders[i], this.rockets[j])) {
                    this.invaderKill = new Sound("soundfx/invaderkilled.wav");
                    this.invaderKill.play();
                    this.cluster.invaders.splice(i, 1);
                    this.rockets.splice(j, 1);
                    this.player.score += 10;
                    continue;
                }    
            }
        }

        this.cluster.move(this.moveDirec.dx, this.moveDirec.dy);
        if (this.cluster.invaders.length)
            this.rockets = this.rockets.concat(this.cluster.shoot());

        if (this.shieldTimer)
            this.shieldTimer--;
        else if (this.player.isShielded)
            this.player.toggleShield();

        // Evita span de tiros
        if (this.cooldown > 0)
            this.cooldown--;

        // Mudanças no nível
        if (this.levelCooldown > 0){
            this.levelCooldown--;
        }else{
            this.cluster.shootChance++;
            if(this.defaultCooldown > 10) this.defaultCooldown--;
            this.levelCooldown = 600;
        }
    }

    keyPress(event) {
        let keyPressed = event.key;

        // Se o player segurar ESC ou m a ação será realizada uma vez só
        // até que ele solte a tecla.
        // Evita flickering entre os estados mudados pelo evento.
        if ((keyPressed === "Escape" || keyPressed === "m" || keyPressed === "p") && event.type === "keyup")
            this.holdingKey = false;

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
            // Pede informaçoes do usuário para o ranking e o envia ao db
            let nick = prompt("Write your name to be on the rank :)", "");
            this.rankingApi.putScore(nick, this.player.score);
            this.gameStatus = "over";

            return true;
        }

        return false;
    }
}
