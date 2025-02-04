import { mostUsedTags } from "@/components/Posts";
import prisma from "@/app/lib/prisma";
import React from "react";
import FooterTags from "./footer-tags";

const getCategories = async () => {
  return await prisma.category.findMany()
}


export default async function Tags() {
  const categories = await getCategories()
  const cats: string[] = mostUsedTags(categories)
  return (
    <>
      <FooterTags cats={cats} />
    </>
  )
}
