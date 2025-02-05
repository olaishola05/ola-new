"use client";

import React from "react";
import Link from "next/link";
import { randomItemFromArray, readTimeInfo } from "@/app/utils";
import { CustomCard } from "@/components";
import { useToggle } from "@/app/hooks";
import { BlogModal } from "@/components";

interface BlogSectionProps {
  data: any;
}

const BlogSection = ({ data }: BlogSectionProps) => {
  const { isOpen: openBlogModal, toggleOpen: setOpenBlogModal } =
    useToggle(false);
  const [blog, setBlog] = React.useState({});

  const handleOpenBlogModal = (guid: string) => {
    setOpenBlogModal();
    const item = data?.items?.find((item: any) => item.guid === guid);
    setBlog(item);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="md:px-2 pb-9 w-full mb-10 lg:px-10"
    >
      {openBlogModal && (
        <BlogModal
          blogItem={blog}
          open={openBlogModal}
          handleClose={handleOpenBlogModal}
        />
      )}

      <div className="w-full flex flex-col gap-2">
        <p
          data-aos="fade-up"
          className="info text-[var(--textColor)] text-center text-base md:text-xl font-light"
        >
          Check some of my Technical articles
        </p>
        <h1 data-aos="fade-up" className="text-2xl md:text-6xl text-center">
          Recent Articles
        </h1>
        <div className="md:mt-10">
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 lg:gap-8">
            {data?.items &&
              data.items.slice(0, 3).map((item: any) => {
                const tags = item?.categories
                  ? randomItemFromArray(item.categories, 5)
                  : "";
                return (
                  <CustomCard
                    key={item.guid}
                    image={item?.thumbnail}
                    overlayText="Read More"
                    name={tags || "No tags"}
                    duration={readTimeInfo(item.content)}
                    description={item.title}
                    onClick={() => handleOpenBlogModal(item.guid)}
                  />
                );
              })}
          </div>
          <div className="md:hidden grid grid-cols-1 gap-10 mt-6">
            {data?.items &&
              data.items.slice(0, 5).map((item: any) => {
                const tags = item?.categories
                  ? randomItemFromArray(item.categories, 5)
                  : "";
                return (
                  <CustomCard
                    key={item.guid}
                    image={item?.thumbnail}
                    overlayText="Read More"
                    name={tags || "No tags"}
                    duration={readTimeInfo(item.content)}
                    description={item.title}
                    onClick={() => handleOpenBlogModal(item.guid)}
                  />
                );
              })}
          </div>
        </div>
        <p
          className="mt-6 text-base md:text-lg"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          To view more of my articles, click{" "}
          <Link href="/blogs" className="text-[var(--primary)] font-semibold">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BlogSection;

