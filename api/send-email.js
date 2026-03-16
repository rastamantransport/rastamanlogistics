// api/send-email.js
// Vercel serverless function — handles both contact form and quote form submissions
// Requires: RESEND_API_KEY environment variable set in Vercel dashboard

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const {
    // Contact form fields
    name,
    email,
    phone,
    message,
    // Quote form fields (optional)
    vehicle,
    pickupZip,
    deliveryZip,
    transportType,
    // Form type identifier
    formType = 'contact'
  } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Build email subject and body based on form type
  const isQuote = formType === 'quote';
  const subject = isQuote
    ? `🚗 New Quote Request from ${name}`
    : `📩 New Contact Message from ${name}`;

  const htmlBody = isQuote
    ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f6f2;">
        <div style="background: linear-gradient(160deg, #3b3026, #2a2218); padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px;">RASTAMAN <span style="color: #ff7033;">LOGISTICS</span></h1>
          <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 12px; letter-spacing: 2px;">NEW QUOTE REQUEST</p>
        </div>
        <div style="background: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e8e0d5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #888; font-size: 13px; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; font-weight: bold; color: #3b3026;">${name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #888; font-size: 13px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #3b3026;"><a href="mailto:${email}" style="color: #ff7033;">${email}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #888; font-size: 13px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #3b3026;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #888; font-size: 13px;">Vehicle</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #3b3026;">${vehicle || 'Not provided'}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #888; font-size: 13px;">Pickup ZIP</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #3b3026;">${pickupZip || 'Not provided'}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #888; font-size: 13px;">Delivery ZIP</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #3b3026;">${deliveryZip || 'Not provided'}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Transport Type</td><td style="padding: 10px 0; color: #3b3026;">${transportType || 'Not specified'}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #fff8f0; border-left: 3px solid #ff7033; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #888;">Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      </div>
    `
    : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f6f2;">
        <div style="background: linear-gradient(160deg, #3b3026, #2a2218); padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px;">RASTAMAN <span style="color: #ff7033;">LOGISTICS</span></h1>
          <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 12px; letter-spacing: 2px;">NEW CONTACT MESSAGE</p>
        </div>
        <div style="background: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e8e0d5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #888; font-size: 13px; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; font-weight: bold; color: #3b3026;">${name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #888; font-size: 13px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #3b3026;"><a href="mailto:${email}" style="color: #ff7033;">${email}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #888; font-size: 13px;">Phone</td><td style="padding: 10px 0; color: #3b3026;">${phone || 'Not provided'}</td></tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="color: #888; font-size: 13px; margin: 0 0 8px;">Message:</p>
            <p style="color: #3b3026; background: #f9f6f2; padding: 16px; border-radius: 6px; margin: 0; line-height: 1.6;">${message || 'No message provided'}</p>
          </div>
          <div style="margin-top: 24px; padding: 16px; background: #fff8f0; border-left: 3px solid #ff7033; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #888;">Reply directly to this email to respond to ${name}.</p>
          </div>
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
        subject: subject,
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
