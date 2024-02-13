'use client';

import React from 'react'
import { usePathname } from 'next/navigation'
import Layout from '../Layouts/Layout'
import { useSession } from 'next-auth/react';
import Loader from '../loader/Loader';

interface Props {
  children: React.ReactNode
}

export default function App({ children }: Props) {
  const pathname = usePathname()
  const { status } = useSession()

  if (status === 'loading') {
    return <Loader loading={status} />
  }

  return (
    <>
      {pathname.includes('auths') ? (
        <>{children}</>
      ) : (
        <Layout>
          {children}
        </Layout>
      )
      }
    </>
  )
}
