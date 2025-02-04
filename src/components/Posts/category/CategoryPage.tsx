import React from 'react'
import styles from './blog.module.css'
import PostCardLists from '@/components/Posts/PostCardLists/PostCardLists';
import Menu from '@/components/Menu/Menu';

export default function CategoryPage({ searchParams }: { searchParams: { page: string, cat: string } }) {
  const page = parseInt(searchParams.page) || 1
  const { cat } = searchParams;
  return (
    <div className='container bg-bg text-textColor mt-16'>
      <h1 className={`${styles.title} ${styles[cat]}`}>{cat} Blog</h1>
      <div className='flex gap-[50px]'>
        <PostCardLists page={page} cat={cat} />
        <Menu searchParams={searchParams} page={page} cat={cat} />
      </div>
    </div>
  )
}
