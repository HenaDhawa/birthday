/* ===================================================================
   CELEBRATION.JS — candle-blow interaction + confetti + fireworks
=================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const candles = Array.from(document.querySelectorAll('.candle'));
    const caption = document.getElementById('cake-caption');
    const hint = document.getElementById('celebration-hint');
    const relightBtn = document.getElementById('celebrate-btn');
    const finalLink = document.getElementById('final-link');
    const fwCanvas = document.getElementById('fireworks-canvas');

    let fireworks = null;
    if (fwCanvas && window.BdayEffects) {
      fireworks = window.BdayEffects.initFireworks(fwCanvas, { auto: false });
    }

    function litCount() {
      return candles.filter((c) => c.dataset.lit === 'true').length;
    }

    function blowOut(candle) {
      if (candle.dataset.lit !== 'true') return;
      candle.dataset.lit = 'false';
      if (litCount() === 0) allBlown();
    }

    function allBlown() {
      caption.textContent = '🎉 Wish made! Happy birthday, my love! 🎉';
      hint.textContent = 'Here comes the celebration you deserve.';
      relightBtn.hidden = false;
      finalLink.hidden = false;

      // celebratory burst
      if (window.BdayEffects) {
        window.BdayEffects.confettiBurst(window.innerWidth / 2, window.innerHeight * 0.35, 160);
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:fixed;inset:0;z-index:150;pointer-events:none;width:100%;height:100%;';
        document.body.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        window.BdayEffects.confettiRain(canvas, 4200);
        setTimeout(() => canvas.remove(), 4400);
      }

      if (fireworks) {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            fireworks.launch(
              fwCanvas.width * (0.2 + Math.random() * 0.6),
              fwCanvas.height * (0.15 + Math.random() * 0.35)
            );
          }, i * 350);
        }
      }
    }

    candles.forEach((candle) => {
      const flame = candle.querySelector('.flame');
      flame.addEventListener('click', () => blowOut(candle));
      flame.setAttribute('tabindex', '0');
      flame.setAttribute('role', 'button');
      flame.setAttribute('aria-label', 'Blow out candle');
      flame.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); blowOut(candle); }
      });
    });

    relightBtn.addEventListener('click', () => {
      candles.forEach((c) => (c.dataset.lit = 'true'));
      caption.textContent = 'Tap each candle flame to blow it out 🕯️';
      hint.textContent = 'Make a wish, then blow out the candles.';
      relightBtn.hidden = true;
      finalLink.hidden = true;
    });
  });
})();
