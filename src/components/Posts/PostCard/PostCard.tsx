import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ItemData {
  data: {
    title: string,
    description: string,
    date: string,
    postImg?: string,
    slug: string,
  },
}

interface PostCardProps {
  item: ItemData
  catSlug: string | undefined
}

export default function PostCard({ item, catSlug }: PostCardProps) {
  const { title, description, date, postImg, slug } = item?.data || {}

  const fallbackImage = '/images/blogs/placeholder.jpeg'
  const imageSrc = postImg && postImg !== 'undefined' && postImg.trim() !== ''
    ? postImg
    : fallbackImage

  return (
    <div className='flex flex-col md:flex-row items-center gap-[50px] mb-[50px]'>
      {imageSrc && (
        <div className='flex-1 h-[350px] relative'>
          <Image src={imageSrc} alt={title || 'Post Image'} fill className='object-cover rounded-lg' />
        </div>
      )}

      <div className='flex-1 flex flex-col gap-[30px]'>
        <div className=''>
          <span className='text-gray-400'>{date?.substring(0, 15)} </span>
          {catSlug && <span className='text-red-700 font-medium uppercase'> - {catSlug}</span>}
        </div>
        <Link href={`/blog/posts/${slug}`} className='hover:text-indigo-700'>
          <h1 className='text-2xl md:text-3xl font-semibold'>{title}</h1>
        </Link>
        <p className='text-lg font-light text-softText'>{description?.substring(0, 150)}</p>
        <Link href={`/blog/posts/${slug}`} className='border-b border-red-700 py-[2px] px-0 max-w-max hover:text-indigo-600'>
          Read More
        </Link>
      </div>
    </div>
  )
}
