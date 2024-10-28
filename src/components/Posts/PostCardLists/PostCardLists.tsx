import React from 'react'
import PostCard from '../PostCard/PostCard'
import Pagination from '../pagination/Pagination'
import {getPostsByCats} from '@/app/lib'

const getPosts = async (page: number, cat: string, POST_PER_PAGE: number) => {
  return  await getPostsByCats(page, cat!, POST_PER_PAGE)
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
    <div className='flex-4'>
      {count > 0 && filteredData.length > 0 ? (
        <React.Fragment>
          <h1 className= "text-2xl md:text-4xl my-12">{cat ? `Recent posts in ${cat}` : 'Recent Posts'}</h1>
          <div className="posts">
            {filteredData.map((post: any, index: number) => (
              <PostCard key={index} item={post} catSlug={cat} />
            ))}
          </div>
          <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
        </React.Fragment>
      ) : (
        <h1 className={!cat ? 'mt-16 text-3xl text-center' : 'mt-8 text-center text-2xl'}>
          {cat ? <p>No posts found on <span className='font-bold'>{cat}</span> category</p> : 'No Posts Found'}</h1>
      )}
    </div>
  )
}
