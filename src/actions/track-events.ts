import prisma from "@/app/lib/prisma";

interface TrackEventParams {
  slug: string
  eventType: 'view' | 'read';
  referrer?: string | null;
}

export async function trackEvent({ slug, eventType, referrer }: TrackEventParams) {
  const updateData = eventType === 'view' ? { views: { increment: 1 } } : { reads: { increment: 1 } };
  const post = await prisma.post.findUnique({
    where: { slug }
  })

  if (!post) {
    return {
      error: 'Post not found!'
    }
  }

  return await prisma.postAnalytics.upsert({
    where: { slug },
    update: {
      ...updateData,
      ...(referrer && { referrer }),
    },
    create: {
      postId: post?.id,
      slug,
      views: eventType === 'view' ? 1 : 0,
      reads: eventType === 'read' ? 1 : 0,
      referrer,
    },
  });
}