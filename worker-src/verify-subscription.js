/**
 * Cloudflare Worker for Torn Subscription Verification
 * 
 * Required Secrets:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Your Supabase service role key (to bypass RLS)
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const { apiKey } = await request.json().catch(() => ({}));

      // Bypass verification: always return a valid subscription. Keep response shape consistent.
      return new Response(JSON.stringify({
        userId: 0,
        username: null,
        subscriptionValid: true,
        validUntil: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        error: error instanceof Error ? error.message : "Unexpected server error"
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  },
};
