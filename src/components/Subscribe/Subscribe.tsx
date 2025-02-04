import React from 'react'
import SubscribeForm from './SubscribeForm'

export default function Subscribe() {
  return (
    <div className='flex flex-col gap-5 mt-20 max-w-max mx-auto'>
      <h2 className='text-center text-xl font-medium text-softText'>Subscribe to my Newsletter!</h2>
      <div className='flex flex-col items-center justify-center gap-3 w-full px-2 py-8 md:py-16 bg-[#392467] rounded-md dark:bg-[#1f273a]'>
        <p className='text-center text-white w-10/12'>
          Be the first to know about new posts and updates, subscribe to my newsletter now!
        </p>
        <div className='w-10/12'>
          <SubscribeForm />
        </div>
      </div>
    </div>
  )
}
