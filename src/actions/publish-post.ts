"use server";

import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/app/utils/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from 'fs';
import { savePostToFile } from "@/app/utils";

interface PublishedState {
  success?: boolean;
  error?: string;
  postId?: string;
}

interface PublishProps {
  title: string;
  slug: string;
  postImg?: string;
  markdown: string
  catSlug: string
  desc: string
}

type PostWithData = Partial<Omit<PublishProps, 'markdown'>>

export async function publishPost(data: PublishProps): Promise<PublishedState> {
  const updatedPost: PostWithData = {}

  updatedPost['title'] = data.title
  updatedPost['slug'] = data.slug
  updatedPost['postImg'] = data.postImg
  updatedPost['desc'] = data.desc
  updatedPost['catSlug'] = data.catSlug

  const session = await getAuthSession();
  if (!session?.user.email) {
    return {
      error: "Unauthorized!",
    };
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (user?.role.includes("admin") && user.role.includes("author")) {
    return {
      error: "Unauthorized!",
    };
  }

  const { markdownContent, filePath } = await savePostToFile(data)

  try {
    await prisma.post.update({
      where: { slug: data.slug },
      data: {
        ...updatedPost,
        userEmail: session.user.email,
        published: true,
        publishedDate: new Date(),
        updatedAt: new Date(),
      },
    });
    fs.writeFileSync(filePath, markdownContent);
  } catch (error: any) {
    return {
      error: error.message || "Error occurred while saving post",
    };
  }

  revalidatePath("/dashboard/posts");
  revalidatePath("/blog/posts");
  revalidatePath(`/blog/posts/${data.slug}`);
  revalidatePath(`/blog/posts?cat=${data.catSlug}`);
  redirect(`/blog/posts/${data.slug}`);
}