'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Circle = (isActive: (pathname: string) => boolean, pathname: string) => (
  <div className={`w-2 h-2 rounded-full ${isActive(pathname) && 'bg-blue-400'}`}></div>
)

export default function DashBoardSidebar({ session }: any) {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  if (!session?.user?.role.includes('admin') && !session?.user?.role.includes('author')) {
    redirect('/')
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <div className='flex flex-col gap-5 mt-5 mx-auto'>
      <div className='flex gap-2 items-center'>
        {Circle(isActive, '/')}
        <Link href='/admin/dashboard' className='text-base text-[var(--textColor)]'>Home</Link>
      </div>
      <div className='flex gap-2 items-center'>
        {Circle(isActive, '/admin/dashboard')}
        <Link href='/admin/dashboard' className='text-base text-[var(--textColor)]'>Analytics</Link>
      </div>
      {session?.user?.role.includes('admin') && (<>
        <div className='flex gap-2 items-center'>
          {Circle(isActive, '/admin/dashboard/projects')}
          <Link href='/admin/dashboard/projects' className='text-base text-[var(--textColor)]'>Projects</Link>
        </div>
        <div className='flex gap-2 items-center'>
          {Circle(isActive, '/admin/dashboard/create')}
          <Link href='/admin/dashboard/create' className='text-base text-[var(--textColor)]'>Add Project</Link>
        </div>
      </>)}
      <>
        <div className='flex gap-2 items-center'>
          {Circle(isActive, '/admin/dashboard/posts')}
          <Link href="/admin/dashboard/posts" className='text-base text-[var(--textColor)]'>All Posts</Link>
        </div>
        <div className='flex gap-2 items-center'>
          {Circle(isActive, '/admin/dashboard/posts/drafts')}
          <Link href="/admin/dashboard/posts/drafts" className='text-base text-[var(--textColor)]'>Draft Posts</Link>
        </div>
        <div className='flex gap-2 items-center'>
          {Circle(isActive, '/admin/dashboard/posts/published')}
          <Link href="/admin/dashboard/posts/published" className='text-base text-[var(--textColor)]'>Published Posts</Link>
        </div>
      </>
      <span className='cursor-pointer text-base capitalize' onClick={handleLogout}>Logout</span>
    </div>
  )
}
