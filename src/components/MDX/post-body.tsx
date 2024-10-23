import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import remarkToc from 'remark-toc'
import { mdxComponents } from './markdown-components'
import MdxLayout from './mdx-layout'
import rehypePrettyCode from 'rehype-pretty-code';

export default function PostBody({ children }: { children: string }) {
  return (
    <MdxLayout>
      <MDXRemote
        source={children}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              remarkA11yEmoji,
              remarkToc,
            ],
            // These work together to add IDs and linkify headings
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrettyCode],
          },
        }}
        components={mdxComponents}
      />
    </MdxLayout>
  )
}
