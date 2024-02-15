import React from 'react'
import SubscribeForm from './SubscribeForm'

export default function Subscribe() {
  return (
    <div className='flex flex-col gap-5 mt-20 max-w-max mx-auto'>
      <h2 className='text-center'>Subscribe to my Newsletter!</h2>
      <p>
        Be the first to know about new posts and updates, subscribe to my newsletter now!
      </p>
      <SubscribeForm />
    </div>
  )
}
