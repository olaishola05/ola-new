import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { latestPost } from '@/app/lib'

const getFeaturedPost = async () => {
  const post = await latestPost()
  return post
}

export default async function Featured() {
  const post = await getFeaturedPost()

  if (!post) {
    return <div className='mt-8'>
      <h1 className='text-[32px] md:text-[64px] lg:text-[90px] font-light'>
        <b>Hey, Ola here!</b>
      </h1>
      <h2 className='text-5xl md:text-7xl'>Discover my stories and creative ideas.</h2>
    </div>
  }
  const { data } = post
  return (
    <div className='mt-8'>
      <h1 className='text-[32px] md:text-[64px] lg:text-[90px] font-light'>
        <b>Hey, Ola here!</b>
      </h1>
      <h2 className='text-5xl md:text-7xl'>Discover my stories and creative ideas.</h2>
      {Object.keys(data).length > 0 ? (
        <div className='mt-[60px] flex flex-col md:flex-row items-center gap-[50px]'>
          <div className='flex-1 h-[500px] relative'>
            <Image src={data.postImg} alt="post" fill className='object-cover rounded-lg' />
          </div>
          <div className='flex-1 flex flex-col gap-5'>
            <h1 className='text-5xl'>{data.title} </h1>
            <p className='text-xl font-light text-softText'>{data.description}</p>
            <Link href={`/blog/posts/${data.slug}`} className='py-4 px-5 rounded-md border border-black max-w-max'>Read More</Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}
