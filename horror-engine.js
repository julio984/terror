/**
 * ═══════════════════════════════════════════════════════════════════
 * HORROR SITE - ADVANCED ENGINE
 * Sistema de efeitos avançados para evento de terror
 * ═══════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════
// BLOOD CANVAS ENGINE - GOTAS DE SANGUE COM FÍSICA
// ═══════════════════════════════════════════════════════════════════
const canvas = document.getElementById('blood-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Blood drip class
class BloodDrip {
  constructor() { this.reset(); }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -Math.random() * 80;
    this.width = 3 + Math.random() * 8;
    this.speed = 0.4 + Math.random() * 1.2;
    this.length = 40 + Math.random() * 120;
    this.dripped = 0;
    this.poolRadius = 0;
    this.pooling = false;
    this.poolX = this.x;
    this.poolY = 0;
    this.opacity = 0.7 + Math.random() * 0.3;
    this.waver = Math.random() * Math.PI * 2;
    this.waverSpeed = 0.02 + Math.random() * 0.03;
    this.segments = [];
    this.done = false;
    this.fromTop = Math.random() < 0.6;
    if (!this.fromTop) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
    this.stain = null;
  }

  update() {
    if (this.pooling) {
      this.poolRadius += 0.3;
      if (this.poolRadius > this.width * 3) this.done = true;
      return;
    }

    this.waver += this.waverSpeed;
    const wobble = Math.sin(this.waver) * 1.5;
    const prevY = this.y;
    this.y += this.speed;
    this.dripped += this.speed;
    this.x += wobble * 0.2;

    this.segments.push({ x: this.x + wobble, y: prevY });

    if (this.dripped >= this.length || this.y > canvas.height + 20) {
      this.pooling = true;
      this.poolX = this.x + wobble;
      this.poolY = this.y;
    }
  }

  draw() {
    if (this.segments.length < 2) return;
    ctx.save();
    ctx.globalAlpha = this.opacity;

    const grad = ctx.createLinearGradient(this.x, this.segments[0].y, this.x, this.y);
    grad.addColorStop(0, '#3D0000');
    grad.addColorStop(0.4, '#8B0000');
    grad.addColorStop(1, '#CC0000');

    ctx.strokeStyle = grad;
    ctx.lineWidth = this.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(this.segments[0].x, this.segments[0].y);
    for (let i = 1; i < this.segments.length; i++) {
      const s = this.segments[i];
      const prev = this.segments[i - 1];
      const mx = (s.x + prev.x) / 2;
      const my = (s.y + prev.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
    }
    ctx.stroke();

    // Bulbous tip
    ctx.fillStyle = '#CC0000';
    ctx.beginPath();
    const tip = this.segments[this.segments.length - 1];
    ctx.ellipse(tip.x, tip.y, this.width / 2 + 2, this.width / 2 + 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pool
    if (this.pooling && this.poolRadius > 0) {
      const poolGrad = ctx.createRadialGradient(this.poolX, this.poolY, 0, this.poolX, this.poolY, this.poolRadius);
      poolGrad.addColorStop(0, '#8B0000cc');
      poolGrad.addColorStop(0.6, '#3D000099');
      poolGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = poolGrad;
      ctx.beginPath();
      ctx.ellipse(this.poolX, this.poolY, this.poolRadius * 1.8, this.poolRadius * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// Blood splatter on click/touch
class Splatter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.age = 0;
    const count = 12 + Math.floor(Math.random() * 20);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 6;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 2 + Math.random() * 8,
        life: 1,
        decay: 0.02 + Math.random() * 0.04
      });
    }
  }

  update() {
    this.age++;
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.vx *= 0.95;
      p.life -= p.decay;
      p.r *= 0.98;
    });
    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw() {
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life * 0.9;
      ctx.fillStyle = p.life > 0.5 ? '#CC0000' : '#8B0000';
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r, p.r * 0.7, Math.atan2(p.vy, p.vx), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }
}

// Persistent blood stains on canvas
class BloodStain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 8 + Math.random() * 25;
    this.opacity = 0.3 + Math.random() * 0.4;
    this.drawn = false;
  }
}

let drips = [];
let splatters = [];
let stains = [];
const MAX_DRIPS = 25;

function spawnDrip() {
  if (drips.length < MAX_DRIPS) {
    drips.push(new BloodDrip());
  }
}

// Spawn initial drips
for (let i = 0; i < 12; i++) {
  const d = new BloodDrip();
  d.y = Math.random() * canvas.height * 0.6;
  d.dripped = Math.random() * d.length * 0.8;
  for (let j = 0; j < d.y; j += 3) {
    d.segments.push({ x: d.x + Math.sin(j * 0.05) * 2, y: j });
  }
  drips.push(d);
}

// ═══════════════════════════════════════════════════════════════════
// STAIN LAYER (persistent beneath drips)
// ═══════════════════════════════════════════════════════════════════
const stainCanvas = document.createElement('canvas');
stainCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
document.body.insertBefore(stainCanvas, canvas);
const sctx = stainCanvas.getContext('2d');

function resizeStain() { 
  stainCanvas.width = window.innerWidth; 
  stainCanvas.height = window.innerHeight; 
}
resizeStain();
window.addEventListener('resize', resizeStain);

function drawStain(x, y) {
  const r = 10 + Math.random() * 30;
  const g = sctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(80,0,0,0.5)`);
  g.addColorStop(0.5, `rgba(50,0,0,0.3)`);
  g.addColorStop(1, 'transparent');
  sctx.fillStyle = g;
  sctx.beginPath();
  sctx.ellipse(x, y, r * 1.5, r * 0.8, Math.random() * Math.PI, 0, Math.PI * 2);
  sctx.fill();
}

// Pre-draw some stains
for (let i = 0; i < 18; i++) {
  drawStain(Math.random() * window.innerWidth, Math.random() * 200);
}

// ═══════════════════════════════════════════════════════════════════
// PARTICLES CANVAS - EFEITO DE NEBLINA/PARTÍCULAS
// ═══════════════════════════════════════════════════════════════════
const particlesCanvas = document.getElementById('particles-canvas');
const pCtx = particlesCanvas.getContext('2d');
particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
});

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.life = Math.random() * 0.5 + 0.3;
    this.maxLife = this.life;
    this.size = Math.random() * 3 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.001;
    
    if (this.x < 0) this.x = window.innerWidth;
    if (this.x > window.innerWidth) this.x = 0;
    if (this.y < 0) this.y = window.innerHeight;
    if (this.y > window.innerHeight) this.y = 0;
  }

  draw() {
    const alpha = (this.life / this.maxLife) * 0.3;
    pCtx.fillStyle = `rgba(200, 0, 0, ${alpha})`;
    pCtx.beginPath();
    pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    pCtx.fill();
  }
}

// Spawn particles
for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

// ═══════════════════════════════════════════════════════════════════
// EYES CANVAS - OLHOS ASSUSTADORES QUE SEGUEM O MOUSE
// ═══════════════════════════════════════════════════════════════════
const eyesCanvas = document.getElementById('eyes-canvas');
const eyeCtx = eyesCanvas.getContext('2d');
eyesCanvas.width = window.innerWidth;
eyesCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  eyesCanvas.width = window.innerWidth;
  eyesCanvas.height = window.innerHeight;
});

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

const eyePositions = [
  { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
  { x: window.innerWidth * 0.8, y: window.innerHeight * 0.2 },
  { x: window.innerWidth * 0.5, y: window.innerHeight * 0.6 },
  { x: window.innerWidth * 0.15, y: window.innerHeight * 0.75 },
  { x: window.innerWidth * 0.85, y: window.innerHeight * 0.85 },
];

function drawEyes() {
  eyeCtx.clearRect(0, 0, eyesCanvas.width, eyesCanvas.height);
  
  eyePositions.forEach(eyePos => {
    const angle = Math.atan2(mouseY - eyePos.y, mouseX - eyePos.x);
    const distance = 8;
    const pupilX = eyePos.x + Math.cos(angle) * distance;
    const pupilY = eyePos.y + Math.sin(angle) * distance;

    // Eye white
    eyeCtx.fillStyle = 'rgba(200, 0, 0, 0.2)';
    eyeCtx.beginPath();
    eyeCtx.arc(eyePos.x, eyePos.y, 15, 0, Math.PI * 2);
    eyeCtx.fill();

    // Pupil
    eyeCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    eyeCtx.beginPath();
    eyeCtx.arc(pupilX, pupilY, 8, 0, Math.PI * 2);
    eyeCtx.fill();

    // Iris
    eyeCtx.fillStyle = 'rgba(200, 0, 0, 0.5)';
    eyeCtx.beginPath();
    eyeCtx.arc(pupilX, pupilY, 4, 0, Math.PI * 2);
    eyeCtx.fill();
  });
}

// ═══════════════════════════════════════════════════════════════════
// MAIN ANIMATION LOOP
// ═══════════════════════════════════════════════════════════════════
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

  // Update & draw drips
  drips.forEach(d => { d.update(); d.draw(); });

  // Remove done drips, add stains, respawn
  drips = drips.filter(d => {
    if (d.done) {
      drawStain(d.poolX, d.poolY);
      return false;
    }
    return true;
  });

  // Spawn new drips
  if (Math.random() < 0.04) spawnDrip();

  // Update & draw splatters
  splatters.forEach(s => { s.update(); s.draw(); });
  splatters = splatters.filter(s => s.particles.length > 0);

  // Update & draw particles
  particles.forEach(p => {
    if (p.life <= 0) {
      p.life = p.maxLife;
      p.x = Math.random() * window.innerWidth;
      p.y = Math.random() * window.innerHeight;
    }
    p.update();
    p.draw();
  });

  // Draw eyes
  drawEyes();

  requestAnimationFrame(animate);
}
animate();

// ═══════════════════════════════════════════════════════════════════
// CURSOR - CURSORES CUSTOMIZADOS
// ═══════════════════════════════════════════════════════════════════
const cursor = document.getElementById('cursor');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';

  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Blood on click
document.addEventListener('click', e => {
  splatters.push(new Splatter(e.clientX, e.clientY));
  
  // Random drip from click point
  const d = new BloodDrip();
  d.x = e.clientX;
  d.y = e.clientY;
  d.width = 4 + Math.random() * 6;
  d.speed = 0.8 + Math.random() * 1.5;
  drips.push(d);

  // Screen shake effect
  triggerScreenShake(5, 10);

  // Glitch effect
  triggerGlitch();
});

// ═══════════════════════════════════════════════════════════════════
// SCREEN SHAKE
// ═══════════════════════════════════════════════════════════════════
function triggerScreenShake(intensity = 5, duration = 100) {
  let elapsed = 0;
  const content = document.querySelector('.content');
  const originalTransform = content.style.transform;

  const shakeInterval = setInterval(() => {
    elapsed += 16;
    if (elapsed >= duration) {
      clearInterval(shakeInterval);
      content.style.transform = originalTransform;
      return;
    }

    const offsetX = (Math.random() - 0.5) * intensity;
    const offsetY = (Math.random() - 0.5) * intensity;
    content.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }, 16);
}

// ═══════════════════════════════════════════════════════════════════
// GLITCH EFFECT - DISTORÇÃO DE IMAGEM
// ═══════════════════════════════════════════════════════════════════
function triggerGlitch() {
  const glitchOverlay = document.getElementById('glitch-overlay');
  glitchOverlay.style.opacity = '0.1';

  // Glitch animation
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      glitchOverlay.style.background = `linear-gradient(
        to bottom,
        transparent 0%,
        rgba(${Math.random() * 255}, 0, 0, 0.3) ${Math.random() * 100}%,
        transparent 100%
      )`;
      glitchOverlay.style.opacity = Math.random() * 0.15;
    }, i * 30);
  }

  setTimeout(() => {
    glitchOverlay.style.opacity = '0';
  }, 100);
}

// ═══════════════════════════════════════════════════════════════════
// COUNTDOWN TIMER
// ═══════════════════════════════════════════════════════════════════
const target = new Date();
target.setDate(target.getDate() + Math.floor(Math.random() * 7 + 1));
target.setHours(23, 59, 59, 0);

function updateCountdown() {
  const now = new Date();
  let diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000); diff %= 3600000;
  const m = Math.floor(diff / 60000); diff %= 60000;
  const s = Math.floor(diff / 1000);

  document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ═══════════════════════════════════════════════════════════════════
// GLITCH RANDOM TRIGGER - EFEITO ALEATÓRIO
// ═══════════════════════════════════════════════════════════════════
setInterval(() => {
  const h1 = document.querySelector('h1');
  if (h1 && Math.random() < 0.3) {
    h1.style.transform = `translate(${(Math.random()-0.5)*8}px, ${(Math.random()-0.5)*5}px) scaleX(${0.98 + Math.random() * 0.04})`;
    setTimeout(() => { 
      h1.style.transform = ''; 
    }, 80);
  }
}, 2500 + Math.random() * 4000);

// ═══════════════════════════════════════════════════════════════════
// BACKGROUND AMBIENT BLOOD PULSE
// ═══════════════════════════════════════════════════════════════════
let pulse = 0;
setInterval(() => {
  pulse++;
  const intensity = Math.sin(pulse * 0.3) * 0.015 + 0.025;
  document.getElementById('flicker').style.background = `rgba(100,0,0,${intensity})`;
}, 80);

// ═══════════════════════════════════════════════════════════════════
// DISTORTION GRID ANIMATION - GRADE DE DISTORÇÃO
// ═══════════════════════════════════════════════════════════════════
let gridTime = 0;
setInterval(() => {
  gridTime += 0.01;
  const grid = document.getElementById('distortion-grid');
  const offset = Math.sin(gridTime) * 20;
  grid.style.backgroundPosition = `${offset}px ${offset}px`;
}, 30);

// ═══════════════════════════════════════════════════════════════════
// CARD INTERACTIVITY - EFEITOS NOS CARDS
// ═══════════════════════════════════════════════════════════════════
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    // Spawn particles on card hover
    for (let i = 0; i < 5; i++) {
      const rect = this.getBoundingClientRect();
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      splatters.push(new Splatter(x, y));
    }
  });

  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 2;
    const rotateY = ((x - centerX) / centerX) * -2;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// ═══════════════════════════════════════════════════════════════════
// BUTTON HOVER EFFECTS
// ═══════════════════════════════════════════════════════════════════
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
  ctaBtn.addEventListener('click', function() {
    triggerScreenShake(8, 200);
    triggerGlitch();
    
    // Spawn many particles
    for (let i = 0; i < 30; i++) {
      splatters.push(new Splatter(mx, my));
    }
  });

  ctaBtn.addEventListener('mouseenter', function() {
    // Sound effect would go here
    triggerGlitch();
  });
}

// ═══════════════════════════════════════════════════════════════════
// RANDOM AMBIENT GLITCHES
// ═══════════════════════════════════════════════════════════════════
setInterval(() => {
  if (Math.random() < 0.1) {
    triggerGlitch();
  }
}, 2000);

// ═══════════════════════════════════════════════════════════════════
// SCROLL PARALLAX EFFECT
// ═══════════════════════════════════════════════════════════════════
let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  
  const titleWrap = document.querySelector('.title-wrap');
  if (titleWrap) {
    titleWrap.style.transform = `translateY(${scrollY * 0.5}px)`;
  }

  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    const offset = (scrollY * (0.2 + index * 0.05));
    card.style.transform = `translateY(${offset}px)`;
  });
});

// ═══════════════════════════════════════════════════════════════════
// AMBIENT SOUND AND ATMOSPHERE
// ═══════════════════════════════════════════════════════════════════
// Cria uma atmosfera com variações de brilho
const ambientGlow = document.getElementById('ambient-glow');
let glowDirection = 1;
let glowIntensity = 0;

setInterval(() => {
  glowIntensity += 0.02 * glowDirection;
  if (glowIntensity >= 1) glowDirection = -1;
  if (glowIntensity <= 0) glowDirection = 1;
  
  if (ambientGlow) {
    ambientGlow.style.opacity = glowIntensity * 0.5;
  }
}, 30);

console.log('🩸 Horror Engine Loaded - Maldição Ativada 🩸');
