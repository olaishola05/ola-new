import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './catlist.module.css'

const getCategories = async () => {
  const res = await fetch('http://localhost:3000/api/v1/categories', {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}

export default async function CategoryList() {
  // const categories = await getCategories()
  const categories = [
    {
      id: 'ascsscscs',
      slug: 'coding',
      img: '',
      title: 'coding'
    },

    {
      id: 'ascssbbs',
      slug: 'style',
      img: '',
      title: 'style'
    },

    {
      id: 'ascsdbbs',
      slug: 'food',
      img: '',
      title: 'Food'
    },

    {
      id: 'ascxdbbs',
      slug: 'travel',
      img: '',
      title: 'travel'
    },
  ]
  return (
    <div className=''>
      <h1 className={`${styles.title} text-3xl text-softText font-medium`}>Popular Categories</h1>
      <div className={styles.categories}>
        {categories?.map(({ id, slug, img, title }: any) => (
          <Link href={`/blog/posts?cat=${slug}`} passHref={true}
            className={`${styles.category} ${styles[slug]}`}
            key={id}>
            {img && (
              <Image src={img} width={32} height={32} alt="category1" className={styles.image} />)}
            {title}
          </Link>
        ))}
      </div>
    </div>
  )
}
