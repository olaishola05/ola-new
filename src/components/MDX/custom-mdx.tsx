import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// @ts-ignore
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import remarkToc from 'remark-toc'
import { mdxComponents } from './markdown-components'
import MdxLayout from './mdx-layout'
import rehypePrettyCode from 'rehype-pretty-code';

export default function CustomMDX({ source }: { source: string }) {

  const options = {
    keepBackground: false,
    theme: 'tokyo-night',
  }
  return (
    <MdxLayout>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              remarkA11yEmoji,
              remarkToc,
            ],
            // These work together to add IDs and linkify headings
            rehypePlugins: [[rehypePrettyCode, options], rehypeSlug, rehypeAutolinkHeadings],
          },
        }}
        components={mdxComponents}
      />
    </MdxLayout>
  )
}
