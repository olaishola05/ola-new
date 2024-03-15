import React from 'react';
import Link from 'next/link'


interface AuthRoutesProps {
  session: any
  handleLogout: () => void
}

export const AuthRoutes = ({ session, handleLogout }: AuthRoutesProps) => {
  return (
    <React.Fragment>
      {!session?.user?.role.includes('admin') ? <span className='cursor-pointer text-lg capitalize hidden md:inline' onClick={handleLogout}>Logout</span> :
        (<>
          <Link href='/blog/write' className='text-lg capitalize hidden md:inline'>Write</Link>
          <Link href='/admin/dashboard' className='text-lg capitalize hidden md:inline'>Dashboard</Link>
          <span className='cursor-pointer text-lg capitalize hidden md:inline' onClick={handleLogout}>Logout</span>
        </>)}
    </React.Fragment>
  )
}