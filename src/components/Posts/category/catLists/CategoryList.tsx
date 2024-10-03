import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './catlist.module.css'

const getCategories = async () => {
}

export default async function CategoryList() {
  // const categories = await getCategories()
  const categories = [
    {
      id: 'ascsscscs',
      slug: 'react',
      title: 'React'
    },

    {
      id: 'ascssbbs',
      slug: 'mindset',
      title: 'mindset'
    },

    // {
    //   id: 'ascsdbbs',
    //   slug: 'lifestyle',
    //   title: 'Lifestyle'
    // },

    {
      id: 'ascxdbbs',
      slug: 'travel',
      title: 'travel'
    },

    {
      id: 'ascxdbbs',
      slug: 'productivity',
      title: 'productivity'
    },

    {
      id: 'ascxdbbs',
      slug: 'hack',
      title: 'hack'
    },
    {
      id: 'ascxdbbs',
      slug: 'programming',
      title: 'programming'
    },
  ]
  return (
    <div className='flex flex-col'>
      <h1 className={`${styles.title} text-3xl text-softText font-medium`}>Popular Categories</h1>
      <div className="self-center flex flex-wrap md:flex-nowrap w-1/2 md:max-w-[50%] items-center justify-center gap-3">
        {categories?.map(({ id, slug, title }: any) => (
          <Link href={`/blog/posts?cat=${slug}`} passHref={true}
            className={`${styles.category} ${styles[slug]}`}
            key={id}>
            {title}
          </Link>
        ))}
      </div>
    </div>
  )
}
