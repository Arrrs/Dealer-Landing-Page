# MCP Prompt & Assets — Landing Page for Casino Dealer Coaching

> This single document contains:
> - The full MCP prompt (ready to paste into your code generator) — *the original prompt you asked me to paste*.
> - A ready `.env.example` file
> - Expanded, **detailed English text** for every main section of the landing page (headline, subhead, full body copy, CTAs, FAQ, testimonials, form microcopy, etc.) so you can paste straight into your Next.js components.

---

## FULL PROMPT (paste into MCP / generator)

Build a single-page, mobile-first **Next.js React landing page** for an experienced casino dealer (blackjack, roulette, poker) who now teaches paid coaching. Use **Ant Design** for UI components. Keep code organized, readable and production-minded but minimal — this is a primitive Next.js app intended for Netlify hosting later. Deliver a responsive, attractive design, accessible, performant, and with a clear conversion funnel.

## Project & tech summary
- Framework: Next.js (React) — pages or app router OK.
- UI library: Ant Design (antd) for components and layout.
- Styling: mobile-first CSS, prefer CSS modules or inline Tailwind-like classes — keep Ant Design theme overrides.
- Build target: static export; form posts to Google Apps Script Web App endpoint.
- Hosting: Netlify (static) — no server required.
- Integrations: Google Sheets (via Google Apps Script Web App POST) and Telegram bot notification when new row added.
- Security: include a secret token checked by Apps Script.

## Visual theme / style guide
- Mood: modern, confident, slightly moody (casino feel) — dark charcoal background with warm gold/coral accents, clean white cards for content.
- Primary palette: charcoal `#0f1720`, soft gold `#d9a451`, accent coral `#ff6b6b`, neutral white/grey.
- Fonts: Inter for body, Poppins or Montserrat for headings.
- Spacing: roomy padding on desktop, compact stacked layout on mobile.
- Buttons: clear CTA color (gold), secondary ghost buttons for less-important actions.
- Imagery: hero photo of a confident woman dealer at a casino table (clean, professional), closeup shots of cards, chips, and a remote video lesson thumbnail. Use placeholders and alt text.

## Layout & sections (order and purpose)
1. **Header (sticky on desktop, collapsible on mobile)**  
   - Left: logo (text + small card icon).  
   - Right: nav links (About, Curriculum, Pricing, Testimonials, FAQ, Contact). CTA button: “Book Intro Call”.
2. **Hero**  
   - Big headline: clear value. Short supporting subheading.  
   - Two CTAs: Primary “Join Waitlist” (scrolls to form / open modal), Secondary “See Curriculum” (scrolls to curriculum).  
   - Hero image (right on desktop, stacked on mobile). Quick trust line: “Years as professional dealer — live & online tables”.
3. **What you’ll learn (3–4 key pain-to-benefit tiles)**  
   - Short bullets: Table mechanics, odds & advantage, reading players, bankroll management, live-dealer setups, career paths. Each tile: icon + 1-sentence benefit.
4. **How it works — Format & Guarantees**  
   - Explain 3 delivery options: One-on-one coaching (weekly calls + practice), Small-group cohort (weekly live sessions + community), Self-study with mentor check-ins (future). Include session length and typical timeline (8–12 weeks). Guarantee: “Satisfaction — first 2 sessions refundable” (or soft guarantee).
5. **Curriculum / Roadmap (detailed modules)**  
   - Module list with 6–8 modules, each with 1–3 bullet outcomes. Provide estimated hours.
6. **Pricing & Packages**  
   - 3 columns: Starter (group), Pro (small group), Premium (1:1). Show price placeholder, what’s included, CTA per tier.
7. **Testimonials / Social Proof**  
   - 2–3 placeholder testimonials (text + small avatar + role). Option to add video testimonial.
8. **Instructor bio**  
   - Short concise biography: experience, credibility, picture. CTA: “Book Intro Call”.
9. **FAQ**  
   - Top 6 questions answered concisely.
