"use strict";

class Sprite {
    idx = 0;

    constructor(canvas, url, size, slowframes, frames, glow) {
        this.canvas = canvas;
        this.url = url;
        this.size = size;
        this.frames = frames;
        this.frame = frames[this.idx];
        if(glow===undefined){
            this.glow = false;
        }else{
            this.glow = true;
            this.glowIntensity = glow[1];
            this.glowColor = glow[0];
        }
        
        // faz com repetir o mesmo frame *slowframes* vezes
        for (let i = frames.length - 1; i >= 0; i--) {
            for (let j = 0; j < slowframes; j++) {
                this.frames.splice(i, 0, frames[i]);
            }
        }
    }

    // Para renderizações animadas nas quais os frames se intercalam
    render(performanceMode, x, y) {
        this.x = this.frame * this.size[0];

        if(this.glow && !performanceMode){
            this.canvas.context.shadowBlur = this.glowIntensity + this.canvas.globalGlow;
            this.canvas.context.shadowColor = this.glowColor;
        }

        this.canvas.context.drawImage(
            resources.get(this.url),
            this.x, 0,
            this.size[0], this.size[1],
            x, y,
            this.size[0], this.size[1]);

        if (this.idx < this.frames.length - 1) this.idx++;
        else this.idx = 0;

        this.canvas.context.shadowBlur = 0;

        this.frame = this.frames[this.idx];
    }

    // Para renderizações estáticas, podendo mudar o frame
    renderStatic(performanceMode, x, y, n) {
        if(this.glow && !performanceMode){
            this.canvas.context.shadowBlur = this.glowIntensity + this.canvas.globalGlow/5;
            this.canvas.context.shadowColor = this.glowColor;
        }

        this.canvas.context.drawImage(
            resources.get(this.url),
            (n * this.size[0]), 0,
            this.size[0], this.size[1],
            x, y,
            this.size[0], this.size[1]);

        this.canvas.context.shadowBlur = 0;
    }
}