class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.markedForDeletion = false;

        if (type === 'fast') {
            this.width = 30;
            this.height = 30;
            this.speed = 4;
            this.hp = 1;
            this.score = 150;
            this.color = '#ffff00';
        } else if (type === 'tank') {
            this.width = 50;
            this.height = 50;
            this.speed = 1.5;
            this.hp = 3;
            this.score = 300;
            this.color = '#ff0055';
        } else { // normal
            this.width = 40;
            this.height = 40;
            this.speed = 2.5;
            this.hp = 1;
            this.score = 100;
            this.color = '#9d00ff';
        }
    }

    update() {
        this.y += this.speed;
        if (this.y > 600) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Bentuk Segitiga Musuh
        ctx.moveTo(0, this.height / 2);
        ctx.lineTo(-this.width / 2, -this.height / 2);
        ctx.lineTo(this.width / 2, -this.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}