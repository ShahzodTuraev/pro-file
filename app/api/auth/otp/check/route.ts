import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: { otp: string } = await req.json();

    return NextResponse.json({ otp: "ksdjf", status: 201 });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
