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

  const filteredData = categories.filter((value, index, self) =>
    self.findIndex(v => v.title === value.title) === index
  );

  return (
    <>
      <h2 className='text-gray-500 text-base font-normal'>Discover by topic</h2>
      <h1 className='text-3xl'>Categories</h1>
      <div className={styles.categoryList}>
        {filteredData?.map(({ id, title }) => (
          <Link href={`/blog/posts?cat=${title}`} key={id} className={`${styles.categoryItem} ${styles[title]}`}>
            {title}
          </Link>
        ))}
      </div></>
  )
}