10. **Final CTA / Lead magnet**  
    - Offer a free 20-minute intro call or a downloadable one-page cheat sheet.
11. **Footer**  
    - Links, legal, small privacy blurb: “Form submissions go to Google Sheet. We never share data.”

## UX & conversion details
- Mobile-first interactions: collapse nav into hamburger; hero CTAs stacked; large tappable buttons.
- Use microcopy: confirm actions, reassure privacy, show small success toast after form submit.
- Focus on frictionless sign-up: only essential fields in primary capture; expand via modal if needed.
- Accessibility: semantic HTML, form labels, focus outlines, ARIA for modal.

## Content / Copy (exact English text — use verbatim)
- Page meta:
  - Title: “Learn To Deal: Live Dealer Coaching for Blackjack, Roulette & Poker”
  - Description: “Practical, mentor-led coaching from a professional casino dealer. One-on-one and small-group paths. Learn table mechanics, game tactics, and live-dealer workflow — fast.”
- Hero:
  - Headline: “From Dealer’s Table To Your Career — Learn Pro Casino Dealing”
  - Subheading: “Hands-on coaching by a seasoned dealer. Live practice, real tips, and step-by-step mentoring — for beginners who want pro results.”
  - Primary CTA: “Join Waitlist”
  - Secondary CTA: “View Curriculum”
- Tiles (What you’ll learn):  
  - Tile 1 title: “Real Table Mechanics” — copy: “Deal like a pro: shuffling, dealing, payouts, edge cases.”  
  - Tile 2 title: “Game Strategy & Flow” — copy: “Master how tables act, reading moments, and smooth dealing.”  
  - Tile 3 title: “Player Interaction” — copy: “Polish communication and floor etiquette for confidence.”  
  - Tile 4 title: “Career Paths” — copy: “Live dealer, online dealer, or casino floor — learn how to apply.”
- Curriculum sample module headings and bullets (use these exact module names):
  - Module 1 — Foundations: rules, payouts, table equipment, chip handling (3–4 hrs). Outcomes: “Deal clean hands, recognize mistakes.”
  - Module 2 — Blackjack Basics & Dealer Protocol (6 hrs). Outcomes: “Deal, manage insurance, splitting & doubling.”
  - Module 3 — Roulette & Wheel Management (4 hrs). Outcomes: “Payouts, table calls, bet types, visual tracking.”
  - Module 4 — Poker Table Management (6 hrs). Outcomes: “Collect antes, manage pots, player interactions.”
  - Module 5 — Live-Dealer Tech & Online Setup (4 hrs). Outcomes: “Camera framing, streaming flow, software basics.”
  - Module 6 — Soft Skills & Career (2–3 hrs). Outcomes: “Player psychology, resumes, interviews.”
- Pricing labels exact: “Starter”, “Pro”, “Premium”
- Form success message: “Thanks — your request was received. We’ll contact you within 48 hours.”

## Final form & modal behavior (required)
- Place final CTA that triggers a **modal** (AntD Modal) with the **capture form**. Also include a small inline compact form in hero for email only (optional).
- Primary capture flow: modal with fields:
  - Full name (required)
  - Email (required)
  - Phone (optional)
  - Preferred course format (dropdown: One-on-one / Small group / Mentor checks)
  - Experience level (radio: Beginner / Some experience / Experienced)
  - Preferred time zone & availability (text)
  - Short message (textarea)
  - Hidden field: `site_token` (client-side env value)
  - Hidden field: `referral` (UTM or source, optional)
- Validation: required fields enforced, email regex, friendly error messages.
- On submit: show spinner → success toast → close modal.

## Data & Google Sheets integration (backend-free)
- Use **Google Apps Script** web app as a webhook endpoint (POST JSON). Provide the Apps Script `doPost(e)` below.
- Form should POST JSON to the Apps Script URL with a secret token: `{name, email, phone, course_format, experience, tz, message, site_token}`.

