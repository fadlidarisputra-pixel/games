class Boss {
    constructor() {
        this.x = 400;
        this.y = -100;
        this.width = 120;
        this.height = 80;
        this.hp = 50;
        this.maxHp = 50;
        this.vx = 3;
        this.vy = 1;
        this.shootTimer = 0;
        this.markedForDeletion = false;
    }

    update(bullets) {
        if (this.y < 80) this.y += this.vy;
        else {
            this.x += this.vx;
            if (this.x < 100 || this.x > 700) this.vx *= -1;
        }

        // Tembakan Boss
        this.shootTimer++;
        if (this.shootTimer > 60) {
            bullets.push(new Bullet(this.x, this.y + 40, 5, '#ff0055', true));
            this.shootTimer = 0;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#ff0055';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff0055';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}