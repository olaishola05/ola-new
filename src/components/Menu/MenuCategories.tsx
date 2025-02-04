import React from 'react'
import prisma from '@/app/lib/prisma'
import Cats from './Cats'

const getCategories = async () => {
  const categories = await prisma.category.findMany()
  return categories
}

export default async function MenuCategories() {
  const categories = await getCategories()

  if (categories.length <= 0) {
    return null
  }
  return (
    <>
      <Cats categories={categories} />
    </>
  )
}
