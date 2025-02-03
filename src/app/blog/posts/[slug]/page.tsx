import React from 'react'
import Image from 'next/image'
import styles from './slug.module.css'
import Comments from '@/components/Comments/Comments'
import Subscribe from '@/components/Subscribe/Subscribe'
import { notFound } from 'next/navigation'
import { fetchPublishedPosts, getPost } from '@/app/lib'
import CustomMDX from '@/components/MDX/custom-mdx'
import ReadTracker from '@/components/Posts/post-tracker/read-tracker'
import { headers } from 'next/headers';
import { trackEvent } from '@/actions'
import PostsTags from "@/components/Posts/post-tags/posts-tags";
import PostMetaData from "@/components/Posts/post-meta/post-metatdata";
import RelatedPosts from "@/components/Posts/suggest posts/related-post";
import PreviousPage from "@/components/Posts/previousPage/PreviousPage";
import Menu from '@/components/Menu/Menu'
import Toc from '@/components/MDX/Toc'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await fetchPublishedPosts()
  if (!posts) return []

  return posts
    .filter(post => post?.data?.slug) // Filter out any posts with undefined slugs
    .map((post) => ({
      slug: post?.data.slug as string
    }))
}

const fetchPost = async (slug: string) => {
  return await getPost(slug)
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
  const { title, postImg, author, date, categories, postId } = data

  return (
    <div className='w-full md:w-10/12 flex gap-10 mt-4 md:mt-20 mx-auto relative'>
      <div className='w-full md:w-8/12'>
        <div className='w-full overflow-scroll'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
              <h1 className='text-2xl md:text-5xl text-textColor w-full font-semibold'>{title}</h1>
            </div>
            {postImg && postImg.startsWith('http') && (
              <div className='relative w-full h-[250px] md:h-[400px]'>
                <Image
                  sizes="100vw"
                  src={postImg || ''} alt={postImg}
                  className='object-cover rounded-lg'
                  fill
                  loading='lazy'
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
            <PostMetaData author={author} body={body} date={date} />
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              <div id='post-content'>
                <CustomMDX source={body} />
                <PostsTags categories={categories} />
              </div>
              <PreviousPage referrer={referrer} />
              <RelatedPosts slug={slug} />
              <div className={styles.comments}>
                <Subscribe />
                {/* <Comments postSlug={slug} /> */}
              </div>
            </div>
          </div>
          <ReadTracker slug={slug} />
        </div>
      </div>
      <div className='hidden md:block w-[25%] md:fixed right-36'>
        <Toc postId={postId} />
        <Menu />
      </div>
    </div>
  )
}
