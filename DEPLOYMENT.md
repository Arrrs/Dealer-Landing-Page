# Deployment Guide

## Step 1: Deploy Google Apps Script

1. **Open Google Apps Script**
   - Go to https://script.google.com
   - Click "New Project"

2. **Paste the Code**
   - Copy all code from `google-apps-script/Code.gs`
   - Paste it into the script editor
   - Your credentials are already in the file (SECRET, TELEGRAM_TOKEN, etc.)

3. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Click gear icon → Select "Web app"
   - Settings:
     - Description: "Dealer Page Form Handler v1"
     - Execute as: "Me"
     - Who has access: **"Anyone"** (important!)
   - Click "Deploy"
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)" (it's safe, it's your script)
   - Click "Allow"

4. **Copy the Web App URL**
   - After deployment, you'll get a URL like:
     `https://script.google.com/macros/s/AKfycby.../exec`
   - **Copy this URL** - you'll need it for the next step

## Step 2: Update Frontend Environment Variable

1. **Create `.env.local` file** in the project root:
   ```bash
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   NEXT_PUBLIC_SITE_TOKEN=32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=
   ```
   Replace `YOUR_SCRIPT_ID` with the actual URL from Step 1.4

2. **Verify the token matches** the one in your Google Apps Script

## Step 3: Test Locally

1. **Restart the dev server:**
   ```bash
   npm run dev
   ```

2. **Test the form:**
   - Go to http://localhost:3000
   - Click "Join Waitlist" or "Book Intro Call"
   - Fill out the form
   - Submit and verify:
     - No CORS errors in console
     - Success notification appears
     - Data appears in your Google Sheet
     - Telegram notification received

## Step 4: Deploy to Netlify

### Option A: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the site:**
   ```bash
   npm run build
   ```

3. **Login to Netlify:**
   ```bash
   netlify login
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod
   ```
   - Choose "Create & configure a new site"
   - Choose your team
   - Site name: (e.g., "learntodeal" or press Enter for random)
   - Publish directory: `out`

5. **Add environment variables in Netlify:**
   - Go to your site in Netlify dashboard
   - Site settings → Environment variables → Add
   - Add both:
     - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
     - `NEXT_PUBLIC_SITE_TOKEN`

6. **Redeploy after adding env vars:**
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Option B: Deploy via Git + Netlify Dashboard

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `out`
   - Click "Deploy site"

3. **Add environment variables:**
   - Site settings → Environment variables
   - Add:
     - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` = (your Google Script URL)
     - `NEXT_PUBLIC_SITE_TOKEN` = `32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=`

4. **Trigger redeploy:**
   - Deploys → Trigger deploy → Deploy site

## Step 5: Custom Domain (Optional)

1. **In Netlify:**
   - Site settings → Domain management
   - Add custom domain
   - Follow DNS instructions

## Troubleshooting

### Form not submitting:
- Check browser console for errors
- Verify `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` is correct
- Verify token matches between frontend and Google Script
- Check Google Apps Script deployment is set to "Anyone"

### CORS errors:
- Verify Google Apps Script has `doOptions()` function
- Redeploy Google Apps Script if you made changes
- Check CORS headers are in all responses

### No data in Google Sheet:
- Check spreadsheet ID in Google Apps Script
- Verify sheet name matches: "Dealer Page - Leads"
- Check Google Apps Script execution logs

### No Telegram notifications:
- Verify TELEGRAM_TOKEN and CHAT_ID
- Test by sending message to bot first
- Check Google Apps Script logs

## Updating the Site

After making changes to the code:

1. **If you changed frontend code:**
   ```bash
   npm run build
   netlify deploy --prod
   ```
   Or push to GitHub (if using Git deployment)

2. **If you changed Google Apps Script:**
   - Go to Google Apps Script editor
   - Update the code
   - Deploy → Manage deployments
   - Click ✏️ edit on active deployment
   - Version: "New version"
   - Click "Deploy"
   - URL stays the same, no need to update env vars

## Security Notes

- Your `SECRET` token is secure - it's only in your Google Script and `.env.local`
- Never commit `.env.local` to git (already in `.gitignore`)
- The Google Script URL is public but protected by token verification
- Telegram tokens are secure as they're only in Google Apps Script
- Set Netlify env vars as "Sensitive" in the dashboard
