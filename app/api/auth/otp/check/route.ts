import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signIn } from "@/lib/auth";
export async function POST(req: NextRequest) {
  try {
    const data: { otp: string } = await req.json();
    const cookieStore = await cookies();
    const visit_id = cookieStore.get("VID")?.value;
    const otpData = await prisma.otp_list.findFirst({
      where: {
        visit_id,
        expire_at: {
          gt: new Date(), // only not expired
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    if (otpData?.otp) {
      const check = await bcrypt.compare(data.otp, otpData?.otp);
      if (check) {
        const user = await prisma.pending_user.findFirst({
          where: { visit_id },
          orderBy: { created_at: "desc" },
        });
        if (user && visit_id) {
          const savedUser = await prisma.user_list.create({
            data: {
              username: user?.name,
              email: user?.email,
              password: user?.password,
              visit_id,
              auth_type: "EMAIL_PASS",
            },
            select: { id: true, username: true, email: true },
          });
          await prisma.pending_user.deleteMany({
            where: { email: user?.email },
          });
          await signIn("credentials", {
            id: savedUser?.id,
            email: savedUser?.email,
            username: savedUser?.username,
            redirect: false,
          });
        }
        return NextResponse.json({
          status: 200,
          message: "OTP confirmed successfully",
        });
      } else {
        return NextResponse.json({
          status: 403,
          message: "OTP is not correct",
        });
      }
    } else {
      return NextResponse.json({ status: 410, message: "OPT has expired" });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
