const crypto = require('crypto');

async function sendTelegram(message) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.warn('Telegram not configured');
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
    const data = await res.json();
    if (!data.ok) {
      console.error('Telegram error:', data);
    }
  } catch (err) {
    console.error('Telegram failed:', err);
  }
}

async function sendSMS(message) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER || !process.env.OWNER_PHONE_NUMBER) {
    console.warn('Twilio not configured');
    return;
  }

  try {
    const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
    const params = new URLSearchParams({
      To: process.env.OWNER_PHONE_NUMBER,
      From: process.env.TWILIO_PHONE_NUMBER,
      Body: message
    });

    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      }
    );

    const data = await res.json();
    if (!res.ok || data.code) {
      console.error('Twilio error:', data);
    }
  } catch (err) {
    console.error('Twilio failed:', err);
  }
}

export default async function squareWebhook(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const signature = request.headers.get('x-square-hmacsha256-signature');
  const rawBody = await request.text();

  if (!signature || !process.env.SQUARE_WEBHOOK_SIGNATURE_KEY) {
    console.warn('Missing signature or webhook key');
  } else {
    const expected = crypto
      .createHmac('sha256', process.env.SQUARE_WEBHOOK_SIGNATURE_KEY)
      .update(rawBody)
      .digest('base64');

    if (signature !== expected) {
      console.error('Invalid Square webhook signature');
      return new Response('Invalid Signature', { status: 403 });
    }
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const type = payload.type || '';
  let payment = null;

  if (type === 'payment.updated' || type === 'payment.created') {
    payment = payload.data?.object?.payment;
  } else if (type === 'order.updated' || type === 'order.created') {
    const order = payload.data?.object?.order;
    if (order && order.total_money) {
      payment = {
        amount_money: order.total_money,
        note: order.note || 'Order ' + order.id,
        id: order.id
      };
    }
  }

  if (!payment) {
    return new Response('No payment in this event type', { status: 200 });
  }

  const amount = payment.amount_money?.amount || 0;
  const total = (amount / 100).toFixed(2);
  const note = payment.note || 'No details';
  const paymentId = payment.id || 'unknown';

  const telegramMsg = `<b>New Order Received!</b>\n\n<b>Total:</b> $${total}\n<b>Payment ID:</b> ${paymentId}\n<b>Details:</b>\n${note}\n\n<a href="${process.env.SITE_URL || 'https://cmtechtrading3369-crypto.github.io/rocky-mtn-cafe-website/'}">View dashboard</a>`;

  const smsMsg = `New Rocky Mountain Cafe order - Total: $${total}\nDetails: ${note.replace(/\n/g, ' | ')}`;

  await Promise.all([
    sendTelegram(telegramMsg),
    sendSMS(smsMsg)
  ]);

  return new Response('Notifications sent', { status: 200 });
}
