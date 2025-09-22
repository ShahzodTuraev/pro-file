import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "crypto";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
export async function POST(req: NextRequest) {
  try {
    const data: {
      email: string;
      password: string;
      name: string;
    } = await req.json();
    const cookieStore = await cookies();
    console.log(cookieStore.get("VID"));
    const visit_id = cookieStore.get("VID")?.value;
    console.log("visitid:::", visit_id);
    const expire_at = new Date(Date.now() + 3.5 * 60 * 1000); // now + 3 minutes
    const otp = String(randomInt(100000, 999999));
    const otpSecret = await bcrypt.hash(otp, 10);
    const passSecret = await bcrypt.hash(data?.password, 10);
    await prisma.otp_list.create({
      data: {
        otp: otpSecret,
        email: data.email,
        visit_id: "cmfv9v94z0009dcfo8y5xa3ay",
        expire_at,
      },
    });
    // await prisma.pending_user.create({
    //   data: {
    //     email: data.email,
    //     name: data.name,
    //     password: passSecret,
    //     visit_id,
    //   },
    // });
    return NextResponse.json({ otp, status: 201 });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
