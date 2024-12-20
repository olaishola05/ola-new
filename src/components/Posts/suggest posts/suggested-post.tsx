import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ItemData {
  title: string,
  date: string,
  postImg?: string,
  slug: string,
}

interface PostCardProps {
  post: ItemData | undefined
}

export default function SuggestedPost({ post }: PostCardProps) {
  const { title, date, postImg, slug } = post || {}

  const fallbackImage = '/images/blogs/placeholder.jpeg'
  const imageSrc = postImg && postImg !== 'undefined' && postImg.trim() !== ''
    ? postImg
    : fallbackImage

  return (
    <>
      {imageSrc && (
        <Link href={`/blog/posts/${slug}`}
          className='flex flex-col w-[350px]' key={slug}>
          <div className='relative h-[250px] w-full'>
            <Image
              src={imageSrc}
              alt={title || 'Post Image'}
              className='object-cover rounded-lg w-full'
              priority
              fill
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Link href={`/blog/posts/${slug}`} className='hover:text-cta'>
              <h2 className='text-base md:text-xl text-cta font-semibold'>{title}</h2>
            </Link>
          </div>
        </Link>
      )}
    </>
  )
}
