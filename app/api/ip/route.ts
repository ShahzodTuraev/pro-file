// app/api/ip/route.ts
export const runtime = "edge"; // Use Vercel Edge runtime for header access

export async function GET(request: Request) {
  const headers = request.headers;

  // Extract client IP from the headers (Vercel and common proxy headers)
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("x-vercel-forwarded-for") ||
    "Unknown";

  // Extract location information from Vercel geo headers
  const country = headers.get("x-vercel-ip-country") || "Unknown";
  const ips = headers.get("x-vercel-ip") || "Unknown";
  const region = headers.get("x-vercel-ip-country-region") || "Unknown";
  const city = headers.get("x-vercel-ip-city") || "Unknown";
  const latitude = headers.get("x-vercel-ip-latitude") || null;
  const longitude = headers.get("x-vercel-ip-longitude") || null;

  const data = {
    ip,
    location: {
      country,
      region,
      city,
      latitude,
      longitude,
      ips,
    },
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}
