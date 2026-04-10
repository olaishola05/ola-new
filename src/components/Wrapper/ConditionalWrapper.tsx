'use client';

import React from 'react'
import { usePathname } from 'next/navigation'

export default function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const excludeWrapper = pathname.startsWith('/admin') || pathname.startsWith('/business') || pathname.startsWith('/links');

  return (
    <>
      {excludeWrapper ? (
        <div>
          {children}
        </div>
      ) : (
        <div className='wrapper'>
          {children}
        </div>
      )}
    </>
  )
}
