import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './menu.module.css'

export default function MenuPosts({ withImage, data }: { withImage: boolean, data: any[] }) {
  return (
    <div className='flex flex-col gap-9 mt-9 mb-[60px]'>
      {data?.map(({ _id, title, img, createdAt, slug, catSlug, user }) => (
        <Link href={`/posts/${slug}`} className='flex items-center gap-5' key={_id}>
          {withImage && (
            <div className='flex-1 relative aspect-square'>
              <Image src={img || ''} alt='post image' fill className='rounded-full object-cover border-[3px] border-gray-300' />
            </div>
          )}
          <div className='flex-4 flex flex-col gap-[5px]'>
            <span className={`text-[12px] rounded-[10px] py-[3px] px-2 text-white max-w-max capitalize ${styles[catSlug]}`}>{catSlug}</span>
            <h3 className='text-lg font-medium text-softText'>{title || 'something random'}</h3>
            <div className='text-base'>
              <span className=''>{user?.name || 'Sam Goddy'}</span>
              <span className='text-gray-500'> - {createdAt.substring(0, 10)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
