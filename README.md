# Happy Birthday 💌 — Interactive Birthday Website

A six-page,  birthday surprise site built with plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no build step — just open it and go.

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

Made with ❤️ — happy customizing, and happy birthday
