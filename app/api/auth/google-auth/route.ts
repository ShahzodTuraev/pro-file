import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const profile = await req.json();
    // const email = profile?.email;
    // const username = profile?.name || "Unknown";
    // const img_url = profile?.picture || "";
    // if (!email) return false; // reject login if no email
    // 1. Check if user already exists
    // let user = await prisma.user_list.findUnique({
    //   where: { email },
    //   select: { id: true },
    // });
    // // 2. If not, create new user
    // if (!user) {
    //   const cookieStore = await cookies();
    //   const visit_id = cookieStore.get("VID")?.value || "";
    //   user = await prisma.user_list.create({
    //     data: { email, username, visit_id, auth_type: "GOOGLE", img_url },
    //     select: { id: true },
    //   });
    // }
    return NextResponse.json({
      userId: profile,
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
