class Bullet {
    constructor(x, y, vy = -8, color = '#00f3ff', isEnemy = false) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 12;
        this.vy = vy;
        this.color = color;
        this.isEnemy = isEnemy;
        this.markedForDeletion = false;
    }

    update() {
        this.y += this.vy;
        if (this.y < 0 || this.y > 600) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}