### Google Sheets columns mapping
Order: Timestamp | Name | Email | Phone | CourseFormat | Experience | TZ | Message | Source | TokenVerified
Example column headers on row 1.

### Google Apps Script (paste into new project, deploy as Web App):
```javascript
// Apps Script: Code.gs
const SHEET_NAME = 'Responses'; // set sheet name
const SECRET = 'REPLACE_WITH_YOUR_SECRET_TOKEN'; // set same token in front-end env

function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const data = JSON.parse(e.postData.contents);
    // simple token check
    if (!data.site_token || data.site_token !== SECRET) {
      return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Invalid token'}))
                           .setMimeType(ContentService.MimeType.JSON);
    }
    const ss = SpreadsheetApp.openById('REPLACE_SPREADSHEET_ID'); // put your spreadsheet id
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    const now = new Date();
    const row = [
      now.toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.course_format || '',
      data.experience || '',
      data.tz || '',
      data.message || '',
      data.source || '',
      'OK'
    ];
    sheet.appendRow(row);

    // Send Telegram notification
    sendTelegramNotification(data);

    lock.releaseLock();
    return ContentService.createTextOutput(JSON.stringify({status: 'ok'}))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendTelegramNotification(data) {
  const TELEGRAM_TOKEN = 'REPLACE_TELEGRAM_BOT_TOKEN';
  const CHAT_ID = 'REPLACE_CHAT_ID';
  const text = Utilities.formatString(
    '*New lead*%sName: %s%sEmail: %s%sFormat: %s%sExperience: %s',
    '\n',
    data.name || '—',
    '\n',
    data.email || '—',
    '\n',
    data.course_format || '—',
    '\n',
    data.experience || '—'
  );
  const payload = {
    method: 'post',
    payload: {
      chat_id: CHAT_ID,
      text: text,
      parse_mode: 'Markdown'
    },
    muteHttpExceptions: true
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage', payload);
}
```

- Deployment steps: File → Deploy → New deployment → Select “Web app”, set access to **Anyone** (or Anyone with link) depending on need; copy URL and use it in front-end.
- Security: replace `SECRET` and Telegram token/chat id. Do not expose those keys in public repos. For static front-end, keep `site_token` in Netlify env and inject at build time or use a short-lived token.

## Front-end example POST (fetch)
```
await fetch('https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    site_token: process.env.NEXT_PUBLIC_SITE_TOKEN,
    name, email, phone, course_format, experience, tz, message, source: 'netlify_landing'
  })
});
```

## Telegram setup notes
- Create bot via @BotFather to get `TELEGRAM_TOKEN`.
- Get Chat ID by messaging bot and using `getUpdates`, or use `@userinfobot`.
- Use Apps Script to POST to Bot API as shown.

## Accessibility & SEO checklist (implement)
- Proper `title`, `meta description`, `og:image`, `og:title`.
- Use `alt` attributes for images; keyboard accessible modal; focus trap in modal.
- Lighthouse score targets: Performance > 70, Accessibility > 90.

