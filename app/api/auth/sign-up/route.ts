"use server";
import { SignUpReqBody } from "@/interfaces/auth";
import { signIn } from "@/lib/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body: SignUpReqBody = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }
    const existingUser = await prisma.user_list.findUnique({
      where: { email: parsed.data.email },
    });
    if (!!existingUser) {
      return NextResponse.json({
        status: 409,
        message: "This email already registered",
      });
    }

    //  await signIn("credentials", {
    //       email: "Shon@gmail.com",
    //       password: "ertlek45",
    //       id: "lskjdfrelskjdf",
    //       redirect: false,
    //     });

    // const vid = await prisma.visit_list.create({
    //   data,
    //   select: { id: true },
    // });
    return NextResponse.json({
      data: existingUser,
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
