'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface Ipagination { page: number, hasPrev: boolean, hasNext: boolean }

export default function Pagination({ page, hasPrev, hasNext }: Ipagination) {
  const router = useRouter();
  return (
    <div className='flex justify-between'>
      <button type="button" className='text-white w-24 p-4 bg-red-700 border-none roun cursor-pointer rounded-md disabled:bg-[#DC143C75] disabled:cursor-not-allowed'
        onClick={() => router.push(`?page=${page - 1}`)}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button type="button" className='text-white w-24 p-4 bg-red-700 border-none roun cursor-pointer rounded-md disabled:bg-[#DC143C75] disabled:cursor-not-allowed'
        onClick={() => router.push(`?page=${page + 1}`)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  )
}
