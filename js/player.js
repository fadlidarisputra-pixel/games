class Player {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.width = 40;
        this.height = 40;
        this.x = canvasWidth / 2;
        this.y = canvasHeight - 60;
        this.speed = 6;
        this.isShielded = false;
        this.rapidFire = false;
        this.doubleShot = false;
    }

    moveLeft() { this.x = Math.max(this.width / 2, this.x - this.speed); }
    moveRight() { this.x = Math.min(this.canvasWidth - this.width / 2, this.x + this.speed); }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Efek Shield
        if (this.isShielded) {
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.strokeStyle = '#00f3ff';
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        // Pesawat Player
        ctx.fillStyle = '#00f3ff';
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}