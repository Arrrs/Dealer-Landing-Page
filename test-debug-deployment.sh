#!/bin/bash

# Test script for debug deployment
# Replace the URL below with your new deployment URL after deploying Code-DEBUG.gs

DEPLOY_URL="https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_URL/exec"

echo "Testing debug deployment..."
echo ""

curl -X POST "$DEPLOY_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "site_token": "32Il9jD9XMa1ay8Ic/B8XnFhhou2NPQDBotgggj/LeU=",
    "name": "Debug Test User",
    "email": "debug-test@example.com",
    "phone": "+1234567890",
    "course_format": "One-on-one",
    "experience": "Beginner",
    "tz": "UTC+2",
    "message": "Testing debug version to see detailed logs",
    "source": "debug-test"
  }' | jq .

echo ""
echo "Check the response above for 'debug' field with detailed step information"
