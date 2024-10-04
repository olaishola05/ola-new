'use client'

import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface Ipagination { page: number, hasPrev: boolean, hasNext: boolean }
interface IpaginationBtn {
  onClick: () => void
  children: ReactNode
  disabled: boolean
}

const PaginationButton = ({ onClick, children, disabled }: IpaginationBtn) => (
  <button type="button" className='text-ctaText w-24 px-3 py-2 bg-cta border-none roun cursor-pointer rounded-md disabled:bg-[#b39aeb80] disabled:cursor-not-allowed'
    onClick={onClick}
    disabled={!disabled}
  >
    {children}
  </button>
)

export default function Pagination({ page, hasPrev, hasNext }: Ipagination) {
  const router = useRouter();
  const paginate = (route: string) => {
    router.push(route)
  }
  return (
    <div className='flex justify-between'>
      <PaginationButton onClick={() => paginate(`?page=${page - 1}`)} disabled={hasPrev}> Previous </PaginationButton>
      <PaginationButton onClick={() => paginate(`?page=${page + 1}`)} disabled={hasNext}> Next </PaginationButton>
    </div>
  )
}
