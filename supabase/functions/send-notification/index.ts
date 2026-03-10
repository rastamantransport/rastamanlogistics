import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL") || "rastamanlogistics@gmail.com";

// HTML-escape helper to prevent injection
const esc = (s?: string | null): string =>
  (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Field length limits
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;

const truncate = (s?: string | null, max = MAX_FIELD_LENGTH): string =>
  (s ?? "").slice(0, max);

// Persistent rate limiting via Supabase
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX = 5;

async function isRateLimited(supabaseAdmin: ReturnType<typeof createClient>, ip: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_SECONDS * 1000).toISOString();

  // Count recent requests from this IP
  const { count, error } = await supabaseAdmin
    .from("rate_limit_log")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", windowStart);

  if (error) {
    console.error("Rate limit check error:", error);
    return false; // fail open to avoid blocking legitimate requests
  }

  if ((count ?? 0) >= RATE_LIMIT_MAX) {
    return true;
  }

  // Log this request
  await supabaseAdmin.from("rate_limit_log").insert({ ip_address: ip });

  // Opportunistic cleanup of old entries
  await supabaseAdmin.rpc("cleanup_rate_limit_log").catch(() => {});

  return false;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create service-role client for rate limiting
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Rate limiting by IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (await isRateLimited(supabaseAdmin, clientIp)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { type, data } = await req.json();

    let subject: string;
    let htmlBody: string;

    if (type === "quote") {
      const name = esc(truncate(data.name));
      subject = `New Quote Request from ${truncate(data.name, 100)}`;
      htmlBody = `
        <h2>New Vehicle Shipping Quote Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Name</td><td style="padding:8px;border-bottom:1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Phone</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.phone))}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Email</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.email, 255))}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Pickup</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.pickupLocation || data.pickupZip)) || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Delivery</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.deliveryLocation || data.deliveryZip)) || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Vehicle</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate((data.vehicleYear ? data.vehicleYear + " " : "") + (data.vehicleMakeModel || data.vehicle || ""))) || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Condition</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.condition)) || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Transport Type</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.transportType)) || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Available Date</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.availableDate)) || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Notes</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.notes, MAX_MESSAGE_LENGTH)) || "None"}</td></tr>
        </table>
      `;
    } else if (type === "contact") {
      const name = esc(truncate(data.name));
      subject = `New Contact Message from ${truncate(data.name, 100)}`;
      htmlBody = `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Name</td><td style="padding:8px;border-bottom:1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Phone</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.phone)) || "N/A"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Email</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.email, 255))}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Message</td><td style="padding:8px;border-bottom:1px solid #ddd;">${esc(truncate(data.message, MAX_MESSAGE_LENGTH))}</td></tr>
        </table>
      `;
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!RESEND_API_KEY) {
      console.log("No RESEND_API_KEY configured. Email would have been sent.");
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

    if (!emailRes.ok) {
      const errorBody = await emailRes.text();
      console.error("Resend API error:", emailRes.status, errorBody);
      return new Response(
        JSON.stringify({ error: "Failed to send message. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
