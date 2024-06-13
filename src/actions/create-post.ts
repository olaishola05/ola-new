"use server";

import prisma from "@/app/lib/prisma";
import { getAuthSession } from "@/app/utils/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { JSONContent } from "novel";

interface CreatePost {
  title: string;
  desc: string;
  slug: string;
  rawPost: JSONContent;
  img?: string;
  catSlug: string;
}

interface AutoSaveState {
  success?: boolean;
  error?: string;
}

export async function autoSavePost(data: CreatePost): Promise<AutoSaveState> {
  const session = await getAuthSession();
  try {
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

    const post = await prisma.post.findFirst({ where: { slug: data.slug } });
    if (!post) {
      await prisma.post.create({
        data: {
          ...data,
          userEmail: session.user.email,
        },
      });
    } else {
      await prisma.post.update({
        where: { slug: data.slug },
        data: {
          ...data,
          userEmail: session.user.email,
          updatedAt: new Date(),
        },
      });
    }
  } catch (error: any) {
    return {
      error: error.message || "Error occurred while saving post",
    };
  }
  return {
    success: true,
  };
}
