import React from 'react'
import PostCard from '../PostCard/PostCard'
import Pagination from '../pagination/Pagination'
import { getPostsByCats } from '@/app/lib'
import Image from 'next/image'

const getPosts = async (page: number, cat: string, POST_PER_PAGE: number) => {
  return await getPostsByCats(page, cat!, POST_PER_PAGE)
}

const ArticleComingSoon = () => {
  return (
    <div className='w-full flex flex-col gap-16 mt-16 justify-center items-center'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-3xl text-center'>Sorry no post found! We are hard at work</h2>
        <p className='text-base md:text-lg text-textColor'>As you may rightly know that writing is an art and to create a masterpiece takes some time.</p></div>
      <div>
        <Image src='/images/content-creator.svg' alt='content-creator' width={500} height={500} />
      </div>
    </div>
  )
}

export default async function PostCardLists({ page, cat }: { page: number, cat?: string }) {
  const POST_PER_PAGE = 4
  const result = await getPosts(page, cat!, POST_PER_PAGE)

  if (!result) {
    return "Error occurred while fetching posts"
  }
  const { data, count } = result
  const filteredData = data?.filter(post => post !== null)
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={filteredData?.length > 0 ? 'flex-4' : 'w-full'} >
      {count > 0 && filteredData.length > 0 ? (
        <React.Fragment>
          <h1 className="text-2xl md:text-4xl my-12">{cat ? `Recent posts in ${cat}` : 'Recent Posts'}</h1>
          <div className="posts">
            {filteredData.map((post: any, index: number) => (
              <PostCard key={index} item={post} catSlug={cat} />
            ))}
          </div>
          <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
        </React.Fragment>
      ) : (
        <>
          {cat ? <h2 className='text-center text-2xl mt-8'>No posts found on <span className='font-bold'>{cat}</span> category</h2> : <ArticleComingSoon />}</>
      )}
    </div>
  )
}
