// api/send-email.js
// Vercel serverless function — handles both contact form and quote form submissions
// Requires: RESEND_API_KEY environment variable set in Vercel dashboard

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const {
    // Shared fields
    name,
    email,
    phone,
    // Contact form
    message,
    // Compact quote form fields
    vehicle,
    pickupZip,
    deliveryZip,
    // Full quote form fields
    pickupLocation,
    deliveryLocation,
    vehicleYear,
    vehicleMakeModel,
    condition,
    availableDate,
    notes,
    // Shared quote field
    transportType,
    // Form type identifier
    formType = 'contact',
  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const isQuote = formType === 'quote';
  const subject = isQuote
    ? `🚗 New Quote Request from ${name}`
    : `📩 New Contact Message from ${name}`;

  // Build vehicle string — handles both compact and full form
  const vehicleDisplay = vehicleYear && vehicleMakeModel
    ? `${vehicleYear} ${vehicleMakeModel}`
    : vehicle || vehicleMakeModel || 'Not provided';

  // Build location strings — handles both compact and full form
  const pickupDisplay  = pickupLocation  || pickupZip  || 'Not provided';
  const deliveryDisplay = deliveryLocation || deliveryZip || 'Not provided';

  const row = (label, value) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ece6;color:#888;font-size:13px;width:160px;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ece6;color:#3b3026;">${value || 'Not provided'}</td>
    </tr>`;

  const header = (subtitle) => `
    <div style="background:linear-gradient(160deg,#3b3026,#2a2218);padding:24px;border-radius:8px 8px 0 0;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:2px;">RASTAMAN <span style="color:#ff7033;">LOGISTICS</span></h1>
      <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:12px;letter-spacing:2px;">${subtitle}</p>
    </div>`;

  const footer = (replyName) => `
    <div style="margin-top:24px;padding:16px;background:#fff8f0;border-left:3px solid #ff7033;border-radius:4px;">
      <p style="margin:0;font-size:13px;color:#888;">Reply directly to this email to respond to ${replyName}.</p>
    </div>`;

  const htmlBody = isQuote ? `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f9f6f2;">
      ${header('NEW QUOTE REQUEST')}
      <div style="background:#ffffff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8e0d5;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name',           `<strong>${name}</strong>`)}
          ${row('Email',          `<a href="mailto:${email}" style="color:#ff7033;">${email}</a>`)}
          ${row('Phone',          phone)}
          ${row('Vehicle',        vehicleDisplay)}
          ${row('Condition',      condition)}
          ${row('Pickup',         pickupDisplay)}
          ${row('Delivery',       deliveryDisplay)}
          ${row('Transport Type', transportType)}
          ${row('Available Date', availableDate)}
          ${notes ? row('Notes', notes) : ''}
        </table>
        ${footer(name)}
      </div>
    </div>
  ` : `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#f9f6f2;">
      ${header('NEW CONTACT MESSAGE')}
      <div style="background:#ffffff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8e0d5;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name',  `<strong>${name}</strong>`)}
          ${row('Email', `<a href="mailto:${email}" style="color:#ff7033;">${email}</a>`)}
          ${row('Phone', phone)}
        </table>
        <div style="margin-top:20px;">
          <p style="color:#888;font-size:13px;margin:0 0 8px;">Message:</p>
          <p style="color:#3b3026;background:#f9f6f2;padding:16px;border-radius:6px;margin:0;line-height:1.6;">${message || 'No message provided'}</p>
        </div>
        ${footer(name)}
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Rastaman Logistics <onboarding@resend.dev>',
        to: ['info@rastamanlogistics.com'],
        reply_to: email,
        subject,
        html: htmlBody,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
