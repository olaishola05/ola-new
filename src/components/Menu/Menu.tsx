import { Post } from '@prisma/client'
import React from 'react'
import MenuPosts from './MenuPosts'
import MenuCategories from './MenuCategories'

const getPosts = async (page: number, cat: string) => {
  const res = await fetch(`http://localhost:3000/api/v1/posts?page=${page}&cat=${cat || ''}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    console.log(res)
    // throw new Error(res.statusText)
  }

  return res.json()
}

interface IMenu {
  searchParams?: { page: string, cat: string },
  cat?: string,
  page?: number
}

export default async function Menu({ searchParams, cat, page }: IMenu) {
  const paramPage = parseInt(searchParams?.page!) || 1
  const { data } = await getPosts(page || paramPage, cat!)
  const mostPopular = data?.posts?.filter((item: Post) => item.views > 10)
  const editorsPick = data?.posts?.filter((item: any) => item?.comments?.length >= 3)
  return (
    <div className='hidden md:flex md:flex-col flex-1 mt-[60px]'>
      <h2 className='text-gray-500 text-base font-normal'>{"What's hot"}</h2>
      <h1 className='text-3xl'>Most Popular</h1>

      <MenuPosts withImage={false} data={mostPopular} />
      <h2 className='text-gray-500 text-base font-normal'>Discover by topic</h2>
      <h1 className='text-3xl'>Categories</h1>
      <MenuCategories />

      <h2 className='text-gray-500 text-base font-normal'>Choosen by the editor</h2>
      <h1 className='text-3xl'>Editors Pick</h1>
      <MenuPosts withImage={true} data={editorsPick} />

    </div>
  )
}
