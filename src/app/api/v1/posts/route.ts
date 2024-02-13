import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/app/utils/auth";
import { blogResponse, errorResponse } from "../../utils";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  try {
    const POST_PER_PAGE = 4
    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (Number(page) - 1),
      where: {
        ...(cat && { catSlug: cat })
      },
      include: { user: true, comments: true }
    }

    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where })
    ]);
    return blogResponse(200, 'Post fetched successfully', { posts, count })

  } catch (error) {
    console.log(error);
    return errorResponse(500, "Something went wrong!", error)
  }
}

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession()

  if (!session) {
    return errorResponse(401, "Unauthorized!")
  }

  if (!session?.user?.role.includes('admin') && !session.user.role.includes('author')) {
    return errorResponse(401, "Unauthorized!")
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    })
    return blogResponse(201, 'Post created!', post)

  } catch (error) {
    console.log(error);
    return errorResponse(500, "Something went wrong!", error);
  }
}