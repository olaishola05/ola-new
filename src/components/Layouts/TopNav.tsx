'use client';

import React from 'react';
import {blogLinks, navItems, socialLinks} from '@/app/utils';
import Logo from './Logo';
import {usePathname} from 'next/navigation';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Link from 'next/link'
import AdminRoutes from './AdminRoutes';
import CustomIcon from '../IconsComponent/CustomIcon';
import {ConditionalRoutes} from './ConditionalRoutes';

export default function TopNav() {
  const routePath = usePathname();
  const isActive = (pathname: string) => routePath === pathname;
  const isBlogPath = routePath.startsWith('/blog');
  return (
    <div className='flex items-center justify-between h-[80px] sticky top-0 z-10 bg-[var(--bg)]'>
      <div className='flex gap-1 flex-1 items-center'>
          {isBlogPath ? (
              <h1 className="md:hidden text-2xl font-bold text-[var(--primary)]">Code 'n' Beyond</h1>
          ) : <Logo/>}
        <Link href={isBlogPath ? '/blog' : '/'}>
          <h1 className='hidden md:block text-2xl font-bold text-[var(--primary)]'>
              {isBlogPath ? "Code 'n' Beyond":'Oladipupo Ishola'}
          </h1>
        </Link>
      </div>
      <div className='hidden lg:flex gap-3 flex-1'>
        {socialLinks.map(({ id, path, icon }) => (
          <Link href={path} target='_blank'
            rel='noopener noreferrer' key={id}>
            <CustomIcon icon={icon} className='h-6 w-6 text-[var(--primary)]' />
          </Link>
        ))}
      </div>
      <div className='flex md:flex-1 gap-4 items-center text-base'>
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