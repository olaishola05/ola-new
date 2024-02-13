import React from 'react'
import Image from 'next/image'

export default function Comment({ key, item }: { key: string, item: any }) {
  return (
    <div className='mt-[50px]' key={key}>
      <div className='mb-[50px]'>
        <div className='flex items-center gap-5 mb-5'>
          {item?.user?.image && (
            <Image src={item?.user?.image} alt="blog image" className='rounded-full object-cover' width={50} height={50} />
          )}
          <div className='flex flex-col gap-[5px] text-softText'>
            <span className='font-medium'>{item?.user?.name}</span>
            <span className='text-sm'>{item?.createdAt}</span>
          </div>
        </div>
        <p className='text-lg font-light'>
          {item?.desc}
        </p>
      </div>
    </div>
  )
}
