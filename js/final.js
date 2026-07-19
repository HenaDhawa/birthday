/* ===================================================================
   FINAL.JS — cinematic ending: ambient fireworks + rising hearts
=================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const fwCanvas = document.getElementById('fireworks-canvas');
    const heartsLayer = document.getElementById('final-hearts');
    const replayBtn = document.getElementById('replay-fireworks');
    let fireworks = null;

    if (fwCanvas && window.BdayEffects) {
      fireworks = window.BdayEffects.initFireworks(fwCanvas, { auto: true });
    }

    function spawnHeart() {
      if (!heartsLayer) return;
      const heart = document.createElement('span');
      heart.textContent = Math.random() > 0.5 ? '❤' : '✦';
      heart.style.cssText = `
        position:absolute; bottom:-8%; left:${Math.random() * 100}%;
        font-size:${14 + Math.random() * 20}px;
        color:${Math.random() > 0.5 ? 'var(--rose-light)' : 'var(--gold)'};
        opacity:0.85;
      `;
      heartsLayer.appendChild(heart);
      const dx = (Math.random() - 0.5) * 160;
      const duration = 9000 + Math.random() * 6000;
      heart.animate(
        [
          { transform: 'translate(0,0) rotate(0deg)', opacity: 0 },
          { transform: `translate(${dx * 0.5}px, -55vh) rotate(15deg)`, opacity: 0.9, offset: 0.5 },
          { transform: `translate(${dx}px, -115vh) rotate(-15deg)`, opacity: 0 },
        ],
        { duration, easing: 'linear' }
      ).onfinish = () => heart.remove();
    }
    const heartInterval = setInterval(spawnHeart, 900);
    for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 300);

    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        if (window.BdayEffects) {
          window.BdayEffects.confettiBurst(window.innerWidth / 2, window.innerHeight * 0.4, 140);
        }
        if (fireworks) {
          for (let i = 0; i < 6; i++) {
            setTimeout(() => {
              fireworks.launch(
                fwCanvas.width * (0.15 + Math.random() * 0.7),
                fwCanvas.height * (0.15 + Math.random() * 0.4)
              );
            }, i * 260);
          }
        }
      });
    }

    window.addEventListener('beforeunload', () => clearInterval(heartInterval));
  });
})();
