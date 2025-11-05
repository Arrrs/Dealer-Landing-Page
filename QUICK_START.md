# 🚀 Quick Start Guide

Get your LearnToDeal landing page up and running in 15 minutes!

## ✅ Prerequisites Checklist

Before you start, make sure you have:

- [ ] Node.js 18+ installed ([Download](https://nodejs.org))
- [ ] Google account (for Sheets)
- [ ] Telegram account
- [ ] Telegram bot token (already obtained ✓)
- [ ] Telegram chat ID (already obtained ✓)

---

## 📝 Setup Steps

### 1. Install Dependencies (2 minutes)

```bash
npm install
```

Wait for packages to install...

---

### 2. Create Google Spreadsheet (3 minutes)

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet → name it "LearnToDeal Leads"
3. Copy the Spreadsheet ID from URL
4. Keep this tab open

**Need help?** See [GOOGLE_SETUP_GUIDE.md](./GOOGLE_SETUP_GUIDE.md) for detailed instructions.

---

### 3. Setup Google Apps Script (5 minutes)

1. In your spreadsheet: **Extensions → Apps Script**
2. Delete default code
3. Copy entire content from `google-apps-script/Code.gs`
4. Paste into Apps Script editor
5. Update these values at the top:
   ```javascript
   const SECRET = 'make_up_a_random_secret_here';
   const TELEGRAM_TOKEN = 'your_telegram_bot_token';
   const CHAT_ID = 'your_telegram_chat_id';
   const SPREADSHEET_ID = 'paste_spreadsheet_id_here';
   ```
6. Save the script
7. **Deploy → New deployment → Web app**
8. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Click **Deploy** and authorize
10. **Copy the Web App URL** (save it!)

---

### 4. Configure Environment Variables (2 minutes)

1. Open `.env.local` in your project
2. Update these two lines:
   ```bash
   NEXT_PUBLIC_SUBMIT_URL=paste_your_web_app_url_here
   NEXT_PUBLIC_SITE_TOKEN=paste_the_same_secret_from_step_3
   ```
3. Save the file

**IMPORTANT:** `NEXT_PUBLIC_SITE_TOKEN` must match the `SECRET` in Apps Script!

---

### 5. Run Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

### 6. Test the Form (2 minutes)

1. Scroll to any "Join Waitlist" or "Book Intro Call" button
2. Fill in the form with test data
3. Submit
4. Check:
   - ✅ Success notification appears
   - ✅ New row in Google Spreadsheet
   - ✅ Telegram message received

**If something fails:** Check [README.md](./README.md) troubleshooting section.

---

## 🎨 Customize Your Site

### Change Colors

Edit `theme.config.js`:

```javascript
token: {
  colorPrimary: '#d9a451', // Main gold color
  colorError: '#ff6b6b',   // Accent coral
  colorBgBase: '#0f1720',  // Dark background
}
```

### Change Text Content

All text is in the component files in `components/` folder:
- Hero headline: `components/Hero.jsx`
- Features: `components/FeatureTiles.jsx`
- Pricing: `components/Pricing.jsx`
- FAQ: `components/FAQ.jsx`
- etc.

### Replace Placeholder Images

Images are currently using Unsplash placeholders. Replace with your own:

1. Add images to `public/images/`
2. Update image sources in components
3. Follow the image descriptions in the code for guidance

---

## 🚀 Deploy to Netlify

### Quick Deploy (Drag & Drop)

```bash
npm run build
```

Then drag the `out/` folder to [Netlify](https://app.netlify.com).

**Don't forget to add environment variables in Netlify:**
- `NEXT_PUBLIC_SUBMIT_URL`
- `NEXT_PUBLIC_SITE_TOKEN`

### Git Deploy

1. Push to GitHub
2. Connect repo to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Add environment variables in Netlify settings

**Full deployment guide:** See [README.md](./README.md)

---

## 📚 Documentation

- **[README.md](./README.md)** - Full documentation
- **[GOOGLE_SETUP_GUIDE.md](./GOOGLE_SETUP_GUIDE.md)** - Detailed Google Sheets setup
- **[prompt.md](./prompt.md)** - Original project specification

---

## ❓ Common Questions

**Q: Can I test without Google Sheets?**
A: The form will fail to submit. You need to set up Google Sheets first, or temporarily comment out the form submission logic.

**Q: Do I need to deploy Apps Script every time I change it?**
A: Yes. After making changes, go to Deploy → Manage deployments → Edit → Version: New version → Deploy.

**Q: Where do I add my own logo?**
A: Edit `components/Header.jsx` and replace the text logo with an image.

**Q: How do I add more languages?**
A: The site is ready for i18n. Install `next-intl`, extract strings to translation files, and add a language switcher.

**Q: The site looks different from the demo!**
A: Replace placeholder images with professional photos. Check `theme.config.js` for styling.

---

## 🎯 Next Steps

- [ ] Replace placeholder images with real photos
- [ ] Update instructor name "Sofia" to your actual name
- [ ] Customize colors in `theme.config.js`
- [ ] Test form on mobile devices
- [ ] Set up custom domain on Netlify
- [ ] Add Google Analytics (optional)
- [ ] Consider adding multi-language support

---

**Need help? Check the full documentation or create an issue.**

Happy coding! 🎉
