import { Post } from '@prisma/client'
import React from 'react'
import MenuPostsMostVisits from './MenuPosts'
import MenuCategories from './MenuCategories'
import { getPostsByCats } from '@/app/lib'
import MenuRecentPosts from './menu-recent-posts'

const getPosts = async (page: number, cat: string) => {
  // const postsWithViews = await prisma.post.findMany({ where: { views: { gt: 100 } } })
  const recentPosts = await getPostsByCats(page, cat, 4)
  return { recents: recentPosts }
}

interface IMenu {
  searchParams?: { page: string, cat: string },
  cat?: string,
  page?: number
}

export default async function Menu({ searchParams, cat, page }: IMenu) {
  const paramPage = parseInt(searchParams?.page!) || 1
  const { recents } = await getPosts(page || paramPage, cat!)

  return (
    <div className='hidden md:flex md:flex-col mt-[60px] flex-1'>
      <MenuRecentPosts data={recents!.data} catSlug={cat} />
      <MenuCategories />
      <MenuPostsMostVisits />
    </div>
  )
}
