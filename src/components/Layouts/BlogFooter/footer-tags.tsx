import React from 'react'
import Link from 'next/link'

export default function FooterTags({ cats }: { cats: string[] }) {
  return (
    <>
      {cats.length > 0 && (
        <>
          {cats?.slice(0, 4).map((title: string, index: number) => (
            <Link href={`/blog/posts?cat=${title}`} passHref={true} key={index}>
              {title}
            </Link>
          ))}
        </>
      )}
    </>
  )
}
