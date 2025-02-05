"use server";

import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/app/utils/auth";
import fs from 'fs';
import { savePostToFile } from "@/app/utils";
import { redirect } from "next/navigation";

interface CreatePost {
  title: string;
  slug: string;
  postImg?: string;
  content?: any
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

  const { title, slug, postImg, content } = data
  const { markdownContent, filePath } = savePostToFile({ ...data, author: user?.name })

  let post;
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
          content,
          filePath,
          userEmail: session.user.email,
        },
      });

      fs.writeFileSync(filePath, markdownContent);
    }
  } catch (error: any) {
    return {
      error: error.message || "Error occurred while saving post",
    };
  }
  redirect(`/blog/${post?.id}/edit`)
}