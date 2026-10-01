# Pratham Pandey portfolio

Static HTML, CSS, and vanilla JavaScript portfolio for GitHub Pages.

## Preview locally

From this folder, run any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Customize

Update the `SITE_CONFIG` object at the top of `js/main.js` with your Instagram and LinkedIn URLs, project URLs, or status changes. Replace `assets/images/photo1-placeholder.svg` and `photo2-placeholder.svg` with optimized photos while keeping the image paths (or update the two `<img>` paths in `index.html`).

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch and `/ (root)` folder, then save.

All internal asset links are relative, so the site works from a repository subpath such as `https://username.github.io/repository-name/`.
