import { NextRequest, NextResponse } from 'next/server';

// Newsletter subscription API route.
// Configure your email provider below.
// Currently supports Mailchimp — set env vars in .env.local:
//   MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_API_SERVER (e.g. us1)

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const server = process.env.MAILCHIMP_API_SERVER;

  // If Mailchimp is not configured, return success so the UI works in dev
  if (!apiKey || !listId || !server) {
    console.warn(
      '[subscribe] Mailchimp env vars not set — returning mock success.'
    );
    return NextResponse.json({ success: true });
  }

  const url = `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    // Mailchimp returns 400 if already subscribed
    if (data.title === 'Member Exists') {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { error: data.detail ?? 'Subscription failed.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
