// API Route to proxy form submissions to Google Apps Script
// This bypasses CORS issues by making the request server-side

export async function POST(request) {
  try {
    const formData = await request.json();

    // Add the site token
    const payload = {
      ...formData,
      site_token: process.env.NEXT_PUBLIC_SITE_TOKEN,
    };

    // Make request to Google Apps Script
    const response = await fetch(process.env.NEXT_PUBLIC_SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    // Return the result
    return Response.json(result);

  } catch (error) {
    console.error('Proxy error:', error);
    return Response.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
