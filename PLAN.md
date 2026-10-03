# Portfolio Build Plan

## Intent
A static, GitHub Pages-safe multi-page portfolio for **Pratham Pandey**, structured as an old-world broadsheet and made memorable through restrained, purposeful motion. An About page is included because it creates a clear deep link for the full-screen navigation and keeps the home page focused on the first-impression narrative.

## Sitemap
- `/index.html` — editorial home, bio, selected work, skills, contact
- `/about/index.html` — expanded personal profile and working principles
- `/projects/meme-capsule/index.html` — released Android/web product case study
- `/projects/easy-storage-cloud/index.html` — in-development P2P storage case study
- `/projects/convertix/index.html` — active-rebuild mobile conversion toolkit case study
- `/404.html` — styled route recovery page

## System and themes
- Shell tokens live in `css/tokens.css`: parchment `#e2dedb`, bone cream `#cdc6be`, ink `#1d1d1b`, charcoal `#69645f`, ember `#c03f13`.
- Project overrides live in `css/themes.css` and are scoped through `body[data-theme]`.
  - Meme Capsule: supported by its documented neo-brutalist system. Uses near-black, acid green, hot pink, and off-white.
  - Easy Storage Cloud: supported by Remote Vault docs. Uses `#060A14`, `#0B1220`, `#111827`, electric blue `#3B82F6`, green `#22C55E`.
  - Convertix: palette is not documented, so a focused violet/ink theme will be marked `TODO` in `themes.css` and final report.
- Typography variables: Bodoni Moda, Playfair Display, Source Serif 4, Pirata One.

## Motion plan
- First-session loader waits on `document.fonts.ready` and hero imagery with timing guardrails, then wipes away.
- Hero display letters use GSAP masked stagger reveal, portrait clip-path reveal, stamp settle, ticker, and desktop-only parallax.
- Scroll-triggered display-banner scrubs, heading/card reveals, image parallax, gallery horizontal travel, and SVG line drawing use GSAP ScrollTrigger.
- Home work selector supports pointer drag, touch, buttons, keyboard, and falls back to the visible project grid for reduced motion.
- Project navigation uses a themed curtain transition that keeps normal browser navigation and back-button behavior intact.

## Files
```text
assets/
  images/                 # supplied personal placeholders; CSS/SVG project media placeholders
css/
  tokens.css              # canonical base variables
  themes.css              # data-theme overrides
  shell.css               # shared layout and components
  pages.css               # home/about/project-specific styles
js/
  config.js               # person, links, status, projects, and case-study content
  shared.js               # header/footer/menu, loader, transitions, animation helpers
  home.js                 # home interactions and animation setup
  project.js              # reusable project page renderer and interactions
index.html
about/index.html
projects/*/index.html
404.html
```

## Content boundaries
All project language, feature lists, stack labels, and architecture diagrams derive from supplied documents. Personal social links and photos are not supplied, so clearly labeled non-functional placeholders are retained rather than invented. There was no swipe-card ZIP archive in the repository, so the card interaction will be implemented from the stated required behavior and the existing project details.
