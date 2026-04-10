import { getPostBySlug } from '@/lib/posts'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return new NextResponse('Post not found', { status: 404 })
  }

  const { title, date, description, tags, category } = post.frontmatter
  
  const textContent = `Title: ${title}
Author: Oladipupo Ishola
Date: ${new Date(date).toLocaleDateString()}
Category: ${category}
Tags: ${tags.join(', ')}
Description: ${description}

---

${post.body}
`

  return new NextResponse(textContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
