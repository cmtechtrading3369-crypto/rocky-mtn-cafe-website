const crypto = require('crypto');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { items, total, customer } = body;

  if (!items || !total || !Array.isArray(items) || items.length === 0) {
    return { statusCode: 400, body: 'Cart is empty' };
  }

  if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
    return { statusCode: 500, body: 'Square credentials not configured' };
  }

  const isSandbox = process.env.SQUARE_SANDBOX !== 'false';
  const squareUrl = isSandbox
    ? 'https://connect.squareupsandbox.com/v2/online-checkout/payment-links'
    : 'https://connect.squareup.com/v2/online-checkout/payment-links';

  const itemLines = items
    .map(item => `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  const note = `Order for ${customer?.name || 'Customer'}${customer?.phone ? ' | ' + customer.phone : ''}${customer?.pickup_time ? ' | ' + customer.pickup_time : ''}\n\n${itemLines}`;

  const payload = {
    idempotency_key: crypto.randomUUID(),
    description: 'Rocky Mountain Cafe In-Store Order',
    quick_pay: {
      location_id: process.env.SQUARE_LOCATION_ID,
      name: 'Rocky Mountain Cafe Order',
      price_money: {
        amount: Math.round(parseFloat(total) * 100),
        currency: 'USD'
      }
    },
    checkout_options: {
      redirect_url: process.env.SQUARE_REDIRECT_URL || 'https://cmtechtrading3369-crypto.github.io/rocky-mtn-cafe-website/thank-you.html',
      merchant_support_email: process.env.MERCHANT_EMAIL || 'orders@rockymountaincafe.com'
    },
    payment_note: note
  };

  try {
    const response = await fetch(squareUrl, {
      method: 'POST',
      headers: {
        'Square-Version': '2025-06-18',
        'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
      console.error('Square API error:', data.errors);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'Failed to create checkout',
          details: data.errors
        })
      };
    }

    const checkoutUrl = data?.payment_link?.checkout_page_url;
    const orderId = data?.payment_link?.order_id;

    if (!checkoutUrl) {
      return { statusCode: 500, body: 'No checkout URL returned' };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, checkoutUrl, orderId })
    };
  } catch (error) {
    console.error('Square request failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Square connection failed', message: error.message })
    };
  }
};
