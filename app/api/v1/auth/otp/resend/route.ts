import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomInt } from "crypto";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const otpId = cookieStore.get("otpid")?.value;
    const expire_at = new Date(Date.now() + 3.5 * 60 * 1000); // now + 3 minutes
    const otp = String(randomInt(100000, 999999));

    // bycript the otp and password:
    const otpSecret = await bcrypt.hash(otp, 10);
    const emailData = await prisma.otp_list.update({
      where: {
        id: otpId,
      },
      data: {
        otp: otpSecret,
        expire_at,
      },
      select: { email: true },
    });

    // send otp to user's email:
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "ProFile OTP", email: "pro.file.mailer24@gmail.com" },
        to: [{ email: `${emailData.email}` }],
        subject: "Sign Up OTP",
        htmlContent: `<html><body><p>Your OTP for ProFile is <strong>${otp}</strong></p></body></html>`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": `${process.env.BREVO_API_KEY}`,
        },
      }
    );
    return NextResponse.json(
      {
        message: "OTP sent to your email successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
