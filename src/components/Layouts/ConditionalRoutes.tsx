import React, { FC } from 'react'
import { NavItems } from '@/app/types'
import Link from 'next/link'

interface ConditionalRoutesProps {
  routePath: string
  pathname: string
  pathLinks: NavItems
  navLinks: NavItems
  isActive: (path: string) => boolean
}

export const ConditionalRoutes: FC<ConditionalRoutesProps> = ({ routePath, pathname, pathLinks, navLinks, isActive }) => {
  return (<>
    {routePath.startsWith(pathname) && (<>
      {pathLinks.map(({ path, title, id }: any) => (
        <Link href={path}
          className={`hidden md:block text-lg capitalize ${isActive(path) && 'text-[var(--primary)] font-medium'}`}
          key={id}>
          {title}
        </Link>
      ))}</>)}
    {!routePath.startsWith(pathname) && (<>
      {navLinks.map(({ path, title, id }) => (
        <Link href={path}
          className={`hidden md:block text-lg capitalize ${isActive(path) && 'text-[var(--primary)] font-medium'}`}
          key={id}>
          {title}
        </Link>
      ))}
    </>)}
  </>)
}