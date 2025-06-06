'use client';

import * as React from 'react';
import Link from 'next/link';
import { socialLinks } from '@/app/utils';
import { Icons } from '@/components';

export default function Copyright() {
  return (
    <div className='flex flex-col-reverse gap-2 mb-1 md:flex-row md:items-center md:justify-center md:mb-3 md:gap-3'>
      <p className='flex items-center justify-center text-center gap-1 m-1 md:text-base'>
        {'Copyright © '}
        <Link href="https://github.com/olaishola05"
          color="inherit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Oladipupo Ishola
        </Link>{' '}
        {new Date().getFullYear()}
      </p>
      <p className='text-center hidden md:block'>
        |
      </p>

      <div className='flex justify-center items-center gap-2'>
        {socialLinks.map((link) => (
          <Icons link={link} key={link.id} />
        ))}
      </div>
    </div>
  );
}