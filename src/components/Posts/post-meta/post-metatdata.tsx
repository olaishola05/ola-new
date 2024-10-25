import {formatDate, readTimeInfo} from "@/app/utils";
import React from "react";


interface PostMetaData {
    author: string;
    body: string;
    date: string;
}

export default function PostMetaData({author, body, date}: PostMetaData) {
    return (
        <>
            <div className='flex gap-2 items-center'>
                <div
                    className='rounded-full p-3 w-8 h-8 md:h-[50px] md:w-[50px] object-cover border border-gray-600 flex items-center justify-center'>
                    <p className='font-bold text-lg md:text-xl'>{author.split(' ')
                        .map(word => word[0].toUpperCase())
                        .join('')}
                    </p>
                </div>
                <div className='flex flex-col gap-0'>
                    <span className='text-lg md:text-xl'>{author}</span>
                    <span
                        className='text-base md:text-lg font-light'>{readTimeInfo(body)} - {formatDate(date)}</span>
                </div>
            </div>
            <hr className=''/>
        </>
    )
}
