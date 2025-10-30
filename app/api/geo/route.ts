import { geolocation } from "@vercel/functions";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
    const data = geolocation(request);
    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
