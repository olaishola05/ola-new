import React from 'react'
import Image from 'next/image'
import Menu from '@/components/Menu/Menu'
import styles from './slug.module.css'
import Comments from '@/components/Comments/Comments'
import Subscribe from '@/components/Subscribe/Subscribe'
import {notFound} from 'next/navigation'
import {fetchPublishedPosts, getPost} from '@/app/lib'
import PostBody from '@/components/MDX/post-body'
import ReadTracker from '@/components/Posts/post-tracker/read-tracker'
import {headers} from 'next/headers';
import {trackEvent} from '@/actions'
import Link from 'next/link'
import {ArrowLeftCircle} from 'lucide-react'
import PostsTags from "@/components/Posts/post-tags/posts-tags";
import PostMetaData from "@/components/Posts/post-meta/post-metatdata";
import RelatedPosts from "@/components/Posts/suggest posts/related-post";

export async function generateStaticParams() {
    const posts = await fetchPublishedPosts()
    return posts?.map((post) => ({slug: post?.data.slug}))
}

const fetchPost = async (slug: string) => {
    return await getPost(slug)
}

export default async function SinglePost({params}: { params: { slug: string } }) {
    const {slug} = params;
    const post = await fetchPost(slug);

    if (!post) {
        return notFound()
    }

    const {data, body} = post;

    const headersList = headers();
    const referrer = headersList.get('referer') || null;
    await trackEvent({slug: slug, eventType: 'view', referrer});
    const {title, postImg, author, date, categories} = data
    return (
        <div className=' w-full md:w-7/12 mt-4 md:mt-20 mx-auto flex gap-10 relative'>
            <div className='w-full md:w-11/12'>
                <div className='flex flex-col-reverse gap-5'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-2xl md:text-5xl text-textColor w-full font-semibold'>{title}</h1>
                        <PostMetaData author={author} body={body} date={date} />
                    </div>
                    {postImg && postImg.startsWith('http') && (
                        <div className='relative w-full h-[250px] md:h-[500px]'>
                            <Image
                                src={postImg || ''} alt={postImg}
                                className='object-cover rounded-lg'
                                fill
                                loading='lazy'
                            />
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    <div className={styles.post}>
                        <div id='post-content'>
                            <PostBody>
                                {body}
                            </PostBody>
                            <PostsTags categories={categories} />
                        </div>
                        <Link
                            href={referrer?.
                                includes('posts') ? `/blog/posts/${referrer?.split('/')[5]}` : '/blog'}
                            className='my-10 flex items-center gap-2 cursor-pointer w-max'
                        >
                           <ArrowLeftCircle className='text-textColor'/> Previous page
                        </Link>
                        <RelatedPosts slug={slug} />
                        <div className={styles.comments}>
                            <Subscribe/>
                            <Comments postSlug={slug}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-2/6 absolute -right-[300px]'>
                <Menu/>
            </div>
            <ReadTracker slug={slug}/>
        </div>
    )
}
