'use client';

import React from 'react'
import Link from 'next/link'
import styles from './blogFooter.module.css'
import { socialLinks } from '@/app/utils'
import CustomIcon from '@/components/IconsComponent/CustomIcon'

export default function FooterSocialMedia() {
  return (
    <div className={styles.icons}>
      {socialLinks.map(({ id, path, icon }) => (
        <Link href={path} target='_blank'
          rel='noopener noreferrer' key={id}>
          <CustomIcon icon={icon} className='h-[18px] w-[18px] text-[var(--primary)]' />
        </Link>
      ))}
    </div>
  )
}
