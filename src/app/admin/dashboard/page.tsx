import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Admin',
  description: 'Admin dashboard page',
}

export default function page() {
  return (
    <main className='flex items-center justify-center my-[200px] mx-auto'>
      <h1 className='text-7xl font-bold'>Coming soon</h1>
    </main>
  )
}
