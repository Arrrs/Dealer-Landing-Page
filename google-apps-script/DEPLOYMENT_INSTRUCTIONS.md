# Google Apps Script Deployment Instructions

## The CORS Issue

You're experiencing CORS errors because Google Apps Script Web Apps have specific deployment requirements for cross-origin requests from browsers.

## Critical Deployment Settings

When deploying your Google Apps Script, you **MUST** use these exact settings:

1. **Execute as:** `Me (your-email@gmail.com)`
2. **Who has access:** `Anyone`

## Step-by-Step Deployment

### 1. Open Google Apps Script Editor
- Go to https://script.google.com
- Open your project or create a new one
- Paste the code from `Code-WORKING.gs`

### 2. Deploy as Web App
- Click **Deploy** → **New deployment**
- Click the gear icon (⚙️) next to "Select type"
- Select **Web app**

### 3. Configure Deployment Settings
**IMPORTANT:** Use these exact settings:

```
Description: LearnToDeal Form Handler v1
Execute as: Me (your-email@gmail.com)
Who has access: Anyone
```

###  4. Click "Deploy"
- Authorize the script if prompted
- **Copy the "Web app URL"** - it should look like:
  ```
  https://script.google.com/macros/s/AKfycby.../exec
  ```

### 5. Update Your `.env.local`
Replace the URL in your `.env.local` with the new deployment URL:

```env
NEXT_PUBLIC_SUBMIT_URL=https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_ID/exec
```

## Testing the Deployment

### Test 1: Direct curl POST (should work)
```bash
curl -X POST https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec \
  -H "Content-Type: application/json" \
  -d '{
    "site_token": "32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "course_format": "One-on-one",
    "experience": "Beginner",
    "tz": "UTC+2",
    "message": "Test message",
    "source": "test"
  }'
```

Expected response:
```json
{"status":"ok"}
```

### Test 2: Browser OPTIONS request (CORS preflight)
```bash
curl -X OPTIONS https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**Expected:** Should return headers including:
```
access-control-allow-origin: *
access-control-allow-methods: GET, POST, OPTIONS
```

## Common Issues

### Issue 1: "Script function not found: doGet"
**Solution:** Make sure you have both `doGet()` and `doPost()` functions in your script.

### Issue 2: CORS error in browser but curl works
**Cause:** Google Apps Script doesn't properly handle browser preflight (OPTIONS) requests.

**Solutions:**
1. **Re-deploy with correct settings** (Execute as: Me, Who has access: Anyone)
2. **Create a new deployment** (not just a new version) and use the new URL
3. **Use the alternative JSONP approach** (see below)

### Issue 3: HTTP 302 redirect
**This is normal!** Google Apps Script redirects POST requests to a cached response URL. The CORS headers should still be present in the 302 response.

## Alternative: JSONP Approach (if CORS still fails)

If CORS continues to fail, you can use JSONP by modifying the Google Apps Script:

```javascript
function doGet(e) {
  const callback = e.parameter.callback || 'callback';
  const data = {
    status: 'info',
    message: 'Use POST for form submission'
  };
  return ContentService
    .createTextOutput(callback + '(' + JSON.stringify(data) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
```

And in your frontend, use a script tag instead of fetch.

## Verification Checklist

- [ ] Code is copied from `Code-WORKING.gs`
- [ ] Deployed with "Execute as: Me"
- [ ] Deployed with "Who has access: Anyone"
- [ ] Web app URL is copied (ends with `/exec`)
- [ ] URL is updated in `.env.local`
- [ ] Dev server restarted after updating `.env.local`
- [ ] curl POST test returns `{"status":"ok"}`
- [ ] Google Sheet receives test data
- [ ] Telegram notification received

## Current Deployment Status

Your current deployment URL:
```
https://script.google.com/macros/s/AKfycbyJ4rmKmE3ejQzn4cDYVw48MbdKVYd3gVCJ--BuDCgazPApn9TqNIafyDOvlXzS-mU/exec
```

**Action Required:**
1. Copy the code from `Code-WORKING.gs` (simplified version without invalid `.setHeaders()` calls)
2. Create a **new deployment** (not just a new version)
3. Update `.env.local` with the new URL
4. Restart your dev server
5. Test in browser
