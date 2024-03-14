import { getAuthSession } from '@/app/utils/auth'
import CreatePost from '@/components/Posts/create/CreatePost'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function CreatePostPage() {
  // const session = await getAuthSession()
  // if (!session) {
  //   redirect('/auths/signin')
  // }
  return (
    <div>
      <CreatePost />
    </div>
  )
}
