import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL") || "info@rastamanlogistics.com";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();

    let subject: string;
    let htmlBody: string;

    if (type === "quote") {
      subject = `New Quote Request from ${data.name}`;
      htmlBody = `
        <h2>New Vehicle Shipping Quote Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Name</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Phone</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Email</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Pickup</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.pickupLocation || data.pickupZip || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Delivery</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.deliveryLocation || data.deliveryZip || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Vehicle</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.vehicleYear ? data.vehicleYear + " " : ""}${data.vehicleMakeModel || data.vehicle || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Condition</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.condition || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Transport Type</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.transportType || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Available Date</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.availableDate || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Notes</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.notes || "None"}</td></tr>
        </table>
      `;
    } else if (type === "contact") {
      subject = `New Contact Message from ${data.name}`;
      htmlBody = `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Name</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Phone</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.phone || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Email</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Message</td><td style="padding:8px;border-bottom:1px solid #ddd;">${data.message}</td></tr>
        </table>
      `;
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!RESEND_API_KEY) {
      console.log("No RESEND_API_KEY configured. Email would have been sent:");
      console.log("To:", NOTIFICATION_EMAIL);
      console.log("Subject:", subject);
      return new Response(JSON.stringify({ success: true, message: "Logged (no email API key configured)" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Rastaman Logistics <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject,
        html: htmlBody,
      }),
    });

    const emailResult = await emailRes.json();

    if (!emailRes.ok) {
      console.error("Resend error:", emailResult);
      return new Response(JSON.stringify({ error: "Failed to send email", details: emailResult }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
