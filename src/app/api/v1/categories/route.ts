import prisma from "@/app/lib/prisma";
import { blogResponse, errorResponse } from "../../utils";
import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({});
    return blogResponse(200, "fetch all categories successfully", categories)
  } catch (error) {
    console.log(error)
    return errorResponse(500, "Internal Server error", error)
  }
}

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { slug, title } = body
  try {
    if (!slug || !title) {
      return blogResponse(401, 'Bad Request')
    }
    const category = await prisma.category.findUnique({
      where: { slug }
    })

    if (category) {
      return errorResponse(401, `Category with ${category} already exist!`)
    }

    const newCategory = await prisma.category.create({
      data: {
        ...body,
      }
    })
    return blogResponse(201, 'Category created!', newCategory)
  } catch (error) {
    return errorResponse(500, 'Something happened!', error)
  }
}