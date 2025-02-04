import React from 'react'
import { getAuthSession } from '@/app/utils/auth';
import DashBoardSidebar from './DashBoardSidebar';

interface Props {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const session = await getAuthSession();
  return (
    <div className='flex justify-between w-screen gap-3'>
      <section className='flex flex-1 h-screen'>
        <div className='bg-cta flex flex-col gap-5 w-full px-2 shadow-md'>
          <h1 className='text-2xl text-center pt-5 font-bold text-ctaText md:text-4xl'>Dashboard</h1>
          <DashBoardSidebar session={session} />
        </div>
      </section>
      <section className='flex-4 h-full bg-bg relative p-5'>
        <p className='absolute right-16 top-5 text-textColor'>Hello {session?.user?.name?.split(" ")[0]}!</p>
        {children}
      </section>
    </div>
  )
}
