'use client'

import React from 'react'
import Link from 'next/link'
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import Comment from './Comment';

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (!res.ok) {
    const error = new Error(data.message)
    throw error
  }

  return data
}

export default function Comments({ postSlug }: { postSlug: string }) {
  const { status } = useSession();
  const [desc, setDesc] = React.useState('');
  const { data, mutate, error, isLoading } = useSWR(`http://localhost:3000/api/comments?postSlug=${postSlug}`, fetcher);

  const refinedPostSlug = postSlug.replace(/%20/g, ' ');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/comments', {
      method: 'POST',
      body: JSON.stringify({ desc, postSlug: refinedPostSlug }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      console.log(res)
      throw new Error(res.statusText)
    }

    mutate();
    setDesc('');
  }
  return (
    <div className='mt-[50px]'>
      <h1 className='text-softText mb-7'>Comments</h1>
      {status === 'authenticated' ? (
        <div className='flex items-center justify-between gap-[30px]'>
          <textarea
            placeholder='write a comment ...'
            className='w-full p-5'
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button type="button" className='py-4 px-5 bg-teal-700 text-white font-bold border-none rounded-[5px] cursor-pointer' onClick={handleSubmit}>Send</button>
        </div>
      ) : (
        <Link href='/login'>Login to write a comment</Link>
      )}

      {isLoading ? (<div>loading</div>) : data?.data?.map((item) => (
        <Comment key={item.id} item={item} />
      ))}

    </div>
  )
}
