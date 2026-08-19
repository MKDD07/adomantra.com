export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "photos";
    const query = url.searchParams.get("query") || "";
    const perPage = url.searchParams.get("per_page") || "3";
    const orientation = url.searchParams.get("orientation") || "landscape";

    if (!query) {
      return new Response(JSON.stringify({ error: "Missing query parameter" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let targetEndpoint = "https://api.pexels.com/v1/search";
    if (type === "videos") {
      targetEndpoint = "https://api.pexels.com/videos/search";
    }

    const pexelsUrl = `${targetEndpoint}?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=${orientation}`;

    try {
      const apiKey = env.PEXELS_API_KEY || "bPSCecg8osP489H4AQexmZwG3OXpL1DUNjhrX1hafiSE8IapAM9EgZOu";

      const response = await fetch(pexelsUrl, {
        headers: {
          Authorization: apiKey,
        },
        cf: {
          cacheTtl: 3600,
          cacheEverything: true,
        },
      });

      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
