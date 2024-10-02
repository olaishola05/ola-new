import { cache } from 'react'
import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'

type Data = {
  title: string,
  slug: string,
  postImg: string,
  published: boolean,
  date: string,
  categories: string[],
  author: string,
  description: string
}

interface Posts {
  body: string
  data: Data
}

export const getPosts = cache(async () => {
  const posts = await fs.readdir('./posts/')
  return Promise.all(
    posts
      .filter((file) => path.extname(file) === '.mdx' || '.md')
      .map(async (file) => {
        const filePath = `./posts/${file}`
        const postContent = await fs.readFile(filePath, 'utf-8')
        const { data, content } = matter(postContent)

        // if (data.published === false) {
        //   return null
        // }

        return { data: { ...data }, body: content } as Posts
      })

  )
})

export async function getPost(slug: string) {
  const posts = await getPosts()
  return posts.find((post) => post.data.slug === slug)
}

export async function latestPost() {
  const posts = await getPosts()
  if (posts.length === 0) return null;
  return posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())[0];
}

export async function getLatestPosts(count: number) {
  const posts = await getPosts()
  if (posts.length === 0) return null;

  return posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, count);
}


export async function getPostsByCats(page: number, cat: string, postsPerPage: number): Promise<{ data: Posts[], count: number } | null> {
  const posts = await getPosts()
  if (posts.length === 0) return null;

  const filteredPosts = cat ? posts.filter(post => post.data.categories.includes(cat)) : posts;
  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);
  return { data: paginatedPosts, count: filteredPosts.length };
}
