import React from 'react'
import Link from 'next/link'
import styles from './menu.module.css'
import prisma from '@/app/lib/prisma'

const getPosts = async () => {
  const postsWithViews = await prisma.post
    .findMany({
      where: { views: { gt: 100 } },
    })
  return { data: postsWithViews }
}

export default async function MenuPostsMostVisits() {
  const { data } = await getPosts()
  return (
    <>
      {data.length > 0 && <div className='flex flex-col gap-1'>
        <h2 className='text-gray-500 text-base font-normal'>See most read topics</h2>
        <h1 className='text-3xl'>Most Visits</h1>
        {data.slice(0, 5)?.map(({ id, title, slug, catSlug }) => (
          <Link href={`/blog/posts/${slug}`} className='flex items-center gap-5' key={id}>
            <div className='flex-4 flex flex-col gap-[5px]'>
              <span className={`text-[12px] rounded-[10px] py-[3px] px-2 text-white max-w-max capitalize ${styles[catSlug!]}`}>{catSlug}</span>
              <h3 className='text-lg font-medium text-softText max-w-[300px] whitespace-normal'>{title}</h3>
            </div>
          </Link>
        ))}
      </div>}
    </>
  )
}
