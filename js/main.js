/* Update this block when project URLs, statuses, or personal links change. */
const SITE_CONFIG = {
  person: {
    name: "Pratham Pandey",
    email: "bbethical010@gmail.com",
    instagram: "https://www.instagram.com/pratham07.io?stkn=MW5ueG1oOW4wanZvZA%3D%3D&utm_source=qr",
    github: "https://github.com/bbethical010-glitch",
    linkedin: "https://www.linkedin.com/in/pratham-pandey-132a77384",
  },
  projects: [
    {
      name: "Meme Capsule",
      index: "01",
      tagline: "One tap. One meme. Zero fluff.",
      status: "Released / active",
      website: "https://memecapsule.wtf",
      download: "https://play.google.com/store/apps/details?id=com.meme.capsule",
      overview: "An anti-algorithm meme delivery platform that replaces infinite feeds with a single-action capsule: curated, surprising entertainment without accounts, tracking, or social clutter.",
      features: [
        "Single-tap capsule dispenser with no feed or scroll",
        "4-card 3D perspective spring stack with swipe gestures",
        "7-meme FIFO background prefetch buffer",
        "Meme Vault and color-coded Mood Boards",
        "Native MediaStore saving and targeted social sharing",
        "Cloudflare D1/R2 edge delivery with multi-stage curation",
      ],
      stack: ["React", "TypeScript", "Vite", "Capacitor", "Cloudflare Pages", "D1", "R2"],
      role: "Original ideator and lead frontend developer: public web platform, Android app, UI/UX, client API integration, animations, Java MediaStore bridge, and consumer-facing build setup.",
      architecture: "meme",
      note: null,
    },
    {
      name: "Easy Storage Cloud",
      index: "02",
      tagline: "Your phone is your cloud.",
      status: "In development",
      website: null,
      download: null,
      overview: "A self-hosted personal cloud storage Android app where the phone and attached external drive remain the source of truth. A relay provides reachability; it does not become the primary file store.",
      features: [
        "Direct Android-to-Android P2P file sharing over WebRTC",
        "Remote browsing, search, sorting, upload, download, and deletion",
        "Chunked transfers with foreground-service persistence",
        "Role-based access with viewers, contributors, managers, and admin",
        "Ephemeral token handshake and 24-hour access expiry",
        "Relay signaling with HTTP proxy fallback and TURN support",
      ],
      stack: ["Android", "Jetpack Compose", "Ktor", "WebRTC", "Kotlin", "Render"],
      role: "Product and systems builder: shaping the P2P storage model, Android Remote Vault flow, relay architecture, and technical implementation plans.",
      architecture: "storage",
      note: "Easy Storage Cloud is a working name only and may change before launch.",
    },
    {
      name: "Convertix",
      index: "03",
      tagline: "Media and document conversion, in one toolkit.",
      status: "Active rebuild",
      website: null,
      download: null,
      overview: "A Flutter media and document conversion app for Android and iOS. Media tools run on-device without internet; document tools use a FastAPI and LibreOffice backend.",
      features: [
        "Image, audio, video conversion and video-to-audio extraction",
        "Video compression with LOG/HDR tone-mapping profiles",
        "Image-to-PDF, document conversion, merge, split, and greyscale PDF",
        "Riverpod AsyncNotifier state pattern for every feature",
        "Hive-backed conversion history and shared output handling",
        "Google AdMob integration with non-intrusive banner placement",
      ],
      stack: ["Flutter", "Dart", "Riverpod", "FFmpegKit", "Dio", "FastAPI", "LibreOffice"],
      role: "Builder of the app concept and implementation direction, with the documented architecture covering the Flutter client, on-device FFmpeg flow, document backend, state management, and storage services.",
      architecture: "convertix",
      note: "Current docs identify Play Store signing and API 36 target requirements as blockers before the next release.",
    },
  ],
};

