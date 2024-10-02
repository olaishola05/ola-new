import React from 'react'
import Image from 'next/image'
import Menu from '@/components/Menu/Menu'
import styles from './slug.module.css'
import Comments from '@/components/Comments/Comments'
import Subscribe from '@/components/Subscribe/Subscribe'
import { notFound } from 'next/navigation'
import { getPost } from '@/app/lib'
import PostBody from '@/components/MDX/post-body'
import { formatDate, readTimeInfo } from '@/app/utils'
import prisma from '@/app/lib/prisma'

const fetchPost = async (slug: string) => {
  const post = await getPost(slug)
  await prisma.post.update({
    where: {
      slug: slug
    }, data: {
      views: {
        increment: 1
      }
    }
  })
  return post
}

export default async function SinglePost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await fetchPost(slug);

  if (!post) {
    return notFound()
  }

  const user = {
    image: '',
    name: 'John Doe'
  }

  const { data, body } = post;
  const { title, postImg, author, date, categories } = data
  return (
    <div className=' w-full md:w-7/12 mt-20 mx-auto flex gap-10 relative'>
      <div className='w-full md:w-11/12'>
        <div className='flex flex-col-reverse gap-5'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-3xl md:text-5xl text-textColor w-full font-semibold'>{title}</h1>
            <div className='flex gap-2'>
              {user?.image ? (
                <div className={styles.userImgContainer}>
                  <Image src={user?.image} alt="user" fill className={styles.avatar} />
                </div>
              ) : (
                <div className='rounded-full p-3 h-[50px] w-[50px] object-cover border border-gray-600 flex items-center justify-center'>
                  <p className='font-bold text-xl'>{author.split(' ')
                    .map(word => word[0].toUpperCase())
                    .join('')}
                  </p>
                </div>
              )}
              <div className='flex flex-col gap-0'>
                <span className={styles.username}>{author}</span>
                <span className={styles.date}>{readTimeInfo(body)} - {formatDate(date)}</span>
              </div>
            </div>
          </div>
          {postImg && postImg.startsWith('/' && 'http') && (
            <div className='relative w-full h-[250px] md:h-[500px]'>
              <Image src={postImg || ''} alt={postImg} className='object-cover rounded-lg' fill />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.post}>
            <div className={styles.description}>
              <PostBody>
                {body}
              </PostBody>
              <div className='flex gap-2 items-center flex-wrap mt-20'>
                {Array.isArray(categories) && categories.length > 0 && categories?.map((cat: string, index: number) => (
                  <span key={index} className='bg-softBg text-softText text-lg rounded-lg px-3 py-2 capitalize'>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.comments}>
              <Subscribe />
              <Comments postSlug={slug} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-2/6 fixed -right-[200px] top-20'>
        <Menu />
      </div>
    </div>
  )
}
