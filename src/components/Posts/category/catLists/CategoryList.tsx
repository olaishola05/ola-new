import React from 'react'
import Link from 'next/link'
import styles from './catlist.module.css'
import prisma from '@/app/lib/prisma'
import {mostUsedTags} from "@/components/Posts";

const getCategories = async () => {
    return await prisma.category.findMany()
}

export default async function CategoryList() {
  const categories = await getCategories()
  const cats: string[] = mostUsedTags(categories)
  return (
      <>
          {cats.length > 0 && (
              <div className='flex flex-col'>
                  <h1 className={`${styles.title} text-3xl text-softText font-medium`}>Popular Categories</h1>
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
              </div>
          )}
      </>
  )
}
