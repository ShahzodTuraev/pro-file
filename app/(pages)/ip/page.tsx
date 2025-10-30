// app/page.tsx
import { headers } from "next/headers";

export const runtime = "edge"; // run on Vercel Edge
export const dynamic = "force-dynamic"; // no static caching; resolve per request

function getClientIp(h: Headers): string {
  // XFF may contain multiple IPs: "client, proxy1, proxy2" → take the first
  const xff = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    xff ||
    h.get("x-real-ip") ||
    h.get("x-vercel-forwarded-for") || // Vercel sometimes sets this
    "Unknown"
  );
}

export default function Home() {
  const h = headers();
  const ip = getClientIp(h);

  // Optional: Vercel geo headers
  const city = h.get("x-vercel-ip-city") ?? undefined;
  const country = h.get("x-vercel-ip-country") ?? undefined;
  const region = h.get("x-vercel-ip-country-region") ?? undefined;

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Your IP</h1>
      <p style={{ fontSize: "1.25rem" }}>{ip}</p>

      {city || country ? (
        <p style={{ opacity: 0.7 }}>
          {city ? `${city}, ` : ""}
          {region ? `${region}, ` : ""}
          {country ?? ""}
        </p>
      ) : null}

      <small style={{ display: "block", marginTop: "1rem", opacity: 0.6 }}>
        Note: in local dev you’ll often see 127.0.0.1 or ::1. Behind proxies,
        the first IP in <code>x-forwarded-for</code> is the client.
      </small>
    </main>
  );
}
