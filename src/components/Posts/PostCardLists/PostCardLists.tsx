import React from 'react'
import PostCard from '../PostCard/PostCard'
import styles from './postcardlists.module.css'
import Pagination from '../pagination/Pagination'

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

export default async function PostCardLists({ page, cat }: { page: number, cat?: string }) {
  const { data, count } = await getPosts(page, cat!)
  const POST_PER_PAGE = 4
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
  return (
    <div className='flex-3'>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className="posts">
        {data.posts?.map((item: any) => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  )
}
