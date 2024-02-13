import CategoryPage from '@/components/Posts/category/CategoryPage'
import React from 'react'

export default function page({ searchParams }: { searchParams: { page: string, cat: string } }) {
  return (
    <>
      <CategoryPage searchParams={searchParams} />
    </>
  )
}