## File / component outline (deliverable structure)
- /pages/index.js (or app/page.js): main landing page
- /components/Header.jsx
- /components/Hero.jsx
- /components/FeatureTiles.jsx
- /components/Curriculum.jsx
- /components/Pricing.jsx
- /components/TestimonialSlider.jsx
- /components/InstructorCard.jsx
- /components/FAQ.jsx
- /components/ContactModal.jsx (AntD Modal + Form)
- /lib/api.js (form submit helper)
- /styles/*.module.css
- /public/images/* (placeholders)

## Behavior & small UI details
- Hero CTA scrolls to Curriculum on second CTA; primary opens contact modal.
- Use AntD `Form` with validation; show `notification.success` or `notification.error`.
- After successful submit, disable submit for 10s to avoid duplicates, show small “check email” text.
- Show sample UTM capture if present.
- Include a tiny banner: “Hosted temporarily on Netlify — moving to custom host later.”

## Sample copy for instructor bio (use exact text)
```
[Instructor Name] — Professional Casino Dealer & Live-Dealer Specialist
With several years behind the table (blackjack, roulette, poker) in both land-based and online environments, [Name] turned her expertise into coaching. She teaches practical skills that matter: clean dealing, table control, live-dealer streaming, and how to transition into paid opportunities. Her teaching is hands-on, unforgivingly honest, and built for people who want real results.
```

## Mock images suggestions (for MCP image generator)
- Hero: “confident female casino dealer, professional, modern casino table, neutral background, cinematic lighting, high resolution”
- Curriculum module thumbnails: “hands dealing cards closeup”, “roulette wheel top-down”, “moderately lit chips stack”
- Testimonials: friendly portraits, small studio headshots

## Deliverable expectation for MCP
- Produce a ready-to-run Next.js project skeleton with the components above, Ant Design usage, working modal form wired to a configurable `SUBMIT_URL` env var, and example `.env.example`.
- Include README with Netlify deployment steps and instructions to set up Google Apps Script and Telegram.
- Include the Apps Script code and precise steps to deploy.

## Extra short checklist for you to run after generation
- Replace `REPLACE_SPREADSHEET_ID`, `REPLACE_WITH_YOUR_SECRET_TOKEN`, `REPLACE_TELEGRAM_BOT_TOKEN`, `REPLACE_CHAT_ID`.
- Deploy Apps Script as Web App and copy URL to `NEXT_PUBLIC_SUBMIT_URL` or Netlify env.
- Test form on mobile and desktop, confirm Telegram notification.

---

## .env.example

Create a `.env.example` in the project root and copy the real values into `.env` or set them as Netlify environment variables.

```
# Front-end / build
NEXT_PUBLIC_SUBMIT_URL=https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec
NEXT_PUBLIC_SITE_TOKEN=replace_with_frontend_site_token
NEXT_PUBLIC_APP_NAME=LearnToDeal

# (Optional) Analytics / tracking
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X

# Apps Script / server-side (do NOT commit secrets to public repo)
# These are referenced inside your Google Apps Script; keep them private.
# For security: set these in Apps Script project properties, not in public front-end.
APPS_SCRIPT_SECRET=replace_with_apps_script_secret
TELEGRAM_BOT_TOKEN=replace_with_telegram_bot_token
TELEGRAM_CHAT_ID=replace_with_telegram_chat_id
SPREADSHEET_ID=replace_with_google_spreadsheet_id

# Local dev only
NODE_ENV=development
PORT=3000
```

---

## DETAILED ENGLISH COPY — Full texts for every main section (paste-ready)

> Use these exact texts in components. Headings, subheadings, paragraph copy, CTA labels, alt text, placeholders and small microcopy included.

### 1 — Header
- Logo alt / text: `LearnToDeal — Pro Dealer Coaching`
- Nav links: `About`, `Curriculum`, `Pricing`, `Testimonials`, `FAQ`, `Contact`
- Primary button label: `Book Intro Call`
- Microcopy for header: `Live & online dealer training — honest, practical, fast.`

### 2 — Hero
- Headline: **From Dealer’s Table To Your Career — Learn Pro Casino Dealing**
- Subheading: *Hands-on coaching by a seasoned dealer. Live practice, real tips, and step-by-step mentoring — for beginners who want pro results.*
- Supporting trust line: `Years at live and online tables — real shifts, real pay.`
- Primary CTA: **Join Waitlist** (opens modal)
- Secondary CTA: **View Curriculum** (scrolls to curriculum section)
- Hero image alt text: `Professional female casino dealer dealing cards at a casino table`
- Hero microcopy under CTA: `Limited seats in the first cohort. Free 20-minute intro call for early signups.`

### 3 — What you’ll learn (tiles)
Write each tile as Title + 1-sentence benefit + 1-line micro example.

- **Real Table Mechanics**
  - *Deal like a pro: shuffling, dealing, payouts, edge cases.*
  - Micro: `Learn the exact hand motions and checks dealers use to avoid mistakes.`

- **Game Strategy & Flow**
  - *Master how tables act, reading moments, and smooth dealing.*
  - Micro: `Recognize tempo, handle busy hands, avoid bottlenecks.`

- **Player Interaction**
  - *Polish communication and floor etiquette for confidence.*
  - Micro: `Confident table talk, handling disputes, and subtle crowd control.`

- **Career Paths**
  - *Live dealer, online dealer, or casino floor — learn how to apply.*
  - Micro: `CV tips, interviewing, where to find paid roles.`

### 4 — How it works — Format & Guarantees
- Section intro: `Three guided formats — choose the pace and intensity that fit you.`

- **One-on-one (Premium)**
  - Short summary: `Weekly 60–90 minute live coaching calls, personalized drills, and direct feedback. Best for fast progress and career transition.`
  - Timeline: `Typical plan: 8–12 weeks.`

- **Small Group (Pro)**
  - Short summary: `Groups of 4–8 students, weekly live sessions with guided practice and community support.`
  - Timeline: `8–12 weeks with cohort practice sessions.`

- **Mentor-checked Self-study (Starter — future)**
  - Short summary: `Self-paced learning with periodic mentor reviews and monthly group Q&A.`
  - Timeline: `Flexible.`

- **Guarantee**
  - `If you try the first two sessions and don’t find them useful, contact us for a partial refund or reschedule — we want students who get results.`

### 5 — Curriculum / Roadmap (expanded)
Lead paragraph: `Clear, modular curriculum. Each module has short practical exercises and a real-time practice session.`

- **Module 1 — Foundations** (3–4 hrs)
  - Copy: `Rules and payouts for blackjack, roulette and poker. Table equipment, basic chip handling and clean dealing drills.`
  - Outcomes: `Deal clean hands, recognize table mistakes, basic math checks.`

- **Module 2 — Blackjack Basics & Dealer Protocol** (6 hrs)
  - Copy: `Insurance, blackjack payouts, splitting and doubling rules. Dealer-specific protocols and error handling.`
  - Outcomes: `Deal, manage insurance, spot payout edge-cases.`

- **Module 3 — Roulette & Wheel Management** (4 hrs)
  - Copy: `Payout tables, wheel calls, bet types, tracking visual indicators. Handling disputes and lost chips.`
  - Outcomes: `Perform correct payouts and run efficient wheel cycles.`

- **Module 4 — Poker Table Management** (6 hrs)
  - Copy: `Collecting antes, managing pots, proper chip moves, common fouls and dealer wording.`
  - Outcomes: `Run a clean poker round under pressure.`

- **Module 5 — Live-Dealer Tech & Online Setup** (4 hrs)
  - Copy: `Camera framing, audio, basic streaming software, latency handling, and player-facing overlays.`
  - Outcomes: `Set up a professional live-dealer stream or assist one.`

- **Module 6 — Soft Skills & Career** (2–3 hrs)
  - Copy: `Player psychology, floor etiquette, building a CV, where to look for roles, interview prep.`
  - Outcomes: `Present yourself professionally and land interviews.`

- **Capstone** (Optional)
  - Copy: `Final practical session with live simulated shifts and instructor feedback.`
  - Outcomes: `Demonstrate readiness to work a live or online table.`

### 6 — Pricing & Packages (text for each card)
- **Starter** (Group)
  - Price line: `From $199` (replaceable)
  - Short: `Group cohorts, weekly sessions, community support, mentor checks.`
  - CTA: `Join Starter` (opens payment / sign-up flow)

- **Pro** (Small Group)
  - Price line: `From $499` (replaceable)
  - Short: `Smaller groups, extra practice time, prioritized feedback.`
  - CTA: `Join Pro`

- **Premium** (1:1)
  - Price line: `From $1299` (replaceable)
  - Short: `Personalized lessons, recorded sessions, CV review and interview prep.`
  - CTA: `Book Premium`

Pricing microcopy: `Prices are introductory and may change. Contact us for scholarships or payment plans.`

### 7 — Testimonials / Social Proof
- Testimonial template (quote + meta):
  - Quote: `"I went from zero to confidently dealing live tables in six weeks. The instructor doesn't sugarcoat anything — she shows what works."`
  - Meta: `— Anna P., Live Dealer (graduated cohort)`

- Another testimonial:
  - Quote: `"Practical, fast, and directly applicable. Real drills, real corrections — worth every cent."`
  - Meta: `— Mark S., Casino floor staff`

- Video testimonial microcopy: `See a short video from a recent student (30s).`

### 8 — Instructor bio (expanded)
- Name + title: `[Instructor Name] — Professional Casino Dealer & Live-Dealer Specialist`
- Full bio text (use exact):
  - `[Instructor Name] started as a floor dealer and spent several years across live and online tables mastering blackjack, roulette and poker. Training on the job was fast and unforgiving; formal courses were scarce and expensive. Having navigated the real-world learning path, she now helps motivated students learn the right skills quickly — from clean dealing to streaming setups and career transitions. Her coaching is direct, practical, and focused on outcomes.`
- CTA under bio: `Book an intro call — see if coaching fits your goals.`

### 9 — FAQ (six Q&A)
- Q1: `Do I need experience to join?`
  - A1: `No. Most students start with little to no experience. We begin with fundamentals and practical drills.`
- Q2: `How long before I can work?`
  - A2: `Typical timeline is 8–12 weeks for a confident, working baseline — it depends on practice and prior skill.`
- Q3: `Do you provide a certificate?`
  - A3: `We provide a completion record and recorded sessions; formal casino certificates vary by region.`
- Q4: `Is this legal / ethical?`
  - A4: `Yes. This is training and career coaching for regulated dealer roles. We do not teach cheating or exploitative behavior.`
- Q5: `How are payments handled?`
  - A5: `Payments via Stripe or bank transfer (details provided at checkout). Custom plans available.`
- Q6: `What if I miss a session?`
  - A6: `Sessions are recorded when possible; reschedules allowed within reason.`

### 10 — Final CTA / Lead magnet
- Headline: `Ready to start? Book a free 20‑minute intro call.`
- Sub: `Short call to assess skill level and recommend the best plan — no pressure.`
- Button: `Book Free Call` (opens scheduler or contact modal)
- Lead magnet microcopy: `Download a 1-page cheat sheet: "5 Dealer Moves That Look Professional" after you sign up.`

### 11 — Footer
- Short links: `Privacy`, `Terms`, `Contact`, `Sitemap`
- Small privacy blurb: `Form submissions are saved to Google Sheets used for course administration. We do not sell your data.`
- Copyright: `© [Year] LearnToDeal — All rights reserved.`

---

## Form microcopy & emails

- Form field placeholders (exact):
  - Full name: `Your full name`
  - Email: `Your email address`
  - Phone: `Phone (optional)`
  - Preferred format: `Choose a format`
  - Experience level: `Select experience level`
  - Timezone & availability: `e.g. Europe/Kyiv — evenings UTC+2`
  - Short message: `Tell us your goal in 1-2 sentences`

- Submit button: `Send Request`

- On-submit toast: `Thanks — your request was received. We’ll contact you within 48 hours.`

- Auto-response email subject: `Thanks for your interest — LearnToDeal intro`
  - Auto-response body (short):
```
Hi {name},

Thanks for your interest in LearnToDeal. We received your request and will contact you within 48 hours to schedule a short intro call. If you don’t see an email from us, check your spam folder or reply to this message.

Best,
[Instructor Name]
LearnToDeal
```

---

## Implementation notes (quick)
- Use AntD Modal + Form components. Keep form submission to `NEXT_PUBLIC_SUBMIT_URL`.
- Hide the real secret; use `NEXT_PUBLIC_SITE_TOKEN` for simple checking.
- Keep images in `/public/images` with descriptive names and alt attributes.

---

End of Prompt.md


