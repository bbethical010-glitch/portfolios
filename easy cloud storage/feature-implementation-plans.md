# Feature Implementation Plans — Easy Storage Cloud

This document contains detailed implementation plans for feature ideas applicable to both the web console (ui/) and the Android app (app/). Each feature includes scope, backend/APIs, UI changes, tests, risks & mitigations, and difficulty/time estimates. A difficulty legend and sequencing recommendations are included.

---

Difficulty legend
- Easy: small UI/backend work, low risk (≈1–2 dev days)
- Medium: multiple components, integration testing, moderate risk (≈1–3 weeks)
- Hard: cross-platform, infra/cryptography/consistency work, higher risk (≈3–8+ weeks)

---

## 1) Inline file previews (images, PDF, video, text)

Summary
Provide in-app and in-browser previews for common file types with streaming support and thumbnails.

Scope (Web + Android)
- Web: preview panel/modal with lazy loading; PDF.js or native HTML5 players. 
- Android: Compose/WebView preview components; use SAF content URIs and streaming.

Backend / Relay work
- Ensure endpoints support Range requests and correct Content-Type. Optionally add a thumbnail endpoint or generate thumbnails on-device.

Data model / API
- Optional: `GET /api/preview?path=...` or `GET /api/thumbnail?path=...` (returns small image)
- Use existing file download endpoints with Range support for streaming previews.

UI changes
- Add Preview modal/component; image viewer (zoom/pan), video player with controls, PDF viewer, text/code viewer with syntax highlighting.

Tests / Acceptance
- Unit tests for components, integration tests verifying Range header handling and correct Content-Type streaming.

Risks & Mitigation
- Large files memory use: rely on Range streaming and thumbnails; lazy-load.

Difficulty & Time
- Medium — 1–2 weeks.

---

## 2) Resumable / background uploads with network-loss recovery

Summary
- Pause/resume, background continuation, reliable chunk retrying for both web and Android clients.

Scope (Web + Android)
- Web: resumable protocol (tus or custom chunk manifest) + UI controls.
- Android: background WorkManager uploads integrated with TransferRegistry and TransferManager.

Backend / Relay work
- Persist upload manifests (uploadId, lastChunkIndex). Relay must forward chunks as streaming messages (respect `.agents/AGENTS.md` streaming rules).

Data model / API
- `POST /uploads/init` -> uploadId
- `PUT /uploads/{id}/chunk?index=` -> chunk upload
- `GET /uploads/{id}/status` -> progress

UI changes
- Upload manager view with pause/resume/cancel/error states, toasts/notifications for background completions.

Tests / Acceptance
- Stress tests for interruptions, integrity checks via per-chunk hashes, end-to-end resume flows.

Risks & Mitigation
- Concurrency and partial state: idempotent chunk writes, server cleanup TTLs, manifest locking.

Difficulty & Time
- Hard — 3–6 weeks.

---

## 3) Selective folder sync & sync status badges

Summary
- Allow marking folders for background sync and surface sync state badges across UI and Android.

Scope (Web + Android)
- Web: remote status and controls.
- Android: background sync service (WorkManager), local index of synced items.

Backend / Relay work
- Optional: relay as a metadata broker for remote status; core sync can be device-local.

Data model / API
- Local DB table: `synced_folders` {path, lastSync, status, nextSync}
- Optional `GET /api/sync/status` for remote UI.

UI changes
- Folder context menu: "Sync this folder"; badge states (synced/pending/conflict); sync settings panel.

Tests / Acceptance
- Functional sync, conflict detection/resolution tests.

Risks & Mitigation
- Large folder trees: incremental/delta sync only; exclude patterns; pagination and batch processing.

Difficulty & Time
- Hard — 3–6 weeks.

---

## 4) Shareable links with permissions & expirations

Summary
- Generate links that map to device resources with configurable permissions (read/write) and TTLs.

Scope (Web + Android)
- Web: link generation UI, copy/share.
- Android: generate/manage links on-device.

Backend / Relay work
- Relay or an auth service issues signed tokens (HMAC/JWT style) which resolve to device+path; validate tokens on proxy requests.

Data model / API
- `POST /shares` -> {token, path, perms, expiresAt}
- `GET /shares/{token}` -> resolve proxy or direct redirect
- `DELETE /shares/{token}` -> revoke

