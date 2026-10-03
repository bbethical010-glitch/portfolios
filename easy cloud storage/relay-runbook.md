# Relay Runbook

This repo now contains a relay service in the `relay` module.

## What it does

1. **WebRTC Signaling Broker**: Coordinates initial SDP and ICE negotiation to establish peer-to-peer WebRTC DataChannels between browser/client and Android nodes.
2. **API Proxy Fallback**: Proxies full REST queries over WebSocket tunnels if local network firewalls or symmetric NATs prevent direct peer connections.
3. **Multi-User Collaborative Presence**: Hosts signaling endpoints enabling real-time user counts and session statuses.
4. **Static Front-End Host**: Distributes the bundled React Web Console to public visitors at root.

Files still stay on the external SSD or pen drive attached to the phone.

## Run locally

From the project root:

```bash
./gradlew :relay:run
```

The relay listens on port `8787` by default.

You can change the port with:

```bash
PORT=9090 ./gradlew :relay:run
```

Health check:

```bash
curl http://127.0.0.1:8787/health
```

## Point the Android app to the relay

Set this in `local.properties`:

```properties
RELAY_BASE_URL=http://YOUR_RELAY_HOST:8787
```

Then rebuild the app:

```bash
./gradlew :app:assembleDebug
```

Inside the app:

1. Select the external storage folder
2. Start the node
3. Make sure the relay base URL matches your running relay
4. Share the invite or open the public route shown in the app

## Public routes

The relay exposes:

```text
/health
/agents
/node/<share_code>
/node/<share_code>/<path>
```

`/agents` returns the currently connected share codes.

## TURN Server Configuration

For reliable peer-to-peer connections across all network types (especially symmetric NATs and corporate firewalls), configure TURN credentials:

### Using Metered (Recommended)
1. Sign up at https://metered.net
2. Create a new application to get your `APP_NAME` and `API_KEY`
3. Set these as environment variables:
   - `METERED_APP_NAME`: Your Metered app name
   - `METERED_API_KEY`: Your Metered API key

The relay will automatically fetch TURN credentials from Metered and distribute them to clients.

### Manual Configuration
If you prefer to manually configure TURN servers (e.g., self-hosted coturn), modify the relay server's `/api/turn-credentials` endpoint in `RelayServer.kt` to return your custom TURN configuration instead of calling the Metered API.

## Current Status & Gaps

The relay is now highly efficient, but operates within free-tier constraints:

1. **Relay Buffering Memory**: Fallback HTTP traffic still leverages standard memory streams, imposing a soft 50MB ceiling on proxy payloads (the direct WebRTC path completely circumvents this).
2. **Volatile Signaling**: Active share-codes exist purely in RAM via Ktor's `ConcurrentHashMap`. Deployments or Render spin-downs will disrupt connected active sessions.
3. **No Native Rate-Limiting**: While Ktor handles high concurrences, Render's shared network tier doesn't prevent brute-force routing abuses without frontend configuration.

## Production Hardening Path

1. **STUN/TURN Infra Integrated**: TURN servers configured via Metered or self-hosted solution for WebRTC connectivity across extreme firewall environments.
2. **Stateless Session Storage**: Store routing mappings inside a Redis cache, allowing the relay to scale horizontally across multi-region Docker deployments.
3. **Centralized Analytics**: Add structured logging telemetry to map bandwidth metrics and route usages.