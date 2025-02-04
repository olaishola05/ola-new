'use server';

import matter from "gray-matter";
import { remark } from "remark";
import path from "path";
import fs from "fs/promises";
import { headingTree } from "./toc";

export async function getPostBySlug(postId: string) {
  const posts = await fs.readdir('./posts/');
  const filteredPosts = posts.filter(post => ['.md', '.mdx'].includes(path.extname(post)));
  const postFile = filteredPosts.find(post => post.replace(/\.mdx?$/, '') === postId);

  if (!postFile) {
    throw new Error(`Post with id: ${postId} not found`);
  }

  const fullPath = path.join('./posts/', postFile);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { content } = matter(fileContents);
  const result = await remark().use(headingTree).process(content);
  return result.data.headings;
}