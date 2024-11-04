import {ArrowLeftCircle} from "lucide-react";
import Link from "next/link";
import React from "react";

interface PreviousPageProps {
    referrer: string | null;
}

export default function PreviousPage({referrer}: PreviousPageProps) {
    const postsRoute = referrer?.includes('posts')
    const cat =  referrer?.includes('posts?cat')

    const handleRouting = () => {
        if(referrer && postsRoute) {
            return referrer
        }
        else if(cat) {
            const category = referrer?.split('=')[1];
            return `/blog/posts?cat=${category}`;
        }

        else {
            return '/blog'
        }
    }
    return (
        <Link
            href={handleRouting()}
            className='my-10 flex items-center gap-2 cursor-pointer w-max'
        >
            <ArrowLeftCircle className='text-textColor'/> Previous page
        </Link>
    )
}