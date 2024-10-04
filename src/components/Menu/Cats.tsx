'use client';

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './menu.module.css'
import { Category } from '@prisma/client';

export default function Cats({ categories }: { categories: Category[] }) {
  const pathname = usePathname()

  const isValidPath = pathname.includes('/posts') && !pathname.endsWith('/blog');
  if (!isValidPath) {
    return null
  }

  return (
    <>
      <h2 className='text-gray-500 text-base font-normal'>Discover by topic</h2>
      <h1 className='text-3xl'>Categories</h1>
      <div className={styles.categoryList}>
        {categories?.map(({ id, slug, title }) => (
          <Link href={`/blog/posts?cat=${slug}`} key={id} className={`${styles.categoryItem} ${styles[slug]}`}>
            {title}
          </Link>
        ))}
      </div></>
  )
}
