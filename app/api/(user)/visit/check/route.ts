import { prisma } from "@/lib/prisma";
import { geolocation } from "@vercel/functions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  try {
    const data = geolocation(request);
    // const cookieStore = await cookies();
    // const vid = cookieStore.get("VID")?.value ?? "";
    // const check = await prisma.visit_list.findFirst({
    //   where: { id: vid },
    // });
    // if (check) {
    //   return NextResponse.json({
    //     check,
    //     status: 200,
    //   });
    // } else {
    //   return NextResponse.json({
    //     check,
    //     status: 404,
    //   });
    // }
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
