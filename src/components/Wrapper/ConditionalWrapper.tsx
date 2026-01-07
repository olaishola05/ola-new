'use client';

import React from 'react'
import { usePathname } from 'next/navigation'

export default function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Exclude /business and /admin from wrapper
  const excludeWrapper = pathname.startsWith('/admin') || pathname.startsWith('/business');

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
