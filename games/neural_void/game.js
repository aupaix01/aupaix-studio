const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 800; canvas.height = 400;
let player = {x: 50, y: 300, w: 30, h: 30, dy: 0, jumping: false};
let obstacles = []; let score = 0;
function draw() {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,800,400);
    ctx.fillStyle = '#d4af37'; ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = '#ff0000';
    obstacles.forEach(o => { ctx.fillRect(o.x, o.y, o.w, o.h); o.x -= 5; });
    if (Math.random() < 0.02) obstacles.push({x: 800, y: 300, w: 20, h: 30});
    player.y += player.dy; player.dy += 0.5;
    if (player.y > 300) { player.y = 300; player.dy = 0; player.jumping = false; }
    score++; ctx.fillStyle = '#fff'; ctx.fillText('SYNC SCORE: ' + score, 10, 20);
    requestAnimationFrame(draw);
}
window.addEventListener('keydown', (e) => { if (e.code === 'Space' && !player.jumping) { player.dy = -10; player.jumping = true; } });
draw();
