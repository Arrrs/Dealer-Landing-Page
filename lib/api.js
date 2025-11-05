// API helper for form submission via Netlify Function
// The Netlify Function proxies the request to Google Apps Script to bypass CORS

export async function submitContactForm(formData) {
  // In production (Netlify), use the Netlify Function
  // In development, use direct Google Apps Script URL (will have CORS issues in browser, but works in production)
  const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  const submitUrl = isProduction
    ? '/.netlify/functions/submit'  // Netlify Function endpoint
    : process.env.NEXT_PUBLIC_SUBMIT_URL  // Direct Google Apps Script (for testing with curl)

  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone || '',
    course_format: formData.course_format,
    experience: formData.experience,
    tz: formData.tz || '',
    message: formData.message || '',
    source: formData.source || 'netlify_landing',
    // Note: site_token is added by the Netlify Function
  }

  try {
    const response = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (result.status === 'ok') {
      return { success: true, data: result }
    } else {
      throw new Error(result.message || 'Submission failed')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    throw error
  }
}
