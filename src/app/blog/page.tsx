import Menu from '@/components/Menu/Menu'
import PostCardLists from '@/components/Posts/PostCardLists/PostCardLists'
import CategoryList from '@/components/Posts/category/catLists/CategoryList'
import Featured from '@/components/Posts/feature/Featured'
import React from 'react'

export default function Home({ searchParams }: { searchParams: { page: string, cat: string } }) {
  const page = parseInt(searchParams.page) || 1
  return (
    <div className='container'>
      <Featured />
      {/* <CategoryList />
      <div className='flex gap-[50px]'>
        <PostCardLists page={page} />
        <Menu />
      </div> */}
    </div>
  )
}
