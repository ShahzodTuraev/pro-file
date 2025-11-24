import bcrypt from "bcrypt";

import { SignUpReqBody } from "@/interfaces/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomInt } from "crypto";
import { emailSender } from "@/lib/services/emailSender";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
const forgotSchema = z.string().email("Invalid email format");
export async function POST(req: NextRequest) {
  try {
    const body: SignUpReqBody = await req.json();
    const cookieStore = await cookies();
    const expire_at = new Date(Date.now() + 3.5 * 60 * 1000); // now + 3 minutes
    const otp = String(randomInt(100000, 999999));
    const parsed =
      body.type === "SIGNUP"
        ? signupSchema.safeParse(body)
        : forgotSchema.safeParse(body.email);

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
      where: { email: body.email },
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
    if (body.type === "SIGNUP") {
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
    }
    // save encoded otp in database
    const otpData = await prisma.otp_list.create({
      data: {
        otp: otpSecret,
        email: body.email,
        visit_id: cookieStore.get("VID")?.value || anonVisit?.id || "unknown",
        expire_at,
      },
      select: { id: true },
    });
    cookieStore.set("otpid", otpData?.id, {
      maxAge: 60 * 60, // 1 hour
    });

    // send otp to user's email:
    await emailSender({ type: "OTP", email: body.email, otp });

    return NextResponse.json(
      {
        message: "OTP sent to your email successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
