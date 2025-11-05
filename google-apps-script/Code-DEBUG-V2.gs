// Google Apps Script - Code.gs (Debug Version 2 - with console.log)
// Deploy this as a Web App with "Anyone" access
// This version uses console.log which shows up in Executions log

const SHEET_NAME = 'Dealer Page - Leads';
const SECRET = '32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=';
const TELEGRAM_TOKEN = '8470827303:AAFLrUv_jNlPYcBY1P_leNf1RSosMkPwczk';
const CHAT_ID = '321841339';
const SPREADSHEET_ID = '1ZSvCcDzFVKMkUpgl8P2nXIJrwbqbiaOUTpSa_jXMD5I';

/**
 * Test function - RUN THIS FIRST
 */
function testSpreadsheetAccess() {
  console.log('=== Starting Manual Test ===');

  try {
    console.log('Step 1: Opening spreadsheet with ID: ' + SPREADSHEET_ID);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('SUCCESS: Spreadsheet opened: ' + ss.getName());
    console.log('Spreadsheet URL: ' + ss.getUrl());

    console.log('Step 2: Looking for sheet named: ' + SHEET_NAME);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      console.log('Sheet not found. Creating new sheet...');
      sheet = ss.insertSheet(SHEET_NAME);
      console.log('SUCCESS: Sheet created');

      console.log('Adding header row...');
      sheet.appendRow([
        'Timestamp', 'Name', 'Email', 'Phone', 'CourseFormat',
        'Experience', 'TZ', 'Message', 'Source', 'TokenVerified'
      ]);
      console.log('SUCCESS: Headers added');
    } else {
      console.log('SUCCESS: Sheet found');
      console.log('Current row count: ' + sheet.getLastRow());
    }

    console.log('Step 3: Writing test row...');
    const testRow = [
      new Date().toISOString(),
      'Manual Test User',
      'manual-test@example.com',
      '+1234567890',
      'One-on-one',
      'Beginner',
      'UTC+2',
      'This is a manual test',
      'manual-test',
      'OK'
    ];
    console.log('Test row data: ' + JSON.stringify(testRow));

    sheet.appendRow(testRow);
    console.log('SUCCESS: Row appended');
    console.log('New row count: ' + sheet.getLastRow());

    console.log('=== Test Completed Successfully ===');
    console.log('CHECK YOUR SPREADSHEET NOW at: ' + ss.getUrl());

    return 'Success! Check the spreadsheet.';

  } catch (error) {
    console.error('ERROR: ' + error.toString());
    console.error('Error name: ' + error.name);
    console.error('Error message: ' + error.message);
    console.error('Error stack: ' + error.stack);
    return 'Error: ' + error.toString();
  }
}

/**
 * Alternative test - writes directly to Sheet1 if "Dealer Page - Leads" doesn't work
 */
function testWriteToSheet1() {
  console.log('=== Testing write to Sheet1 ===');

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Opened: ' + ss.getName());

    // Get the first sheet (usually "Sheet1")
    const sheet = ss.getSheets()[0];
    console.log('First sheet name: ' + sheet.getName());
    console.log('Current rows: ' + sheet.getLastRow());

    // Write to the first empty row
    sheet.appendRow([
      new Date().toISOString(),
      'Test write to first sheet',
      'This should appear in your spreadsheet'
    ]);

    console.log('SUCCESS: Written to ' + sheet.getName());
    console.log('New row count: ' + sheet.getLastRow());
    console.log('Check spreadsheet: ' + ss.getUrl());

    return 'Success!';

  } catch (error) {
    console.error('ERROR: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}

/**
 * List all sheets in the spreadsheet
 */
function listAllSheets() {
  console.log('=== Listing all sheets ===');

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet: ' + ss.getName());
    console.log('URL: ' + ss.getUrl());

    const sheets = ss.getSheets();
    console.log('Total sheets: ' + sheets.length);

    sheets.forEach(function(sheet, index) {
      console.log('Sheet ' + (index + 1) + ':');
      console.log('  Name: ' + sheet.getName());
      console.log('  Rows: ' + sheet.getLastRow());
      console.log('  Columns: ' + sheet.getLastColumn());
    });

    return 'Done listing sheets';

  } catch (error) {
    console.error('ERROR: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}

/**
 * Handle GET requests
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'info',
      message: 'This endpoint accepts POST requests only.'
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests
 */
function doPost(e) {
  const debugInfo = {
    step: '',
    details: []
  };

  try {
    debugInfo.step = 'acquiring lock';
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    debugInfo.step = 'parsing data';
    const data = JSON.parse(e.postData.contents);

    debugInfo.step = 'verifying token';
    if (!data.site_token || data.site_token !== SECRET) {
      lock.releaseLock();
      return ContentService.createTextOutput(
        JSON.stringify({
          status: 'error',
          message: 'Invalid token'
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    debugInfo.step = 'opening spreadsheet';
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Opened spreadsheet: ' + ss.getName());

    debugInfo.step = 'getting/creating sheet';
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      console.log('Creating new sheet: ' + SHEET_NAME);
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Name', 'Email', 'Phone', 'CourseFormat',
        'Experience', 'TZ', 'Message', 'Source', 'TokenVerified'
      ]);
      console.log('Sheet created with headers');
    } else {
      console.log('Using existing sheet. Rows: ' + sheet.getLastRow());
    }

    debugInfo.step = 'preparing row';
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

    debugInfo.step = 'appending row';
    sheet.appendRow(row);
    console.log('Row appended. New row count: ' + sheet.getLastRow());

    debugInfo.step = 'sending telegram';
    sendTelegramNotification(data);

    lock.releaseLock();

    debugInfo.step = 'completed';
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'ok',
        message: 'Data saved successfully'
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('Error at step: ' + debugInfo.step);
    console.error('Error: ' + err.toString());

    // Try to send error via Telegram
    try {
      sendTelegramNotification({
        name: '🚨 ERROR',
        email: 'Step: ' + debugInfo.step,
        message: err.toString()
      });
    } catch (e) {}

    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: err.toString(),
        step: debugInfo.step
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send Telegram notification
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
    console.error('Telegram notification failed: ' + err.toString());
  }
}
