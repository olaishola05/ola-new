"use server";

import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/app/utils/auth";
import { revalidatePath } from "next/cache";
import fs from 'fs';
import { savePostToFile } from "@/app/utils";
import * as actions from "@/actions";

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
  markdown: string
}

export async function autoSavePost(data: UpdatePostProps): Promise<AutoSaveState> {
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
  const { markdownContent, filePath, fileSlug } = await savePostToFile(data)

  let post = null;
  try {
    const postExist = await prisma.post.findFirst({ where: { id: data.id } });
    if (!postExist) {
      return {
        error: "Post not found!",
      };
    } else {
      post = await prisma.post.update({
        where: { id: postExist.id },
        data: {
          title,
          slug,
          postImg,
          userEmail: session.user.email,
          updatedAt: new Date(),
        },
      });
      const data = {
        initSlug: postExist.initSlug,
        markdownContent,
        fileSlug,
        filePath
      }
      await actions.createOrUpdateFile(data)
      // console.log(data, '---- updated info ----')
      // fs.writeFileSync(filePath, markdownContent);
    }
  } catch (error: any) {
    console.log(error.message, '----error here ----')
    return {
      error: error.message || "Error occurred while saving post",
    };
  }
  revalidatePath("/dashboard/posts");
  return {
    success: true,
  };
}