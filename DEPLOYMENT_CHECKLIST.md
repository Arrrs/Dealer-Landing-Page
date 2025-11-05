# Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

- [x] Google Apps Script has CORS headers (`doOptions()` function)
- [x] `.env.local` exists with correct token
- [x] `.gitignore` includes `.env.local`
- [ ] Google Apps Script deployed to Google
- [ ] Google Script URL updated in `.env.local`
- [ ] Form tested locally and working
- [ ] Build runs successfully (`npm run build`)

## 🚀 Deployment Order (IMPORTANT!)

### 1. Deploy Google Apps Script FIRST

**Why first?** You need the Google Script URL for your frontend environment variables.

1. Go to https://script.google.com
2. New Project
3. Paste code from `google-apps-script/Code.gs`
4. Deploy → New deployment → Web app
5. Settings:
   - Execute as: "Me"
   - Who has access: "Anyone"
6. Copy the deployment URL (ends with `/exec`)

### 2. Update Your Environment

Update `.env.local` with the new URL:
```env
NEXT_PUBLIC_SUBMIT_URL=https://script.google.com/macros/s/YOUR_NEW_SCRIPT_ID/exec
NEXT_PUBLIC_SITE_TOKEN="32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU="
```

### 3. Test Locally

```bash
# Kill current dev server
# Then restart it to load new env vars
npm run dev
```

Test the form submission - it should now work without CORS errors!

### 4. Build for Production

```bash
npm run build
```

This creates the `out/` directory with your static site.

### 5. Deploy to Netlify

**Option A - Drag & Drop (Easiest for first time):**
1. Go to https://app.netlify.com/drop
2. Drag the `out/` folder onto the page
3. Site is live!
4. Go to Site settings → Environment variables
5. Add your two environment variables
6. Trigger a rebuild: Deploys → Trigger deploy

**Option B - CLI (Better for updates):**
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```
When prompted:
- Publish directory: `out`

Then add environment variables in Netlify dashboard.

**Option C - GitHub (Best for continuous deployment):**
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Then in Netlify:
- New site → Import from Git → GitHub
- Select your repo
- Build command: `npm run build`
- Publish directory: `out`
- Add environment variables before deploying

## 📋 After Deployment

### Add Environment Variables in Netlify
1. Site settings → Environment variables
2. Add these (mark as sensitive):
   - `NEXT_PUBLIC_SUBMIT_URL` = (your Google Script URL)
   - `NEXT_PUBLIC_SITE_TOKEN` = `32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=`
3. Trigger redeploy

### Test Production Site
1. Visit your Netlify URL
2. Test form submission
3. Check Google Sheet for data
4. Check Telegram for notification

## 🔒 Security Verification

- [ ] `.env.local` NOT in git (`git status` should not show it)
- [ ] Google Apps Script credentials are only in Google Apps Script
- [ ] Netlify environment variables are marked "Sensitive"
- [ ] Token in `.env.local` matches token in Google Apps Script

## 🎯 Your Current Configuration

**Google Apps Script Settings:**
- Sheet name: `Dealer Page - Leads`
- Token: `32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=`
- Spreadsheet ID: `1ZSvCcDzFVKMkUpgl8P2nXIJrwbqbiaOUTpSa_jXMD5I`
- Telegram Chat ID: `321841339`

## ⚠️ Common Issues

**CORS errors:**
- Make sure Google Apps Script has `doOptions()` function
- Redeploy Google Script if you made changes
- Check "Who has access" is set to "Anyone"

**Form not submitting:**
- Check `NEXT_PUBLIC_SUBMIT_URL` in Netlify env vars
- Verify token matches between frontend and Google Script
- Check browser console for errors

**Data not in sheet:**
- Verify spreadsheet ID in Google Apps Script
- Check sheet name is exactly "Dealer Page - Leads"
- Test Google Script directly using `testSetup()` function

## 📞 Need Help?

See full details in [DEPLOYMENT.md](./DEPLOYMENT.md)
