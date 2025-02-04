import React from "react";

export default function PostsTags({categories}: { categories: string[] }) {
    return (
        <div className='flex gap-2 items-center flex-wrap mt-10'>
            {Array.isArray(categories) && categories.length > 0
                && categories?.map((cat: string, index: number) => (
                <span key={index}
                      className='bg-cta text-ctaText rounded-lg px-2 py-1 md:px-3 md:py-2 capitalize text-base'>
                    {cat}
                </span>
            ))}
        </div>
    )
}