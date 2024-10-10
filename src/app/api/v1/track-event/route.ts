import { NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import { blogResponse, errorResponse } from "../../utils";

export const POST = async (req: NextRequest) => {

  try {
    const { slug, eventType } = await req.json()
    if (!slug || !eventType) {
      return errorResponse(401, `Bad request, ${slug}\n ${eventType}\n not provided'`)
    }


    if (eventType !== 'view' && eventType !== 'read') {
      return errorResponse(400, 'Invalid eventType. Must be "view" or "read"');
    }
    const response = await fetch(`https://ipapi.co/json/`);
    const data = await response.json();

    const post = await prisma.postAnalytics.findUnique({ where: { slug: slug } })

    if (!post) {
      return errorResponse(404, `No post with ${slug} found`)
    }

    const updateData = eventType === 'view' ? { views: { increment: 1 } } : { reads: { increment: 1 } };
    await prisma.postAnalytics.upsert({
      where: { slug },
      update: {
        ...updateData,
        country: data.country_name

      },
      create: {
        postId: post.postId,
        slug,
        views: eventType === 'view' ? 1 : 0,
        reads: eventType === 'read' ? 1 : 0,
        country: data.country_name
      },
    });

    return blogResponse(200, 'Analytic updated successfully!')
  } catch (error) {
    return errorResponse(500, 'Internal Server Error', error)
  }
}