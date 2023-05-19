import { NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  promptId?: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  try {
    const { promptId } = params;
    const body = await request.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorised", {
        status: 401,
      });
    }

    const { prompt, tag } = body;

    const updatedPrompt = await prisma.prompt.update({
      where: {
        id: promptId,
      },
      data: {
        prompt,
        tag,
      },
    });

    return NextResponse.json(updatedPrompt, {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { promptId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthenticated", {
        status: 401,
      });
    }

    const deletedPrompt = await prisma.prompt.delete({
      where: {
        id: promptId,
      },
    });

    return NextResponse.json(deletedPrompt, {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
