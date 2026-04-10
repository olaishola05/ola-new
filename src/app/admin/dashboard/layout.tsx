import React from 'react'
import { getAuthSession } from '@/app/utils/auth';
import DashBoardSidebar from './DashBoardSidebar';
import MobileDashboardDrawer from '@/components/Layouts/MobileDashboardDrawer';

interface Props {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const session = await getAuthSession();
  return (
    <div className='flex w-screen h-screen overflow-hidden bg-bg'>
      {/* Desktop Sidebar */}
      <aside className='hidden lg:flex flex-col w-72 h-screen bg-cta shadow-2xl'>
        <h1 className='text-3xl text-center py-8 font-extrabold text-ctaText tracking-tighter'>Dashboard</h1>
        <DashBoardSidebar session={session} />
      </aside>

      {/* Main Content */}
      <main className='flex-1 h-full relative overflow-y-auto scrollbar-thin scrollbar-thumb-cta/10 scrollbar-track-transparent'>
        {/* Mobile Header (Dashboard only) */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-softBg sticky top-0 bg-bg z-40">
          <MobileDashboardDrawer session={session} />
          <h1 className="text-xl font-bold text-textColor">Dashboard</h1>
          <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center text-cta font-bold text-xs">
            {session?.user?.name?.split(" ")[0][0]}
          </div>
        </div>

        <div className="p-4 md:p-8">
          {children}
        </div>

        {/* Padding for MobileBottomNav */}
        <div className="h-24 md:hidden" />
      </main>
    </div>
  )
}
