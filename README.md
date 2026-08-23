# Pulse Links

A modern, editable link-in-bio platform built with Next.js, Firebase Authentication, and Upstash Redis.

## Run locally

1. Copy `.env.example` to `.env.local` and fill in Firebase client, Firebase Admin service-account, and Upstash credentials.
2. Run `npm install`.
3. Run `npm run dev` and open `http://localhost:3000`.

The editor lives at `/`; public pages are available at `/:username`. Firebase enables Google sign-in, and verified Firebase ID tokens are required before the API writes profiles to Upstash Redis. A handle is claimed by the first authenticated account that publishes it.
