'use client';

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Category } from '@prisma/client';
import { mostUsedTags } from "@/components/Posts";

export default function Cats({ categories }: { categories: Category[] }) {
  const pathname = usePathname()

  const isValidPath = pathname.includes('/posts') && !pathname.endsWith('/blog');
  if (!isValidPath) {
    return null
  }

  const cats: string[] = mostUsedTags(categories)
  return (
    <>
      {cats.length > 0 && (
        <>
          <h2 className='text-gray-500 text-base font-normal'>Discover by topic</h2>
          <h1 className='text-3xl'>Categories</h1>
          <div className='w-1/2 grid grid-cols-3 gap-1 mt-3'>
            {cats?.map((title: string, index: number) => (
              <Link
                href={`/blog/posts?cat=${title}`}
                key={index}
                className='text-lg font-semibold text-textColor'
              >
                {title}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}
