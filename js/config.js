window.SITE_CONFIG = {
  person: {
    name: "Pratham Pandey",
    location: "INDIA",
    email: "bbethical010@gmail.com",
    instagram: null,
    linkedin: null
  },
  projects: [
    {
      slug: "meme-capsule", index: "01", name: "Meme Capsule", short: "MEME / CAPSULE", status: "Released / active", released: true,
      tagline: "One tap. One meme. Zero fluff.",
      overview: "A mobile-first meme delivery product built around a single-action capsule rather than an infinite feed. The product pairs a public web platform and Android app with serverless edge delivery and a curation system.",
      role: "Original ideator & lead frontend", platform: "Android + Web", timeframe: "v2.7 / 2026", stack: ["React", "TypeScript", "Vite", "Capacitor", "Cloudflare Pages", "D1", "R2"],
      features: ["Single-tap meme capsule flow", "Card deck with gesture interaction", "Meme Vault and Mood Boards", "Native MediaStore saving and sharing", "Edge delivery with Cloudflare D1 and R2", "Curation, safety, and reporting systems"],
      gallery: ["One tap / one meme", "Vault / mood boards", "Share / save"],
      architecture: { nodes: ["Android app", "Cloudflare Pages", "D1 + R2", "Curation API"], note: "Public mobile and web surfaces are decoupled from edge data, media storage, and curation systems." },
      website: "https://memecapsule.wtf", download: "https://play.google.com/store/apps/details?id=com.meme.capsule", accent: "#ff3e83"
    },
    {
      slug: "easy-storage-cloud", index: "02", name: "Easy Storage Cloud", short: "YOUR / CLOUD", status: "In development", released: false,
      tagline: "Your phone is your cloud.",
      overview: "A peer-to-peer personal cloud where an Android phone and its attached storage remain the source of truth. A public relay provides reachability and signaling, rather than becoming the primary file store.",
      role: "Product & systems builder", platform: "Android + Web", timeframe: "2026", stack: ["Kotlin", "Jetpack Compose", "Ktor", "WebRTC", "WebSockets", "Render"],
      features: ["Native Remote File Explorer", "Real-time search and multi-attribute sorting", "Bidirectional chunked file transfers", "Foreground service and transfer notifications", "Role-based access and token handshake", "WebRTC signaling with proxy fallback"],
      gallery: ["Remote file explorer", "P2P connection", "Transfer activity"],
      architecture: { nodes: ["Client app", "Relay / signaling", "Host phone", "External drive"], note: "A WebRTC DataChannel connects client and host devices, while the relay brokers signaling and can proxy fallback requests." },
      website: null, download: null, note: "Easy Storage Cloud is a working name and may change before launch.", accent: "#3b82f6"
    },
    {
      slug: "convertix", index: "03", name: "Convertix", short: "CON / VERT", status: "Active rebuild", released: false,
      tagline: "Media and document conversion, in one toolkit.",
      overview: "A Flutter media and document conversion app for Android and iOS. Media processing is performed on-device without internet, while document conversion runs through a FastAPI and LibreOffice backend.",
      role: "App concept & implementation direction", platform: "Android + iOS", timeframe: "v1.0.9 / rebuild", stack: ["Flutter", "Dart", "Riverpod", "FFmpegKit", "Dio", "FastAPI", "LibreOffice", "Hive"],
      features: ["Image format conversion", "Video-to-audio extraction", "Audio and video conversion", "LOG/HDR video compression", "PDF and document tools", "History and shared output handling"],
      gallery: ["Media tools", "Document tools", "Conversion history"],
      architecture: { nodes: ["Flutter app", "FFmpegKit", "FastAPI", "LibreOffice"], note: "Media tools use on-device FFmpeg processing; document tools send requests to the backend service over TLS." },
      website: null, download: null, note: "Current documentation identifies Play Store signing and Android API 36 requirements as blockers before the next release.", accent: "#6d3ee8"
    }
  ]
};
