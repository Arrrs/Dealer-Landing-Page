// Google Apps Script - Code.gs (Debug Version)
// Deploy this as a Web App with "Anyone" access
// This version includes detailed logging to find the issue

const SHEET_NAME = 'Dealer Page - Leads';
const SECRET = '32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=';
const TELEGRAM_TOKEN = '8470827303:AAFLrUv_jNlPYcBY1P_leNf1RSosMkPwczk';
const CHAT_ID = '321841339';
const SPREADSHEET_ID = '1ZSvCcDzFVKMkUpgl8P2nXIJrwbqbiaOUTpSa_jXMD5I';

/**
 * Handle GET requests
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
 */
function doPost(e) {
  const debugInfo = {
    step: '',
    details: []
  };

  try {
    // Step 1: Lock
    debugInfo.step = 'acquiring lock';
    debugInfo.details.push('Acquiring lock...');
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    debugInfo.details.push('Lock acquired');

    // Step 2: Parse data
    debugInfo.step = 'parsing data';
    debugInfo.details.push('Parsing JSON data...');
    const data = JSON.parse(e.postData.contents);
    debugInfo.details.push('Data parsed: ' + JSON.stringify(data));

    // Step 3: Verify token
    debugInfo.step = 'verifying token';
    debugInfo.details.push('Verifying token...');
    if (!data.site_token || data.site_token !== SECRET) {
      lock.releaseLock();
      debugInfo.details.push('Token verification failed');
      return ContentService.createTextOutput(
        JSON.stringify({
          status: 'error',
          message: 'Invalid token',
          debug: debugInfo
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    debugInfo.details.push('Token verified');

    // Step 4: Open spreadsheet
    debugInfo.step = 'opening spreadsheet';
    debugInfo.details.push('Opening spreadsheet with ID: ' + SPREADSHEET_ID);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    debugInfo.details.push('Spreadsheet opened: ' + ss.getName());
    debugInfo.details.push('Spreadsheet URL: ' + ss.getUrl());

    // Step 5: Get or create sheet
    debugInfo.step = 'getting/creating sheet';
    debugInfo.details.push('Looking for sheet: ' + SHEET_NAME);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      debugInfo.details.push('Sheet not found, creating new sheet...');
      sheet = ss.insertSheet(SHEET_NAME);
      debugInfo.details.push('Sheet created');

      debugInfo.details.push('Adding headers...');
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
      debugInfo.details.push('Headers added');
    } else {
      debugInfo.details.push('Sheet found. Current row count: ' + sheet.getLastRow());
    }

    // Step 6: Prepare row data
    debugInfo.step = 'preparing row data';
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
    debugInfo.details.push('Row data prepared: ' + JSON.stringify(row));

    // Step 7: Append to sheet
    debugInfo.step = 'appending row to sheet';
    debugInfo.details.push('Appending row...');
    sheet.appendRow(row);
    debugInfo.details.push('Row appended successfully');
    debugInfo.details.push('New row count: ' + sheet.getLastRow());

    // Step 8: Send Telegram notification
    debugInfo.step = 'sending telegram notification';
    debugInfo.details.push('Sending Telegram notification...');
    sendTelegramNotification(data);
    debugInfo.details.push('Telegram notification sent');

    // Step 9: Release lock
    debugInfo.step = 'releasing lock';
    debugInfo.details.push('Releasing lock...');
    lock.releaseLock();
    debugInfo.details.push('Lock released');

    // Return success
    debugInfo.step = 'completed';
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'ok',
        debug: debugInfo
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    debugInfo.step = 'error';
    debugInfo.details.push('ERROR: ' + err.toString());
    debugInfo.details.push('Stack: ' + err.stack);

    // Try to send error via Telegram
    try {
      sendTelegramNotification({
        name: '🚨 ERROR',
        email: 'Step: ' + debugInfo.step,
        message: err.toString(),
        phone: 'Stack: ' + err.stack
      });
    } catch (telegramErr) {
      debugInfo.details.push('Failed to send error notification: ' + telegramErr.toString());
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: err.toString(),
        debug: debugInfo
      })
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
 * Test function to verify setup - RUN THIS MANUALLY
 */
function testSpreadsheetAccess() {
  Logger.log('=== Starting Manual Test ===');

  try {
    Logger.log('Opening spreadsheet...');
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('✅ Spreadsheet opened: ' + ss.getName());
    Logger.log('   URL: ' + ss.getUrl());

    Logger.log('Looking for sheet: ' + SHEET_NAME);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      Logger.log('Sheet not found. Creating...');
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Name', 'Email', 'Phone', 'CourseFormat',
        'Experience', 'TZ', 'Message', 'Source', 'TokenVerified'
      ]);
      Logger.log('✅ Sheet created with headers');
    } else {
      Logger.log('✅ Sheet found. Current rows: ' + sheet.getLastRow());
    }

    Logger.log('Writing test row...');
    sheet.appendRow([
      new Date().toISOString(),
      'Manual Test User',
      'manual-test@example.com',
      '+1234567890',
      'One-on-one',
      'Beginner',
      'UTC+2',
      'This is a manual test from testSpreadsheetAccess function',
      'manual-test',
      'OK'
    ]);

    Logger.log('✅ Test row written successfully!');
    Logger.log('   New row count: ' + sheet.getLastRow());
    Logger.log('=== Test Completed Successfully ===');
    Logger.log('Check your spreadsheet at: ' + ss.getUrl());

  } catch (error) {
    Logger.log('❌ ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
  }
}

/**
 * Test the doPost function
 */
function testDoPost() {
  const testData = {
    site_token: SECRET,
    name: 'Test User from testDoPost',
    email: 'test-dopost@example.com',
    phone: '+1234567890',
    course_format: 'One-on-one',
    experience: 'Beginner',
    tz: 'UTC+2',
    message: 'This is a test from testDoPost function',
    source: 'test'
  };

  const testEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  Logger.log('=== Testing doPost function ===');
  const result = doPost(testEvent);
  Logger.log('Result: ' + result.getContent());
}
