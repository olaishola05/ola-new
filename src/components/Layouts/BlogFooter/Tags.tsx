import { getAllTags } from "@/lib/posts";
import React from "react";
import FooterTags from "./footer-tags";

export default async function Tags() {
  const cats = await getAllTags()
  return (
    <>
      <FooterTags cats={cats} />
    </>
  )
}
