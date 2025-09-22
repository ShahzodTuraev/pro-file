import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const cookieStore = await cookies();
    const vid = cookieStore.get("VID")?.value ?? "";
    const check = await prisma.visit_list.findFirst({
      where: { id: vid },
    });
    if (check) {
      return NextResponse.json({
        check,
        status: 200,
      });
    } else {
      return NextResponse.json({
        check,
        status: 404,
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
