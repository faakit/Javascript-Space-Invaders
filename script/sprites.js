"use strict";

class Sprite {
    idx = 0;
    constructor(canvas, url, size, slowframes, frames) {
        this.canvas = canvas;
        this.url = url;
        this.size = size;
        this.frames = frames;
        this.frame = frames[this.idx];

        // faz com repetir o mesmo frame *slowframes* vezes
        for (let i = frames.length - 1; i >= 0; i--) {
            for (let j = 0; j < slowframes; j++) {
                this.frames.splice(i, 0, frames[i]);
            }
        }
    }

    // Para renderizações animadas nas quais os frames se intercalam
    render(x, y) {
        this.x = this.frame * this.size[0];
        this.canvas.context.drawImage(
            resources.get(this.url),
            this.x, 0,
            this.size[0], this.size[1],
            x, y,
            this.size[0], this.size[1]);

        if (this.idx < this.frames.length - 1) this.idx++;
        else this.idx = 0;

        this.frame = this.frames[this.idx];
    }

    // Para renderizações estáticas, podendo mudar o frame
    renderStatic(x, y, n) {
        this.canvas.context.drawImage(
            resources.get(this.url),
            (n * this.size[0]), 0,
            this.size[0], this.size[1],
            x, y,
            this.size[0], this.size[1]);
    }
}