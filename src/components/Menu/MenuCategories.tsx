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
    <div className={styles.categoryList}>
      {categories?.data?.map(({ _id, slug, title }: any) => (
        <Link href={`/blog/posts?cat=${slug}`} key={_id} className={`${styles.categoryItem} ${styles[slug]}`}>
          {title}
        </Link>
      ))}
    </div>
  )
}
