# Netlify Deployment via GitHub

## Prerequisites
- [x] Google Apps Script deployed and URL copied
- [ ] GitHub repository created
- [ ] Code pushed to GitHub

## Step 1: Get Your Google Apps Script URL

If you already deployed it, get the URL:

1. Go to https://script.google.com
2. Open your project
3. Click **Deploy** → **Manage deployments**
4. Copy the **Web app URL** (ends with `/exec`)

Example: `https://script.google.com/macros/s/AKfycby9A1QL7NiCZn-p-5nkaYV5owINUyNf6Rng_RmYuwCEooUaUFoVTEDMFgQ9nXR9Mt-o/exec`

## Step 2: Initialize Git (if not done)

```bash
cd /home/ars/Dev/dealerPage

# Check if already initialized
git status

# If not initialized:
git init
git add .
git commit -m "Initial commit: Casino dealer training landing page"
git branch -M main
```

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `dealer-page` (or your choice)
3. Keep it **Private** (your credentials are in comments, not in code, but still)
4. **DO NOT** add README, .gitignore, or license (you already have them)
5. Click **Create repository**

## Step 4: Push to GitHub

GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/dealer-page.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 5: Connect to Netlify

1. Go to https://app.netlify.com
2. Click **Add new site** → **Import an existing project**
3. Click **GitHub** (authorize if first time)
4. Find and select your `dealer-page` repository
5. Configure build settings:
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
   - **Base directory:** (leave empty)

6. Click **Show advanced** → **Add environment variable**

   Add these TWO variables:

   **Variable 1:**
   - Key: `NEXT_PUBLIC_SUBMIT_URL`
   - Value: `YOUR_GOOGLE_SCRIPT_URL` (the one you copied in Step 1)

   **Variable 2:**
   - Key: `NEXT_PUBLIC_SITE_TOKEN`
   - Value: `32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=`

7. Click **Deploy site**

## Step 6: Wait for Deploy

- Watch the deploy logs
- Should take 1-2 minutes
- You'll see: "Site is live" when done

## Step 7: Test Your Live Site

1. Click on your site URL (e.g., `random-name-123.netlify.app`)
2. Open the form (Join Waitlist button)
3. Fill out and submit
4. Check:
   - ✅ Success notification appears
   - ✅ Data in Google Sheet
   - ✅ Telegram notification received

## Step 8: (Optional) Custom Domain

If you want a custom domain:

1. In Netlify: **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `learntodeal.com`)
4. Follow DNS instructions

---

## Future Updates

After you make changes to your code:

### For Frontend Changes:
```bash
git add .
git commit -m "Description of changes"
git push
```

Netlify will automatically rebuild and deploy! 🎉

### For Google Apps Script Changes:
1. Edit the code in Google Apps Script editor
2. Click **Save**
3. Click **Deploy** → **Manage deployments**
4. Edit your deployment → **New version** → **Deploy**
5. URL stays the same, no need to update Netlify!

---

## Troubleshooting

### Build fails on Netlify:

Check the deploy logs. Common issues:
- Missing dependencies: Clear cache and redeploy
- Environment variables: Make sure both are set

### Form still has CORS errors:

1. Check Google Apps Script has `doOptions()` function
2. Verify you redeployed after adding CORS headers
3. Check "Who has access" is set to "Anyone"

### Data not appearing in sheet:

1. Check environment variables in Netlify match Google Script
2. Verify token is identical in both places
3. Check Google Apps Script execution logs

### Site shows old version:

- Clear deploy cache in Netlify
- Hard refresh browser (Ctrl+Shift+R)
- Check correct branch is deploying

---

## Environment Variables Reference

These must be set in Netlify (Site settings → Environment variables):

```
NEXT_PUBLIC_SUBMIT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_SITE_TOKEN=32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=
```

**IMPORTANT:** Environment variables are only loaded during build time. If you change them, you must trigger a new deploy:
- Deploys → Trigger deploy → Clear cache and deploy site

---

## Security Checklist

- [x] `.env.local` is in `.gitignore` (never committed)
- [x] Sensitive tokens only in environment variables (not in code)
- [x] Google Apps Script credentials only in Google Apps Script
- [x] Repository can be private on GitHub
- [x] Netlify env vars marked as "Sensitive" (they are by default)

---

## Your Current Configuration

**Google Apps Script:**
- Sheet: "Dealer Page - Leads"
- Token: `32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=`
- Spreadsheet ID: `1ZSvCcDzFVKMkUpgl8P2nXIJrwbqbiaOUTpSa_jXMD5I`

**Netlify Build:**
- Build command: `npm run build`
- Publish directory: `out`
- Node version: Auto-detected from package.json

Good luck with deployment! 🚀
