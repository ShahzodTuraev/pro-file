import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET() {
  const users = await prisma.user_list.findMany();
  return NextResponse.json(users);
}
