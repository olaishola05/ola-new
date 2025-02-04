import React from 'react'
import Link from 'next/link'
import prisma from '@/app/lib/prisma'
import { getPostsByCats } from '@/app/lib';
import { Post } from '@prisma/client';

interface Visits {
  page: number | undefined,
  catSlug: string | undefined
}

interface CategoryPost {
  category: { slug: string };
  title: string;
  slug: string;
  postImg: string;
  published: boolean;
  date: string;
  categories: string[];
  author: string;
  description: string;
  postId: string
}

type PostData = CategoryPost | Post;

const getPosts = async (page: number | undefined, cat: string | undefined) => {
  const postsWithViews = await prisma.postAnalytics.findMany({
    where: { reads: { gt: 100 } },
    select: { slug: true }
  });

  const posts = cat ? await getPostsByCats(page || 1, cat, 5) : null;

  const stored: Post[] = await prisma.post.findMany({
    where: {
      slug: { in: postsWithViews.map(item => item.slug) },
      published: true
    },
    include: {
      category: true
    }
  });

  const data: PostData[] = cat && posts?.data
    ? postsWithViews
      .map((item) => {
        const post = posts.data.find((post) => item.slug === post.data.slug);
        return post ? { ...post.data, category: { slug: cat } } : null;
      })
      .filter((item): item is CategoryPost => item !== null)
    : stored;

  return { data };
}

export default async function MenuPostsMostVisits({ page, catSlug }: Visits) {
  const { data } = await getPosts(page, catSlug)
  return (
    <>
      {data.length > 0 && <div className='flex flex-col gap-1'>
        <h2 className='text-gray-500 text-base font-normal mt-6'>See most read topics</h2>
        <h1 className='text-3xl mb-4'>Most Visits</h1>
        {data.slice(0, 5)?.map((item: PostData, index) => (
          <Link href={`/blog/posts/${item.slug}`} className='flex items-center gap-5' key={index}>
            <div className='flex-4 flex flex-col gap-[5px]'>
              <span className={`text-[12px] rounded-[10px] py-[3px] px-2 text-textColor max-w-max capitalize ${'category' in item && item.category?.slug ? 'border border-cta' : ''
                }`}>
                {'category' in item ? item.category?.slug : catSlug}
              </span>
              <h3 className='text-lg font-medium text-softText max-w-[300px] whitespace-normal'>
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>}
    </>
  )
}
