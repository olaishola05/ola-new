import prisma from "@/lib/prisma";

export async function getMediumPosts() {
  const res = await fetch(`${process.env.MEDIUM_API_URL}`);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}
