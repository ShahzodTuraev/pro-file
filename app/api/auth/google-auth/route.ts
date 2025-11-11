import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const profile = await req.json();
    const email = profile?.email;
    const visit = profile?.visit_id ? { visit_id: profile?.visit_id } : {};
    const username = profile?.name || "Unknown";
    const img_url = profile?.image || "";

    // ❌ old: if (!email) return false;
    if (!email) {
      return NextResponse.json(
        { status: 400, message: "Email is required" },
        { status: 400 }
      );
    }

    // 1. Check if user already exists
    let user = await prisma.user_list.findUnique({
      where: { email },
      select: { id: true },
    });

    // 2. If not, create new user
    if (!user) {
      user = await prisma.user_list.create({
        data: { email, username, ...visit, auth_type: "GOOGLE", img_url },
        select: { id: true },
      });
    }

    return NextResponse.json({ userId: user.id, status: 201 }, { status: 201 });
  } catch (err) {
    console.error("Google auth error:", err);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
