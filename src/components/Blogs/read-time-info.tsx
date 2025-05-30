'use client';

import { readTimeInfo } from '@/app/utils';
import React from 'react'


export default function ReadTimeInfo({ content }: { content: string }) {
  return (
    <span>
      {content && content.length > 0 ? (
        <span className="text-[var(--textColor)] text-sm md:text-base font-light">
          {readTimeInfo(content)}
        </span>
      ) : (
        <span className="text-[var(--textColor)] text-sm md:text-base font-light">
          Loading...
        </span>
      )}
    </span>
  )
}
