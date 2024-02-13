import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Featured() {
  return (
    <div className='mt-8'>
      <h1 className='text-[32px] md:text-[64px] lg:text-[90px] font-light'>
        <b>Hey, Ola here!</b> Discover my stories and creative ideas.
      </h1>
      <div className='mt-[60px] flex flex-col md:flex-row items-center gap-[50px]'>
        <div className='flex-1 h-[500px] relative'>
          <Image src="/images/portrait-me.jpeg" alt="post" fill className='object-cover' />
        </div>
        <div className='flex-1 flex flex-col gap-5'>
          <h1 className='text-5xl'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </h1>
          <p className='text-xl font-light text-softText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quidem sequi accusamus. Cupiditate in ratione, fugiat dolorem ipsa quos distinctio a nesciunt, laudantium laborum delectus ipsum iste. Molestias officia ex nemo.</p>
          <Link href='/blog/posts/1' className='py-4 px-5 rounded-md border border-black max-w-max'>Read More</Link>
        </div>
      </div>
    </div>
  )
}
