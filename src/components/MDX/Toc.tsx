import { getPostHeadings } from '@/lib/posts'
import React from 'react'
import TableOfContents from './toc-component'

export default async function Toc({ body }: { body: string }) {
  const nodes = await getPostHeadings(body)
  if (!nodes || nodes.length === 0) return null

  return (
    <TableOfContents nodes={nodes} />
  )
}
