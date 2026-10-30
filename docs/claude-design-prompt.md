# Claude Design prompt: WebAlchemy Invites

How to use this: open Claude Design and paste **the whole master prompt below** as your first message. After that, paste the follow-up prompts one at a time, in order. Each one builds on what's already on the canvas.

---

## Master prompt (paste this first)

```
PROJECT
Design "WebAlchemy Invites" (invites.webalchemy.in), an Indian digital wedding invitation platform made by WebAlchemy, a web studio in New Delhi. Couples, or more often their siblings and cousins, create an animated invitation website in minutes. They share one link on WhatsApp and track RSVPs for every function: Haldi, Mehendi, Sangeet, Baraat, Pheras, Reception. It's free to create and preview, and you pay once when you publish:
- Classic ₹1,499: animated invitation, countdown, scratch card, timeline, maps, music, RSVP inbox, unlimited edits, live till the wedding + 6 months.
- Shaadi Plus ₹2,999 (most loved): everything in Classic, a hand-drawn illustration of the couple made for their invitation, up to 30 photos, live till the wedding + 12 months, done-for-you setup over WhatsApp, priority support.
Two ways in: log in (Google or an email magic link) to keep every invitation in "My invitations", or continue as a guest and keep a private edit link.

WHO IT'S FOR
Indian couples aged 24–34 and their families across Delhi NCR, Punjab, Rajasthan, Mumbai and the diaspora. 90% open it on a phone from a WhatsApp chat. Guests range from 8-year-old cousins to 80-year-old dadis, so text must be big, buttons obvious, and nothing should need instructions.

THE FEELING
Walking into a shaadi. Celebration everywhere: marigold torans over every doorway, rose petals in the air, fairy lights, the dhol starting up, kids racing around with sparklers, chachas pulling everyone onto the dance floor at the sangeet, dadi blessing the couple with a thaali, the groom arriving on a ghodi in the baraat, the bride's hands covered in mehendi, friends throwing haldi. It's joyful, warm, loud in colour but never messy, a little filmy and funny. Premium enough that a couple paying ₹2,999 feels proud to forward it to the family group.
Voice: warm, playful English with light Hinglish ("No more 'bhai location bhejo' calls", "for the whole khandaan", "shaadi mubarak!"). Never corporate SaaS speak.

VISUAL SYSTEM
Palette (light, warm base with jewel accents):
- Ivory #FFF8EC and parchment #F6EAD3: main backgrounds
- Marigold #F5A524: primary accent
- Haldi yellow #FFD54A
- Rani pink #E0457B
- Sindoor red #C8102E: CTAs and highlights, used sparingly
- Mehendi green #4E7D3A
- Peacock teal #0F6E6E
- Deep plum night #2B1036: sangeet/night sections, footer
- Antique gold #C9A24A: line ornaments, foil, dividers
- Ink #2A1A12: body text (keep it warm, never pure black)
Type:
- Display: a high-contrast festive serif (Gloock, Yeseva One or Rozha One) for headlines
- Body: a friendly rounded sans (Manrope or DM Sans) at 16–18px minimum on mobile
- Script: Great Vibes, only for couple names
- Devanagari accents: Tiro Devanagari Hindi or Yatra One ("शुभ विवाह", "सादर आमंत्रण", "स्वागतम्")
Ornament kit: a marigold + mango-leaf toran; jharokha arch frames; rangoli corners; paisley and mehendi line patterns; diya, kalash, dhol, shehnai, string lights, rose-petal confetti, small pataka sparkles. Line ornaments are in antique gold and filled motifs use the palette.
Illustrated characters: flat, chunky, hand-drawn people in the spirit of "Open Peeps", but Indian and dressed for a shaadi. Simple shapes and expressive faces, with diverse skin tones, ages and body types. The cast:
- the bride in a red/pink lehenga with kaleere
- the groom in a sherwani and safa (sometimes on a white ghodi)
- the dancing chacha (naagin dance)
- dadi with a thaali, and dadaji with a walking stick and a big smile
- the mehendi aunty
- the haldi-throwing cousins
- kids with sparklers and balloons
- the dhol-wala
- a cousin taking a selfie
- pandit ji at the mandap
- an NRI bua on a video call
- the bride's friends with a "Team Bride" sign
Build every character as separate SVG layers (head, torso, each arm, legs, props) so each can be animated.
Shape language: soft rounded cards (20–28px radius), arched tops on feature cards (like a jharokha), pill buttons, generous whitespace, subtle paper grain on ivory.

MOTION PRINCIPLES
Joyful but smooth on a ₹12,000 Android phone. Use SVG/CSS and small Lottie-style loops, not video. Things fall gently (petals), bounce on a beat (dhol at 120bpm), sway (toran) and pop (confetti on CTAs). Nothing scroll-jacks on mobile. Every animation needs a calm prefers-reduced-motion version.

DELIVERABLES, IN THIS ORDER
1. Design system sheet: colour tokens, type scale, buttons, inputs, cards, chips, ornaments, the character sheet (12 characters × 2–3 poses).
2. Landing page, mobile (390px) and desktop (1440px).
3. Logged-in app screens, mobile first: Login, My invitations, the Create wizard, the Editor, the Publish / plan picker, Payment success.
4. The invitation itself (what guests see), as the "Marigold Mela" template.
5. Status screens: invitation coming soon (draft), invitation ended, 404.

LANDING PAGE, SECTION BY SECTION
1. Top bar: logo "WebAlchemy Invites" (the "WebAlchemy" part in marigold), links Templates · Pricing · Log in, and a primary pill "Create my invitation". A marigold toran hangs across the very top and sways gently. On mobile: logo, Log in and a compact CTA.
2. Hero:
   - Eyebrow "शुभ विवाह · Shubh Vivah".
   - Headline "Your shaadi deserves more than a PDF invite."
   - Sub "An animated invitation website for every function, from haldi to vidaai. Countdown, maps, music and RSVPs for the whole khandaan. Made in 5 minutes, shared on WhatsApp."
   - CTAs "Create my invitation →" (primary) and "See a live invite" (secondary).
   - Trust line "Free to create & preview · One-time payment · No subscription".
   - Visual: a phone showing a live invitation (couple names in script, a ticking countdown, a gold scratch card). Around it, a mini shaadi is happening: the bride and groom under a marigold mandap, two kids running in with sparklers, a dhol-wala drumming, petals drifting down. The phone tilts slightly with scroll.
3. "Every function gets its own page": a swipeable (mobile) / horizontally scrolling (desktop) strip of 6 function cards, each with its own colour world and an illustrated scene:
   - Haldi: haldi yellow; cousins smearing haldi on a giggling groom
   - Mehendi: mehendi green; the bride showing off her hands while the aunties sing
   - Sangeet: plum night with fairy lights; the whole family dancing, a chacha doing the naagin dance, kids on the floor, a disco ball
   - Baraat: marigold and red; the groom on a ghodi, the dhol-wala and friends dancing in the street
   - Pheras: sindoor and gold; the mandap, the sacred fire, pandit ji, a soft glow
   - Reception: peacock teal and gold; the stage and couple, guests queuing for photos
   Each card shows the function name in English + Devanagari, date/time/venue placeholders and an "RSVP for this function" chip.
4. "Made in 3 steps, 5 minutes": 01 Fill your details (the bride on a sofa filling in the phone form, with a live preview); 02 Preview & publish (plan cards, the Razorpay sheet); 03 Share on WhatsApp & track RSVPs (a cousin forwarding to 12 groups, RSVP ticks flying back).
5. "See it live": a big phone with the demo invitation, a "Tap to scratch" hint and an "Open the full demo" button.
6. Templates gallery: 6 phone thumbnails, each with a name, mood line, colour chips and a Preview button:
   - Marigold Mela: festive, ivory + marigold + rani pink
   - Emerald Noir: black + gold, elegant
   - Royal Sapphire: midnight blue + gold jharokhas
   - Pastel Mehendi: sage/blush/cream with line art
   - Crimson Royale: deep red + gold, traditional
   - Ivory Rose: white florals, minimal
7. "Made for the whole khandaan": the guest experience. A personalised greeting ("Dear Sharma Parivar"), one-tap Google Maps, add to calendar, a Hindi/English toggle, background shehnai music with a clear mute button, and an RSVP for each function. Illustrate dadi holding the phone at arm's length, zooming in and delighted.
8. "Your RSVP control room": a friendly preview of the couple's dashboard. Headcount per function, adults vs kids, a veg/Jain/non-veg split, "who hasn't replied" with a WhatsApp nudge button, export to Excel. Use warm cards, not grey SaaS tables.
9. "Log in or go guest, your choice": two side-by-side cards. Log in with Google or email to keep every invitation in one place, or create as a guest and keep a private edit link (with a "Send to my WhatsApp" button).
10. "What the family is saying": testimonials styled as a WhatsApp family group chat, with bubbles appearing one by one and "typing…" dots. Examples: "Bua: Beta itna sundar invite! 😍", "Mama ji: Location mil gayi, thank you 🙏", "Cousin Riya: the scratch card is SO cute 😭", "Couple: 212 RSVPs in 3 days, zero calls 🙌".
11. Pricing: two cards. Classic ₹1,499 and Shaadi Plus ₹2,999 (marked "Most loved", raised, with a gold border), feature lists as above. Both CTAs read "Start free — pay when you publish". Small print: "One-time payment via Razorpay · UPI, cards, netbanking · 48-hour refund if no RSVPs yet".
12. FAQ accordion:
   - Do guests need to install anything?
   - Can relatives without smartphones see it?
   - Can I change the venue after sharing?
   - Is our data private?
   - What if I lose my edit link?
   - Can I make one for my roka / engagement?
   - Can you make it for me? (Shaadi Plus)
13. Final CTA + footer: a full baraat procession marches across the plum footer as you scroll (groom on a ghodi, the dhol-wala, dancing friends, kids, a band with trumpets), above the line "Let the celebrations begin. Create my invitation →". Footer: WebAlchemy Invites · A WebAlchemy product · New Delhi · WhatsApp +91 78385 83051 · Contact · Privacy · Terms · Refunds.
On mobile, add a sticky bottom bar on the landing page with "Create my invitation" and a WhatsApp icon.

APP SCREENS (mobile first, 390px; then a desktop layout with a live preview panel)
A. Login: logo, "Log in", "Keep all your invitations and RSVPs in one place". Buttons: "Continue with Google" (primary), then a divider "or use your email", an email field and "Email me a login link". A "Check your inbox 💌" success state. A small link "Continue as a guest". A cheerful character waves from the corner.
B. My invitations (dashboard): a greeting "Namaste, Riya 👋". Cards per invitation show the couple names in script, the date, the RSVP count and a status chip (Draft / Live · Classic / Live · Shaadi Plus / Ended), with quick actions Edit · Preview · Share. A "+ New invitation" button. Empty state: dadi holding a blank card, "No invitations yet — let's make the first one!"
C. Create wizard (replaces one long form): a step bar with 6 steps.
   1. Couple: names, parents' lines, a photo.
   2. Date & functions: the wedding date, then toggles for Haldi / Mehendi / Sangeet / Baraat / Pheras / Reception, each with date, time, venue, map link and dress code.
   3. Venue & travel: venue, map, transport, stay.
   4. Photos & music: drag-and-drop upload with thumbnails, and a song picker.
   5. Pick a template: the 6 thumbnails.
   6. Review.
   A live phone preview sits beside the form on desktop and opens as a bottom sheet "Preview" on mobile. Autosave indicator "Saved ✓".
D. Editor (after creating): a top status card. Draft state: "Draft · not live yet", the Preview button and the two plan cards. Published state: "Live · Shaadi Plus", the invitation link with Copy, "Share on WhatsApp", "Stays live until 6 Dec 2027" and an "Upgrade" link for Classic. For guest-mode users, a "Private edit link — save this" card with Copy, "Send to my WhatsApp" and "Log in to keep it safe". Below that: the wizard sections as collapsible panels, then the RSVP inbox.
E. Publish / plan picker: a bottom sheet on mobile, a modal on desktop. The two plan cards from pricing, then the Razorpay checkout handoff. Success screen: a confetti burst, the couple's names, "Your invitation is live! 🎉", a big "Share on WhatsApp" button, Copy link, and "Add it to your Instagram story" (a story-sized image).
F. RSVP inbox: summary chips (Attending 142 · Can't make it 9 · Awaiting 61), filters by function, guest cards with name, headcount, functions, food preference and message, and "Export to Excel".

THE INVITATION ("Marigold Mela" template, what guests see, 390px)
1. Cover: a jharokha arch with a toran swinging, "सादर आमंत्रण", the couple's names in script, the parents' lines, "request the pleasure of your company", and a "Tap to open" envelope or curtain reveal with a petal burst.
2. Scratch the gold card to reveal the date, then confetti.
3. Countdown: days / hours / minutes / seconds, with small dancing kids.
4. Our story: a photo slideshow.
5. The functions: one card per function in its colour world, each with date/time/venue, a Maps button, Add to calendar and the dress code.
6. Venue with a map, plus travel and stay.
7. RSVP: name, phone, adults and kids counts, which functions, food preference (veg / Jain / non-veg), a message. The success state reads "Dhanyavaad! See you on the dance floor 💃".
8. Blessings wall: a few approved wishes.
9. Closing: "We can't wait to celebrate with you!" with the couple's names, and a small credit "Made with WebAlchemy Invites — make yours".
Also include a music toggle (bottom-right), a Hindi/English toggle (top-right) and a sticky RSVP button after the cover.

STATUS SCREENS
- Coming soon (draft): "Aarav & Meher's invitation is being lovingly prepared ✨", with a kid peeking from behind a curtain.
- Ended: "This wedding invitation has ended. Thank you for all the love and blessings 💛", with the couple waving from a doli.
- 404: "Lagta hai yeh baraat galat gali mein aa gayi" ("looks like this baraat turned into the wrong lane"), with the groom on a confused ghodi and a "Go home" button.

ACCESSIBILITY & QUALITY BAR
WCAG AA contrast (check marigold on ivory, and put body text on solid colour). Tap targets of at least 44px. Body text at least 16px. Visible focus states. Hindi strings must not break the layout. Everything must work inside the WhatsApp in-app browser. LCP under 2.5s on 4G. Lazy-load the illustrations below the fold.

TECH HANDOFF
This gets built in an existing Next.js 15 App Router project (JavaScript, plain CSS with custom properties, lucide-react icons, no Tailwind). Name components clearly: SiteNav, Toran, PetalRain, Hero, FunctionStrip, HowItWorks, DemoPhone, TemplateGallery, KhandaanSection, RsvpControlRoom, LoginOrGuest, FamilyChatTestimonials, Pricing, Faq, BaraatFooter, LoginCard, InvitationCard, CreateWizard, PlanPicker, PublishSuccess, RsvpInbox. Export tokens as CSS variables and every illustration as an optimised SVG with named layers.
```

