import ReadTimeInfo from '@/components/Blogs/read-time-info';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

const slugTitle = (title: string) => {
  return title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const response = await fetch(`${process.env.MEDIUM_API_URL}`);
  const data = await response.json();
  if (!data || !data.items) return [];
  return data.items.filter((item: any) => item.title && item.guid)
    .map((item: any) => ({
      slug: slugTitle(item.title),
    }));
}

const fetchPost = async (guid: string) => {
  const response = await fetch(`${process.env.MEDIUM_API_URL}`);
  if (!response.ok) {
    console.error(`Failed to fetch post with status code: ${response.status}`);
    return null;
  }
  const data = await response.json();
  if (!data || !data.items || !data.items.length) {
    console.error('No items found in the fetched data');
    return null;
  }

  if (!data.items.some((item: any) => item.guid === guid)) {
    console.error(`Post with guid ${guid} does not exist in the data`);
    return null;
  }

  const post = data.items.find((item: any) => item.guid === guid);
  if (!post) {
    console.error(`Post with title ${guid} not found`);
    return null;
  }

  const formattedPost = {
    items: [post],
    title: post.title,
    description: post.description || '',
    pubDate: post.pubDate || new Date().toISOString()
  };

  return {
    post: formattedPost,
    posts: data.items,
  };
}

export default async function MediumPost({ params, searchParams }: { params: { slug: string }, searchParams: { guid?: string } }) {
  const { guid } = searchParams;

  if (!guid) {
    return <div>Post not found</div>;
  }

  const fullGuid = `https://medium.com/p/${guid}`;
  const result = await fetchPost(fullGuid);

  if (!result || !result.post || !result.post.items || result.post.items.length === 0) {
    return <div>Post not found</div>;
  }

  if (!result.posts || result.posts.length === 0) {
    return <div>No posts available</div>;
  }

  const { post, posts } = result;
  const item = post.items[0];
  const { title: postTitle, content, pubDate, author } = item;
  const titleSlug = slugTitle(postTitle);
  const formattedDate = new Date(pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const authorName = author || 'Unknown Author';
  const contentWithoutTitle = content.replace(/<h3>.*?<\/h3>/, '');

  const postsIndex = posts.findIndex((post: any) => post.guid === fullGuid);
  const nextPost = postsIndex + 1 < posts.length ? posts[postsIndex + 1] : null;
  const postslug = nextPost ? slugTitle(nextPost.title) : '';
  const prevPost = postsIndex - 1 >= 0 ? posts[postsIndex - 1] : null;
  const prevPostSlug = prevPost ? slugTitle(prevPost.title) : '';

  return (
    <>
      <Link href="/" className="flex gap-1 absolute top-24 left-2 md:left-8 text-cta font-semibold text-base hover:text-primary transition-colors">
        <ChevronLeft className="w-6 h-6" />Back to Home
      </Link>

      <div className="hidden md:flex flex-col gap-3 justify-between max-w-sm mx-auto p-4 absolute top-32 right-2">
        {prevPost && (
          <Link href={`/blog/medium/${prevPostSlug}?guid=${prevPost?.guid.split('/').pop()}`} className="text-cta hover:text-primary transition-colors flex flex-col gap-1">
            <span className='font-bold'>Previous Post:</span>
            {prevPost.title}
          </Link>
        )}
        {nextPost && (
          <Link href={`/blog/medium/${postslug}?guid=${nextPost.guid.split('/').pop()}`} className="text-cta hover:text-primary transition-colors flex flex-col gap-1">
            <span className='font-bold'>Next Post:</span>
            {nextPost.title}
          </Link>
        )}
      </div>
      <div className='w-full md:max-w-3xl mx-auto p-1 md:p-4 relative mt-14'>
        <h1 className=" text-2xl md:text-4xl font-bold mb-4 text-textColor">{postTitle}</h1>
        <p className="text-textColor mb-2">
          <span className="text-base text-softText">By {authorName}</span>
          <span className="text-base text-softText mx-2">|</span>
          <span className="text-base text-softText">{formattedDate}</span>
          <span className="text-base text-softText mx-2">|</span>
          <ReadTimeInfo content={content} />
        </p>
        <div className="w-full prose prose-p:text-textColor prose-p:text-base prose-p:md:text-lg prose-ol:text-textColor prose-h3:text-textColor prose-h3:text-xl prose-h3:md:text-2xl prose-a:text-textColor prose-pre:w-full prose-h4:text-xl"
          dangerouslySetInnerHTML={{ __html: contentWithoutTitle }} style={{ width: "100%" }} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-textColor">Other Articles</h2>
          <ul className="list-disc pl-5">
            {posts.filter((post: any) => (post.guid !== fullGuid)).map((post: any) => (
              <li key={post.guid} className="mb-2">
                <Link href={`/blog/medium/${titleSlug}?guid=${post.guid.split('/').pop()}`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
