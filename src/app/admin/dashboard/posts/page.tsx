import React from 'react'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'All Posts - Admin',
  description: 'All posts page',
}

export default function AllPosts() {
  return (
    <div>
      <h1>All Posts</h1>
      <p>Some posts someday</p>
    </div>
  )
}
