'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { navItems, blogLinks } from '@/app/utils';
import { AuthRoutes } from './AuthRoutes';

interface AdminRoutesProps {
  isActive: (pathname: string) => boolean
  pathname: string
}
interface MobileRoutesProps extends AdminRoutesProps {
  setOpen: (open: boolean) => void
}

const MobileConditionalRoutes = ({ isActive, pathname, setOpen }: MobileRoutesProps) => {
  return (<>
    {pathname.startsWith('/blog') && (<>
      {blogLinks.map(({ path, title, id }) => (
        <Link href={path}
          className={`md:hidden text-lg capitalize ${isActive(path) && 'text-[var(--primary)] font-medium'}`}
          key={id}
          onClick={() => setOpen(false)}
        >
          {title}
        </Link>
      ))}
    </>)}
    {!pathname.startsWith('/blog') && (<>
      {navItems.map(({ path, title, id }) => (
        <Link href={path}
          className={`md:hidden text-lg capitalize ${hoverStyles} ${isActive(path) && 'text-[var(--primary)] font-medium'}`}
          key={id}
          onClick={() => setOpen(false)}
        >
          {title}
        </Link>
      ))}
    </>)}
  </>)
}

const MobileAdminRoutes = ({ session, logout }: any) => {
  const privileges = session?.user?.role.includes('admin') || session?.user.role.includes('author')
  return (
    <>
      {privileges && (
        <>
          <Link href='/blog/write' className='text-lg capitalize md:hidden'>Write</Link>
          <Link href='/admin/dashboard' className='text-lg capitalize md:hidden'>Dashboard</Link>
        </>
      )}
      {session && (<span className='cursor-pointer text-lg capitalize md:hidden' onClick={logout}>Logout</span>)}
    </>
  )
}

export default function AdminRoutes({ isActive, pathname }: AdminRoutesProps) {
  const [open, setOpen] = useState(false)
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <>{!session ? (
      <Link href='/auth/signin' className='cursor-pointer hidden'>Login</Link>
    ) : (
      <AuthRoutes session={session} handleLogout={handleLogout} />
    )}
      <div
        className='flex w-5 h-4 lg:hidden md:hidden flex-col justify-between cursor-pointer'
        onClick={() => setOpen(!open)}>
        <div className='w-full h-[2px] bg-[var(--textColor)]'></div>
        <div className='w-full h-[2px] bg-[var(--textColor)]'></div>
        <div className='w-full h-[2px] bg-[var(--textColor)]'></div>
      </div>
      {open && (
        <div className='absolute top-[80px] left-0 w-full bg-[var(--bg)] flex flex-col items-center justify-start gap-12 text-xl h-[100vh] py-4'>
          <MobileConditionalRoutes isActive={isActive} pathname={pathname} setOpen={setOpen} />
          {!session ? (
            <Link href='/auth/signin' className={`hidden ${hoverStyles}`}>Login</Link>
          ) :
            <MobileAdminRoutes session={session} logout={handleLogout} />
          }
        </div>
      )}
    </>
  )
}

const hoverStyles = `
  hover:font-medium
  hover:bg-[var(--cta)] hover:text-[var(--ctaText)] hover:rounded-full
  hover:px-5 hover:py-2 hover:transition-all hover:duration-300
`
