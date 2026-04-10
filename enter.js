/**
 * ENTER PAGE - PSYCHOLOGICAL HORROR ENGINE
 * Sistema extremo de efeitos terroríficos
 */

// ══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════════

window.addEventListener('load', () => {
  initializeHorror();
});

let isTrapped = false;
let heartRate = 60;

function initializeHorror() {
  initCanvas();
  initCursor();
  initHeartbeat();
  initEyeTracking();
  initMirrorEffect();
  initGlitchEffects();
  initRandomTerror();
  triggerPsychologicalTerror();
  
  // Disable default context menu
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  
  // Trap the user with funny/scary messages
  setupExitTraps();
}

// ══════════════════════════════════════════════════════════════════════════════
// CANVAS EFFECTS
// ══════════════════════════════════════════════════════════════════════════════

const mainCanvas = document.getElementById('main-canvas');
const mainCtx = mainCanvas.getContext('2d');
const distortionCanvas = document.getElementById('distortion-canvas');
const distortionCtx = distortionCanvas.getContext('2d');
const particlesCanvas = document.getElementById('particles-canvas');
const particlesCtx = particlesCanvas.getContext('2d');

function resizeAllCanvas() {
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight;
  distortionCanvas.width = window.innerWidth;
  distortionCanvas.height = window.innerHeight;
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
}

function initCanvas() {
  resizeAllCanvas();
  window.addEventListener('resize', resizeAllCanvas);

  animateMainCanvas();
  animateDistortion();
  animateParticles();
}

function animateMainCanvas() {
  mainCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

  // Random red lines (cracks)
  if (Math.random() < 0.01) {
    mainCtx.strokeStyle = `rgba(255, 0, 0, ${0.3 + Math.random() * 0.3})`;
    mainCtx.lineWidth = Math.random() * 3;
    mainCtx.beginPath();
    mainCtx.moveTo(Math.random() * mainCanvas.width, 0);
    mainCtx.lineTo(
      Math.random() * mainCanvas.width,
      mainCanvas.height
    );
    mainCtx.stroke();
  }

  // Random eye-like shapes
  if (Math.random() < 0.002) {
    drawRandomEye(
      Math.random() * mainCanvas.width,
      Math.random() * mainCanvas.height
    );
  }

  requestAnimationFrame(animateMainCanvas);
}

function animateDistortion() {
  distortionCtx.fillStyle = 'rgba(255, 0, 0, 0.05)';
  distortionCtx.fillRect(0, 0, distortionCanvas.width, distortionCanvas.height);

  // Wave distortion
  const time = Date.now() * 0.001;
  for (let i = 0; i < distortionCanvas.width; i += 10) {
    const y = Math.sin(time + i * 0.01) * 20;
    distortionCtx.strokeStyle = `rgba(255, 0, 0, 0.1)`;
    distortionCtx.beginPath();
    distortionCtx.moveTo(i, distortionCanvas.height / 2 + y);
    distortionCtx.lineTo(i + 5, distortionCanvas.height / 2 + Math.sin(time + (i + 5) * 0.01) * 20);
    distortionCtx.stroke();
  }

  requestAnimationFrame(animateDistortion);
}

function animateParticles() {
  particlesCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  particlesCtx.fillRect(0, 0, particlesCanvas.width, particlesCanvas.height);

  // Floating dark particles
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * particlesCanvas.width;
    const y = Math.random() * particlesCanvas.height;
    const size = Math.random() * 4;
    particlesCtx.fillStyle = `rgba(0, 0, 0, ${0.2 + Math.random() * 0.3})`;
    particlesCtx.fillRect(x, y, size, size);
  }

  requestAnimationFrame(animateParticles);
}

function drawRandomEye(x, y) {
  mainCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  mainCtx.beginPath();
  mainCtx.arc(x, y, 15, 0, Math.PI * 2);
  mainCtx.fill();

  mainCtx.fillStyle = 'rgba(139, 0, 0, 0.6)';
  mainCtx.beginPath();
  mainCtx.arc(x, y, 8, 0, Math.PI * 2);
  mainCtx.fill();

  // Quick fade
  setTimeout(() => {
    mainCtx.clearRect(x - 20, y - 20, 40, 40);
  }, 200);
}

// ══════════════════════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ══════════════════════════════════════════════════════════════════════════════

function initCursor() {
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

  // Make cursor shake sometimes
  setInterval(() => {
    if (Math.random() < 0.05) {
      const shake = (Math.random() - 0.5) * 20;
      cursor.style.transform = `translate(${shake}px, ${shake}px)`;
      setTimeout(() => {
        cursor.style.transform = 'translate(0, 0)';
      }, 50);
    }
  }, 1000);
}

