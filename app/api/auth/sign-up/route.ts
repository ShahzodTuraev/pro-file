"use server";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    // const data = await req.json();
    const data = await signIn("google");
    // const vid = await prisma.visit_list.create({
    //   data,
    //   select: { id: true },
    // });
    return NextResponse.json({
      data,
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
