/**
 * Schedule Page - Horror Event Schedule
 * Sistema interativo para gerenciar abas e animações
 */

// ══════════════════════════════════════════════════════════════════════════════
// CANVAS BACKGROUND EFFECTS
// ══════════════════════════════════════════════════════════════════════════════

const canvas = document.getElementById('horror-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle system for background
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2;
    this.opacity = Math.random() * 0.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.fillStyle = `rgba(139, 0, 0, ${this.opacity})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

const particles = [];
for (let i = 0; i < 50; i++) {
  particles.push(new Particle());
}

function animateCanvas() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  // Occasional blood lines
  if (Math.random() < 0.02) {
    ctx.strokeStyle = `rgba(139, 0, 0, 0.3)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, 0);
    ctx.lineTo(Math.random() * canvas.width, canvas.height);
    ctx.stroke();
  }

  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// ══════════════════════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ══════════════════════════════════════════════════════════════════════════════

const cursor = document.getElementById('cursor');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
});

// ══════════════════════════════════════════════════════════════════════════════
// TAB NAVIGATION
// ══════════════════════════════════════════════════════════════════════════════

const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;

    // Remove active class from all buttons and contents
    navBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    btn.classList.add('active');
    document.getElementById(tabName).classList.add('active');

    // Trigger glitch effect
    triggerGlitch();
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// GLITCH EFFECT
// ══════════════════════════════════════════════════════════════════════════════

function triggerGlitch() {
  const glitchOverlay = document.getElementById('glitch-overlay');
  glitchOverlay.style.opacity = '0.3';
  glitchOverlay.style.background = `
    linear-gradient(
      ${Math.random() * 360}deg,
      rgba(255, 0, 0, 0.1) 0%,
      transparent 50%
    )
  `;

  setTimeout(() => {
    glitchOverlay.style.opacity = '0';
  }, 200);
}

// ══════════════════════════════════════════════════════════════════════════════
// RANDOM GLITCHES
// ══════════════════════════════════════════════════════════════════════════════

setInterval(() => {
  if (Math.random() < 0.1) {
    triggerGlitch();
  }
}, 5000);

// ══════════════════════════════════════════════════════════════════════════════
// SOUND EFFECTS (Optional - Commented by default)
// ══════════════════════════════════════════════════════════════════════════════

// Uncomment below to enable sound effects
/*
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playErrorSound() {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  osc.frequency.value = 100;
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.2);
}

document.addEventListener('click', playErrorSound);
*/

// ══════════════════════════════════════════════════════════════════════════════
// EVENT HOVER EFFECTS
// ══════════════════════════════════════════════════════════════════════════════

const events = document.querySelectorAll('.event');
events.forEach(event => {
  event.addEventListener('mouseenter', () => {
    // Random text corruption
    if (Math.random() < 0.3) {
      const text = event.querySelector('.event-name');
      const original = text.textContent;
      text.textContent = original.split('').sort(() => Math.random() - 0.5).join('');
      
      setTimeout(() => {
        text.textContent = original;
      }, 100);
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL ANCHOR LINKS
// ══════════════════════════════════════════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// PAGE LOAD ANIMATION
// ══════════════════════════════════════════════════════════════════════════════

window.addEventListener('load', () => {
  const textLines = document.querySelectorAll('.text-line');
  textLines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.animation = `fadeInDown 0.8s ease-out ${index * 0.2}s forwards`;
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// KEYBOARD NAVIGATION
// ══════════════════════════════════════════════════════════════════════════════

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    const activeBtn = document.querySelector('.nav-btn.active');
    const nextBtn = activeBtn.nextElementSibling || activeBtn.parentElement.firstChild;
    if (nextBtn && nextBtn.classList.contains('nav-btn')) {
      nextBtn.click();
    }
  } else if (e.key === 'ArrowLeft') {
    const activeBtn = document.querySelector('.nav-btn.active');
    const prevBtn = activeBtn.previousElementSibling || activeBtn.parentElement.lastChild;
    if (prevBtn && prevBtn.classList.contains('nav-btn')) {
      prevBtn.click();
    }
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// RANDOM HORROR MESSAGES (Easter Egg)
// ══════════════════════════════════════════════════════════════════════════════

const horrorMessages = [
  'Ele está assistindo...',
  'Seu tempo está se esgotando...',
  'Não há escapatória...',
  'Você foi marcado...',
  'A maldição cresceu...',
  'Eles vêm por você...'
];

setInterval(() => {
  if (Math.random() < 0.05) {
    const msg = horrorMessages[Math.floor(Math.random() * horrorMessages.length)];
    console.log(`%c${msg}`, 'color: red; font-size: 20px; text-shadow: 0 0 10px red;');
  }
}, 3000);

console.log('%c⚠️ VOCÊ FOI MARCADO ⚠️', 'color: red; font-size: 30px; text-shadow: 0 0 20px red; font-weight: bold;');
