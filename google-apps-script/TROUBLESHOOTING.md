# Troubleshooting Google Apps Script Issues

## Problem: Telegram works but Google Sheets doesn't update

You're receiving Telegram notifications but the Google Sheet remains empty. This indicates the script has partial functionality.

## Diagnosis Steps

### 1. Check Google Apps Script Execution Logs

1. Go to your Google Apps Script project: https://script.google.com
2. Click on "Executions" (clock icon on the left sidebar)
3. Look at recent executions
4. Check if there are any errors in the "Status" column

**What to look for:**
- ✅ **Success**: Everything worked
- ⚠️ **Exception**: An error occurred (click to see details)
- 🔴 **Failed**: The script couldn't complete

### 2. Common Issues and Solutions

#### Issue A: "Exception: You do not have permission to call SpreadsheetApp.openById"

**Cause:** The script doesn't have permission to access the spreadsheet.

**Solution:**
1. Open your Google Apps Script
2. Click **Deploy** → **Manage deployments**
3. Click the pencil icon (✏️) to edit the deployment
4. Make sure **Execute as** is set to: `Me (your-email@gmail.com)`
5. Click **Deploy**
6. You may need to re-authorize the script

#### Issue B: "Sheet not found"

**Cause:** The sheet "Dealer Page - Leads" doesn't exist in your spreadsheet.

**Solution:**
1. Open your spreadsheet: https://docs.google.com/spreadsheets/d/1ZSvCcDzFVKMkUpgl8P2nXIJrwbqbiaOUTpSa_jXMD5I/edit
2. The script will automatically create the sheet on the first successful run
3. OR manually create a sheet named exactly: `Dealer Page - Leads`

#### Issue C: Wrong Spreadsheet ID

**Cause:** The SPREADSHEET_ID in the script doesn't match your actual spreadsheet.

**Solution:**
1. Open your spreadsheet
2. The URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
3. Copy the ID from the URL
4. Update the script:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID';
   ```

#### Issue D: Script timeout or error before reaching spreadsheet code

**Cause:** An error occurs before the spreadsheet code runs, but after Telegram code runs.

**Solution:** Check the execution logs for the exact error.

### 3. Manual Test

Run this test in your Google Apps Script to verify spreadsheet access:

1. Open Google Apps Script: https://script.google.com
2. Create a new function called `testSpreadsheetAccess`:

```javascript
function testSpreadsheetAccess() {
  try {
    const ss = SpreadsheetApp.openById('1ZSvCcDzFVKMkUpgl8P2nXIJrwbqbiaOUTpSa_jXMD5I');
    Logger.log('✅ Successfully opened spreadsheet: ' + ss.getName());

    let sheet = ss.getSheetByName('Dealer Page - Leads');

    if (!sheet) {
      Logger.log('Sheet "Dealer Page - Leads" not found. Creating it...');
      sheet = ss.insertSheet('Dealer Page - Leads');
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'CourseFormat',
        'Experience',
        'TZ',
        'Message',
        'Source',
        'TokenVerified'
      ]);
      Logger.log('✅ Created sheet with headers');
    } else {
      Logger.log('✅ Found existing sheet');
    }

    // Try to write a test row
    sheet.appendRow([
      new Date().toISOString(),
      'Test User',
      'test@example.com',
      '+1234567890',
      'One-on-one',
      'Beginner',
      'UTC+2',
      'This is a manual test',
      'manual-test',
      'OK'
    ]);

    Logger.log('✅ Successfully wrote test row');
    Logger.log('Check your spreadsheet!');

  } catch (error) {
    Logger.log('❌ ERROR: ' + error.toString());
    Logger.log('Full error: ' + JSON.stringify(error));
  }
}
```

3. Click **Run** (▶️) and select `testSpreadsheetAccess`
4. Authorize the script if prompted
5. Check the logs: **View** → **Logs** (Ctrl+Enter)

### 4. Check Authorization

When you deployed the script, you should have seen an authorization screen. If you didn't authorize it to access Google Sheets:

1. Open Google Apps Script
2. Click **Run** on any function that uses SpreadsheetApp
3. Click **Review permissions**
4. Select your Google account
5. Click **Advanced** → **Go to [Your Project Name] (unsafe)**
6. Click **Allow**

### 5. Re-deploy with Correct Settings

Sometimes the deployment settings are wrong:

1. Open Google Apps Script
2. Click **Deploy** → **Manage deployments**
3. Click the pencil icon (✏️) to edit
4. Verify these settings:
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
5. Click **Deploy**
6. Copy the new **Web app URL**
7. Update your `.env.local` with the new URL

## Quick Fix Script

Add this error handling to see what's failing:

```javascript
function doPost(e) {
  let step = 'start';
  try {
    step = 'parsing data';
    const data = JSON.parse(e.postData.contents);

    step = 'verifying token';
    if (!data.site_token || data.site_token !== SECRET) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'error', message: 'Invalid token', step: step })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    step = 'opening spreadsheet';
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    step = 'getting sheet';
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      step = 'creating sheet';
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Name', 'Email', 'Phone', 'CourseFormat',
        'Experience', 'TZ', 'Message', 'Source', 'TokenVerified'
      ]);
    }

    step = 'preparing row';
    const now = new Date();
    const row = [
      now.toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.course_format || '',
      data.experience || '',
      data.tz || '',
      data.message || '',
      data.source || '',
      'OK'
    ];

    step = 'appending row';
    sheet.appendRow(row);

    step = 'sending telegram';
    sendTelegramNotification(data);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok', step: 'completed' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Still try to send telegram even if sheet fails
    try {
      sendTelegramNotification({
        name: 'ERROR',
        email: 'Failed at step: ' + step,
        message: err.toString()
      });
    } catch (e) {}

    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: err.toString(),
        step: step
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

This version tells you exactly where the script fails.

## Current Status

- ✅ Telegram notifications working
- ❌ Google Sheets not updating
- ✅ CORS headers present
- ✅ Script responding with HTTP 200

**Most likely cause:** Permission issue with SpreadsheetApp.openById() or the sheet doesn't exist yet.

**Next step:** Run the `testSpreadsheetAccess()` function manually in Google Apps Script to see the exact error.
