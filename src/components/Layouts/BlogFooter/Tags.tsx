import {mostUsedTags} from "@/components/Posts";
import prisma from "@/app/lib/prisma";
import Link from "next/link";
import React from "react";

const getCategories = async () => {
    return await prisma.category.findMany()
}


export default async function Tags(){
    const categories = await getCategories()
    const cats: string[] = mostUsedTags(categories)
    return (
        <>
            {cats.length > 0 && (
                <>
                    {cats?.slice(0, 4).map((title: string, index: number) => (
                        <Link href={`/blog/posts?cat=${title}`} passHref={true} key={index}>
                            {title}
                        </Link>
                    ))}
                </>
            )}
        </>
    )
}
