import React, { Suspense } from "react";
import Hero from "../HeroPage/Hero";
import Blogs from "../Blogs/Blogs";
import { socialLinks } from "@/app/utils";
import { Icons } from "..";
import Niches from "../Niche/Niches";
import { getMediumPosts } from "@/queries/queries";
import { Projects } from "../Projects/Projects";

export default function Homepage() {
  return (
    <div className="relative">
      <Hero />
      <Niches />
      <Suspense fallback={<div>Loading...</div>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Blogs fetchData={getMediumPosts} />
      </Suspense>

      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="hidden right-2 bottom-60 p-0 gap-2 my-0 text-3xl lg:flex lg:flex-col md:gap-3 lg:my-0 lg:mx-0 lg:mb-60 lg:fixed lg:right-10 lg:bottom-0 z-10"
      >
        {socialLinks.map((link) => (
          <div key={link.id} data-aos="zoom-in-up" data-aos-duration="8000">
            <Icons link={link} />
          </div>
        ))}
      </div>
    </div>
  );
}
