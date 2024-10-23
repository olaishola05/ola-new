import React from 'react'
import Image from 'next/image'
import Menu from '@/components/Menu/Menu'
import styles from './slug.module.css'
import Comments from '@/components/Comments/Comments'
import Subscribe from '@/components/Subscribe/Subscribe'
import { notFound } from 'next/navigation'
import { fetchPublishedPosts, getPost } from '@/app/lib'
import PostBody from '@/components/MDX/post-body'
import { formatDate, readTimeInfo } from '@/app/utils'
import ReadTracker from '@/components/Posts/post-tracker/read-tracker'
import { headers } from 'next/headers';
import { trackEvent } from '@/actions'

export async function generateStaticParams() {
  const posts = await fetchPublishedPosts()
  return posts?.map((post) => ({ slug: post?.data.slug }))
}

const fetchPost = async (slug: string) => {
  const post = await getPost(slug)
  return post
}

export default async function SinglePost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await fetchPost(slug);

  if (!post) {
    return notFound()
  }

  const { data, body } = post;

  const headersList = headers();
  const referrer = headersList.get('referer') || null;

  await trackEvent({ slug: slug, eventType: 'view', referrer });

  const { title, postImg, author, date, categories } = data
  return (
    <div className=' w-full md:w-7/12 mt-4 md:mt-20 mx-auto flex gap-10 relative'>
      <div className='w-full md:w-11/12'>
        <div className='flex flex-col-reverse gap-5'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-2xl md:text-5xl text-textColor w-full font-semibold'>{title}</h1>
            <div className='flex gap-2 items-center'>
              <div className='rounded-full p-3 w-8 h-8 md:h-[50px] md:w-[50px] object-cover border border-gray-600 flex items-center justify-center'>
                <p className='font-bold text-lg md:text-xl'>{author.split(' ')
                  .map(word => word[0].toUpperCase())
                  .join('')}
                </p>
              </div>
              <div className='flex flex-col gap-0'>
                <span className='text-lg md:text-xl'>{author}</span>
                <span className='text-base md:text-lg font-light'>{readTimeInfo(body)} - {formatDate(date)}</span>
              </div>
            </div>
            <hr className='' />
          </div>
          {postImg && postImg.startsWith('/' && 'http') && (
            <div className='relative w-full h-[250px] md:h-[500px]'>
              <Image
                src={postImg || ''} alt={postImg}
                className='object-cover rounded-lg'
                fill
                loading='lazy'
              />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.post}>
            <div id='post-content'>
              <PostBody>
                {body}
              </PostBody>
              <div className='flex gap-2 items-center flex-wrap mt-20'>
                {Array.isArray(categories) && categories.length > 0 && categories?.map((cat: string, index: number) => (
                  <span key={index} className='bg-softBg text-softText md:text-lg rounded-lg px-2 py-1 md:px-3 md:py-2 capitalize text-base'>
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
      <div className='w-2/6 absolute -right-[300px]'>
        <Menu />
      </div>
      <ReadTracker slug={slug} />
    </div>
  )
}
