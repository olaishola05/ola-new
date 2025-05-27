import React, { Suspense } from "react";
import Hero from "../HeroPage/Hero";
import Blogs from "../Blogs/Blogs";
import Niches from "../Niche/Niches";
import { getMediumPosts } from "@/queries/queries";
import { Projects } from "../Projects/Projects";
import SocialIcons from "./social-icons";
import AboutParentComponent from "../About-Inline/about-parent";
import ResumeTimeline from "../resume-timelines/resume-timeline";

export default function Homepage() {
  return (
    <div className="relative">
      <Hero />
      <Niches />
      <Suspense fallback={<div>Loading...</div>}>
        <AboutParentComponent />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ResumeTimeline />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Blogs fetchData={getMediumPosts} />
      </Suspense>
      <SocialIcons />
    </div>
  );
}
