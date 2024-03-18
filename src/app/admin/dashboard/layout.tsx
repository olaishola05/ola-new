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
      <section className='flex w-1/5 h-screen'>
        <div className='bg-bg flex flex-col gap-5 w-full px-2 border-r-2'>
          <h1 className='text-2xl text-center pt-5 font-bold text-[var(--primary)] md:text-4xl'>Dashboard</h1>
          <DashBoardSidebar session={session} />
        </div>
      </section>
      <section className='w-[80%] h-full bg-bg relative p-5'>
        <p className='absolute right-14 top-5'>Hello {session?.user?.name?.split(" ")[0]}!</p>
        {children}
      </section>
    </div>
  )
}
