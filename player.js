class Player {
    constructor(x) {
        this.x = x;
        this.y = 30;
        this.lifes = 3;
        this.score = 0;
    }

    draw() {
        boardContext.fillStyle = "grey";
        boardContext.strokeStyle = "black";
        boardContext.fillRect(this.x, this.y, 10, 10);
        boardContext.strokeRect(this.x, this.y, 10, 10);       
    }

    move(dx) {
        this.x += dx;
    }
}