import React from 'react'
import Link from 'next/link'
import styles from './catlist.module.css'
import prisma from '@/app/lib/prisma'
import { Slice } from 'lucide-react'

const getCategories = async () => {
  return await prisma.category.findMany()
}

export default async function CategoryList() {
  const categories = await getCategories()
  const filteredCategories = categories.filter((value, index, self) =>
    self.findIndex(v => v.title === value.title) === index
  );

  return (
    <div className='flex flex-col'>
      <h1 className={`${styles.title} text-3xl text-softText font-medium`}>Popular Categories</h1>
      <div className="self-center flex flex-wrap md:flex-nowrap w-1/2 md:max-w-[50%] items-center justify-center gap-3">
        {filteredCategories?.slice(0, 10).map(({ id, title }: any) => (
          <Link href={`/blog/posts?cat=${title}`} passHref={true}
            className='text-textColor text-lg'
            key={id}>
            {title}
          </Link>
        ))}
      </div>
    </div>
  )
}
