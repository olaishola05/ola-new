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

export const getPosts = cache(async (published: boolean) => {
  const posts = await fs.readdir('./posts/')
  return Promise.all(
    posts
      .filter((file) => path.extname(file) === '.mdx' || '.md')
      .map(async (file) => {
        const filePath = `./posts/${file}`
        const postContent = await fs.readFile(filePath, 'utf-8')
        const { data, content } = matter(postContent)

        if (data.published === published) {
          return null;
        }

        return { data: { ...data }, body: content } as Posts
      })

  )
})

async function fetchPosts() {
  const posts = await getPosts(true)
  if (posts.length === 0) return null;
  return posts
}

export async function getPost(slug: string) {
  const posts = await fetchPosts() as Posts[]
  return posts.find((post) => post.data.slug === slug)
}

function sortPosts(posts: Posts[]) {

  if (posts === null) return [];
  return posts?.sort((a, b) => new Date(b?.data.date).getTime() - new Date(a?.data.date).getTime())
}

function filterPostsByCat(cat: string, posts: Posts[]) {
  return cat ? posts?.filter(post => post?.data.categories.includes(cat)) : posts;
}

export async function latestPost() {
  const posts = await fetchPosts() as Posts[]
  return sortPosts(posts)[0];
}

export async function getLatestPosts(count: number) {
  const posts = await fetchPosts() as Posts[]
  return sortPosts(posts).slice(0, count);
}

export async function getPostsByCats(page: number, cat: string, postsPerPage: number): Promise<{ data: Posts[], count: number } | null> {
  const posts = await fetchPosts() as Posts[]
  const filteredPosts = filterPostsByCat(cat, posts)
  const sortedPosts = filteredPosts?.sort((a, b) => new Date(a?.data.date).getTime() - new Date(b?.data.date).getTime())
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = sortedPosts?.slice(startIndex, startIndex + postsPerPage);
  return { data: paginatedPosts, count: filteredPosts?.length };
}

export async function getRecentPostsByCategory(page: number, cat: string): Promise<{ data: Posts[] }> {
  const posts = await fetchPosts() as Posts[]
  const filteredPosts = filterPostsByCat(cat, posts)
  const sortedPosts = sortPosts(filteredPosts)
  const postsPerPage = 4;
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = sortedPosts?.slice(startIndex, startIndex + postsPerPage);
  return { data: paginatedPosts };
}



