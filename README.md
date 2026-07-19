# Happy Birthday, My Love 💌 — Interactive Birthday Website

A six-page, romantic birthday surprise site built with plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no build step — just open it and go.

## 📁 Project structure

```
birthday-surprise/
├── index.html          Welcome page (hero, "Open My Surprise")
├── love-story.html      Our Love Story (animated timeline)
├── gallery.html          Memory Gallery (photo grid + lightbox)
├── love-letter.html     Love Letter (envelope + typewriter)
├── celebration.html     Birthday Celebration (cake, candles, confetti, fireworks, balloons)
├── final.html            Final Surprise (cinematic closing)
├── css/
│   ├── variables.css     Design tokens (colors, type, spacing) + light/dark theme
│   ├── base.css          Reset, nav, buttons, glassmorphism, loading screen, music player
│   ├── animations.css    Shared @keyframes library
│   ├── home.css / love-story.css / gallery.css / love-letter.css / celebration.css / final.css
├── js/
│   ├── main.js           Loading screen, theme toggle, mobile nav, music player, ambient particles, scroll-reveal
│   ├── effects.js         Reusable confetti + fireworks engine (window.BdayEffects)
│   └── home.js / love-story.js / gallery.js / love-letter.js / celebration.js / final.js
└── assets/
    ├── images/            memory-1.jpg … memory-8.jpg (placeholder photos — replace these!)
    └── music/              put your romantic-bg.mp3 here
```

## 🚀 How to use it

1. Unzip the folder anywhere.
2. Double-click `index.html` to open it in your browser — that's it, no server or install required.
   (For the smoothest experience, especially the music autoplay behaviour, you can also serve it locally with e.g. `python3 -m http.server` and visit `http://localhost:8000`.)

## 🎨 Personalize it

- **Photos** — replace the 8 files in `assets/images/` with your own (keep the same filenames, or update the `src` attributes in `gallery.html`).
- **Music** — drop an MP3 into `assets/music/` named `romantic-bg.mp3` (or update the `src` on the `<audio id="bg-music">` tag on every page). Until you add a file, the music button simply won't play — everything else still works.
- **Love story timeline** — edit the six `<li class="timeline-item">` blocks in `love-story.html`.
- **Love letter text** — edit the `MESSAGE` template string at the top of `js/love-letter.js`.
- **Names / details** — search each HTML file for the placeholder copy and swap in your own words.
- **Colors** — everything flows from the tokens in `css/variables.css`. Change `--rose`, `--gold`, `--bg-deep` etc. and the whole site updates.

## ✨ Features

- Loading screen, dark/light mode toggle (persisted), responsive glass navigation with mobile menu
- Ambient floating hearts + twinkling stars on every page
- Animated constellation-heart hero on the welcome page
- Scroll-reveal animations throughout
- Photo gallery with a full keyboard/swipe-friendly lightbox
- Envelope-opening interaction with a typewriter-effect letter
- Interactive cake: click each candle flame to blow it out, triggers confetti + fireworks
- Canvas-based fireworks engine and DOM confetti bursts, reused across pages
- Background music control with a small animated equalizer icon
- Fully responsive from mobile to desktop, honors `prefers-reduced-motion`

Made with ❤️ — happy customizing, and happy birthday to him.
