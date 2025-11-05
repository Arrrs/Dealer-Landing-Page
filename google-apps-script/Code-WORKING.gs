// Google Apps Script - Code.gs
// Deploy this as a Web App with "Anyone" access
// IMPORTANT: After deployment, you MUST use the "Web app URL", not the "Deployment URL"

const SHEET_NAME = 'Dealer Page - Leads';
const SECRET = '32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=';
const TELEGRAM_TOKEN = '8470827303:AAFLrUv_jNlPYcBY1P_leNf1RSosMkPwczk';
const CHAT_ID = '321841339';
const SPREADSHEET_ID = '1ZSvCcDzFVKMkUpgl8P2nXIJrwbqbiaOUTpSa_jXMD5I';

/**
 * Handle GET requests - returns JSON with CORS headers
 */
function doGet(e) {
  const output = ContentService.createTextOutput(
    JSON.stringify({
      status: 'info',
      message: 'This endpoint accepts POST requests only.'
    })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Handle POST requests from the landing page form
 * Google Apps Script automatically adds CORS headers when deployed with "Anyone" access
 */
function doPost(e) {
  try {
    // Lock to prevent concurrent writes
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Verify secret token
    if (!data.site_token || data.site_token !== SECRET) {
      lock.releaseLock();
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'error', message: 'Invalid token' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Open spreadsheet and get/create sheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
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
    }

    // Prepare row data
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

    // Append to sheet
    sheet.appendRow(row);

    // Send Telegram notification
    sendTelegramNotification(data);

    // Release lock
    lock.releaseLock();

    // Return success
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send Telegram notification when new lead is received
 */
function sendTelegramNotification(data) {
  try {
    const text = Utilities.formatString(
      '*New Lead - LearnToDeal*%s%s' +
      'Name: %s%s' +
      'Email: %s%s' +
      'Phone: %s%s' +
      'Format: %s%s' +
      'Experience: %s%s' +
      'TZ: %s%s' +
      'Message: %s',
      '\n\n',
      '━━━━━━━━━━━━━━━━\n',
      data.name || '—',
      '\n',
      data.email || '—',
      '\n',
      data.phone || '—',
      '\n',
      data.course_format || '—',
      '\n',
      data.experience || '—',
      '\n',
      data.tz || '—',
      '\n',
      data.message || '—'
    );

    const payload = {
      method: 'post',
      payload: {
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      },
      muteHttpExceptions: true
    };

    UrlFetchApp.fetch(
      'https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage',
      payload
    );
  } catch (err) {
    Logger.log('Telegram notification failed: ' + err.toString());
  }
}

/**
 * Test function to verify setup
 */
function testSetup() {
  const testData = {
    site_token: SECRET,
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    course_format: 'One-on-one',
    experience: 'Beginner',
    tz: 'UTC+2',
    message: 'This is a test message',
    source: 'test'
  };

  const testEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(testEvent);
  Logger.log(result.getContent());
}
