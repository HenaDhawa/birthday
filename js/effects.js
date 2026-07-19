/* ===================================================================
   EFFECTS.JS — reusable confetti burst + fireworks canvas
   Exposed globally as window.BdayEffects
=================================================================== */

window.BdayEffects = (function () {
  'use strict';

  const COLORS = ['#e88fa3', '#f6c9d4', '#eab96a', '#f6d99a', '#ffffff', '#b85670'];

  /* ---------- DOM confetti burst (lightweight, for click moments) ---------- */
  function confettiBurst(originX = window.innerWidth / 2, originY = window.innerHeight / 2, count = 90) {
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:400;overflow:hidden;';
    document.body.appendChild(container);

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      const size = 6 + Math.random() * 7;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const isCircle = Math.random() > 0.5;
      piece.style.cssText = `
        position:absolute; left:${originX}px; top:${originY}px;
        width:${size}px; height:${size * (isCircle ? 1 : 0.5)}px;
        background:${color}; border-radius:${isCircle ? '50%' : '2px'};
        opacity:0.95; will-change:transform;
      `;
      container.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 260;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 120;
      const rotate = Math.random() * 720 - 360;
      const duration = 1400 + Math.random() * 1200;

      piece.animate(
        [
          { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${dx * 0.6}px, ${dy}px) rotate(${rotate * 0.6}deg)`, opacity: 1, offset: 0.5 },
          { transform: `translate(${dx}px, ${dy + 420}px) rotate(${rotate}deg)`, opacity: 0 },
        ],
        { duration, easing: 'cubic-bezier(.22,.9,.34,1)', fill: 'forwards' }
      );
    }
    setTimeout(() => container.remove(), 2800);
  }

  /* ---------- Canvas confetti rain (continuous, for celebration page) ---------- */
  function confettiRain(canvas, durationMs = 4000) {
    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas);
    const pieces = Array.from({ length: 140 }, () => spawnPiece(canvas));
    let raf;
    const start = performance.now();

    function spawnPiece(c) {
      return {
        x: Math.random() * c.width,
        y: -20 - Math.random() * c.height,
        size: 5 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speed: 1.5 + Math.random() * 2.6,
        drift: (Math.random() - 0.5) * 1.6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
      };
    }

    function frame(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });
      if (now - start < durationMs) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }

  function resizeCanvas(canvas) {
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  /* ---------- Fireworks canvas ---------- */
  function initFireworks(canvas, options = {}) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let running = true;
    const gravity = 0.045;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function launch(x, y) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 46 + Math.floor(Math.random() * 30);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 1.6 + Math.random() * 3.4;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.008 + Math.random() * 0.012,
          color,
          size: 1.8 + Math.random() * 1.8,
        });
      }
    }

    function autoLaunch() {
      if (!running) return;
      const x = canvas.width * (0.18 + Math.random() * 0.64);
      const y = canvas.height * (0.18 + Math.random() * 0.35);
      launch(x, y);
      setTimeout(autoLaunch, 650 + Math.random() * 900);
    }

    function frame() {
      ctx.fillStyle = 'rgba(18,10,32,0.18)';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((p) => {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      particles = particles.filter((p) => p.life > 0);
      ctx.globalAlpha = 1;
      if (running) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
    if (options.auto !== false) autoLaunch();

    return {
      launch,
      stop: () => { running = false; },
    };
  }

  return { confettiBurst, confettiRain, initFireworks };
})();
