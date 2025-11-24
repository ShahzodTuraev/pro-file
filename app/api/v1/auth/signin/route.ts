import bcrypt from "bcrypt";
import { SignInReqBody } from "@/interfaces/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { signIn } from "@/lib/auth";
const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export async function POST(req: NextRequest) {
  try {
    const body: SignInReqBody = await req.json();
    const parsed = signinSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues.map((ele) => {
            return { paht: ele.path[0], message: ele.message };
          }),
        },
        { status: 400 }
      );
    }
    const user = await prisma.user_list.findUnique({
      where: { email: body.email },
      select: { email: true, username: true, id: true, password: true },
    });
    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email" },
        { status: 404 }
      );
    }
    const passwordMatch = await bcrypt.compare(
      body.password,
      user?.password || ""
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }
    await signIn("credentials", {
      id: user?.id,
      email: user?.email,
      link: user?.username,
      redirect: false,
    });
    return NextResponse.json(
      { message: "Sign in successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
