'use client';

import React from 'react';
import { blogLinks, removeMyWorksWhenNotOnHome, socialLinks } from '@/app/utils';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Link from 'next/link'
import AdminRoutes from './AdminRoutes';
import CustomIcon from '../IconsComponent/CustomIcon';
import { ConditionalRoutes } from './ConditionalRoutes';
import { useSession } from 'next-auth/react';
import SearchPalette from '../Search/SearchPalette';

export default function TopNav() {
  const { status }: any = useSession()
  const routePath = usePathname();
  const isActive = (pathname: string) => routePath === pathname;
  const isBlogPath = routePath.startsWith('/blog');

  const userLoggedIn = status === 'authenticated';

  const navItems = removeMyWorksWhenNotOnHome(routePath);

  return (
    <div className='flex items-center justify-between h-[80px] sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-md border-b border-softBg/30 px-6 lg:px-12 transition-all duration-300'>
      <div className='flex gap-2 flex-1 items-center'>
        {isBlogPath ? (
          <h1 className="md:hidden text-2xl font-extrabold tracking-tight text-[var(--textColor)]">{"Code 'n' Beyond"}</h1>
        ) : <Logo />}
        <Link href={isBlogPath ? '/blog' : '/'} className="hover:opacity-80 transition-opacity">
          <h1 className='hidden md:block text-2xl font-extrabold tracking-tight text-[var(--textColor)]'>
            {isBlogPath ? "Code 'n' Beyond" : 'Oladipupo Ishola'}
          </h1>
        </Link>
      </div>
      {!userLoggedIn && !isBlogPath && (
        <div className='hidden lg:flex gap-3 flex-1 items-center'>
          {socialLinks.map(({ id, path, icon }) => (
            <Link href={path} target='_blank'
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 hover:bg-cta hover:text-white text-[var(--textColor)] transition-all duration-300 hover:scale-110 shadow-sm"
              rel='noopener noreferrer' key={id}>
              <CustomIcon icon={icon} className='h-5 w-5' />
            </Link>
          ))}
        </div>
      )}
      <div className='flex md:flex-1 gap-6 items-center justify-end text-base font-medium'>
        <SearchPalette />
        <ThemeToggle />
        <ConditionalRoutes
          routePath={routePath}
          pathname='/blog'
          pathLinks={blogLinks}
          navLinks={navItems}
          isActive={isActive}
        />
        <AdminRoutes isActive={isActive} pathname={routePath} />
      </div>
    </div>
  )
}