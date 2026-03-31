'use client';

import React from 'react'
import { socialLinks } from '@/app/utils'
import { Icons } from '@/components'

export default function FooterSocialMedia() {
  return (
    <div className='flex justify-center items-center gap-3'>
      {socialLinks.map((link) => (
        <Icons link={link} key={link.id} />
      ))}
    </div>
  )
}
