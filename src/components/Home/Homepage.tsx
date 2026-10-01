import React, { Suspense } from "react";
import Hero from "../HeroPage/Hero";
import Blogs from "../Blogs/Blogs";
import Niches from "../Niche/Niches";
import { getMediumPosts } from "@/queries/queries";
import { Projects } from "../Projects/Projects";
import AboutParentComponent from "../About-Inline/about-parent";
import ResumeTimeline from "../resume-timelines/resume-timeline";
import EngagementModes from "./EngagementModes";
import ProofSection from "./ProofSection";
import SocialProof from "./SocialProof";
import HomeContact from "./HomeContact";

export default function Homepage() {
  return (
    <div className="relative">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Selected Work — Immediate proof of engineering ability */}
      <Suspense fallback={<div className="py-20 text-center text-softText">Loading projects...</div>}>
        <Projects />
      </Suspense>

      {/* 3. What I Do — 3 Core capabilities */}
      <Niches />

      {/* 4. Experience & Impact + Education (Sussex MSc) */}
      <Suspense fallback={<div className="py-20 text-center text-softText">Loading timeline...</div>}>
        <ResumeTimeline />
      </Suspense>

      {/* 5. How We Can Work Together — Engagement modes */}
      <EngagementModes />

      {/* 6. About Me & Technical Arsenal */}
      <Suspense fallback={<div className="py-20 text-center text-softText">Loading about...</div>}>
        <AboutParentComponent />
      </Suspense>

      {/* 7. Writing & Technical Thinking */}
      <Suspense fallback={<div className="py-20 text-center text-softText">Loading articles...</div>}>
        <Blogs fetchData={getMediumPosts} />
      </Suspense>

      {/* 8. Proof, Documented Impact & Repositories */}
      <ProofSection />

      {/* 9. Peer Recommendations — LinkedIn social proof */}
      <SocialProof />

      {/* 10. Contact & 15-min Discovery Call */}
      <HomeContact />
    </div>
  );
}

