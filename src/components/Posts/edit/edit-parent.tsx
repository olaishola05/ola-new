import { notFound } from "next/navigation";
import PostEdit from "./post-edit";
import prisma from "@/app/lib/prisma";

const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  return post;
};

export default async function EditParent({
  params,
}: {
  params: { id: string };
}) {
  const postId = params.id;
  const post = await getPost(postId);

  if (!post) {
    return notFound()
  }
  return <PostEdit post={post} />;
}
