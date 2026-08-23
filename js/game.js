// ==========================================
// 1. SOUND MANAGER
// ==========================================
class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playShoot() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            let osc = this.ctx.createOscillator();
            let gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.1);
        } catch (e) {}
    }

    playExplosion() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            let osc = this.ctx.createOscillator();
            let gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.3);
        } catch (e) {}
    }

    playPowerup() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            let osc = this.ctx.createOscillator();
            let gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.2);
        } catch (e) {}
    }
}
const audioMgr = new SoundManager();

// ==========================================
// 2. CLASSES GAME ENTITIES
// ==========================================
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.alpha = 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

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
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
    }
}

class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
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
        ctx.fillStyle = colors[this.type] || '#ffffff';
        ctx.fill();
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        ctx.fillText(icons[this.type] || '?', this.x, this.y);
    }
}

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
        } else {
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
        ctx.moveTo(0, this.height / 2);
        ctx.lineTo(-this.width / 2, -this.height / 2);
        ctx.lineTo(this.width / 2, -this.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

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
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

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
        if (this.isShielded) {
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.strokeStyle = '#00f3ff';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
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

// ==========================================
// 3. GAME ENGINE INITIALIZATION
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let defaultLives = typeof DEFAULT_LIVES !== 'undefined' ? DEFAULT_LIVES : 3;
let player = new Player(canvas.width, canvas.height);
let bullets = [];
let enemies = [];
let particles = [];
let powerups = [];
let boss = null;

let score = 0;
let highscore = localStorage.getItem('ss_highscore') || 0;
let lives = defaultLives;
let level = 1;
let isPaused = false;
let isGameOver = false;
let spawnTimer = 0;
let keys = {};

window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);

document.getElementById('btn-pause').addEventListener('click', togglePause);
document.getElementById('btn-resume').addEventListener('click', togglePause);
document.getElementById('btn-restart').addEventListener('click', resetGame);
document.getElementById('btn-playagain').addEventListener('click', resetGame);
document.getElementById('btn-sound').addEventListener('click', () => {
    let active = audioMgr.toggle();
    document.getElementById('btn-sound').innerText = active ? '🔊' : '🔇';
});

const bindTouch = (id, action) => {
    let btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('touchstart', (e) => { e.preventDefault();
        action(true); });
    btn.addEventListener('touchend', (e) => { e.preventDefault();
        action(false); });
};
bindTouch('btn-left', v => keys['ArrowLeft'] = v);
bindTouch('btn-right', v => keys['ArrowRight'] = v);
bindTouch('btn-shoot', v => { if (v) shoot(); });

let lastShoot = 0;

function shoot() {
    let now = Date.now();
    let cooldown = player.rapidFire ? 120 : 250;
    if (now - lastShoot > cooldown) {
        if (player.doubleShot) {
            bullets.push(new Bullet(player.x - 12, player.y));
            bullets.push(new Bullet(player.x + 12, player.y));
        } else {
            bullets.push(new Bullet(player.x, player.y));
        }
        audioMgr.playShoot();
        lastShoot = now;
    }
}

function spawnEnemies() {
    spawnTimer++;
    let spawnRate = Math.max(20, 80 - level * 5);
    if (spawnTimer > spawnRate && !boss) {
        let x = Math.random() * (canvas.width - 60) + 30;
        let rand = Math.random();
        let type = rand < 0.6 ? 'normal' : rand < 0.85 ? 'fast' : 'tank';
        enemies.push(new Enemy(x, -20, type));
        spawnTimer = 0;
    }

    if (level % 5 === 0 && !boss) {
        boss = new Boss();
        document.getElementById('boss-hp-container').classList.remove('hidden');
    }
}

function update() {
    if (isPaused || isGameOver) return;

    if (keys['ArrowLeft'] || keys['KeyA']) player.moveLeft();
    if (keys['ArrowRight'] || keys['KeyD']) player.moveRight();
    if (keys['Space']) shoot();

    bullets.forEach(b => b.update());
    enemies.forEach(e => e.update());
    powerups.forEach(p => p.update());
    particles.forEach(pt => pt.update());
    if (boss) boss.update(bullets);

    bullets.forEach(b => {
        if (b.isEnemy) {
            if (checkCollision(b, player)) {
                b.markedForDeletion = true;
                hitPlayer();
            }
            return;
        }

        enemies.forEach(e => {
            if (checkCollision(b, e)) {
                b.markedForDeletion = true;
                e.hp--;
                createParticles(e.x, e.y, e.color);
                if (e.hp <= 0) {
                    e.markedForDeletion = true;
                    score += e.score;
                    audioMgr.playExplosion();
                    maybeDropPowerup(e.x, e.y);
                }
            }
        });

        if (boss && checkCollision(b, boss)) {
            b.markedForDeletion = true;
            boss.hp--;
            document.getElementById('boss-hp-fill').style.width = `${(boss.hp / boss.maxHp) * 100}%`;
            if (boss.hp <= 0) {
                boss = null;
                score += 1000;
                document.getElementById('boss-hp-container').classList.add('hidden');
                audioMgr.playExplosion();
            }
        }
    });

    enemies.forEach(e => {
        if (checkCollision(player, e)) {
            e.markedForDeletion = true;
            hitPlayer();
        } else if (e.y > canvas.height) {
            lives--;
            e.markedForDeletion = true;
            updateHUD();
        }
    });

    powerups.forEach(p => {
        if (checkCollision(player, p)) {
            p.markedForDeletion = true;
            applyPowerup(p.type);
            audioMgr.playPowerup();
        }
    });

    bullets = bullets.filter(b => !b.markedForDeletion);
    enemies = enemies.filter(e => !e.markedForDeletion);
    powerups = powerups.filter(p => !p.markedForDeletion);
    particles = particles.filter(pt => pt.alpha > 0);

    level = Math.floor(score / 1000) + 1;
    if (lives <= 0) gameOver();

    spawnEnemies();
    updateHUD();
}

function hitPlayer() {
    if (player.isShielded) return;
    lives--;
    audioMgr.playExplosion();
    if (lives <= 0) gameOver();
}

function maybeDropPowerup(x, y) {
    if (Math.random() < 0.15) {
        let types = ['rapid', 'double', 'shield', 'life'];
        powerups.push(new PowerUp(x, y, types[Math.floor(Math.random() * types.length)]));
    }
}

function applyPowerup(type) {
    if (type === 'rapid') { player.rapidFire = true;
        setTimeout(() => player.rapidFire = false, 5000); }
    if (type === 'double') { player.doubleShot = true;
        setTimeout(() => player.doubleShot = false, 6000); }
    if (type === 'shield') { player.isShielded = true;
        setTimeout(() => player.isShielded = false, 7000); }
    if (type === 'life') { lives = Math.min(defaultLives + 2, lives + 1); }
}

function checkCollision(a, b) {
    return Math.abs(a.x - b.x) < (a.width || a.radius || 10) / 2 + (b.width || b.radius || 10) / 2 &&
        Math.abs(a.y - b.y) < (a.height || a.radius || 10) / 2 + (b.height || b.radius || 10) / 2;
}

function createParticles(x, y, color) {
    for (let i = 0; i < 8; i++) particles.push(new Particle(x, y, color));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    bullets.forEach(b => b.draw(ctx));
    enemies.forEach(e => e.draw(ctx));
    powerups.forEach(p => p.draw(ctx));
    particles.forEach(pt => pt.draw(ctx));
    if (boss) boss.draw(ctx);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function updateHUD() {
    document.getElementById('score-val').innerText = score;
    document.getElementById('level-val').innerText = level;
    document.getElementById('lives-val').innerText = '❤️'.repeat(Math.max(0, lives));
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('ss_highscore', highscore);
    }
    document.getElementById('highscore-val').innerText = highscore;
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('overlay-pause').classList.toggle('hidden', !isPaused);
}

function gameOver() {
    isGameOver = true;
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-highscore').innerText = highscore;
    document.getElementById('overlay-gameover').classList.remove('hidden');
}

function resetGame() {
    score = 0;
    lives = defaultLives;
    level = 1;
    bullets = [];
    enemies = [];
    powerups = [];
    boss = null;
    isGameOver = false;
    isPaused = false;
    document.getElementById('overlay-gameover').classList.add('hidden');
    document.getElementById('overlay-pause').classList.add('hidden');
    document.getElementById('boss-hp-container').classList.add('hidden');
}

document.getElementById('highscore-val').innerText = highscore;
gameLoop();