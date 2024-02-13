import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
  title: string,
  desc: string,
  createdAt: string,
  catSlug: string,
  img: string,
  slug: string,
}

export default function PostCard({ item }: { item: PostCardProps }) {
  const { title, desc, createdAt, catSlug, img, slug } = item
  return (
    <div className='mb-[50px] flex items-center gap-[50px]'>
      {img && (
        <div className='flex-1 h-[350px] relative md:hidden'>
          <Image src={img} alt={img} fill className='object-cover' />
        </div>
      )}

      <div className='flex-1 flex flex-col gap-[30px]'>
        <div className=''>
          <span className='text-gray-400'>{createdAt.substring(0, 10)} - </span>
          <span className='text-red-700 font-medium uppercase'>{catSlug}</span>
        </div>
        <Link href={`/posts/${slug}`} className=''>
          <h1>{title}</h1>
        </Link>
        <p className='text-lg font-light text-softText'>{desc.substring(0, 60)}</p>
        <Link href={`/posts/${slug}`} className='border-b border-red-700 py-[2px] px-0 max-w-max'>Read More</Link>
      </div>
    </div >
  )
}
