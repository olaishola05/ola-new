import React from 'react'
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
  tag?: string
  category?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '/blog',
  tag,
  category,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const buildHref = (page: number) => {
    const params = new URLSearchParams()
    if (page > 1) params.set('page', String(page))
    if (tag) params.set('tag', tag)
    if (category) params.set('category', category)
    const query = params.toString()
    return query ? `${basePath}?${query}` : basePath
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Blog pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="px-3 py-2 rounded-lg text-sm font-medium text-cta hover:bg-[var(--cta)]/10 transition-colors"
          aria-label="Previous page"
        >
          ← Prev
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-lg text-sm font-medium text-softText/40 cursor-not-allowed">
          ← Prev
        </span>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200
            ${page === currentPage
              ? 'bg-cta text-ctaText shadow-md'
              : 'text-softText hover:bg-[var(--cta)]/10 hover:text-cta'
            }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="px-3 py-2 rounded-lg text-sm font-medium text-cta hover:bg-[var(--cta)]/10 transition-colors"
          aria-label="Next page"
        >
          Next →
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-lg text-sm font-medium text-softText/40 cursor-not-allowed">
          Next →
        </span>
      )}
    </nav>
  )
}