const arrowMarker = `<defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#ff6436"/></marker></defs>`;
const diagrams = {
  meme: `<svg viewBox="0 0 260 210" role="img" aria-label="Meme Capsule architecture diagram">${arrowMarker}<rect class="arch-box" x="78" y="8" width="104" height="30"/><text class="arch-text" x="130" y="27">ANDROID APP</text><rect class="arch-box" x="15" y="82" width="90" height="34"/><text class="arch-text" x="60" y="102">CLOUDFLARE</text><rect class="arch-box" x="155" y="82" width="90" height="34"/><text class="arch-text" x="200" y="102">D1 + R2</text><rect class="arch-box" x="78" y="164" width="104" height="30"/><text class="arch-text" x="130" y="183">CURATION API</text><path class="arch-line" d="M112 38 L78 82"/><path class="arch-line" d="M182 38 L200 82"/><path class="arch-line" d="M130 116 L130 164"/></svg>`,
  storage: `<svg viewBox="0 0 260 210" role="img" aria-label="Easy Storage Cloud peer-to-peer architecture diagram">${arrowMarker}<rect class="arch-box" x="12" y="12" width="92" height="34"/><text class="arch-text" x="58" y="33">CLIENT APP</text><rect class="arch-box" x="156" y="12" width="92" height="34"/><text class="arch-text" x="202" y="33">HOST PHONE</text><rect class="arch-box" x="84" y="84" width="92" height="34"/><text class="arch-text" x="130" y="105">RELAY</text><rect class="arch-box" x="84" y="164" width="92" height="30"/><text class="arch-text" x="130" y="183">EXTERNAL DRIVE</text><path class="arch-line" d="M58 46 L105 84"/><path class="arch-line" d="M202 46 L155 84"/><path class="arch-line" d="M130 118 L130 164"/></svg>`,
  convertix: `<svg viewBox="0 0 260 210" role="img" aria-label="Convertix architecture diagram">${arrowMarker}<rect class="arch-box" x="78" y="8" width="104" height="30"/><text class="arch-text" x="130" y="27">FLUTTER APP</text><rect class="arch-box" x="15" y="82" width="90" height="34"/><text class="arch-text" x="60" y="102">FFMPEGKIT</text><rect class="arch-box" x="155" y="82" width="90" height="34"/><text class="arch-text" x="200" y="102">FASTAPI</text><rect class="arch-box" x="78" y="164" width="104" height="30"/><text class="arch-text" x="130" y="183">LIBREOFFICE</text><path class="arch-line" d="M112 38 L78 82"/><path class="arch-line" d="M148 38 L200 82"/><path class="arch-line" d="M200 116 L160 164"/></svg>`,
};

function linkMarkup(label, url) {
  return url
    ? `<a class="button button-dark" href="${url}" target="_blank" rel="noopener noreferrer">${label} <span>↗</span></a>`
    : `<span class="button button-disabled" aria-disabled="true">${label}</span>`;
}

function renderProjects() {
  const list = document.querySelector("#project-list");
  list.innerHTML = SITE_CONFIG.projects.map((project) => `
    <article class="project-card reveal">
      <div class="project-index">${project.index}</div>
      <div class="project-details">
        <div class="project-heading">
          <h3 class="project-title">${project.name}</h3>
          <span class="project-status ${project.status === "In development" ? "is-wip" : ""}"><span class="status-dot"></span>${project.status}</span>
        </div>
        <p class="project-tagline">${project.tagline}</p>
        ${project.note ? `<p class="project-note">${project.note}</p>` : ""}
        <p class="project-overview">${project.overview}</p>
        <ul class="project-features">${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
        <p class="stack-label">Tech stack</p>
        <div class="skills">${project.stack.map((item) => `<span class="tag">${item}</span>`).join("")}</div>
        <p class="stack-label">My role</p>
        <p class="project-role">${project.role}</p>
        <div class="project-actions">
          ${linkMarkup("Visit website", project.website)}
          ${project.name === "Easy Storage Cloud" ? `<span class="button button-disabled" aria-disabled="true">Coming soon</span>` : linkMarkup("Download app", project.download)}
        </div>
      </div>
      <div class="architecture">
        <p class="architecture-label">System shape</p>
        ${diagrams[project.architecture]}
      </div>
    </article>
  `).join("");
}

function configureLinks() {
  document.querySelectorAll("[data-config-link]").forEach((element) => {
    const key = element.dataset.configLink;
    const value = SITE_CONFIG.person[key];
    if (key === "email") element.href = value ? `mailto:${value}` : "#";
    else if (value) {
      element.href = value;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    } else {
      element.removeAttribute("href");
      element.setAttribute("aria-disabled", "true");
      element.title = `Add your ${key} URL in js/main.js`;
    }
  });
}

function init() {
  renderProjects();
  configureLinks();
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
document.addEventListener("DOMContentLoaded", init);
