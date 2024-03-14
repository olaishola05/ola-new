import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import { blogResponse, errorResponse } from "../../../utils";
import { getAuthSession } from "@/app/utils/auth";


export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  const { slug } = params
  try {
    const checkPost = await prisma.post.findUnique({
      where: { slug }
    })

    if (!checkPost) {
      return errorResponse(404, "Post not found");
    }

    const post = await prisma.post.update({
      where: {
        slug
      },
      data: {
        views: {
          increment: 1
        }
      },
      include: { user: true }
    });
    return blogResponse(200, "post fetch successful", post)
  } catch (error) {
    console.log(error);
    return errorResponse(500, "Internal Server error", error)
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  const { slug } = params;
  const session = await getAuthSession()
  console.log(slug)
  try {

    const post = await prisma.post.findUnique({
      where: { slug }
    })

    if (!post) {
      return errorResponse(404, "Post not found");
    }

    if (session?.user?.email !== post.userEmail) {
      return errorResponse(401, 'forbidden')
    }
    const updateBody = await req.json();
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        ...updateBody
      }
    })
    return blogResponse(200, `Post with #${slug} updated successfully`, updatedPost)
  } catch (error) {
    console.log(error);
    return errorResponse(500, "Internal Server error", error)
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  const { slug } = params;
  const session = await getAuthSession()

  try {
    const user = await prisma.user.findUnique({
      where: { id: session?.user?.userId }
    })

    if (!user) {
      return errorResponse(401, 'Unauthorized')
    }

    const post = await prisma.post.findUnique({
      where: { slug }
    })

    if (!post) {
      return errorResponse(404, "Post not found");
    }

    if (session?.user?.email !== post.userEmail || user.role.includes('admin')) {
      return errorResponse(401, 'forbidden')
    }

    await prisma.post.delete({
      where: { slug },
    })
    return blogResponse(200, `Post with #${slug} updated successfully`)
  } catch (error) {
    console.log(error);
    return errorResponse(500, "Internal Server error", error)
  }
}