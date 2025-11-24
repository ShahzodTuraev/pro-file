import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signIn } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body: { otp: string; password?: string; type: string } =
      await req.json();
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
      const check = await bcrypt.compare(body.otp, otpData?.otp);
      if (check && body.type === "SIGNUP") {
        const user = await prisma.pending_user.findFirst({
          where: { visit_id },
          orderBy: { created_at: "desc" },
        });
        if (!check) {
          return NextResponse.json(
            { message: "OTP is not correct" },
            {
              status: 403,
            }
          );
        }
        if (user && visit_id && body.type === "SIGNUP") {
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
            link: savedUser?.username,
            redirect: false,
          });
        }

        return NextResponse.json(
          { message: "OTP confirmed successfully" },
          {
            status: 200,
          }
        );
      } else if (body.type === "FORGOT" && body.password && check) {
        await prisma.user_list.update({
          where: { email: otpData.email },
          data: { password: body.password },
        });
        return NextResponse.json(
          { message: "Pasword changed successfully" },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          { message: "OTP is not correct" },
          {
            status: 403,
          }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Something went wrong." },
        { status: 400 }
      );
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
