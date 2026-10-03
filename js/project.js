(() => {
  const { cfg, root, reduced } = window.Portfolio;
  const slug = document.body.dataset.theme;
  const project = cfg.projects.find(item => item.slug === slug);
  const nextProject = cfg.projects[(cfg.projects.indexOf(project) + 1) % cfg.projects.length];
  const link = target => `${root}projects/${target}/index.html`;
  const statusClass = project.released ? "" : "is-progress";
  const facts = [
    ["Role", project.role],
    ["Platform", project.platform],
    ["Stack", project.stack.slice(0, 2).join(" + ")],
    ["Timeframe", project.timeframe],
    ["Status", project.status]
  ];
  const action = (label, url, disabled = false) => disabled ? `<span class="button" aria-disabled="true">${label}</span>` : `<a class="button" href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  const renderScreen = (item, i) => {
    const label = typeof item === "string" ? item : item.label;
    if (item && item.image) {
      return `<article class="screen"><div class="screen__media"><img src="${root}${item.image}" alt="${label} screenshot" loading="eager" decoding="async"></div><div class="screen__label"><span>${String(i+1).padStart(2,"0")}</span><span>${label}</span></div></article>`;
    }
    return `<article class="screen"><div class="screen__inside"><b>${String(i+1).padStart(2,"0")}</b><small>${label}</small></div></article>`;
  };
  const hasRealScreens = project.gallery && project.gallery.some(g => g && g.image);

  // Interactive Architecture Blueprint setup
  const arch = project.architecture;
  const nodePositions = [
    { x: 18, y: 28, w: 215, h: 74 },
    { x: 287, y: 28, w: 215, h: 74 },
    { x: 287, y: 218, w: 215, h: 74 },
    { x: 18, y: 218, w: 215, h: 74 }
  ];

  const wires = `
    <path class="arch-wire" d="M 233 65 L 287 65" />
    <path class="arch-wire-pulse" d="M 233 65 L 287 65" />
    <path class="arch-wire" d="M 394 102 L 394 218" />
    <path class="arch-wire-pulse" d="M 394 102 L 394 218" />
    <path class="arch-wire" d="M 287 255 L 233 255" />
    <path class="arch-wire-pulse" d="M 287 255 L 233 255" />
    <path class="arch-wire" d="M 125 218 L 125 102" />
    <path class="arch-wire-pulse" d="M 125 218 L 125 102" />
    <path class="arch-wire" d="M 233 75 L 287 240" stroke-dasharray="3 4" opacity="0.4" />
  `;

  const nodeElements = arch.nodes.map((n, i) => {
    const pos = nodePositions[i];
    return `
      <g class="arch-node-group ${i === 0 ? "is-selected" : ""}" data-node-idx="${i}" transform="translate(${pos.x}, ${pos.y})">
        <rect class="arch-node-box" width="${pos.w}" height="${pos.h}" rx="3" />
        <text class="arch-node-tag" x="12" y="20">${n.tag}</text>
        <circle cx="${pos.w - 14}" cy="18" r="3.5" fill="#22c55e" />
        <text class="arch-node-title" x="12" y="42">${n.name}</text>
        <text class="arch-node-sub" x="12" y="58">${n.tech}</text>
      </g>
    `;
  }).join("");

  const schematicSvg = `
    <svg class="arch-svg-stage" viewBox="0 0 520 320" role="img" aria-label="${project.name} live system schematic">
      <defs>
        <pattern id="grid-pat" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.75" fill="rgba(255,255,255,0.08)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pat)" />
      ${wires}
      ${nodeElements}
    </svg>
  `;

  document.querySelector("main").innerHTML = `
    <section class="project-hero">
      <div class="project-hero__inner">
        <span class="status-badge ${statusClass}">${project.status}</span>
        <h1>${project.name}</h1>
        <p class="project-hero__tagline">${project.tagline}</p>
        <div class="facts">${facts.map(([label,value]) => `<div class="fact"><span class="meta-label">${label}</span><b>${value}</b></div>`).join("")}</div>
      </div>
    </section>
    <div class="ticker"><div class="ticker__run">${Array(5).fill(`${project.name} • ${project.tagline} • `).join("")}</div></div>
    <section class="section case-overview">
      <div>
        <span class="eyebrow">Overview / 01</span>
        <h2 class="section-heading"><span class="line"><span>The problem,</span></span><span class="line"><span>the idea.</span></span></h2>
      </div>
      <div>
        <p>${project.overview}</p>
        ${project.note ? `<p class="bio-aside" style="margin-top:28px"><strong>Note</strong>${project.note}</p>` : ""}
      </div>
    </section>
    <section class="section section-rule">
      <span class="eyebrow">Key features / 02</span>
      <ol class="case-feature-list">${project.features.map((feature,i)=>`<li><span>${String(i+1).padStart(2,"0")}</span>${feature}</li>`).join("")}</ol>
    </section>
    <section class="display-banner"><h2>SCREEN / STUDIES /</h2></section>
    <section class="section gallery-outer">
      <span class="eyebrow">${hasRealScreens ? "Interface studies / Real app screenshots" : "Interface studies / Architecture preview"}</span>
      <div class="case-gallery">${project.gallery.map(renderScreen).join("")}</div>
    </section>
    <section class="section section-rule architecture">
      <div>
        <span class="eyebrow">Architecture / 03</span>
        <h2 class="section-heading"><span class="line"><span>Systems</span></span><span class="line"><span>with a point.</span></span></h2>
        <p class="diagram-note">${arch.note}</p>
      </div>
      <div class="arch-console" id="arch-console">
        <div class="arch-topbar">
          <div class="arch-badge-group">
            <span class="arch-spec-pill">${arch.specId}</span>
            <span class="arch-status"><span class="arch-status-dot"></span> TOPOLOGY ACTIVE</span>
          </div>
          <div class="arch-controls">
            <div class="arch-views-nav">
              <button type="button" class="arch-tab-btn is-active" data-view="schematic">Topology</button>
              <button type="button" class="arch-tab-btn" data-view="pipeline">Pipeline</button>
              <button type="button" class="arch-tab-btn" data-view="highlights">Decisions</button>
            </div>
            <button type="button" class="arch-sim-btn" id="run-sim-btn">Simulate Flow ⚡</button>
          </div>
        </div>
        <div class="arch-view-panel" id="view-schematic">
          <div class="arch-workbench">
            <div class="arch-canvas-wrap">${schematicSvg}</div>
            <aside class="arch-hud" id="arch-hud"></aside>
          </div>
        </div>
        <div class="arch-view-panel" id="view-pipeline" style="display:none">
          <div class="arch-pipeline-wrap">
            ${arch.pipeline.map(p => `
              <div class="arch-pipeline-step">
                <b>${p.step}</b>
                <h4>${p.name}</h4>
                <p>${p.desc}</p>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="arch-view-panel" id="view-highlights" style="display:none">
          <div class="arch-highlights-wrap">
            ${arch.highlights.map(h => `
              <div class="arch-highlight-card">
                <span>${h.label}</span>
                <p>${h.value}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
    <section class="section section-rule">
      <span class="eyebrow">Tech stack / 04</span>
      <div class="stack">${project.stack.map(item=>`<span>${item}</span>`).join("")}</div>
    </section>
    <section class="section section-rule">
      <span class="eyebrow">Links / 05</span>
      <h2 class="section-heading"><span class="line"><span>Take a closer</span></span><span class="line"><span>look.</span></span></h2>
      <div class="project-links">
        ${action("Visit website", project.website, !project.website)}
        ${project.slug === "easy-storage-cloud" ? action("Coming soon", null, true) : action("Get on Google Play", project.download, !project.download)}
        ${project.instagram ? action("Project Instagram", project.instagram) : ""}
      </div>
    </section>
    <a data-transition class="next-project" href="${link(nextProject.slug)}">
      <small>Next project / ${nextProject.index}</small>${nextProject.name} ↗
    </a>
  `;

  document.title = `${project.name} — Pratham Pandey`;

  // Bind interactive architecture console
  function bindArchConsole() {
    const hud = document.querySelector("#arch-hud");
    const nodeGroups = document.querySelectorAll(".arch-node-group");

    function renderHud(idx, customTrace) {
      const n = arch.nodes[idx];
      if (!n || !hud) return;
      hud.innerHTML = `
        <div class="arch-hud__header">
          <span class="arch-hud__tag">${n.tag}</span>
          <h3 class="arch-hud__name">${n.name}</h3>
          <span class="arch-hud__tech">${n.tech}</span>
        </div>
        <p class="arch-hud__desc">${n.desc}</p>
        <div class="arch-hud__meta-grid">
          <div class="arch-meta-item"><span>Protocol</span><b>${n.protocol}</b></div>
          <div class="arch-meta-item"><span>Performance</span><b>${n.metric}</b></div>
        </div>
        <div class="arch-console-log">
          <p><span class="log-prompt">&gt;</span><span class="log-highlight">[0.${idx * 3 + 1}s]</span> ${customTrace || n.log}</p>
        </div>
      `;
      nodeGroups.forEach((g, i) => g.classList.toggle("is-selected", i === idx));
    }

    renderHud(0);

    nodeGroups.forEach((g, idx) => {
      g.addEventListener("click", () => renderHud(idx));
    });

    // View Tabs
    const tabBtns = document.querySelectorAll(".arch-tab-btn");
    const panels = {
      schematic: document.querySelector("#view-schematic"),
      pipeline: document.querySelector("#view-pipeline"),
      highlights: document.querySelector("#view-highlights")
    };

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        tabBtns.forEach(b => b.classList.toggle("is-active", b === btn));
        Object.entries(panels).forEach(([k, panel]) => {
          if (panel) panel.style.display = k === view ? "block" : "none";
        });
      });
    });

    // Simulation Trigger
    const simBtn = document.querySelector("#run-sim-btn");
    if (simBtn) {
      simBtn.addEventListener("click", () => {
        simBtn.disabled = true;
        simBtn.textContent = "Simulating…";
        const schematicBtn = document.querySelector(".arch-tab-btn[data-view='schematic']");
        if (schematicBtn && !schematicBtn.classList.contains("is-active")) schematicBtn.click();

        const timeline = [
          { idx: 0, delay: 0, text: `INGEST: ${arch.nodes[0].log}` },
          { idx: 1, delay: 420, text: `ROUTING: ${arch.nodes[1].log}` },
          { idx: 2, delay: 840, text: `STORAGE: ${arch.nodes[2].log}` },
          { idx: 3, delay: 1260, text: `BUFFER: ${arch.nodes[3].log}` }
        ];

        timeline.forEach(step => {
          setTimeout(() => {
            nodeGroups.forEach((g, i) => g.classList.toggle("is-lit", i === step.idx));
            renderHud(step.idx, step.text);
          }, step.delay);
        });

        setTimeout(() => {
          nodeGroups.forEach(g => g.classList.remove("is-lit"));
          renderHud(0, `VERIFIED: End-to-end data pipeline loop completed successfully (0 lost frames).`);
          simBtn.disabled = false;
          simBtn.textContent = "Simulate Flow ⚡";
        }, 1800);
      });
    }
  }

  bindArchConsole();

  if (window.gsap && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".project-hero h1", { yPercent: 100, opacity: 0, duration: 1.15, delay: .75, ease: "power4.out" });
    gsap.to(".display-banner h2", { xPercent: -22, scrollTrigger: { trigger: ".display-banner", start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.from(".case-feature-list li", { x: -35, opacity: 0, stagger: .08, scrollTrigger: { trigger: ".case-feature-list", start: "top 78%" } });
    const gallery = document.querySelector(".case-gallery");
    if (innerWidth > 820 && gallery) {
      gsap.to(gallery, { x: () => -(gallery.scrollWidth - innerWidth + 80), ease: "none", scrollTrigger: { trigger: ".gallery-outer", start: "top top", end: () => `+=${gallery.scrollWidth}`, pin: true, scrub: 1 } });
    }
    gsap.from(".arch-console", {
      y: 40,
      opacity: 0,
      duration: .9,
      ease: "power3.out",
      scrollTrigger: { trigger: ".arch-console", start: "top 85%" }
    });
  }
})();
