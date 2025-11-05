# Architecture Overview

## Current Architecture (Static Export)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  USER'S BROWSER                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │  Static HTML/CSS/JS from Netlify CDN                         │  │
│  │  (No server, just files)                                     │  │
│  │                                                              │  │
│  │  1. User fills form                                          │  │
│  │  2. JavaScript runs in browser                               │  │
│  │  3. fetch() sends data to Google Apps Script                 │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                  (HTTPS POST with CORS headers)
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  GOOGLE APPS SCRIPT (Google's Servers)                             │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │  1. Receives POST request                                    │  │
│  │  2. Validates security token                                 │  │
│  │  3. Writes to Google Sheets                                  │  │
│  │  4. Sends Telegram notification                              │  │
│  │  5. Returns success/error                                    │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
          ┌──────────────────┐  ┌──────────────────┐
          │  Google Sheets   │  │  Telegram Bot    │
          │  (Data Storage)  │  │  (Notifications) │
          └──────────────────┘  └──────────────────┘
```

## Why This Works (No CORS Issues)

### CORS Headers Flow:

```
Browser (localhost:3000)
    ↓
    Sends OPTIONS request (preflight)
    ↓
Google Apps Script
    ↓
    Responds with: Access-Control-Allow-Origin: *
    ↓
Browser: ✅ "OK, CORS allowed"
    ↓
    Sends actual POST request
    ↓
Google Apps Script
    ↓
    Processes data + responds with CORS headers
    ↓
Browser: ✅ Receives response
```

### Key Functions in Google Apps Script:

1. **doOptions()** - Handles CORS preflight requests
2. **doPost()** - Handles actual form submissions
3. All responses include CORS headers

---

## What Runs Where

### On Netlify (Static Files Only):
```
✅ HTML (built from React components)
✅ CSS (from Ant Design + custom styles)
✅ JavaScript (React + form logic)
❌ NO server-side code
❌ NO API routes
❌ NO backend processing
```

### On Google's Servers:
```
✅ Google Apps Script (server-side JavaScript)
✅ Data validation
✅ Google Sheets writes
✅ Telegram API calls
✅ CORS header management
```

### In Browser:
```
✅ Form rendering (React components)
✅ Form validation (Ant Design Form)
✅ HTTP requests (fetch API)
✅ Notifications (Ant Design notification)
```

---

## Data Flow Example

User submits form:

```javascript
// 1. Browser (lib/api.js)
export async function submitContactForm(formData) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SUBMIT_URL,  // Google Apps Script URL
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        site_token: process.env.NEXT_PUBLIC_SITE_TOKEN
      })
    }
  )
  return response.json()
}

// 2. Google Apps Script (Code.gs)
function doPost(e) {
  const data = JSON.parse(e.postData.contents)

  // Validate token
  if (data.site_token !== SECRET) {
    return error('Invalid token')
  }

  // Write to sheet
  sheet.appendRow([data.name, data.email, ...])

  // Send Telegram
  sendTelegramNotification(data)

  return success()
}
```

---

## Alternative Architectures (Not Used)

### Option A: Next.js with API Routes
```
Browser → Netlify Functions → Google Sheets
```
**Why not:**
- More expensive (serverless function costs)
- More complex deployment
- Slower (extra hop)

### Option B: Next.js Server-Side
```
Browser → Node.js Server → Google Sheets
```
**Why not:**
- Need to run a server 24/7
- More expensive hosting
- Server maintenance required

### Option C: Direct Google Sheets API
```
Browser → Google Sheets API
```
**Why not:**
- Exposes API credentials in browser
- Security risk
- No custom validation logic

---

## Security Model

### Token Protection:
```
Frontend (.env.local):
  NEXT_PUBLIC_SITE_TOKEN="secret123"

Backend (Google Apps Script):
  const SECRET = "secret123"

Validation:
  if (request.token !== SECRET) reject()
```

### Why This Is Secure:
1. Token is validated server-side (Google Apps Script)
2. Even if someone sees the token in browser JS, they can only submit forms
3. Rate limiting can be added to Google Apps Script
4. Token can be rotated anytime (change in both places)
5. Google Sheet and Telegram tokens never exposed to browser

---

## Environment Variables

### Build-time variables (embedded in JS):
```bash
NEXT_PUBLIC_SUBMIT_URL      # Google Apps Script URL
NEXT_PUBLIC_SITE_TOKEN      # Security token
```

**Note:** Anything with `NEXT_PUBLIC_` prefix is embedded in the JavaScript bundle and visible to users. That's okay for URLs and validation tokens, but never use for secrets like API keys!

### Runtime-only (Google Apps Script):
```javascript
const SECRET                # Validation token (server-side only)
const TELEGRAM_TOKEN        # Never exposed to browser
const SPREADSHEET_ID        # Never exposed to browser
```

---

## Deployment Pipeline

```
1. Code changes
        ↓
2. Git commit & push to GitHub
        ↓
3. Netlify detects push
        ↓
4. Netlify runs: npm run build
        ↓
5. Next.js generates static files → out/
        ↓
6. Netlify deploys out/ to CDN
        ↓
7. Site live at *.netlify.app
```

**Total time:** 1-2 minutes ⚡

---

## Cost Breakdown

### Free Tier (What you're using):
- **Netlify:** 100GB bandwidth/month, unlimited builds
- **Google Apps Script:** Free (up to quotas)
- **Google Sheets:** Free (up to 5M cells)
- **Telegram Bot API:** Free

### Paid tier (if needed later):
- **Netlify Pro:** $19/month (400GB bandwidth, priority builds)
- **Google Workspace:** If you need more Sheets storage
- **Telegram:** Always free

**Your expected cost:** $0/month ✅

---

## Performance

### Static Site Benefits:
- **First Load:** ~500ms (HTML + CSS + JS from CDN)
- **Form Submit:** ~1-2s (Google Apps Script processing)
- **CDN:** Files served from nearest edge location
- **No cold starts:** Unlike serverless functions

### Scalability:
- **Concurrent users:** Unlimited (static files)
- **Form submissions:** Limited by Google Apps Script quotas
- **Google Apps Script limit:** ~20 calls/second per script

---

This architecture is perfect for a landing page with form submissions!
