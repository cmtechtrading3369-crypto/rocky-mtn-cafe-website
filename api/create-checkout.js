import crypto from 'crypto';

export const runtime = 'nodejs';

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

  const lineItems = items.map((item) => {
    const amount = Math.round(parseFloat(item.price) * 100);
    return {
      name: item.name,
      quantity: String(item.quantity || 1),
      base_price_money: {
        amount,
        currency: 'USD'
      }
    };
  });

  const payload = {
    idempotency_key: crypto.randomUUID(),
    quick_pay: {
      name: 'Rocky Mountain Cafe Order',
      price_money: {
        amount: Math.round(parseFloat(total) * 100),
        currency: 'USD'
      },
      location_id: locationId
    },
    checkout_options: {
      redirect_url: redirectUrl,
      ask_for_shipping_address: false,
      allow_tipping: false
    },
    order: {
      location_id: locationId,
      line_items: lineItems,
      metadata: {
        customer_name: customer.name || '',
        customer_phone: customer.phone || '',
        pickup_time: customer.pickup_time || ''
      }
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

    const data = await squareResponse.json();

    if (!squareResponse.ok || data.errors) {
      const message = data.errors
        ?.map((e) => e.detail || e.category || 'Square API error')
        .join(', ');
      return new Response(
        JSON.stringify({ error: message || 'Square API error' }),
        {
          status: squareResponse.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const checkoutUrl = data.payment_link?.checkout_url;
    if (!checkoutUrl) {
      return new Response(
        JSON.stringify({ error: 'Square did not return a checkout URL' }),
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
