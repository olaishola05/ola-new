import { getPostBySlug } from '@/app/lib/get-tocs'
import { slugify } from '@/app/utils/utilities'
import React from 'react'
import TableOfContents from './toc-component'

const getHeaders = async (title: string) => {
  const slug = slugify(title)
  return await getPostBySlug(slug)
}
export default async function Toc({ title }: { title: string }) {
  const nodes = await getHeaders(title)
  return (
    <TableOfContents nodes={nodes} />
  )
}
