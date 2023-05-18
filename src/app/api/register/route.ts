import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword,
      },
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    console.log(error, "USER_REGISTERATION_ERROR");
    return new NextResponse("INTERNAL SERVER ERROR", {
      status: 500,
    });
  }
}