UI changes
- Share panel with expiry and permission controls, revocation list.

Tests / Acceptance
- Token expiry enforcement, permission checks on proxied requests, revocation behavior.

Risks & Mitigation
- Token leakage: HMAC-signed tokens, short TTLs, revoke endpoint, logging/audit.

Difficulty & Time
- Medium — 2–4 weeks.

---

## 5) Client-side end-to-end encryption (E2EE) toggle (per-share)

Summary
- Optional client-side encryption where payloads are encrypted before leaving the client; server/relay stores opaque blobs.

Scope (Web + Android)
- Web: client-side encryption library, key management UI.
- Android: encryption at send/receive, key storage (keystore) and export/import for recovery.

Backend / Relay work
- Relay/Server treats blobs as opaque. Metadata must indicate encryption flag; no plaintext storage.

Data model / API
- Include `encryption` flag in upload metadata; clients handle key exchange (password, passphrase, or public-key based).

UI changes
- Key generation, backup (export to file), per-share password/passphrase options, share key with recipients.

Tests / Acceptance
- Interoperability tests (web <-> Android), encryption correctness, backup/restore flows.

Risks & Mitigation
- Key loss = data loss. Mitigation: clear UX warnings, optional encrypted key backups (user-export), rigorous crypto review and use of audited libraries.

Difficulty & Time
- Hard — 4–8 weeks (cryptographic review required).

---

## 6) File version history + one-click restore

Summary
- Keep previous file versions and allow inspection and restore.

Scope (Web + Android)
- Web: version list, preview, restore.
- Android: snapshot creation, restore into current path or new path.

Backend / Relay work
- Store versions as separate blobs with metadata or use device-local version store (e.g., `.versions/` directory) with retention policy.

Data model / API
- `GET /files/{path}/versions` -> list
- `POST /files/{path}/versions/{id}/restore` -> restore

UI changes
- Versions modal with preview and restore action.

Tests / Acceptance
- Restore correctness and version lifecycle (delete/expire).

Risks & Mitigation
- Storage growth: enforce retention policy and configurable limits; optional deduplication.

Difficulty & Time
- Medium–Hard — 3–6 weeks.

---

## 7) Advanced search (type, size, date, path, metadata)

Summary
- Rich search across metadata with filters and saved queries.

Scope (Web + Android)
- Web: search UI and results page with filters.
- Android: local indexer (SQLite) to serve fast searches.

Backend / Relay work
- Optional: relay-level index for public listings; otherwise search happens locally on the node and is exposed via API.

Data model / API
- Metadata index table: {name, path, mime, size, modifiedAt, tags}
- `GET /search?q=&type=&minSize=&maxSize=&modifiedAfter=`

UI changes
- Filter chips, sortable results, saved searches.

Tests / Acceptance
- Indexing correctness, large-dataset performance, pagination.

Risks & Mitigation
- Index staleness: incremental updates from file events; background re-indexing.

Difficulty & Time
- Medium — 2–4 weeks.

---

## 8) Transfer scheduling & per-transfer bandwidth caps

Summary
- Schedule transfers and enforce per-transfer or global bandwidth caps.

Scope (Web + Android)
- Web: scheduler UI to create/modify tasks.
- Android: WorkManager + throttled upload implementation.

Backend / Relay work
- Relay should respect throttling if it proxies transfers; otherwise throttling is enforced client-side.

Data model / API
- Local schedule table: {id, path, scheduleSpec, bandwidthLimit}
- Optional `GET /api/schedules` for remote management.

UI changes
- Schedule modal, bandwidth slider, active schedule list.

Tests / Acceptance
- Scheduled execution correctness, throttle enforcement under concurrent transfers.

Risks & Mitigation
- Complexity with concurrent transfers: use a global token bucket with per-transfer limits.

Difficulty & Time
- Medium — 2–4 weeks.

---

## 9) Device discovery UI + remote wake / keep-alive controls

Summary
- Enhanced node discovery, wake/shutdown controls, and public access toggles.

Scope (Web + Android)
- Web: node list with nodes' online/offline/last-seen and a "Wake" action.
- Android: advertise presence to relay; accept wake request via persistent connection or push.

Backend / Relay work
- Relay already maintains a session registry; add `POST /nodes/{id}/wake` which forwards wake messages. Optionally integrate push notifications (platform-specific).

