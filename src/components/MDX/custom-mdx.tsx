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

  const classes = {
    title: `bg-zinc-700 text-gray-300 text-sm pl-3 py-2 rounded-t-md`,
    line: `px-4`,
    lineHighlighted: `bg-teal-100/10 relative border-l-[0.3rem] pl-3 border-orange-500`,
    lineHighlightedChar: `box-border`,
  }

  const options = {
    keepBackground: true,
    theme: "github-dark-dimmed",
    onVisitTitle: (node: any) => {
      if (!node.properties.className) {
        node.properties.className = []
      }
      node.properties.className.push(classes.title)
    },
    onVisitHighlightedLine: (node: any) => {
      node.properties.className?.push(classes.lineHighlighted)
    },
    onVisitLine: (node: any) => {
      node.properties.className = [classes.line]
    },
    onVisitHighlightedChars: (node: any) => {
      if (!node.properties.className) {
        node.properties.className = []
      }
      node.properties.className?.push(classes.lineHighlightedChar)
    },
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
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypePrettyCode, options]],
          },
        }}
        components={mdxComponents}
      />
    </MdxLayout>
  )
}
