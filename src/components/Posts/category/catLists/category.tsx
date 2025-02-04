'use client';

import React from 'react'
import Link from 'next/link'

export default function Category({ cats }: { cats: string[] }) {
  return (
    <div
      className="self-center flex flex-wrap md:flex-nowrap w-1/2 md:max-w-[50%] items-center justify-center gap-3">
      {cats?.slice(0, 10).map((title: string, index: number) => (
        <Link href={`/blog/posts?cat=${title}`} passHref={true}
          className='text-textColor text-lg'
          key={index}>
          {title}
        </Link>
      ))}
    </div>
  )
}
