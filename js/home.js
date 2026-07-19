/* ===================================================================
   HOME.JS — constellation heart canvas (signature element) + CTA
=================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('constellation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, points, drawProgress = 0;

  // Points tracing a heart silhouette (parametric heart curve), scaled later.
  function heartPoints(count) {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      pts.push({ x, y });
    }
    return pts;
  }

  const rawHeart = heartPoints(70);
  const bgStars = [];

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    bgStars.length = 0;
    const count = width < 700 ? 40 : 80;
    for (let i = 0; i < count; i++) {
      bgStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }
    const scale = Math.min(width, height) * (width < 700 ? 0.16 : 0.13);
    const cx = width / 2;
    const cy = height * (width < 700 ? 0.42 : 0.4);
    points = rawHeart.map((p) => ({ x: cx + p.x * scale * 0.1, y: cy + p.y * scale * 0.1 }));
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    // ambient background stars
    bgStars.forEach((s) => {
      const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time / 900 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(246, 217, 154, ${twinkle * 0.7})`;
      ctx.fill();
    });

    // animate the heart being traced then held, connecting star-to-star
    const total = points.length;
    const visibleCount = Math.min(total, Math.floor(drawProgress));
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(232, 143, 163, 0.55)';
    ctx.beginPath();
    for (let i = 0; i < visibleCount; i++) {
      const p = points[i];
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    for (let i = 0; i < visibleCount; i++) {
      const p = points[i];
      const pulse = 0.6 + 0.4 * Math.abs(Math.sin(time / 600 + i));
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(246, 201, 212, 0.95)';
      ctx.shadowColor = 'rgba(232,143,163,0.9)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (drawProgress < total + 20) drawProgress += 0.6;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);

  /* ---- Open Surprise CTA ---- */
  const openBtn = document.getElementById('open-surprise');
  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const rect = openBtn.getBoundingClientRect();
      if (window.BdayEffects) {
        window.BdayEffects.confettiBurst(rect.left + rect.width / 2, rect.top);
      }
      openBtn.disabled = true;
      openBtn.style.opacity = '0.85';
      document.body.classList.add('page-exit');
      setTimeout(() => { window.location.href = 'love-story.html'; }, 650);
    });
  }
})();
