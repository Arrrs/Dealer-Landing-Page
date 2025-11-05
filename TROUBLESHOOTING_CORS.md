# CORS Troubleshooting Guide

## Common CORS Issues & Solutions

### Issue 1: Using Old Deployment URL
**Symptom:** CORS error even after redeploying
**Cause:** You're still using the URL from the first deployment
**Solution:**
1. Google Apps Script → Deploy → Manage deployments
2. Copy the CURRENT deployment URL
3. Update `.env.local` with new URL
4. Restart dev server: Kill and run `npm run dev` again

### Issue 2: Didn't Create NEW Deployment
**Symptom:** Changes to Google Apps Script not taking effect
**Cause:** Clicked "Save" but didn't deploy
**Solution:**
1. After saving changes in Google Apps Script
2. Click Deploy → **New deployment** (NOT Manage deployments)
3. Choose "Web app"
4. Description: "v2 with CORS headers"
5. Execute as: "Me"
6. Who has access: "Anyone"
7. Click "Deploy"
8. Copy the NEW URL

### Issue 3: Wrong Access Setting
**Symptom:** CORS error or "Authorization required"
**Cause:** "Who has access" is not set to "Anyone"
**Solution:**
1. Deploy → Manage deployments
2. Click edit (pencil icon) on your deployment
3. Under "Who has access" select **"Anyone"**
4. Click "Deploy"

### Issue 4: Dev Server Not Restarted
**Symptom:** Changes to `.env.local` not taking effect
**Cause:** Next.js caches environment variables on startup
**Solution:**
```bash
# Find and kill the dev server
lsof -ti:3000 | xargs kill -9

# Restart
npm run dev
```

### Issue 5: Browser Cache
**Symptom:** Still seeing old errors
**Cause:** Browser cached the failed request
**Solution:**
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Or open in incognito/private window

### Issue 6: Missing doOptions Function
**Symptom:** CORS preflight fails
**Cause:** Google Apps Script doesn't have `doOptions()` function
**Solution:**
- Check your Code.gs has both:
  - `function doOptions(e) { ... }`
  - `function doPost(e) { ... }`
- Redeploy after adding `doOptions()`

---

## How to Test Google Apps Script Directly

### Test 1: Check if Script is Accessible
```bash
# Try accessing the script URL in browser
# Should return error (no token) but proves it's accessible
```
Open in browser: `YOUR_SCRIPT_URL`

Expected response:
```json
{"status":"error","message":"Invalid token"}
```

If you get this, the script is working!

### Test 2: Test with curl (Linux/Mac)
```bash
curl -X POST "YOUR_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"site_token":"32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=","name":"Test","email":"test@test.com","course_format":"One-on-one","experience":"Beginner"}'
```

Expected response:
```json
{"status":"ok"}
```

### Test 3: Check CORS Headers
```bash
curl -X OPTIONS "YOUR_SCRIPT_URL" -i
```

Expected headers in response:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Quick Deployment Checklist

- [ ] Code.gs has `doOptions()` function
- [ ] Code.gs has CORS headers in all responses
- [ ] Saved the code in Google Apps Script
- [ ] Deployed (not just saved!)
- [ ] "Who has access" set to "Anyone"
- [ ] Copied the deployment URL
- [ ] Updated `.env.local` with new URL
- [ ] Removed quotes from token if any: `32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=`
- [ ] Killed dev server process
- [ ] Restarted: `npm run dev`
- [ ] Cleared browser cache / hard refresh

---

## Debugging Steps

### 1. Check Browser Console
Open DevTools (F12) → Console tab

**Look for:**
```
Access to fetch at 'https://script.google.com/...' has been blocked by CORS policy
```

**If you see this:**
- Google Apps Script deployment issue
- Check "Who has access" setting
- Verify `doOptions()` exists

### 2. Check Network Tab
DevTools → Network tab → Try form submission

**Look for:**
1. **OPTIONS request** (preflight)
   - Should return 200 status
   - Should have CORS headers in response

2. **POST request** (actual submission)
   - Should return 200 status
   - Should have CORS headers in response

**If OPTIONS fails:**
- `doOptions()` function missing or not deployed

**If POST fails:**
- Check token matches
- Check request body has `site_token`

### 3. Check Google Apps Script Logs
1. Google Apps Script → Run → Select `testSetup`
2. Click "Run"
3. View → Logs

Should see:
```
{"status":"ok"}
```

If error, check:
- Spreadsheet ID correct?
- Sheet name matches?
- Telegram token valid?

---

## Environment Variable Format

### Correct `.env.local`:
```env
NEXT_PUBLIC_SUBMIT_URL=https://script.google.com/macros/s/AKfycby.../exec
NEXT_PUBLIC_SITE_TOKEN=32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=
```

### Common Mistakes:
```env
# ❌ Wrong - has quotes
NEXT_PUBLIC_SITE_TOKEN="32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU="

# ❌ Wrong - missing =
NEXT_PUBLIC_SITE_TOKEN: 32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=

# ✅ Correct
NEXT_PUBLIC_SITE_TOKEN=32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=
```

---

## Still Having Issues?

### Share this information:
1. Exact CORS error from browser console
2. Google Apps Script deployment URL (first 50 chars)
3. Screenshot of "Manage deployments" screen
4. Result of curl test (if comfortable running it)

### Last Resort: Create Fresh Deployment
1. In Google Apps Script: Deploy → Manage deployments
2. Archive old deployment
3. Create completely new deployment
4. Update `.env.local` with new URL
5. Restart everything
