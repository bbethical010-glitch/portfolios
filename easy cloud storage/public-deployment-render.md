# Public Deployment on Render

This is the simplest public deployment path for the relay in this repo.

## What you are deploying

You are deploying only the relay service.

The relay gives the phone a public HTTPS entry point and forwards requests to the connected phone node over a WebSocket tunnel.

The files still stay on the external SSD or pen drive attached to the phone.

## Files already prepared

This repo now supports robust multi-module builds with:

1. `Dockerfile` (Moved to the root workspace directory)
2. `render.yaml` (Pre-configured Blueprint pointing to root context)

## Deploy steps

1. Push this repo to GitHub
2. Sign in to Render
3. Create a new Blueprint service from the GitHub repo
4. **Before deploying, configure environment variables:**
   - Go to your service settings in Render
   - Under "Environment", add two variables:
     - `METERED_APP_NAME`: Your Metered application name (from https://metered.net)
     - `METERED_API_KEY`: Your Metered API key (from https://metered.net)
   - [Optional] If you don't want to use Metered, you can self-host a TURN server (see below)
5. Render will detect `render.yaml`
6. Create the service

The relay exposes:

```text
/health
/agents
/node/<share_code>
/node/<share_code>/<path>
```

## After Render gives you a URL

You will get a public URL like:

```text
https://easy-storage-relay.onrender.com
```

Put that value into:

```properties
RELAY_BASE_URL=https://easy-storage-relay.onrender.com
```

Then rebuild and reinstall the app.

Inside the app, the public route will become:

```text
https://YOUR_RENDER_HOST/node/YOUR_SHARE_CODE/api/status
```

## Verification

After deployment:

1. Open `https://YOUR_RENDER_HOST/health`
2. Start the node on the phone
3. Open `https://YOUR_RENDER_HOST/agents`
4. Confirm your share code appears
5. Open `https://YOUR_RENDER_HOST/node/YOUR_SHARE_CODE/api/status`

Expected result:
```json
{"status":"online"}
```

## TURN Server Configuration (Critical for P2P Connectivity)

For reliable peer-to-peer connections across all network types (especially symmetric NATs and corporate firewalls), a TURN server is required. Without it, ~15-25% of users will experience connection failures.

### Option 1: Using Metered (Recommended)
1. Sign up at https://metered.net
2. Create a new application to get your `APP_NAME` and `API_KEY`
3. Set these as environment variables in your Render service:
   - `METERED_APP_NAME`: Your Metered app name
   - `METERED_API_KEY`: Your Metered API key

### Option 2: Self-hosted Coturn (Alternative)
If you prefer to self-host, you can deploy a coturn server and set these environment variables instead:
- `TURN_URL`: e.g., "turn:your-turn-domain.com:3478"
- `TURN_USERNAME`: Username for TURN authentication
- `TURN_CREDENTIAL`: Credential for TURN authentication

Then modify the relay server's `/api/turn-credentials` endpoint to return your custom TERVER configuration instead of calling the Metered API.

## Important Hardening Considerations

The current deployment includes node-level credential encryption (PBKDF2) and strict token hashing, but keep these operational limits in mind:

1. **Memory Ceiling**: Fallback HTTP streams through Render are constrained by a 50MB ceiling. Heavy uploads rely on WebRTC direct flows to bypass this.
2. **Volatile Peer Memory**: Active connections are maintained in RAM. If Render puts the service to sleep or reboots it, active transfer loops will disconnect.
3. **TURN Dependence**: For 100% relay connectivity, configure TURN credentials as described above. Without TURN, rely on public Google STUN servers which may fail in restrictive networks.