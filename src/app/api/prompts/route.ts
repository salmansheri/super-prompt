import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", {
        status: 404,
      });
    }

    const body = await request.json();

    const { prompt, tag } = body;

    const newPrompt = await prisma.prompt.create({
      data: {
        creatorId: currentUser?.id,
        prompt,
        tag,
      },
    });

    return NextResponse.json(newPrompt, {
      status: 201,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("INTERNAL SERVER ERROR", {
      status: 500,
    });
  }
}
