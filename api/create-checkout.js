import crypto from 'crypto';

export const runtime = 'nodejs';

function generateIdempotencyKey() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function POST(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { items, total, customer } = body || {};

  if (!items || !total || !customer) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields: items, total, customer' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const isSandbox = process.env.SQUARE_SANDBOX !== 'false';
  const redirectUrl =
    process.env.SQUARE_REDIRECT_URL ||
    'https://cmtechtrading3369-crypto.github.io/rocky-mtn-cafe-website/thank-you.html';

  if (!accessToken || !locationId) {
    return new Response(
      JSON.stringify({ error: 'Square credentials not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const squareUrl = isSandbox
    ? 'https://connect.squareupsandbox.com/v2/online-checkout/payment-links'
    : 'https://connect.squareup.com/v2/online-checkout/payment-links';

  const payload = {
    idempotency_key: generateIdempotencyKey(),
    quick_pay: {
      name: 'Rocky Mountain Cafe Order',
      price_money: {
        amount: Math.round(parseFloat(total) * 100),
        currency: 'USD'
      },
      location_id: locationId
    },
    checkout_options: {
      redirect_url: redirectUrl
    }
  };

  try {
    const squareResponse = await fetch(squareUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Square-Version': '2024-06-20',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    });

    const rawText = await squareResponse.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      data = { raw: rawText };
    }

    console.log('Square response status:', squareResponse.status);
    console.log('Square response body:', JSON.stringify(data));

    if (!squareResponse.ok || data.errors) {
      const message = Array.isArray(data.errors)
        ? data.errors
            .map((e) => e.detail || e.category || JSON.stringify(e))
            .join(', ')
        : typeof data === 'string'
        ? data
        : data.error || JSON.stringify(data);
      return new Response(
        JSON.stringify({ error: message || 'Square API error' }),
        {
          status: squareResponse.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const checkoutUrl =
      data.payment_link?.checkout_url ||
      data.checkout_url ||
      data.url;
    if (!checkoutUrl) {
      return new Response(
        JSON.stringify({ error: 'Square did not return a checkout URL', squareData: data }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ checkoutUrl }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to create checkout' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