Data model / API
- `GET /nodes` -> list nodes
- `POST /nodes/{id}/wake` -> send wake request

UI changes
- Node card with Wake, Toggle public access, and metrics (CPU, storage usage).

Tests / Acceptance
- Wake flows both via relay tunnel and via push; accuracy of node registry.

Risks & Mitigation
- Battery and privacy impact: default off for wake, require explicit opt-in.

Difficulty & Time
- Medium — 2–4 weeks.

---

## 10) Activity / audit logs and usage analytics dashboards

Summary
- Per-device and per-user event logs and an analytics dashboard.

Scope (Web + Android)
- Web: dashboard with timeline, filters, export.
- Android: emit local events and optionally forward telemetry (opt-in) to an analytics store.

Backend / Relay work
- Telemetry ingestion endpoint and small analytics store (or integrate external analytics). Must be opt-in and privacy-conscious.

Data model / API
- Event schema: {timestamp, actor, action, path, size, status}
- `GET /events?nodeId=&from=&to=&action=`

UI changes
- Timeline view, export CSV, filterable queries.

Tests / Acceptance
- Event durability, retention policy enforcement, export correctness.

Risks & Mitigation
- Privacy/regulatory: opt-in telemetry and data anonymization, retention controls.

Difficulty & Time
- Medium — 2–4 weeks.

---

## 11) Offline queueing of actions + automatic replay

Summary
- Queue user actions while offline and replay when connectivity returns, with conflict handling.

Scope (Web + Android)
- Web: service-worker/IndexedDB queue.
- Android: persistent action queue + WorkManager replay.

Backend / Relay work
- APIs must be idempotent or accept idempotency tokens to handle replays.

Data model / API
- Local action queue table: {id, actionType, payload, status, attempts}

UI changes
- Queue view with retry/cancel and conflict resolution UI when replay fails.

Tests / Acceptance
- Simulated offline flows, ordering tests, deduplication checks.

Risks & Mitigation
- Ordering and conflicts: sequence numbers, tombstones, clear conflict UI.

Difficulty & Time
- Hard — 3–6 weeks.

---

## 12) Multi-user profiles / team spaces with role-based access

Summary
- Add multi-user accounts, teams, and RBAC for shared nodes.

Scope (Web + Android)
- Web: account and team UIs, admin consoles.
- Android: invite flows, per-user permission enforcement on device.

Backend / Relay work
- Add auth (JWT/OIDC or third-party), user & team stores, ACL enforcement on relay and device endpoints.

Data model / API
- Users, Teams, Roles, ACL entries, Invite tokens and admin endpoints.

UI changes
- Team settings, user roles, invite management, access dashboards.

Tests / Acceptance
- Authorization unit & integration tests across all APIs; invite lifecycle tests.

Risks & Mitigation
- Significant infra & security scope: prefer integrating an existing auth provider and rollout in phases. Comprehensive audit required.

Difficulty & Time
- Hard — 4–8+ weeks.

---

## Sequencing & Parallelization Suggestions

Phase A — Foundations (2–6 weeks)
- Resumable/background uploads
- Offline queueing of actions
- Range/stream improvements in relay and device (critical for previews & large files)

Phase B — Capability (2–8 weeks)
- Inline previews
- Shareable links
- Device discovery improvements
- Transfer scheduling
- Advanced search

Phase C — Infra / Security (4–12+ weeks)
- E2EE (client-side encryption)
- Multi-user / team spaces & RBAC
- Version history (storage/retention policies)
- Analytics / audit pipelines (opt-in)

Parallelization
- UI-only work (previews, search) can be implemented alongside infra work (auth, telemetry).
- Device-only teams can own background transfer & sync logic while relay team focuses on streaming and tokens.

---

## Deliverables & Acceptance Criteria (common)
- Design doc / API spec
- Implementation with unit & integration tests
- CI validation (including Android instrumentation where relevant)
- Documentation updates (README, docs/)
- Backwards-compatible API behavior and migration strategy

---

## Next steps
- Convert prioritized features into GitHub issues with estimates and owners.
- Produce sprint-level breakdowns for top 4 features (if requested).
- Provide API contract examples or starter client/server scaffolding for any feature chosen for first implementation.

---

*Generated for the Easy Storage Cloud repository.*
