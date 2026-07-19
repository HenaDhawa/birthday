/* ===================================================================
   MAIN.JS — shared behaviour across every page
   Handles: loading screen, theme toggle, mobile nav, music player,
   ambient floating hearts/stars, scroll-reveal, nav heart progress,
   and soft page-transition on internal link clicks.
=================================================================== */

(function () {
  'use strict';

  /* ---------------- Loading screen ---------------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;
    setTimeout(() => loader.classList.add('hidden'), 900);
  });

  /* ---------------- Theme toggle (persisted) ---------------- */
  const THEME_KEY = 'bday-theme';
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  };
  const savedTheme = localStorage.getItem(THEME_KEY) ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(savedTheme);

  document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
      });
    }

    /* ---------------- Mobile nav ---------------- */
    const menuToggle = document.querySelector('.nav-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
      });
      navLinks.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => navLinks.classList.remove('open'))
      );
    }

    /* Mark active nav link */
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      if (a.getAttribute('href') === currentPage) a.classList.add('active');
    });

    /* ---------------- Music player ---------------- */
    const audio = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicPlayer = document.getElementById('music-player');
    const MUSIC_KEY = 'bday-music-playing';

    if (audio && musicToggle) {
      audio.volume = 0.45;
      const setIcon = (playing) => {
        musicToggle.innerHTML = playing
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1.5"/><rect x="14" y="4" width="5" height="16" rx="1.5"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l15 8-15 8z"/></svg>';
        musicPlayer.classList.toggle('paused', !playing);
      };
      const wantsPlay = localStorage.getItem(MUSIC_KEY) !== 'off';
      setIcon(false);

      const tryPlay = () => {
        audio.play().then(() => {
          setIcon(true);
          localStorage.setItem(MUSIC_KEY, 'on');
        }).catch(() => setIcon(false));
      };

      // Browsers block autoplay w/ sound until a user gesture — attempt on first interaction.
      if (wantsPlay) {
        const onFirstGesture = () => {
          tryPlay();
          window.removeEventListener('pointerdown', onFirstGesture);
        };
        window.addEventListener('pointerdown', onFirstGesture, { once: true });
      }

      musicToggle.addEventListener('click', () => {
        if (audio.paused) {
          tryPlay();
        } else {
          audio.pause();
          setIcon(false);
          localStorage.setItem(MUSIC_KEY, 'off');
        }
      });
    }

    /* ---------------- Scroll reveal ---------------- */
    const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('in-view'));
    }

    /* ---------------- Nav heart scroll progress ---------------- */
    const heartFill = document.querySelector('.heart-fill');
    if (heartFill) {
      const DASH = 300;
      const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
        heartFill.style.strokeDashoffset = String(DASH - DASH * pct);
      };
      updateProgress();
      window.addEventListener('scroll', updateProgress, { passive: true });
      window.addEventListener('resize', updateProgress);
    }

    /* ---------------- Soft page transition ---------------- */
    document.querySelectorAll('a[href$=".html"]').forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (this.target === '_blank' || href.startsWith('http')) return;
        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(() => { window.location.href = href; }, 420);
      });
    });

    generateAmbientLayer();
  });

  /* ---------------- Ambient floating hearts + twinkling stars ---------------- */
  function generateAmbientLayer() {
    const layer = document.getElementById('ambient-layer');
    if (!layer) return;
    const isMobile = window.innerWidth < 700;

    // Twinkling stars scattered across viewport
    const starCount = isMobile ? 26 : 50;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('span');
      star.className = 'star-sprite';
      const size = Math.random() * 2.4 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      layer.appendChild(star);
    }

    // Softly rising hearts
    const heartCount = isMobile ? 6 : 12;
    const heartGlyphs = ['❤', '💛', '✦'];
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('span');
      heart.className = 'floaty';
      heart.textContent = heartGlyphs[Math.floor(Math.random() * heartGlyphs.length)];
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${12 + Math.random() * 16}px`;
      heart.style.color = Math.random() > 0.5 ? 'var(--rose-light)' : 'var(--gold)';
      heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
      heart.style.animationDuration = `${14 + Math.random() * 12}s`;
      heart.style.animationDelay = `${Math.random() * 14}s`;
      layer.appendChild(heart);
    }
  }
})();
