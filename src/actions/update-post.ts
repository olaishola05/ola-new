"use server";

import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/app/utils/auth";
import { revalidatePath } from "next/cache";
import fs from 'fs';
import path from 'path';
import { savePostToFile } from "@/app/utils";

interface AutoSaveState {
  success?: boolean;
  error?: string;
  postId?: string;
}

interface UpdatePostProps {
  id: string
  title: string;
  slug: string;
  postImg?: string;
  content: any
  markdown: string
}

export async function autoSavePost(data: UpdatePostProps): Promise<AutoSaveState> {
  const session = await getAuthSession();

  if (!session?.user.email) {
    return { error: "Unauthorized!" };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user?.role.includes("admin") && !user?.role.includes("author")) {
    return { error: "Unauthorized!" };
  }

  try {
    const existingPost = await prisma.post.findUnique({ where: { id: data.id } });
    if (!existingPost) {
      return { error: "Post not found!" };
    }

    const { title, slug, postImg, content } = data;

    const { markdownContent, filePath, } = savePostToFile({
      ...data,
      author: user?.name,
      description: existingPost.desc,
      existingFilePath: existingPost.filePath,
    });

    const postsDirectory = path.join(process.cwd(), 'posts');
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    fs.writeFileSync(path.join(process.cwd(), filePath), markdownContent);

    const updatedPost = await prisma.post.update({
      where: { id: data.id },
      data: {
        title,
        slug,
        postImg,
        content,
        filePath: filePath,
        userEmail: session.user.email,
        updatedAt: new Date(),
      },
    });
    console.log("Post updated successfully");

    revalidatePath("/dashboard/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/posts/${updatedPost.slug}`);
    revalidatePath(`/blog/posts?cat=${updatedPost.catSlug}`)
    return { success: true, postId: updatedPost.id };
  } catch (error: any) {
    return { error: error.message || "Error occurred while saving post" };
  }
}