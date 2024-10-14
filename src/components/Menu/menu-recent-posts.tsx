'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";

export default function MenuRecentPosts({ data, catSlug }: { data: any[], catSlug: string | undefined }) {
  const pathname = usePathname()
  const filteredData = data?.filter(post => post !== null && pathname ? !pathname.includes(post.data.slug) : '')

  if (filteredData?.length <= 0) return null

  return (
    <div className='flex flex-col gap-1 mb-[30px]'>
      <h2 className='text-gray-500 text-base font-normal'>{"What's hot"}</h2>
      <h1 className='text-3xl'>Most Recents</h1>
      {filteredData?.slice(0, 5)?.map((post, index: number) => (
        <Link href={`/blog/posts/${post.data.slug}`} className='flex items-center gap-5' key={index}>
          <div className='flex-4 flex flex-col gap-[5px]'>
            <span className={`text-[12px] rounded-[10px] py-[3px] px-2 text-textColor font-light max-w-max capitalize ${catSlug ? 'border border-cta' : ''}`}>{catSlug}</span>
            <h3 className='text-lg font-medium text-softText max-w-[300px] whitespace-normal'>{post.data.title}</h3>
            <div className='text-base'>
              <span className='text-gray-500'> Published - {post.data.date?.substring(0, 15)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}