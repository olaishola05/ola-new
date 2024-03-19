'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

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
    <aside className='flex flex-col gap-20 mt-5 mx-auto items-center'>
      <div className='flex flex-col gap-5 mt-10'>
        <div className='flex gap-2 items-center'>
          {Circle(isActive, '/')}
          <Link href='/' className='text-base text-ctaText'>Home</Link>
        </div>
        <div className='flex gap-2 items-center'>
          {Circle(isActive, '/admin/dashboard')}
          <Link href='/admin/dashboard' className='text-base text-ctaText'>Analytics</Link>
        </div>
        {session?.user?.role.includes('admin') && (<>
          <div className='flex gap-2 items-center'>
            {Circle(isActive, '/admin/dashboard/projects')}
            <Link href='/admin/dashboard/projects' className='text-base text-ctaText'>Projects</Link>
          </div>
          <div className='flex gap-2 items-center'>
            {Circle(isActive, '/admin/dashboard/create')}
            <Link href='/admin/dashboard/create' className='text-base text-ctaText'>Add Project</Link>
          </div>
        </>)}
        <>
          <div className='flex gap-2 items-center'>
            {Circle(isActive, '/admin/dashboard/posts')}
            <Link href="/admin/dashboard/posts" className='text-base text-ctaText'>All Posts</Link>
          </div>
          <div className='flex gap-2 items-center'>
            {Circle(isActive, '/admin/dashboard/posts/drafts')}
            <Link href="/admin/dashboard/posts/drafts" className='text-base text-ctaText'>Draft Posts</Link>
          </div>
          <div className='flex gap-2 items-center'>
            {Circle(isActive, '/admin/dashboard/posts/published')}
            <Link href="/admin/dashboard/posts/published" className='text-base text-ctaText'>Published Posts</Link>
          </div>
        </>
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center flex-col gap-1'>
          {session.user.image && (
            <div className='relative h-[40px] w-10 rounded-full'>
              <Image
                src={session.user.image}
                alt={session.user.name}
                className='absolute w-10 h-10 rounded-full object-cover'
                fill
              />
            </div>
          )}
          <span className='font-bold text-lg text-ctaText'>
            {session.user.name.split(' ').map((name: string) => name[0]).join('')}
          </span>
        </div>
        <span
          className='cursor-pointer text-base capitalize mt-auto text-ctaText'
          onClick={handleLogout}
        >Logout</span>
      </div>
    </aside>
  )
}
