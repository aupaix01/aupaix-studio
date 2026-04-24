const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let player = { x: canvas.width/2, y: canvas.height/2, size: 20, color: '#d4af37', hp: 100 };
let enemies = [];
let bullets = [];
let score = 0;

// Agent Logic: Regelt de moeilijkheid
let difficulty = 1;

function spawnEnemy() {
    if (enemies.length < 5 * difficulty) {
        enemies.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 25,
            hp: 2,
            color: '#ff4444'
        });
    }
}

function update() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);

    // Agent Combat: Enemy AI
    enemies.forEach((en, index) => {
        let dx = player.x - en.x;
        let dy = player.y - en.y;
        let angle = Math.atan2(dy, dx);
        en.x += Math.cos(angle) * (2 * difficulty);
        en.y += Math.sin(angle) * (2 * difficulty);

        ctx.fillStyle = en.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = en.color;
        ctx.fillRect(en.x, en.y, en.size, en.size);
        ctx.shadowBlur = 0;

        // Collision check
        if (Math.hypot(player.x - en.x, player.y - en.y) < player.size) {
            player.hp -= 0.5;
            if (player.hp <= 0) location.reload();
        }
    });

    // Bullets
    bullets.forEach((b, i) => {
        b.x += b.vx;
        b.y += b.vy;
        ctx.fillStyle = '#fff';
        ctx.fillRect(b.x, b.y, 5, 5);

        enemies.forEach((en, ei) => {
            if (Math.hypot(b.x - en.x, b.y - en.y) < en.size) {
                en.hp--;
                bullets.splice(i, 1);
                if (en.hp <= 0) {
                    enemies.splice(ei, 1);
                    score += 100;
                    difficulty += 0.05; // Agent Logic schaalt op
                }
            }
        });
    });

    ctx.fillStyle = '#d4af37';
    ctx.font = '20px Orbitron';
    ctx.fillText('CORE HP: ' + Math.floor(player.hp) + '%', 20, 40);
    ctx.fillText('SCORE: ' + score, 20, 70);
    
    spawnEnemy();
    requestAnimationFrame(update);
}

window.addEventListener('mousemove', e => {
    player.x = e.clientX;
    player.y = e.clientY;
});

window.addEventListener('mousedown', e => {
    // Agent Architect: Weapon systems
    for(let i=0; i<3; i++) {
        let angle = (Math.PI * 2 / 3) * i;
        bullets.push({ x: player.x, y: player.y, vx: Math.cos(angle)*10, vy: Math.sin(angle)*10 });
    }
});

update();
