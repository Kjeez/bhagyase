# WebAlchemy Invites

Animated digital wedding invitation platform — Next.js 15 (App Router) + Supabase.
Emerald Noir template · unique share links · private edit links (no login) · RSVP inbox.

## Routes

| Route | What it does |
|---|---|
| `/` | Landing page (phone mockup hero, features, pricing) |
| `/create` | Editor form → creates invite → shows share + private edit link |
| `/invite/[slug]` | Live invitation (e.g. `/invite/aarav-weds-meher-x7k2`) |
| `/edit/[token]` | Private editor + RSVP inbox (token = secret UUID, no login needed) |

API: `POST /api/invites` (create) · `GET/PUT /api/invites/token/[token]` (fetch/update + inbox) · `POST /api/rsvp` (guest submit).

## Setup (15 minutes)

### 1. Supabase
1. [supabase.com](https://supabase.com) → New project (free tier is enough to launch)
2. SQL Editor → paste & run `supabase/schema.sql`
3. Project Settings → API → copy **Project URL** and **service_role key**

RLS is enabled with **no anon policies** — the DB is only reachable through the
server API routes using the service-role key. Never expose that key client-side.

### 2. Local run
```bash
npm install
cp .env.example .env.local   # fill in the two Supabase values
npm run dev
```

### 3. Deploy on Vercel
```bash
# push to GitHub, then vercel.com → Import project
# Add env vars in Vercel → Settings → Environment Variables:
#   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SITE_URL (your domain)
```
Attach `invites.webalchemy.in` (or a fresh domain) in Vercel → Domains.

## How editing works (no-login model)
Each invite row has a `slug` (public) and an `edit_token` (secret UUID).
The couple bookmarks `/edit/<token>` — that link fetches + updates the invite and
shows the RSVP inbox. Simple, mobile-first, zero friction. (Phase 3: optional
email magic-link auth on top.)

## Phase 3 backlog
- Razorpay payment gate on publish (₹1,499 one-time)
- Photo & music **upload** to Supabase Storage (currently URL fields)
- More templates: Crimson Royale, Ivory Rose, Royal Sapphire — same data schema, new CSS skin
- WhatsApp Business API notifications: new RSVP → couple's WhatsApp
- Multi-language invite toggle (Hindi/English)
- OG image generation per couple (`@vercel/og`)
- Demo video for landing hero (screen-record a live invite → drop into the phone mockup)

## Notes
- Template design is original (Great Vibes / Cinzel / EB Garamond, own SVG ornaments, own copy).
- Guest RSVP messages are private — visible only on the edit-token page, never on the public invite.
