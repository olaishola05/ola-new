import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeContext } from '@/app/config/ThemeContext';

const Logo = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Link href='/'>
      <Image
        src={theme === "dark" ? '/images/brand-gray.png' : '/images/brand-purple.png'}
        alt="Brand Logo"
        width={50}
        height={50}
        className=''
      />
    </Link>
  )
}

export default Logo