'use client';

import React from 'react'
import SuggestedPost from './suggested-post';
import { Posts } from '@/app/types/appTypes'

export default function SuggestedPosts({ data }: { data: (Posts | null)[] }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 mb-[30px]">
      {data.map((post, index) => (
        <SuggestedPost key={index} post={post?.data} />
      ))}
    </div>
  )
}
