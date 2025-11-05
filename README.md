# LearnToDeal - Casino Dealer Coaching Landing Page

A modern, mobile-first Next.js landing page for casino dealer coaching services. Built with Ant Design and configured for static export to Netlify.

## 🎯 Features

- **Mobile-first responsive design** with dark casino-themed UI
- **Ant Design components only** - centralized theme configuration
- **Contact form** with validation and Google Sheets integration
- **Telegram notifications** for new leads
- **Static export** ready for Netlify hosting
- **SEO optimized** with proper meta tags

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Google account (for Google Sheets integration)
- Telegram account (for notifications)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and update:
   - `NEXT_PUBLIC_SUBMIT_URL` - Your Google Apps Script Web App URL (see setup below)
   - `NEXT_PUBLIC_SITE_TOKEN` - A secret token (generate a random string)

3. **Run development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Google Sheets Integration Setup

### Step 1: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "LearnToDeal Leads" (or any name you prefer)
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

### Step 2: Deploy Google Apps Script

1. Open your Google Spreadsheet
2. Go to **Extensions** → **Apps Script**
3. Delete any existing code
4. Copy the entire content from `google-apps-script/Code.gs` and paste it
5. Update the following constants at the top of the file:
   ```javascript
   const SECRET = 'your_secret_token_here'; // Must match NEXT_PUBLIC_SITE_TOKEN
   const TELEGRAM_TOKEN = 'your_telegram_bot_token'; // See Telegram setup below
   const CHAT_ID = 'your_telegram_chat_id'; // See Telegram setup below
   const SPREADSHEET_ID = 'your_spreadsheet_id'; // From Step 1
   ```

6. **Deploy the script:**
   - Click **Deploy** → **New deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Select **Web app**
   - Configure:
     - **Description:** LearnToDeal Form Handler
     - **Execute as:** Me
     - **Who has access:** Anyone
   - Click **Deploy**
   - **Copy the Web App URL** - this is your `NEXT_PUBLIC_SUBMIT_URL`
   - Authorize the app when prompted

7. **Test the setup (optional):**
   - In Apps Script, select the `testSetup` function from the dropdown
   - Click **Run**
   - Check the execution log for results
   - Verify a test row appears in your spreadsheet

## 📱 Telegram Notifications Setup

### Step 1: Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the **bot token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Get Your Chat ID

**Option A: Using @userinfobot**
1. Search for [@userinfobot](https://t.me/userinfobot) in Telegram
2. Send `/start`
3. Copy your **chat ID** (a number like: `123456789`)

**Option B: Using getUpdates API**
1. Start a chat with your new bot
2. Send any message to your bot
3. Visit this URL in your browser (replace `BOT_TOKEN`):
   ```
   https://api.telegram.org/botBOT_TOKEN/getUpdates
   ```
4. Find your `chat_id` in the JSON response

### Step 3: Update Apps Script

Update the constants in your Google Apps Script:
```javascript
const TELEGRAM_TOKEN = '123456789:ABCdefGHIjklMNOpqrsTUVwxyz';
const CHAT_ID = '123456789';
```

Save and redeploy the script.

## 🎨 Theme Customization

All styling is centralized in `theme.config.js`. You can customize:

- **Colors:** Primary gold, accent coral, background charcoal
- **Typography:** Font families, sizes, weights
- **Component styles:** Buttons, cards, forms, etc.
- **Spacing:** Padding, margins, border radius

Example:
```javascript
// theme.config.js
const themeConfig = {
  token: {
    colorPrimary: '#d9a451', // Change primary color
    fontFamily: "'Inter', sans-serif", // Change font
    borderRadius: 8, // Change border radius
  },
  // ... more configuration
}
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

### Deploy to Netlify

#### Method 1: Drag & Drop

1. Run `npm run build`
2. Go to [Netlify](https://app.netlify.com)
3. Drag the `out/` folder to Netlify's deploy zone

#### Method 2: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
4. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SUBMIT_URL`
   - `NEXT_PUBLIC_SITE_TOKEN`

#### Method 3: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 🔒 Security Notes

1. **Never commit `.env.local`** to version control (already in `.gitignore`)
2. **Keep your secret tokens private:**
   - `NEXT_PUBLIC_SITE_TOKEN` (frontend)
   - `SECRET` (Google Apps Script)
   - `TELEGRAM_TOKEN` (Google Apps Script)
3. **Use environment variables** in Netlify for production
4. **Regenerate tokens** if they are ever exposed

## 📁 Project Structure

```
dealerPage/
├── app/
│   ├── layout.js          # Root layout with theme provider
│   └── page.js             # Main landing page
├── components/
│   ├── Header.jsx          # Sticky header with navigation
│   ├── Hero.jsx            # Hero section
│   ├── FeatureTiles.jsx    # What you'll learn section
│   ├── HowItWorks.jsx      # Format & guarantees
│   ├── Curriculum.jsx      # Course curriculum
│   ├── Pricing.jsx         # Pricing packages
│   ├── Testimonials.jsx    # Student testimonials
│   ├── InstructorBio.jsx   # About the instructor
│   ├── FAQ.jsx             # Frequently asked questions
│   ├── Footer.jsx          # Footer with links
│   └── ContactModal.jsx    # Contact form modal
├── lib/
│   └── api.js              # Form submission helper
├── google-apps-script/
│   └── Code.gs             # Google Apps Script code
├── public/
│   └── images/             # Static images
├── theme.config.js         # Centralized Ant Design theme
├── next.config.js          # Next.js configuration
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🌍 Internationalization (i18n) - Future

The project is structured to easily add multi-language support:

1. Install `next-intl` or similar i18n library
2. Extract all text strings to translation files
3. Wrap components with language context
4. Add language switcher to header

## 🐛 Troubleshooting

### Form submission fails

1. Check that `NEXT_PUBLIC_SUBMIT_URL` is correct
2. Verify `NEXT_PUBLIC_SITE_TOKEN` matches `SECRET` in Apps Script
3. Check Google Apps Script deployment settings (must be "Anyone")
4. Look at browser console for errors

### Telegram notifications not working

1. Verify bot token is correct
2. Check that you've sent at least one message to the bot
3. Confirm chat ID is correct
4. Check Apps Script execution logs for errors

### Build fails

1. Clear `.next` and `node_modules`:
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

## 📝 License

ISC

## 👤 Author

Casino Dealer Coaching by Sofia

---

**Need help?** Check the code comments or create an issue in the repository.
