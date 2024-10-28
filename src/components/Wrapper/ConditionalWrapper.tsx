'use client';

import React from 'react'
import {usePathname} from 'next/navigation'

export default function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith('/admin') ? (
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
