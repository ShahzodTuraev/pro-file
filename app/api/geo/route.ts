import { geolocation, ipAddress } from "@vercel/functions";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
    const data = geolocation(request);
    const ip = ipAddress(request);
    return NextResponse.json({
      data,
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
