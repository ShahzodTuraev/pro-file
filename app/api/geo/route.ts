import { geolocation } from "@vercel/functions";

export function GET(request: Request) {
  const data = geolocation(request);
  return new Response(
    `<h1>Your location is ${data.countryRegion}, ${data.city}, ${data.region}, ${data.latitude}, ${data.longitude}</h1>`,
    {
      headers: { "content-type": "text/html" },
    }
  );
}
