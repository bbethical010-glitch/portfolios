# Pratham Pandey portfolio

A static, GitHub Pages-ready multi-page portfolio built in plain HTML, CSS, and JavaScript. It uses a broadsheet-inspired visual system, GSAP + ScrollTrigger, Lenis smooth scrolling, an accessible swipeable project selector, and page-specific project themes.

## Preview locally

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/index.html`.

## Project structure

```text
index.html
about/index.html
projects/
  meme-capsule/index.html
  easy-storage-cloud/index.html
  convertix/index.html
css/
  tokens.css        # global visual tokens
  themes.css        # per-project theme overrides
  pages.css         # page components and responsive layout
js/
  config.js         # editable personal/project content and external links
  shared.js         # shared shell, loader, transition, menu, Lenis
  home.js           # home project selector and scroll motion
  project.js        # case-study page renderer and diagram motion
```

## Customize before publishing

1. Replace `assets/images/photo1-placeholder.svg` and `photo2-placeholder.svg` with optimized portrait images, or update the two paths in `index.html`.
2. In `js/config.js`, add Instagram and LinkedIn URLs, then confirm the email address and every project link/status.
3. Add real app screenshots to `assets/` and replace the intentional case-study screen placeholders in `js/project.js`.
4. Confirm Convertix’s application palette and update the marked `TODO` block in `css/themes.css`.

## GitHub Pages deployment

1. Push this folder to a GitHub repository.
2. Open **Settings → Pages** in that repository.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your publishing branch and the `/ (root)` folder, then save.
5. GitHub Pages will publish the site at `https://<username>.github.io/<repository>/`.

All internal documents, scripts, stylesheets, and image assets use relative paths, so the site works from a repository subpath. No build step or backend is required.

## Motion and accessibility

- First-visit loader waits for fonts and hero media with a minimum/maximum duration guard.
- Respects `prefers-reduced-motion`, showing the normal grid and disabling long animations.
- Keyboard controls work on the swipe selector and menu.
- External links use `target="_blank" rel="noopener noreferrer"`.
