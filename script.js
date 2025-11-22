// MATRIX RAIN CANVAS
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

function matrixReset() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
window.addEventListener('resize', matrixReset);

function matrixDraw() {
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'rgba(0,240,255,0.08)';
  ctx.font = '14px monospace';

  for (let i = 0; i < ypos.length; i++) {
    const text = String.fromCharCode(33 + Math.random() * 90);
    ctx.fillText(text, i * 20, ypos[i]);

    if (ypos[i] > 100 + Math.random() * 10000) ypos[i] = 0;
    else ypos[i] += 18 + Math.random() * 5;
  }
}
setInterval(matrixDraw, 40);

// PARTICLES (Neon floating)
const particles = [];

function makeParticle() {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.6,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    life: 300 + Math.random() * 800,
    age: 0
  });

  if (particles.length > 60) particles.shift();
}
for (let i = 0; i < 40; i++) makeParticle();

function drawParticles() {
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.age++;

    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 18);
    g.addColorStop(0, 'rgba(0,240,255,' + (0.08 * (1 - p.age / p.life)) + ')');
    g.addColorStop(1, 'rgba(0,240,255,0)');

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
    ctx.fill();
  });
}

function loop() {
  drawParticles();
  requestAnimationFrame(loop);
}
loop();
