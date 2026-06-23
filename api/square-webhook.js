import crypto from 'crypto';

export const runtime = 'nodejs';

async function sendTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn('Telegram not configured, skipping notification.');
    return false;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });
    const data = await response.json();
    return data.ok !== false;
  } catch (error) {
    console.error('Telegram send error:', error.message);
    return false;
  }
}

async function sendSms(message) {
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_PHONE_NUMBER;
  const twilioTo = process.env.OWNER_PHONE_NUMBER;

  if (!twilioSid || !twilioToken || !twilioFrom || !twilioTo) {
    console.warn('Twilio not configured, skipping SMS notification.');
    return false;
  }

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          To: twilioTo,
          From: twilioFrom,
          Body: message
        }),
        // Twilio uses HTTP Basic Auth
        // Node fetch supports the `user` option in some versions, but to be safe:
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('Twilio error:', response.status, text);
      return false;
    }

    return true;
  } catch (error) {
    console.error('SMS send error:', error.message);
    return false;
  }
}

function verifySquareSignature(request, signatureKey) {
  const signature = request.headers.get('x-square-hmacsha256-signature');
  if (!signature || !signatureKey) return true;

  const body = request.headers.get('x-square-body');
  const expected = crypto.createHmac('sha256', signatureKey).update(body).digest('base64');
  return signature === expected;
}

export async function POST(request) {
  try {
    // Read raw body for signature verification
    const rawBody = await request.text();

    // Parse JSON
    let event;
    try {
      event = JSON.parse(rawBody);
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    if (!verifySquareSignature(request, signatureKey)) {
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const type = event.type;
    const data = event.data;

    if (type === 'payment.updated' || type === 'order.updated') {
      const payment = data.object?.payment || data.object;
      const order = data.object?.order;
      const customer = order?.metadata || {};

      const orderId = order?.id || payment?.id || 'Unknown';
      const customerName = customer.customer_name || 'In-store customer';
      const customerPhone = customer.customer_phone || 'N/A';
      const pickupTime = customer.pickup_time || 'ASAP';
      const total = payment?.amount_money?.amount
        ? `$${(payment.amount_money.amount / 100).toFixed(2)}`
        : 'N/A';

      const items = [];
      if (order?.line_items) {
        for (const item of order.line_items) {
          items.push(
            `${item.quantity}x ${item.name} - $${(item.base_price_money?.amount / 100 || 0).toFixed(2)}`
          );
        }
      }

      const message =
        `New Order from Rocky Mountain Cafe\n` +
        `Order #: ${orderId}\n` +
        `Customer: ${customerName}\n` +
        `Phone: ${customerPhone}\n` +
        `Pickup: ${pickupTime}\n` +
        `Total: ${total}\n` +
        (items.length
          ? `Items:\n${items.map((i) => '  • ' + i).join('\n')}\n`
          : '') +
        `Time: ${new Date().toLocaleString()}`;

      const [telegramOk, smsOk] = await Promise.all([
        sendTelegram(message),
        sendSms(message)
      ]);

      console.log('Notifications sent:', { telegramOk, smsOk });

      return new Response(
        JSON.stringify({
          received: true,
          telegram: telegramOk,
          sms: smsOk
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Acknowledge other event types without processing
    return new Response(
      JSON.stringify({ received: true, ignored: type }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Webhook handler error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook handler failed' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
