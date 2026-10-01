import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  referrer?: string | null
}

export default function BackButton({ referrer }: BackButtonProps) {
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-xs font-semibold text-softText hover:text-cta hover:border-cta/40 hover:-translate-x-0.5 transition-all duration-200 mb-8 w-fit"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>Back to all articles</span>
    </Link>
  )
}
