import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Post - Admin',
  description: 'Edit post page',
}

export default function DraftPosts() {
  return (
    <div>
      <h1>Draft Posts</h1>
      <p>Some posts someday</p>
    </div>
  )
}
