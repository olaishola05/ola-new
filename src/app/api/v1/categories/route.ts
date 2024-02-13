import prisma from "@/app/lib/prisma";
import { blogResponse, errorResponse } from "../../utils";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({});
    return blogResponse(200, "fetch all categories successfully", categories)
  } catch (error) {
    console.log(error)
    return errorResponse(500, "Internal Server error", error)
  }
}