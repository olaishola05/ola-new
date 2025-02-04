import React from 'react'
import styles from './catlist.module.css'
import prisma from '@/app/lib/prisma'
import { mostUsedTags } from "@/components/Posts";
import Category from './category';

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
          <Category cats={cats} />
        </div>
      )}
    </>
  )
}
