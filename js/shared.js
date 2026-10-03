(() => {
  const cfg = window.SITE_CONFIG;
  const root = document.body.dataset.root || "";
  const q = (selector, el = document) => el.querySelector(selector);
  const external = (label, url) => url ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>` : `<span title="Add this link in js/config.js">${label} [TODO]</span>`;

  document.body.classList.add("js-ready");
  const header = document.createElement("header");
  header.className = "shell-header";
  header.innerHTML = `<nav class="header-bar" aria-label="Primary"><span class="header-location">[${cfg.person.location}]</span><a class="header-name" href="${root}index.html">${cfg.person.name}</a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-menu">Menu <i></i></button></nav>`;
  document.body.prepend(header);
  const menu = document.createElement("aside");
  menu.className = "menu-overlay"; menu.id = "site-menu"; menu.setAttribute("aria-hidden", "true");
  menu.innerHTML = `<div class="menu-overlay__top"><span>Portfolio / 2026</span><button class="menu-close" type="button">Close ×</button></div><nav class="menu-links" aria-label="Site menu"><a data-transition href="${root}index.html#projects">Projects</a><a data-transition href="${root}about/index.html">About</a><a href="mailto:${cfg.person.email}">Contact</a></nav><div class="menu-social">${external("Instagram", cfg.person.instagram)} ${external("LinkedIn", cfg.person.linkedin)}</div>`;
  document.body.append(menu);
  const progress = document.createElement("div"); progress.className = "scroll-progress"; document.body.prepend(progress);
  const footer = document.createElement("footer"); footer.className = "footer";
  footer.innerHTML = `<p class="footer__headline">Open to internship opportunities.</p><div class="footer__right"><a href="mailto:${cfg.person.email}">${cfg.person.email}</a>${external("Instagram", cfg.person.instagram)}${external("LinkedIn", cfg.person.linkedin)}</div><div class="footer__lower"><span>© ${new Date().getFullYear()} ${cfg.person.name}</span><span>Designed as a digital broadsheet</span></div>`;
  document.body.append(footer);

  const openMenu = () => { menu.classList.add("is-open"); menu.setAttribute("aria-hidden", "false"); header.querySelector("button").setAttribute("aria-expanded", "true"); if (window.gsap) gsap.to(menu, { clipPath: "inset(0 0 0% 0)", duration: .65, ease: "power4.inOut" }); };
  const closeMenu = () => { menu.setAttribute("aria-hidden", "true"); header.querySelector("button").setAttribute("aria-expanded", "false"); if (window.gsap) gsap.to(menu, { clipPath: "inset(0 0 100% 0)", duration: .45, ease: "power3.inOut", onComplete: () => menu.classList.remove("is-open") }); else menu.classList.remove("is-open"); };
  header.querySelector("button").addEventListener("click", openMenu); q(".menu-close", menu).addEventListener("click", closeMenu); document.addEventListener("keydown", event => { if (event.key === "Escape" && menu.classList.contains("is-open")) closeMenu(); });
  window.addEventListener("scroll", () => progress.style.setProperty("--progress", String(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))), { passive: true });

  const wantsReduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.Lenis && !wantsReduce) {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  function loadPage() {
    if (wantsReduce) return;
    const visited = sessionStorage.getItem("portfolio-loader");
    const project = document.body.dataset.theme;
    if (visited && !project) return;
    const loader = document.createElement("div"); loader.className = `loader ${project ? "is-project" : ""}`;
    loader.innerHTML = `<div class="loader__inside"><p class="loader__count">0</p><div class="loader__rule"><i></i></div><div class="loader__print"><span>Setting type…</span><span>Inking the plates…</span><span>Pressing…</span></div></div>`;
    document.body.append(loader);
    const counter = q(".loader__count", loader), rule = q(".loader__rule i", loader);
    const start = performance.now(), min = project ? 750 : 1800, max = 4000;
    const heroImage = q(".hero-photo img, .project-hero img");
    const imageReady = !heroImage || heroImage.complete ? Promise.resolve() : new Promise(resolve => { heroImage.addEventListener("load", resolve, { once:true }); heroImage.addEventListener("error", resolve, { once:true }); });
    Promise.race([Promise.all([document.fonts.ready, imageReady]), new Promise(resolve => setTimeout(resolve, max))]).then(() => {
      const elapsed = performance.now() - start; setTimeout(() => {
        if (window.gsap) { const obj = { n: 0 }; gsap.timeline().to(obj, { n:100, duration:.55, ease:"power2.out", onUpdate:()=> counter.textContent = Math.round(obj.n) }).to(rule, { width:"100%", duration:.55, ease:"power2.out" }, "<").to(loader, { clipPath:"inset(0 0 100% 0)", duration:.75, ease:"power4.inOut", onComplete:()=> loader.remove() }); }
        else loader.remove(); sessionStorage.setItem("portfolio-loader", "1");
      }, Math.max(0, min - elapsed));
    });
  }
  loadPage();

  document.addEventListener("click", event => {
    const link = event.target.closest("a[data-transition]");
    if (!link || event.metaKey || event.ctrlKey || link.target === "_blank") return;
    const href = link.getAttribute("href"); if (!href || href.startsWith("#")) return;
    event.preventDefault(); const curtain = document.createElement("div"); curtain.style.cssText = "position:fixed;z-index:210;inset:0;background:var(--accent);clip-path:inset(100% 0 0 0);"; document.body.append(curtain);
    if (window.gsap && !wantsReduce) gsap.to(curtain, { clipPath:"inset(0 0 0 0)", duration:.45, ease:"power4.inOut", onComplete:()=> location.href = href }); else location.href = href;
  });

  window.Portfolio = { root, cfg, reduced: wantsReduce, q };
})();
