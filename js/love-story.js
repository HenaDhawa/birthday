/* ===================================================================
   LOVE-STORY.JS — staggered reveal delay for timeline items
=================================================================== */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
      item.style.transitionDelay = `${i * 90}ms`;
    });
  });
})();
