import React from 'react'
import Link from 'next/link'
import styles from './menu.module.css'

const getCategories = async () => {
  const res = await fetch('http://localhost:3000/api/v1/categories', {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}

export default async function MenuCategories() {
  const categories = await getCategories()
  return (
    <>
      <h2 className='text-gray-500 text-base font-normal'>Discover by topic</h2>
      <h1 className='text-3xl'>Categories</h1>
      <div className={styles.categoryList}>
        {categories?.data?.map(({ _id, slug, title }: any) => (
          <Link href={`/blog/posts?cat=${slug}`} key={_id} className={`${styles.categoryItem} ${styles[slug]}`}>
            {title}
          </Link>
        ))}
      </div>
    </>
  )
}
