import React from 'react'
import SubscribeForm from './SubscribeForm'

export default function Subscribe() {
  return (
    <div className='flex flex-col gap-8 mt-32 max-w-xl mx-auto'>
      <div className='flex flex-col items-center justify-center gap-6 w-full p-8 md:p-12 bg-[#392467] rounded-3xl shadow-2xl shadow-cta/20 border border-white/5'>
        <div className="space-y-2 text-center text-white">
          <h2 className='text-2xl md:text-3xl font-bold'>Join the community</h2>
          <p className='text-white/80 max-w-sm mx-auto'>
            Get my best technical insights and career advice delivered straight to your inbox.
          </p>
        </div>

        <div className='w-full'>
          <SubscribeForm />
        </div>
      </div>
    </div>
  )
}
