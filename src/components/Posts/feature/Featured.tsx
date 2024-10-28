import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {latestPost} from '@/app/lib'

const getFeaturedPost = async () => {
  return await latestPost()
}

const BlogHeader = () => {
  return <div className='mt-8'>
    <h1 className='text-[32px] md:text-[64px] font-light'>
      <span className="text-cta font-bold">Code 'n' Beyond!</span>
    </h1>
    <div className='flex flex-col gap-4 w-full'>
      <p className='text-textColor text-base md:text-lg'>Welcome to my corner of the web! I'm a passionate software developer who believes in sharing knowledge,
        solving puzzles, and exploring the ever-evolving landscape of technology.
        Here, you'll find my thoughts and experiences on web development, deep dives into technical solutions, and
        insights into the technologies shaping our digital world. But I also believe that tech doesn't exist in a vacuum
        – so expect occasional musings on life, growth, and the human side of development.
      </p>

      <p className='text-textColor text-base md:text-lg'>
        Whether you're debugging a tricky issue, exploring new frameworks, or seeking fresh perspectives on tech and
        life, you're in the right place. Think of this blog as a developer's journal meets problem-solving repository,
        sprinkled with life lessons learned along the way. Dive into my posts, join the conversation, and let's learn
        together in this exciting journey through code and beyond.
      </p>
    </div>
  </div>
}


export default async function Featured() {
  const post = await getFeaturedPost()

  if (!post) {
    return <BlogHeader/>
  }

  const {data} = post
  return (
      <>
        <BlogHeader/>
        {Object.keys(data).length > 0 ? (
            <div className='mt-[60px] flex flex-col md:flex-row items-center gap-[50px]'>
              <div className='w-full md:flex-1 h-[300px] md:h-[500px] relative'>
                <Image src={data.postImg} alt="post" fill className='object-cover rounded-lg'/>
              </div>
              <div className='w-full md:flex-1 flex flex-col gap-5'>
                <h1 className='text-3xl md:text-5xl text-cta font-medium'>{data.title}</h1>
                <p className='text-lg font-light text-softText'>{data.description?.substring(0, 200)}...</p>
                <Link href={`/blog/posts/${data.slug}`} className='py-4 px-5 rounded-md border border-black max-w-max'>Read
                  More</Link>
              </div>
            </div>
        ) : null}
      </>
  )
}
