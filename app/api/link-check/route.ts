import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const username = body?.username;
    const vid = cookieStore.get("VID")?.value ?? "unknown";
    if (username.length < 3) {
      return NextResponse.json(
        { message: "Username must be at least 3 characters" },
        { status: 422 }
      );
    }
    if (!/^[a-z0-9]+$/.test(username)) {
      return Response.json(
        { message: "Username can only contain letters, numbers" },
        { status: 422 }
      );
    }
    const check = await prisma.user_list.findFirst({
      where: { link: username },
    });
    if (check) {
      return NextResponse.json(
        { message: "The username has already been taken." },
        { status: 422 }
      );
    }
    return NextResponse.json({ username });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
