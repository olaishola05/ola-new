import Link from 'next/link'
import React from 'react'

interface LinkCardProps {
  title: string
  description: string
  url: string
  icon: React.ReactNode
  comingSoon?: boolean
  isNew?: boolean
}

export default function LinkCard({ title, description, url, icon, comingSoon = false, isNew = false }: LinkCardProps) {
  if (comingSoon) {
    return (
      <div
        className="flex items-center gap-4 w-full px-4 py-4 rounded-xl border border-white/8 cursor-not-allowed opacity-60"
        style={{ backgroundColor: '#1E2A40' }}
        aria-disabled="true"
      >
        <div className="w-10 h-10 rounded-lg bg-[#392467] flex items-center justify-center text-white shrink-0 shadow-inner">
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-white leading-tight">{title}</p>
          <p className="text-[12px] text-white/60 mt-0.5 leading-snug">{description}</p>
        </div>

        <span className="shrink-0 text-[10px] font-semibold text-white bg-[#392467] px-[10px] py-1 rounded-full whitespace-nowrap">
          Coming Soon
        </span>
      </div>
    )
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 w-full px-4 py-4 rounded-xl border border-white/8 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#392467] hover:shadow-lg hover:shadow-[#392467]/20"
      style={{ backgroundColor: '#1E2A40' }}
    >
      <div className="w-10 h-10 rounded-lg bg-[#392467] flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-200">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-semibold text-white leading-tight">{title}</p>
          {isNew && (
            <span className="text-[10px] font-semibold text-white bg-green-600 px-[8px] py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
        <p className="text-[12px] text-white/60 mt-0.5 leading-snug">{description}</p>
      </div>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-white/30 group-hover:text-[#392467] transition-colors duration-200 shrink-0"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  )
}
