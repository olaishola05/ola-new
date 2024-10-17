"use server";

import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/app/utils/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from 'fs';
import path from 'path';
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
  catSlug?: string
  desc: string
  id: string
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


  try {
    const payload = {
      ...updatedPost,
      userEmail: session.user.email,
      published: true,
      publishedDate: new Date(),
      updatedAt: new Date(),
    }

    const [updatePost] = await prisma.$transaction([
      prisma.post.update({
        where: { id: data.id },
        data: payload
      })
    ]);
    const category = await prisma.category.findUnique({
      where: { postId: updatePost.id }
    })

    if (category) {
      await prisma.category.update({
        where: { id: category.id },
        data: { ...category }
      })
    }
    await prisma.category.create({
      data: {
        title: updatePost!.catSlug!,
        slug: updatePost.slug!,
        postId: updatePost.id
      }
    });
    const { markdownContent, filePath: newFilePath } = savePostToFile(
      {
        ...data,
        description: updatePost.desc,
        author: user?.name,
        published: updatePost.published,
        publishedDate: updatePost.publishedDate
      })

    const postsDirectory = path.join(process.cwd(), 'posts');
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    let finalFilePath = updatePost.filePath;
    if (data.title !== updatePost.title) {
      const oldFilePath = path.join(process.cwd(), updatePost.filePath);
      const newAbsoluteFilePath = path.join(process.cwd(), newFilePath);

      if (fs.existsSync(oldFilePath)) {
        fs.renameSync(oldFilePath, newAbsoluteFilePath);
        finalFilePath = newFilePath;
      } else {
        console.warn(`Old file not found: ${oldFilePath}. Creating a new file.`);
      }
    }
    fs.writeFileSync(path.join(process.cwd(), finalFilePath), markdownContent);

    revalidatePath("/dashboard/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/posts/${data.slug}`);
    revalidatePath(`/blog/posts?cat=${data.catSlug}`);
  } catch (error: any) {
    return {
      error: error.message || "Error occurred while saving post",
    };
  }
  redirect(`/blog/posts/${data.slug}`);
}