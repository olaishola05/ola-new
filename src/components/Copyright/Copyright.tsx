'use client';

import * as React from 'react';
import Link from 'next/link';
import { socialLinks } from '@/app/utils';
import { Icons } from '@/components';

export default function Copyright() {
  return (
    <div className='w-full max-w-6xl mx-auto flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between pt-8 mt-12 mb-6 border-t border-softBg/30 px-6'>
      <p className='flex items-center justify-center text-center gap-1 text-sm md:text-base text-softText'>
        {'© '}
        <Link href="https://github.com/olaishola05"
          className="font-bold text-[var(--textColor)] hover:text-cta transition-colors mx-1 tracking-wide"
          target="_blank"
          rel="noopener noreferrer"
        >
          Oladipupo Ishola
        </Link>
        — {new Date().getFullYear()}
      </p>

      <div className='flex justify-center items-center gap-3'>
        {socialLinks.map((link) => (
          <Icons link={link} key={link.id} />
        ))}
      </div>
    </div>
  );
}