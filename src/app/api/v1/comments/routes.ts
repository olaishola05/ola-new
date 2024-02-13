import { getAuthSession } from "@/app/utils/auth";
import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import { blogResponse, errorResponse } from "../../utils";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug })
      },
      include: { user: true }
    })
    return blogResponse(200, 'success', comments)
  } catch (error) {
    console.log(error);
    return blogResponse(500, "Something went wrong!", error)
  }
}

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession()

  if (!session) {
    return errorResponse(401, 'Not Authenticated!')
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    })

    return blogResponse(201, 'comment created successful', comment)
  } catch (error) {
    console.log(error)
    return errorResponse(500, "Something went wrong!", error)
  }
}