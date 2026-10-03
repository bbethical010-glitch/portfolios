window.SITE_CONFIG = {
  person: {
    name: "Pratham Pandey",
    location: "INDIA",
    email: "pratham07work@gmail.com",
    instagram: "https://www.instagram.com/pratham07.io?stkn=MW5ueG1oOW4wanZvZA%3D%3D&utm_source=qr",
    github: "https://github.com/bbethical010-glitch",
    linkedin: "https://www.linkedin.com/in/pratham-pandey-132a77384"
  },
  projects: [
    {
      slug: "meme-capsule", index: "01", name: "Meme Capsule", short: "MEME / CAPSULE", status: "Released / active", released: true,
      tagline: "One tap. One meme. Zero fluff.",
      overview: "A mobile-first meme delivery product built around a single-action capsule rather than an infinite feed. The product pairs a public web platform and Android app with serverless edge delivery and a curation system.",
      role: "Original ideator & lead frontend", platform: "Android + Web", timeframe: "v2.7 / 2026", stack: ["React", "TypeScript", "Vite", "Capacitor", "Cloudflare Pages", "D1", "R2"],
      features: ["Single-tap meme capsule flow", "Card deck with gesture interaction", "Meme Vault and Mood Boards", "Native MediaStore saving and sharing", "Edge delivery with Cloudflare D1 and R2", "Curation, safety, and reporting systems"],
      gallery: [
        { label: "Splash & App Entry", image: "assets/images/meme-capsule/loading-screen.jpg" },
        { label: "Capsule Dispenser", image: "assets/images/meme-capsule/home-screen.jpg" },
        { label: "Active Meme Card", image: "assets/images/meme-capsule/meme-loaded.jpg" },
        { label: "Meme Vault", image: "assets/images/meme-capsule/vault.jpg" },
        { label: "Mood Boards", image: "assets/images/meme-capsule/moodboards.jpg" }
      ],
      architecture: {
        specId: "SPEC-MC // REV 2.7",
        note: "Decoupled client gesture engine paired with Cloudflare serverless edge and a FIFO prefetch buffer to guarantee zero-latency meme dispensing.",
        nodes: [
          {
            id: "client",
            name: "Android & Web Client",
            tag: "FRONTEND / UI",
            tech: "React 18 + Capacitor 6",
            protocol: "Java Bridge / FFI",
            metric: "< 16ms render time",
            desc: "Card stack with physics spring gestures, offline vault cache, and custom Android MediaStore bridge for instant 1-tap gallery saves without permission prompts.",
            log: "Gesture dispatch: user tap captured -> invoking prefetch buffer"
          },
          {
            id: "edge",
            name: "Cloudflare Edge Gateway",
            tag: "NETWORK / ROUTER",
            tech: "Pages + Workers Runtime",
            protocol: "HTTPS / TLS 1.3 / HTTP/3",
            metric: "Global 0ms cold start",
            desc: "Geo-distributed serverless edge functions handling token validation, viral scoring, rate limiting, and smart caching across 300+ edge locations.",
            log: "Edge routing: TLS 1.3 handshake verified -> batching request to D1"
          },
          {
            id: "storage",
            name: "Cloudflare D1 & R2",
            tag: "DATA / MEDIA LAKE",
            tech: "Serverless SQLite + R2 Bucket",
            protocol: "S3 API + SQL Prepared Stmt",
            metric: "Zero egress fee",
            desc: "D1 tracks structured meme engagement metrics and tags; R2 object store holds optimized WebP media served via custom CDN domain memecapsule.wtf.",
            log: "Data layer: D1 SQL query resolved (4.2ms) -> R2 media stream piped"
          },
          {
            id: "prefetch",
            name: "FIFO Curation Engine",
            tag: "PIPELINE / BUFFER",
            tech: "Background Worker Queue",
            protocol: "Memory Queue Buffer",
            metric: "7-meme prefetch depth",
            desc: "Continuous background prefetch thread maintains exactly 7 ready-to-view memes in local memory, eliminating waiting spinners during high-speed swiping.",
            log: "Queue engine: 7 cards preloaded in memory -> 0ms flip latency ready"
          }
        ],
        pipeline: [
          { step: "01", name: "User Action", desc: "User triggers single-tap capsule dispenser or swipe gesture." },
          { step: "02", name: "Prefetch Pop", desc: "Top card from the 7-item FIFO buffer renders instantly with 0ms network delay." },
          { step: "03", name: "Edge Replenish", desc: "Worker background thread fetches next candidate from Cloudflare D1 & R2." },
          { step: "04", name: "Native Save", desc: "1-tap save writes directly to Android MediaStore via native Java bridge." }
        ],
        highlights: [
          { label: "Storage Decoupling", value: "Media served via R2 with zero bandwidth tax" },
          { label: "Zero-Latency UI", value: "7-card memory buffer decouples network from UI" },
          { label: "Native Bridge", value: "Custom Android MediaStore Java plugin" }
        ]
      },
      website: "https://memecapsule.wtf/",
      download: "https://play.google.com/store/apps/details?id=com.meme.capsule&referrer=utm_source%3Dwebsite%26utm_medium%3Dhero_badge",
      instagram: "https://www.instagram.com/capsule.meme?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
      accent: "#9b30ff"
    },
    {
      slug: "easy-storage-cloud", index: "02", name: "Easy Storage Cloud", short: "YOUR / CLOUD", status: "In development", released: false,
      tagline: "Your phone is your cloud.",
      overview: "A peer-to-peer personal cloud where an Android phone and its attached storage remain the source of truth. A public relay provides reachability and signaling, rather than becoming the primary file store.",
      role: "Product & systems builder", platform: "Android + Web", timeframe: "2026", stack: ["Kotlin", "Jetpack Compose", "Ktor", "WebRTC", "WebSockets", "Render"],
      features: ["Native Remote File Explorer", "Real-time search and multi-attribute sorting", "Bidirectional chunked file transfers", "Foreground service and transfer notifications", "Role-based access and token handshake", "WebRTC signaling with proxy fallback"],
      gallery: ["Remote file explorer", "P2P connection", "Transfer activity"],
      architecture: {
        specId: "SPEC-ESC // P2P VAULT",
        note: "A peer-to-peer storage topology where the user's phone and attached hardware drive remain the sovereign source of truth, with zero permanent cloud storage.",
        nodes: [
          {
            id: "client",
            name: "Remote Explorer Client",
            tag: "INTERFACE / PEER",
            tech: "Web UI / Compose App",
            protocol: "WebRTC DataChannel",
            metric: "Direct P2P bandwidth",
            desc: "Virtual remote file tree offering real-time search, sorting, folder expansion, and chunked upload/download streaming directly to the host device.",
            log: "Remote peer init: requesting session auth -> generating ephemeral token"
          },
          {
            id: "relay",
            name: "Signaling & Relay Bridge",
            tag: "COORDINATOR / NAT",
            tech: "Ktor WebSockets (Render)",
            protocol: "WSS / STUN / TURN",
            metric: "99.9% NAT traversal",
            desc: "Brokers SDP offer/answer exchange, ice candidate gathering, and acts as an encrypted chunk proxy only when aggressive symmetric carrier NAT blocks direct P2P.",
            log: "Signaling broker: SDP offer routed -> STUN hole-punching succeeded"
          },
          {
            id: "host",
            name: "Host Phone Daemon",
            tag: "NODE / STORAGE CORE",
            tech: "Android Background Service",
            protocol: "Ktor Local HTTP :8080",
            metric: "Wakelock persistence",
            desc: "Runs an embedded Ktor HTTP server inside a persistent Android foreground service, managing peer authentication tokens with 24-hour expiration.",
            log: "Node daemon: active on port 8080 -> token verified (Role: Manager)"
          },
          {
            id: "storage",
            name: "Attached Physical Drive",
            tag: "PHYSICAL STORAGE",
            tech: "USB-C SSD / MicroSD (SAF)",
            protocol: "Android SAF / Direct I/O",
            metric: "Up to 1050 MB/s local read",
            desc: "Hardware drive mounted via Android Storage Access Framework. Raw file data stays on physical media and never touches intermediate third-party servers.",
            log: "I/O subsystem: direct SAF chunk stream open -> reading local block"
          }
        ],
        pipeline: [
          { step: "01", name: "Handshake", desc: "Client scans QR or enters share code to connect with relay." },
          { step: "02", name: "STUN Hole-Punch", desc: "Relay exchanges ICE candidates to punch through mobile carrier NAT." },
          { step: "03", name: "Direct P2P Tunnel", desc: "Direct WebRTC DataChannel established between phone and browser." },
          { step: "04", name: "Chunked Stream", desc: "Encrypted blocks stream directly from the phone's physical SSD." }
        ],
        highlights: [
          { label: "Sovereignty", value: "Files never uploaded to any cloud server" },
          { label: "Carrier NAT Traversal", value: "WebSockets signaling + TURN fallback" },
          { label: "Role Handshake", value: "Viewer, Contributor, Manager, Admin access tiers" }
        ]
      },
      website: null, download: null, note: "Easy Storage Cloud is a working name and may change before launch.", accent: "#3b82f6"
    },
    {
      slug: "convertix", index: "03", name: "Convertix", short: "Convertix", status: "Active rebuild", released: false,
      tagline: "A Flutter media and document conversion app for Android and iOS.",
      overview: "A Flutter media and document conversion app for Android and iOS. Media processing is performed on-device without internet, while document conversion runs through a FastAPI and LibreOffice backend.",
      role: "App concept & implementation direction", platform: "ANDROID + iOS", timeframe: "v1.0.9 / rebuild", stack: ["Flutter", "Dart", "Riverpod", "FFmpegKit", "Dio", "FastAPI", "LibreOffice", "Hive"],
      features: ["Image format conversion", "Video-to-audio extraction", "Audio and video conversion", "LOG/HDR video compression", "PDF and document tools", "History and shared output handling"],
      gallery: ["Media tools", "Document tools", "Conversion history"],
      architecture: {
        specId: "SPEC-CVX // HYBRID ENGINE",
        note: "A hybrid conversion pipeline that routes heavy media processing entirely to on-device hardware FFI, reserving cloud workers strictly for sandboxed document rendering.",
        nodes: [
          {
            id: "client",
            name: "Flutter Application",
            tag: "CLIENT / STATE CORE",
            tech: "Dart 3 + Riverpod 2.x",
            protocol: "Platform Channels / FFI",
            metric: "60 FPS async UI",
            desc: "AsyncNotifier architecture manages conversion queues, cancel tokens, format validations, and batch progress tracking without UI blocking.",
            log: "Task created: video transcode job queued -> analyzing codec header"
          },
          {
            id: "ffmpeg",
            name: "On-Device FFmpeg Engine",
            tag: "LOCAL RUNTIME / ZERO NET",
            tech: "FFmpegKit Embedded C++",
            protocol: "Native C/C++ FFI",
            metric: "100% Offline execution",
            desc: "Executes video transcoding, audio extraction, LOG/HDR tone-mapping, and media compression completely on the device GPU/CPU with zero internet required.",
            log: "FFmpegKit worker: hardware encoder bound -> frame conversion in progress"
          },
          {
            id: "hive",
            name: "Local Hive Persistence",
            tag: "EMBEDDED STORAGE",
            tech: "Hive NoSQL Binary Box",
            protocol: "Direct Binary I/O",
            metric: "< 1ms record access",
            desc: "Ultra-fast local storage for conversion history, output path tracking, favorite presets, and user settings with zero SQL overhead.",
            log: "Local DB: output metadata saved to Hive box -> cache pointer stored"
          },
          {
            id: "backend",
            name: "Cloud Document Worker",
            tag: "BACKEND / SANDBOX",
            tech: "FastAPI + Headless LibreOffice",
            protocol: "TLS 1.3 / Multipart REST",
            metric: "Strict <= 30s file deletion",
            desc: "Sandboxed cloud microservice for DOCX, XLSX, and PPTX to PDF rendering via headless LibreOffice and PyMuPDF, with automatic immediate file deletion.",
            log: "Doc worker: multipart received -> LibreOffice headless render complete"
          }
        ],
        pipeline: [
          { step: "01", name: "Format Inspection", desc: "Client validates file MIME type and routes to local or cloud engine." },
          { step: "02", name: "Media Processing", desc: "Audio/video jobs transcode instantly on-device via FFmpegKit FFI." },
          { step: "03", name: "Document Sandbox", desc: "Office documents stream over TLS to isolated headless LibreOffice." },
          { step: "04", name: "Ephemeral Teardown", desc: "Result returned to client; backend files deleted within 30 seconds." }
        ],
        highlights: [
          { label: "Zero-Data Media", value: "Media never leaves phone: 100% offline FFmpeg" },
          { label: "Ephemeral Privacy", value: "Strict <= 30s cloud document garbage collection" },
          { label: "Async State", value: "Riverpod AsyncNotifier with job cancel tokens" }
        ]
      },
      website: null,
      download: "https://play.google.com/store/apps/details?id=com.allformat.converter&pcampaignid=web_share",
      instagram: null,
      note: "Current documentation identifies Play Store signing and Android API 36 requirements as blockers before the next release.",
      accent: "#6d3ee8"
    }
  ]
};