// ══════════════════════════════════════════════════════════════════════════════
// HEARTBEAT SYSTEM
// ══════════════════════════════════════════════════════════════════════════════

function initHeartbeat() {
  const heartElement = document.getElementById('heart-beat');
  const bpmElement = document.getElementById('bpm');

  function updateHeartbeat() {
    // Increase heart rate based on time
    const elapsed = Date.now() / 1000;
    heartRate = Math.min(60 + elapsed * 2, 180);

    bpmElement.textContent = `BPM: ${Math.floor(heartRate)}`;

    // Visual pulse
    const beatDuration = (60 / heartRate) * 1000;
    heartElement.style.animation = `heartbeat ${beatDuration / 1000}s ease-in-out infinite`;

    // Occasional heart skip
    if (Math.random() < 0.02) {
      heartElement.style.animation = 'none';
      setTimeout(() => {
        heartElement.style.animation = `heartbeat ${beatDuration / 1000}s ease-in-out infinite`;
      }, 50);
    }

    requestAnimationFrame(updateHeartbeat);
  }

  updateHeartbeat();
}

// ══════════════════════════════════════════════════════════════════════════════
// EYE TRACKING
// ══════════════════════════════════════════════════════════════════════════════

function initEyeTracking() {
  const eyes = document.querySelectorAll('.pupil');

  document.addEventListener('mousemove', (e) => {
    eyes.forEach(pupil => {
      const eye = pupil.parentElement;
      const eyeRect = eye.getBoundingClientRect();
      const eyeX = eyeRect.left + eyeRect.width / 2;
      const eyeY = eyeRect.top + eyeRect.height / 2;

      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const distance = 15;

      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
  });

  // Random blinks
  setInterval(() => {
    if (Math.random() < 0.15) {
      eyes.forEach(eye => {
        eye.parentElement.style.animation = 'none';
        eye.parentElement.style.height = '10px';
        setTimeout(() => {
          eye.parentElement.style.height = '80px';
          eye.parentElement.style.animation = 'eye-twitch 0.8s ease-in-out infinite';
        }, 150);
      });
    }
  }, 3000);
}

// ══════════════════════════════════════════════════════════════════════════════
// MIRROR EFFECT
// ══════════════════════════════════════════════════════════════════════════════

function initMirrorEffect() {
  const mirrorCanvas = document.getElementById('mirror-canvas');
  const ctx = mirrorCanvas.getContext('2d');

  function drawMirror() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, mirrorCanvas.width, mirrorCanvas.height);

    // Draw a distorted face/reflection
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.ellipse(mirrorCanvas.width / 2, mirrorCanvas.height / 2, 80, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(mirrorCanvas.width / 2 - 30, mirrorCanvas.height / 2 - 20, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(mirrorCanvas.width / 2 + 30, mirrorCanvas.height / 2 - 20, 15, 0, Math.PI * 2);
    ctx.fill();

    // Pupils (looking directly at you)
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.arc(mirrorCanvas.width / 2 - 30, mirrorCanvas.height / 2 - 20, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(mirrorCanvas.width / 2 + 30, mirrorCanvas.height / 2 - 20, 8, 0, Math.PI * 2);
    ctx.fill();

    // Mouth (sometimes distorted)
    ctx.strokeStyle = '#8B0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (Math.random() < 0.3) {
      ctx.moveTo(mirrorCanvas.width / 2 - 20, mirrorCanvas.height / 2 + 30);
      ctx.lineTo(mirrorCanvas.width / 2, mirrorCanvas.height / 2 + 50);
      ctx.lineTo(mirrorCanvas.width / 2 + 20, mirrorCanvas.height / 2 + 30);
    } else {
      ctx.arc(mirrorCanvas.width / 2, mirrorCanvas.height / 2 + 30, 20, 0, Math.PI);
    }
    ctx.stroke();

    // Glitch effect
    if (Math.random() < 0.1) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
      ctx.fillRect(0, Math.random() * mirrorCanvas.height, mirrorCanvas.width, 20);
    }

    requestAnimationFrame(drawMirror);
  }

  drawMirror();
}

// ══════════════════════════════════════════════════════════════════════════════
// GLITCH EFFECTS
// ══════════════════════════════════════════════════════════════════════════════

function initGlitchEffects() {
  setInterval(() => {
    if (Math.random() < 0.1) {
      triggerFlash();
    }
    if (Math.random() < 0.05) {
      triggerChromatic();
    }
  }, 1000);
}

function triggerFlash() {
  const flash = document.getElementById('flash');
  flash.style.opacity = '0.3';
  setTimeout(() => {
    flash.style.opacity = '0';
  }, 50);
}

function triggerChromatic() {
  const chromatic = document.getElementById('chromatic');
  chromatic.style.opacity = '0.15';
  chromatic.style.filter = 'saturate(2)';
  setTimeout(() => {
    chromatic.style.opacity = '0';
  }, 200);
}

// ══════════════════════════════════════════════════════════════════════════════
// RANDOM TERROR EVENTS
// ══════════════════════════════════════════════════════════════════════════════

function initRandomTerror() {
  setInterval(() => {
    const random = Math.random();

    if (random < 0.1) {
      // Screen glitch
      document.body.style.transform = `skew(${(Math.random() - 0.5) * 2}deg)`;
      setTimeout(() => {
        document.body.style.transform = 'skew(0deg)';
      }, 100);
    } else if (random < 0.2) {
      // Color inversion
      const glitch = document.getElementById('glitch-overlay');
      glitch.style.opacity = '0.2';
      glitch.style.mixBlendMode = 'screen';
      setTimeout(() => {
        glitch.style.opacity = '0';
      }, 150);
    } else if (random < 0.3) {
      // Sound effect (if browser allows)
      playScarySound();
    }
  }, 2000);
}

function playScarySound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.frequency.value = 50 + Math.random() * 100;
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    // Silent fail if audio context not available
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// PSYCHOLOGICAL TERROR
// ══════════════════════════════════════════════════════════════════════════════

function triggerPsychologicalTerror() {
  const messages = document.querySelectorAll('.message');
  let delay = 2000;

  messages.forEach((msg, index) => {
    setTimeout(() => {
      msg.parentElement.style.display = 'block';
      msg.style.animationDelay = '0s';
    }, delay);
    delay += 4000;
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// ESCAPE FUNCTION (INESCAPABLE)
// ══════════════════════════════════════════════════════════════════════════════

function tryEscape() {
  const messages = [
    'VOCÊ NÃO PODE SAIR',
    'Ele não vai deixar',
    'Você já foi marcado',
    'NÃO HÁ ESCAPATÓRIA',
    'Bem-vindo ao inferno',
    'Isso é sua casa agora',
    'Você nunca irá embora'
  ];

  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  alert(randomMsg);

  // Move button randomly on click
  const btn = document.querySelector('.btn-escape');
  const randomX = (Math.random() - 0.5) * 200;
  const randomY = (Math.random() - 0.5) * 200;
  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  // Or sometimes trigger flash
  if (Math.random() < 0.5) {
    triggerFlash();
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// EXIT TRAPS
// ══════════════════════════════════════════════════════════════════════════════

function setupExitTraps() {
  // Trap Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      console.log('Você não pode sair...');
      playScarySound();
      triggerFlash();
    }
  });

  // Trap Alt+F4 detection (browser dependent)
  window.addEventListener('beforeunload', (e) => {
    if (!isTrapped) {
      e.preventDefault();
      e.returnValue = '';
      isTrapped = true;
      setTimeout(() => {
        isTrapped = false;
      }, 2000);
    }
  });

  // Trap right-click context menu (already prevented)
}

// ══════════════════════════════════════════════════════════════════════════════
// EASTER EGGS
// ══════════════════════════════════════════════════════════════════════════════

const easterEggs = [
  { keys: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'], message: 'Você ativou o modo de dificuldade extrema!' },
  { keys: ['c', 'o', 'd', 'e'], message: 'VOCÊ DESCOBRIU UM SEGREDO!' },
  { keys: ['h', 'e', 'l', 'p'], message: 'NÃO HÁ AJUDA AQUI' }
];

let pressedKeys = [];
document.addEventListener('keydown', (e) => {
  pressedKeys.push(e.key);
  if (pressedKeys.length > 10) pressedKeys.shift();

  easterEggs.forEach(egg => {
    if (egg.keys.every((key, idx) => pressedKeys[pressedKeys.length - egg.keys.length + idx] === key)) {
      console.log(`%c${egg.message}`, 'color: red; font-size: 20px; font-weight: bold;');
      triggerFlash();
      playScarySound();
    }
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// CONSOLE MESSAGES
// ══════════════════════════════════════════════════════════════════════════════

console.clear();
console.log('%c╔════════════════════════════════════════════════════════════╗', 'color: red; font-weight: bold;');
console.log('%c║             BEM-VINDO AO TERROR ETERNO               ║', 'color: red; font-weight: bold;');
console.log('%c╚════════════════════════════════════════════════════════════╝', 'color: red; font-weight: bold;');
console.log('%cVocê entrou. Agora você não pode sair.', 'color: #ff0055; font-size: 14px;');
console.log('%cELE está assistindo. ELE está ouvindo. ELE está aqui.', 'color: #8B0000; font-size: 14px;');
