/* ===================================================================
   LOVE-LETTER.JS — envelope open interaction + typewriter reveal
=================================================================== */
(function () {
  'use strict';

  const MESSAGE = `Dear Sourav,

I know I call you "Thur Thure Buro" all the time, but today I wanted to put my heart into these words.

You have this incredible way of making ordinary days feel special. You're the first person I want to share my good news with, and the one I want beside me when life gets difficult. Somewhere along the way, "us" became my favorite word.

Today isn't just about celebrating another year of your life—it's about celebrating another year of knowing you, laughing with you, growing with you, and making memories together. And I hope there are countless more years ahead for us.

I hope this year brings you everything you've been quietly wishing for. You deserve all the happiness, peace, and success in the world. And selfishly, I hope I get to be there through all of it.

No matter how much I write, this little website could never fully capture how much you mean to me.

Happy Birthday, Buro. ❤️`;

  document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const envelopeWrap = document.getElementById('envelope-wrap');
    const letterPaper = document.getElementById('letter-paper');
    const typewriterEl = document.getElementById('typewriter');
    const skipBtn = document.getElementById('skip-type');
    const nextBtn = document.getElementById('letter-next-btn');
    if (!envelope) return;

    let typing = null;
    let opened = false;

    function openEnvelope() {
      if (opened) return;
      opened = true;
      envelope.classList.add('open');

      if (window.BdayEffects) {
        const rect = envelope.getBoundingClientRect();
        window.BdayEffects.confettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);
      }

      setTimeout(() => {
        envelopeWrap.classList.add('opened');
        letterPaper.hidden = false;
        requestAnimationFrame(() => letterPaper.classList.add('visible'));
        startTypewriter();
      }, 900);
    }

    function startTypewriter() {
      skipBtn.classList.add('show');
      let i = 0;
      typewriterEl.innerHTML = '';
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      typewriterEl.appendChild(cursor);

      typing = setInterval(() => {
        if (i >= MESSAGE.length) {
          finishTypewriter();
          return;
        }
        const char = document.createTextNode(MESSAGE[i]);
        typewriterEl.insertBefore(char, cursor);
        i++;
      }, 26);
    }

    function finishTypewriter() {
      clearInterval(typing);
      typewriterEl.textContent = MESSAGE;
      skipBtn.classList.remove('show');
      nextBtn.hidden = false;
      requestAnimationFrame(() => nextBtn.classList.add('show'));
    }

    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
    });
    envelope.setAttribute('tabindex', '0');
    envelope.setAttribute('role', 'button');
    envelope.setAttribute('aria-label', 'Open the envelope to read your letter');

    skipBtn.addEventListener('click', finishTypewriter);
  });
})();