---

## Follow-up prompts (paste one at a time, in order)

**1 · Motion spec**
```
Add a motion spec to every screen. For each animation give the trigger, duration, easing, and the reduced-motion fallback. Must-haves:
- the toran unfurls on load (600ms) and sways forever (6s, ease-in-out)
- petals: a sparse rain plus a burst on CTA clicks
- the dhol-wala bobs at 120bpm
- the sangeet card's characters start dancing when it enters the viewport
- the baraat crosses the footer, tied to scroll
- the scratch card actually scratches
- testimonial bubbles appear with typing dots
- the publish success screen gets a confetti cannon
- the invitation cover opens like a curtain
Keep it smooth on mid-range Android.
```

**2 · Mobile pass**
```
Do a dedicated 390px pass of every screen. Sticky bottom CTA on the landing page, swipeable function cards with dots, 1–2 characters per scene so text stays readable, bottom sheets instead of modals, thumb-reachable primary actions. Check the RSVP form and the plan picker inside the WhatsApp in-app browser.
```

**3 · More invitation templates**
```
Using the same component structure as Marigold Mela, design the invitation (cover, scratch card, countdown, functions, RSVP, closing) in 3 more skins:
- Royal Sapphire: midnight blue + gold jharokhas, regal and calm
- Pastel Mehendi: sage, blush and cream with delicate mehendi line art, minimal and modern
- Crimson Royale: deep red + gold, traditional with kalash and shehnai motifs
Show the cover and the functions section of each side by side.
```

**4 · Social & sharing assets**
```
Design the share assets:
(a) a WhatsApp link-preview image, 1200×630, with the couple's names, date and the toran;
(b) an Instagram story, 1080×1920, "We're getting married!", with a "Tap the link" sticker area;
(c) the landing page's own link-preview image.
All three must read clearly at thumbnail size.
```

**5 · Handoff**
```
Prepare the handoff for Claude Code:
- a component list with props
- CSS custom properties for all tokens
- spacing/radius/shadow scales
- every character and ornament as a separately exported, optimised SVG with named layers
- the motion spec as a table
Flag anything that needs a library (for example scroll-linked animation).
```
