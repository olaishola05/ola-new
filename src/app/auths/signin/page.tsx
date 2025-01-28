import React, { Suspense } from 'react'
import { Metadata } from 'next'
import Signin from './../../../components/auths/signin'



export const metadata: Metadata = {
  title: 'Welcome back! | Sign In',
  description: 'Sign In page',
}

export default function SigninPage({ searchParams }: { searchParams: { from: string } }) {
  const from = searchParams?.from;
  return (
    <main className='w-full h-full overflow-hidden'>
      <Suspense fallback={<div>Loading...</div>}>
        <Signin from={from} />
      </Suspense>
    </main>
  )
}
