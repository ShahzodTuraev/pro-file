import bcrypt from "bcrypt";

import { SignUpReqBody } from "@/interfaces/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomInt } from "crypto";
import axios from "axios";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export async function POST(req: NextRequest) {
  try {
    const body: SignUpReqBody = await req.json();
    const cookieStore = await cookies();
    const expire_at = new Date(Date.now() + 3.5 * 60 * 1000); // now + 3 minutes
    const otp = String(randomInt(100000, 999999));
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues.map((ele) => {
            return { paht: ele.path[0], message: ele.message };
          }),
        },
        { status: 400 }
      );
    }
    const existingUser = await prisma.user_list.findUnique({
      where: { email: parsed.data.email },
    });
    // check if the user data already exists
    if (!!existingUser) {
      return NextResponse.json(
        {
          message: "This email already registered",
        },
        { status: 409 }
      );
    }
    // get anonymous visit id from db if it doesn't exist on cookies
    const anonVisit = await prisma.visit_list.findFirst({
      where: { ip: "unknown" },
      select: { id: true },
    });
    // bycript the otp and password:
    const otpSecret = await bcrypt.hash(otp, 10);
    const passSecret = await bcrypt.hash(body.password, 10);
    // save user data on pending data table:
    await prisma.pending_user.create({
      data: {
        email: body.email,
        name: body.username,
        password: passSecret,
        visit_id: cookieStore.get("VID")?.value || anonVisit?.id || "unknown",
      },
    });
    // save encoded otp in database
    await prisma.otp_list.create({
      data: {
        otp: otpSecret,
        email: body.email,
        visit_id: cookieStore.get("VID")?.value || anonVisit?.id || "unknown",
        expire_at,
      },
    });
    // send otp to user's email:
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "ProFile OTP", email: "pro.file.mailer24@gmail.com" },
        to: [{ email: `${body.email}` }],
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
