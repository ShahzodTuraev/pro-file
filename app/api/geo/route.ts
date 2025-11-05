import { prisma } from "@/lib/prisma";
import { geolocation, ipAddress } from "@vercel/functions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const vid = cookieStore.get("VID")?.value ?? null;

    const geoData = geolocation(request);
    const ip = ipAddress(request) || "unknown";
    const city = geoData?.city ? { city: geoData?.city } : {};
    const country = geoData?.country ? { country: geoData?.country } : {};
    const country_region = geoData?.countryRegion
      ? { country_region: geoData?.countryRegion }
      : {};
    const region = geoData?.region ? { region: geoData?.region } : {};
    const latitude = geoData?.latitude ? { latitude: geoData?.latitude } : {};
    const longitude = geoData?.longitude
      ? { longitude: geoData?.longitude }
      : {};
    const data = {
      ip,
      ...city,
      ...country,
      ...country_region,
      ...region,
      ...latitude,
      ...longitude,
    };
    if (!vid) {
      const vid = await prisma.visit_list.create({
        data,
        select: { id: true },
      });
      cookieStore.set("VID", vid?.id);
      return NextResponse.json({
        VID: vid?.id,
        status: 201,
      });
    }
    return NextResponse.json({
      city,
      ip,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
