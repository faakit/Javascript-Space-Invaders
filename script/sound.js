"use strict";

class Sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        this.sound.volume = .4;
        document.body.appendChild(this.sound);
    }

    static muteGame() {
        let soundfx = document.querySelectorAll("audio");
        for (let sound of soundfx) {
            sound.muted = !sound.muted;
        }
    }

    play() {
        this.sound.play();
    }

    playClone(isMuted) {
        if (!isMuted)
            this.sound.cloneNode(true).play();
    }

    pause() {
        this.sound.pause();
    }

    stop() {
        this.sound.pause();
        this.sound.currentTime = 0;
    }

    loop() {
        this.sound.loop = true;
    }
}