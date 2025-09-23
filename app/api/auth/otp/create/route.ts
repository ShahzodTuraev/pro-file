import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { sendOtpEmail } from "@/lib/emailer";
export async function POST(req: NextRequest) {
  try {
    const data: {
      email: string;
      password: string;
      name: string;
    } = await req.json();
    const cookieStore = await cookies();
    const visit_id = cookieStore.get("VID")?.value;
    const expire_at = new Date(Date.now() + 3.5 * 60 * 1000); // now + 3 minutes
    const otp = String(randomInt(100000, 999999));
    const user = await prisma.user_list.findUnique({
      where: { email: data?.email },
    });
    if (!!user) {
      return NextResponse.json({
        status: 409,
        message: "The user already exists",
      });
    }
    const otpSecret = await bcrypt.hash(otp, 10);
    const passSecret = await bcrypt.hash(data?.password, 10);
    await prisma.otp_list.create({
      data: {
        otp: otpSecret,
        email: data.email,
        visit_id,
        expire_at,
      },
    });
    await prisma.pending_user.create({
      data: {
        email: data.email,
        name: data.name,
        password: passSecret,
        visit_id,
      },
    });
    await sendOtpEmail(data.email, otp);
    return NextResponse.json({ otp, status: 201 });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
