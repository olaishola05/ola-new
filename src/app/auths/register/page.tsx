import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import LoginButton from '@/components/auths/LoginButton'
import Register from '@/components/auths/register'


export const metadata: Metadata = {
  title: 'Register | Kindly Sign Up',
  description: 'Register page',
}

export default function RegisterPage() {
  return (
    <main className='w-full overflow-hidden bg-bg'>
      <div className='my-5 bg-softBg mx-auto h-full w-full py-10 px-2 gap-8 flex flex-col items-center md:my-20 md:w-1/2 rounded-lg md:gap-3 md:py-4 dark:bg-softBg'>
        <div className='flex flex-col gap-2 items-center md:gap-3'>
          <h1 className='text-2xl font-bold md:text-3xl text-textColor text-center'>Welcome!</h1>
          <p className='text-textColor text-center'>Create account</p>
        </div>
        <Register />
        <div className='flex gap-4 items-center w-11/12 my-1 mx-auto md:w-11/12 md:justify-center md:text-center md:items-center'>
          <hr className='w-34 text-[#D6DDEC] md:w-36' />
          <span className='md:text-lg'>or</span>
          <hr className='w-34 text-[#D6DDEC] md:w-36' />
        </div>
        <LoginButton />
        <div>
          <p className='text-sm text-center md:text-base'>Have account? <Link href="/auths/signin" className='text-blue-400'>Sign In</Link></p>
        </div>
      </div>
    </main>
  )
}
