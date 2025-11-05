# Google Sheets & Apps Script Setup Guide

This guide will help you set up the Google Sheets integration for the contact form.

## What You'll Get

When someone submits the contact form on your landing page:
1. Their data is saved to a Google Spreadsheet
2. You receive a Telegram notification instantly
3. All data is organized in columns for easy management

---

## Step-by-Step Setup

### 1️⃣ Create a Google Spreadsheet

1. Go to [https://sheets.google.com](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Give it a name: "LearnToDeal - Leads" (or any name you want)
4. **Copy the Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SPREADSHEET_ID/edit
   ```

   Example:
   ```
   https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   ```
   The ID is: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

5. **Save this ID** - you'll need it later

---

### 2️⃣ Open Apps Script Editor

1. In your Google Spreadsheet, click **Extensions** → **Apps Script**
2. You'll see a code editor with some default code
3. **Delete all the default code**

---

### 3️⃣ Copy the Apps Script Code

1. In your project folder, open the file: `google-apps-script/Code.gs`
2. **Copy the entire contents** of this file
3. **Paste it** into the Apps Script editor (replacing everything)

---

### 4️⃣ Configure the Script

At the top of the script, you'll see these constants that need to be updated:

```javascript
const SHEET_NAME = 'Responses';
const SECRET = '32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=';
const TELEGRAM_TOKEN = 'REPLACE_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'REPLACE_CHAT_ID';
const SPREADSHEET_ID = 'REPLACE_SPREADSHEET_ID';
```

**Update them as follows:**

#### a) SHEET_NAME
Leave as `'Responses'` (or change to any name you want for the sheet tab)

#### b) SECRET (Important!)
Generate a random secret token. This prevents unauthorized form submissions.

**How to generate a random token:**
- Option 1: Use an online generator like [RandomKeygen](https://randomkeygen.com/)
- Option 2: In terminal, run: `openssl rand -base64 32`
- Option 3: Just mash your keyboard: `k2j9dh3f9hsd8f7h3jk9dh`

Example:
```javascript
const SECRET = 'k2j9dh3f9hsd8f7h3jk9dh_YOUR_SECRET_HERE';
```

**IMPORTANT:** Save this token! You'll need to use the exact same value in your `.env.local` file later.

#### c) SPREADSHEET_ID
Paste the Spreadsheet ID you copied in Step 1:

```javascript
const SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
```

#### d) TELEGRAM_TOKEN and CHAT_ID
We'll get these in the next section. For now, leave them as placeholders.

---

### 5️⃣ Get Telegram Credentials (For Notifications)

You already have Telegram credentials, so here's a quick reminder of what to put:

#### Your Telegram Bot Token
Format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

Update in the script:
```javascript
const TELEGRAM_TOKEN = 'YOUR_BOT_TOKEN_HERE';
```

#### Your Telegram Chat ID
Format: `123456789` (just numbers)

Update in the script:
```javascript
const CHAT_ID = 'YOUR_CHAT_ID_HERE';
```

---

### 6️⃣ Deploy the Apps Script as a Web App

1. Click the **💾 Save** button (or press Ctrl+S / Cmd+S)
2. Give your project a name: "LearnToDeal Form Handler"
3. Click **Deploy** → **New deployment**
4. Click the ⚙️ **gear icon** next to "Select type"
5. Choose **Web app**
6. Fill in the deployment settings:
   - **Description:** LearnToDeal Contact Form
   - **Execute as:** Me (your email)
   - **Who has access:** **Anyone** ← IMPORTANT!
7. Click **Deploy**
8. **Authorize the app:**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)" (it's safe, Google just warns about custom scripts)
   - Click "Allow"
9. **Copy the Web App URL**
   - It looks like: `https://script.google.com/macros/s/SOME_LONG_ID/exec`
   - **Save this URL** - you'll need it for your `.env.local` file

---

### 7️⃣ Update Your `.env.local` File

1. Open `.env.local` in your project folder
2. Update these two values:

```bash
# Paste the Web App URL you just copied
NEXT_PUBLIC_SUBMIT_URL=https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec

# Paste the exact same SECRET token you used in the Apps Script
NEXT_PUBLIC_SITE_TOKEN=k2j9dh3f9hsd8f7h3jk9dh_YOUR_SECRET_HERE
```

**IMPORTANT:** The `NEXT_PUBLIC_SITE_TOKEN` must match the `SECRET` in your Apps Script exactly!

3. Save the file

---

### 8️⃣ Test Everything

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open the site:** [http://localhost:3000](http://localhost:3000)

3. **Submit the contact form** with test data

4. **Check these things:**
   - ✅ You should see a success notification
   - ✅ A new row should appear in your Google Spreadsheet
   - ✅ You should receive a Telegram notification

If something doesn't work, check the troubleshooting section in `README.md`.

---

## 📋 Summary Checklist

- [ ] Created a Google Spreadsheet and copied the ID
- [ ] Opened Apps Script editor
- [ ] Copied `Code.gs` content into Apps Script
- [ ] Generated and set a SECRET token
- [ ] Added Spreadsheet ID to the script
- [ ] Added Telegram credentials (token + chat ID)
- [ ] Deployed as Web App with "Anyone" access
- [ ] Copied the Web App URL
- [ ] Updated `.env.local` with:
  - [ ] `NEXT_PUBLIC_SUBMIT_URL`
  - [ ] `NEXT_PUBLIC_SITE_TOKEN` (matches SECRET)
- [ ] Tested the form submission
- [ ] Verified data appears in spreadsheet
- [ ] Verified Telegram notification received

---

## 🔒 Security Notes

1. **Never share your credentials publicly:**
   - SECRET token
   - Telegram bot token
   - Spreadsheet ID (contains private data)

2. **Never commit `.env.local` to git** (it's already in `.gitignore`)

3. **For production (Netlify):**
   - Add environment variables in Netlify dashboard
   - Don't hardcode secrets in your code

---

## ❓ Need Help?

If you get stuck:
1. Check the `README.md` troubleshooting section
2. Review the Apps Script execution logs (View → Logs in Apps Script)
3. Check your browser console for errors (F12)

---

**That's it! Your form is now connected to Google Sheets and Telegram. 🎉**
