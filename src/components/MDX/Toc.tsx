import { getPostBySlug } from '@/app/lib/get-tocs'
import React from 'react'
import TableOfContents from './toc-component'

const getHeaders = async (postId: string) => {
  return await getPostBySlug(postId)
}
export default async function Toc({ postId }: { postId: string }) {
  const nodes = await getHeaders(postId)
  return (
    <TableOfContents nodes={nodes} />
  )
}
