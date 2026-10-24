# WebAlchemy Invites

Animated digital wedding invitation platform — Next.js 15 (App Router) + Supabase + Razorpay.
Live at **invites.webalchemy.in**. Emerald Noir template · free draft & preview · pay once to publish
(Classic ₹1,499 / Shaadi Plus ₹2,999) · log in **or** continue as a guest · RSVP inbox.

## Routes

| Route | What it does |
|---|---|
| `/` | Landing page (phone mockup hero, features, two pricing tiers) |
| `/invite/demo` | Sample invitation linked from the landing page (RSVPs not saved) |
| `/create` | Editor form → creates a **draft** → goes to its editor |
| `/edit/[token]` | Private editor: status, preview, publish (Razorpay), share, RSVP inbox, save-to-account |
| `/preview/[token]` | Private preview of the invitation (works for drafts) |
| `/invite/[slug]` | Public invitation. Drafts show "coming soon"; expired ones show "ended" |
| `/login` | Google or email magic link (Supabase Auth) |
| `/dashboard` | "My invitations" for logged-in users |
| `/privacy` `/terms` `/refund` `/contact` | Policy pages (needed for Razorpay) |

API: `POST /api/invites` (create) · `GET/PUT /api/invites/token/[token]` · `POST /api/invites/token/[token]/claim`
(attach a guest-made invite to the logged-in account) · `POST /api/rsvp` · `POST /api/pay/order` ·
`POST /api/pay/verify` · `POST /api/pay/webhook`.

## How access works

- **Guest**: every invite has a public `slug` and a secret `edit_token`. Whoever holds `/edit/<token>` can
  edit it and read RSVPs. The editor offers Copy and "Send to my WhatsApp" so the link isn't lost.
- **Logged in**: invites created while logged in get `owner_id`, and show up in `/dashboard`. A guest-made
  invite can be claimed by opening its edit link while logged in → "Save to my account".
- Supabase Auth is used for identity only. All table access goes through server API routes with the
  service-role key; RLS is on with no policies.

## How publishing works

New invites are drafts. `POST /api/pay/order` creates a Razorpay order for the chosen plan (or the price
difference when upgrading Classic → Plus). Checkout calls `/api/pay/verify` (signature check) and the webhook
`/api/pay/webhook` is the backup if the tab closes — both mark the payment paid and publish the invite with
`expires_at = wedding date + 6 or 12 months`. Plans live in `lib/plans.js`.

Spam protection: hidden honeypot fields on the create and RSVP forms, plus per-IP rate limits
(`hit_rate_limit` in Postgres; IPs are stored only as a hash).

## Setup

### 1. Supabase
1. [supabase.com](https://supabase.com) → New project.
2. SQL Editor → paste & run `supabase/schema.sql` (safe to re-run; also upgrades the old schema).
3. Project Settings → API → copy the **Project URL**, **anon key** and **service_role key**.
4. Authentication → URL Configuration → Site URL `https://invites.webalchemy.in`; add redirect URLs
   `https://invites.webalchemy.in/auth/callback` and `http://localhost:3000/auth/callback`.
5. Authentication → Providers → Email is on by default. For Google: create an OAuth client in Google Cloud
   (redirect URI `https://<project>.supabase.co/auth/v1/callback`) and paste its ID/secret into the Google provider. Then set `NEXT_PUBLIC_GOOGLE_LOGIN=true` to show the button.
6. Recommended before launch: Authentication → SMTP → use your own SMTP sender (the built-in one is heavily rate-limited).

### 2. Razorpay
1. Dashboard → Account & Settings → API Keys → generate keys (test keys for local, live keys for production).
2. Webhooks → add `https://invites.webalchemy.in/api/pay/webhook`, events `payment.captured` and `order.paid`,
   and a secret of your choice.

### 3. Local run
```bash
npm install
cp .env.example .env.local   # fill in Supabase + Razorpay values
npm run dev
```
Without Razorpay keys you can set `INVITES_FREE_PUBLISH=true` locally to publish for free. Never set it in production.

### 4. Vercel
Add every variable from `.env.example` in Vercel → Settings → Environment Variables (with
`NEXT_PUBLIC_SITE_URL=https://invites.webalchemy.in`), then add the domain `invites.webalchemy.in` in
Vercel → Domains and the CNAME it asks for at your DNS provider.

## Backlog (Phase 3+)
- Per-function events (Haldi → Reception) with their own venue/map/dress code, and RSVP per function
- Rich RSVP (headcount, kids, food preference), guest list + personalised family links, CSV export
- Photo & music upload to Supabase Storage; live preview + step-by-step wizard
- More templates: Marigold Mela, Crimson Royale, Ivory Rose, Royal Sapphire, Pastel Mehendi
- Per-couple OG image (`@vercel/og`), add-to-calendar, Hindi/English toggle, RSVP notifications
- Admin panel, analytics, other event types (roka, birthday, griha pravesh)

Landing redesign brief for Claude Design: `docs/claude-design-prompt.md`.

## Notes
- Template design is original (Great Vibes / Cinzel / EB Garamond, own SVG ornaments, own copy).
- Guest RSVP messages are private — visible only to the couple, never on the public invite.
