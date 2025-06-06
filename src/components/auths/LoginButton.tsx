'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { BsGithub } from 'react-icons/bs'

export default function LoginButton({ from }: { from?: string }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const handleLogin = async (provider: string) => {
    try {
      setIsLoading(!isLoading)
      const res = await signIn(provider, {
        callbackUrl: from || '/',
      });
      if (res?.error) {
        console.log(res.error);
        throw new Error(res.error);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <>
      <button className='w-full h-10 md:w-[350px] justify-center flex gap-2 items-center text-base cursor-pointer px-2 py-3 border rounded-md shadow-sm md:text-base md:py-5 md:px-2 bg-black text-white' onClick={() => handleLogin('github')}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in..' : 'Continue with'}
        <BsGithub className='inline-block mr-2 md:mr-1 text-white' />
      </button></>
  )
}
