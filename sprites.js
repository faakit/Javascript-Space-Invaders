"use strict";

class Sprite {
    idx = 0;
    constructor(canvas, url, pos, size, slowframes, frames) {
        this.canvas = canvas;
        this.url = url;
        this.x = pos[0];
        this.y = pos[1];
        this.size = size;
        this.frames = frames;
        this.frame = frames[this.idx];


        // Reorganiza o array da ordem de frames para repetir o mesmo frame *slowframes* vezes
        for (let i = frames.length - 1; i >= 0; i--) {
            let addIt = [];
            for (let j = 0; j < slowframes; j++) {
                addIt.push(frames[i]);
            }
            this.frames.splice(i, 0, addIt);
        }
    }

    render() {
        this.x = this.frame * this.size[0];
        this.canvas.context.drawImage(
            this.url,
            this.x, this.y,
            this.size[0], this.size[1],
            0, 0,
            this.size[0], this.size[1]);

        if (this.idx < this.frames.length) this.idx++;
        else this.idx = 0;

        this.frame = this.frames[this.idx];
    }
}