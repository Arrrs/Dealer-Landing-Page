# CORS Solution: Netlify Function Proxy

## The Problem

Google Apps Script Web Apps **do not support CORS preflight (OPTIONS) requests** from browsers, even when deployed with "Anyone" access. This causes CORS errors when trying to submit forms from a browser.

### Why curl works but browsers don't

- **curl**: Sends a direct POST request without preflight ✅
- **Browsers**: Send an OPTIONS preflight request first ❌ (Google Apps Script returns 405 Method Not Allowed)

## The Solution

Use a **Netlify Function** as a proxy between your static site and Google Apps Script. The Netlify Function handles CORS properly and proxies requests to Google Apps Script server-side.

### Architecture

```
Browser → Netlify Function → Google Apps Script → Google Sheets + Telegram
         (handles CORS)      (no CORS issues)
```

## Implementation

### 1. Netlify Function ([netlify/functions/submit.js](netlify/functions/submit.js))

Handles CORS preflight and proxies requests to Google Apps Script.

### 2. Updated API Client ([lib/api.js](lib/api.js))

- **Production (Netlify)**: Uses `/.netlify/functions/submit`
- **Development (localhost)**: Uses direct Google Apps Script URL (CORS will fail in browser, but works in production)

### 3. Configuration Files

- **netlify.toml**: Netlify build and function configuration
- **package.json**: Added `dev:netlify` script for local testing with Netlify Dev

## Testing Locally with Netlify Dev

Netlify Dev simulates the production environment locally, including Netlify Functions.

### Stop the current dev server

```bash
lsof -ti:3000 -ti:3001 | xargs kill -9
```

### Start Netlify Dev

```bash
npm run dev:netlify
```

This will:
- Start Next.js dev server
- Start Netlify Functions locally at `http://localhost:8888/.netlify/functions/`
- Proxy requests properly

### Test the form

1. Open http://localhost:8888 (NOT localhost:3000 or 3001)
2. Fill out and submit the contact form
3. Should work without CORS errors!

## Production Deployment

When you deploy to Netlify:

1. The static site is deployed to Netlify's CDN
2. Netlify Functions are deployed automatically
3. Forms submit to `/.netlify/functions/submit`
4. The function proxies to Google Apps Script
5. Everything works without CORS issues!

## Environment Variables on Netlify

Make sure to add these in your Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add:
   - `NEXT_PUBLIC_SUBMIT_URL`: Your Google Apps Script Web App URL
   - `NEXT_PUBLIC_SITE_TOKEN`: Your secret token (same as in Google Apps Script)
   - `NEXT_PUBLIC_APP_NAME`: LearnToDeal

## Files Created/Modified

### New Files
- `netlify/functions/submit.js` - Netlify Function proxy
- `netlify.toml` - Netlify configuration
- `CORS_SOLUTION.md` - This document

### Modified Files
- `lib/api.js` - Updated to use Netlify Function in production
- `package.json` - Added `dev:netlify` script

## Verification

✅ Google Apps Script is working (confirmed with manual test)
✅ Telegram notifications are working
✅ Google Sheets is being updated
✅ CORS issue identified (OPTIONS request returns 405)
✅ Solution implemented (Netlify Function proxy)

## Next Steps

1. **Test locally**: Run `npm run dev:netlify` and test the form at http://localhost:8888
2. **Deploy to Netlify**: Follow [NETLIFY_GITHUB_DEPLOY.md](NETLIFY_GITHUB_DEPLOY.md)
3. **Add environment variables** in Netlify dashboard
4. **Test in production**: Submit a test form after deployment

## Troubleshooting

### Local testing shows CORS errors
- Make sure you're running `npm run dev:netlify`, not `npm run dev`
- Access the site at `http://localhost:8888`, not `localhost:3000`

### Production deployment shows 404 for Netlify Function
- Check that `netlify.toml` is in the root directory
- Verify environment variables are set in Netlify dashboard
- Check Netlify Function logs in Netlify dashboard

### Form submissions not reaching Google Sheets
- Check Netlify Function logs
- Verify Google Apps Script is still deployed and accessible
- Test Google Apps Script directly with curl
