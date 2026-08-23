class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'rapid', 'double', 'shield', 'life'
        this.radius = 12;
        this.vy = 2;
        this.markedForDeletion = false;
    }

    update() {
        this.y += this.vy;
        if (this.y > 600) this.markedForDeletion = true;
    }

    draw(ctx) {
        let colors = { rapid: '#ffff00', double: '#00ff00', shield: '#00f3ff', life: '#ff0055' };
        let icons = { rapid: '⚡', double: '🔫', shield: '🛡️', life: '❤️' };

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[this.type];
        ctx.fill();
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icons[this.type], this.x, this.y);
    }
}