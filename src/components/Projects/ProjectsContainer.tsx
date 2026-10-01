import React from 'react'

export default function ProjectsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-6 w-full'>
      {children}
    </div>
  )
}
