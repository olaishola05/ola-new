import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/app/utils/auth";
import { blogResponse, errorResponse } from "../../utils";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();
  try {
    if (!session?.user.email) {
      return errorResponse(401, 'Unathorized!')
    }
    const user = await prisma.user.findUnique({
      where: { email: session?.user.email }
    })
    if (!user) {
      return errorResponse(404, 'User not found!')
    }
    if (!user.role.includes('admin')) {
      return errorResponse(403, 'Restricted')
    }
    const subscribers = await prisma.subscriber.findMany()
    return blogResponse(200, 'Subscribers fetched successful', subscribers)
  } catch (error) {
    return errorResponse(500, 'Internal Server Error', error)
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const email = await req.json()
    if (!email) {
      return errorResponse(401, 'Bad request, email not provided')
    }
    const subscriber = await prisma.subscriber.findUnique({ where: { email } })

    if (subscriber) {
      return errorResponse(401, `Subscriber with ${email} already exist!`)
    }
    await prisma.subscriber.create({
      data: {
        email,
      }
    })
    return blogResponse(201, 'Thank you for subscribing!')
  } catch (error) {
    return errorResponse(500, 'Internal Server Error', error)
  }
}