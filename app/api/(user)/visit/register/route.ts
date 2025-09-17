import { IpData } from "@/interfaces/ip-data.interface";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const vid = await prisma.visit_list.create({
      data,
      select: { id: true },
    });
    return NextResponse.json({
      VID: vid?.id,
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
