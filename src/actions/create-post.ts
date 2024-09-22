"use server";

import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/app/utils/auth";
import fs from 'fs';
import { savePostToFile } from "@/app/utils";

interface CreatePost {
  title: string;
  slug: string;
  postImg?: string;
  markdown: string
}

interface CreateState {
  success?: boolean;
  error?: string;
  postId?: string;
}

export async function createPost(data: CreatePost): Promise<CreateState> {
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

  const { title, slug, postImg } = data
  const { markdownContent, filePath } = savePostToFile(data)

  let post: any = null;
  try {
    const postExist = await prisma.post.findFirst({
      where: { slug: data.slug },
    });
    if (!postExist) {
      post = await prisma.post.create({
        data: {
          title,
          slug,
          postImg,
          initSlug: slug,
          filePath,
          userEmail: session.user.email,
        },
      });

      fs.writeFileSync(filePath, markdownContent);
    }
  } catch (error: any) {
    console.log(error.message)
    return {
      error: error.message || "Error occurred while saving post",
    };
  }
  return {
    success: true,
    postId: post?.id,
  };
}