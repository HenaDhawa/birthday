/* ===================================================================
   GALLERY.JS — lightbox open/close, prev/next, keyboard, swipe
=================================================================== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('lightbox');
    if (!items.length || !lightbox) return;

    const imgEl = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    let index = 0;

    function open(i) {
      index = (i + items.length) % items.length;
      const item = items[index];
      const img = item.querySelector('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt;
      captionEl.textContent = item.dataset.caption || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    items.forEach((item, i) => item.addEventListener('click', () => open(i)));
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    prevBtn.addEventListener('click', () => open(index - 1));
    nextBtn.addEventListener('click', () => open(index + 1));

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open(index - 1);
      if (e.key === 'ArrowRight') open(index + 1);
    });

    // touch swipe
    let touchStartX = null;
    lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) open(index + (dx < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });
  });
})();
