import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/business/Navbar";
import BusinessHero from "@/components/business/business-hero";
import IdealClientsProfile from "@/components/business/clients";
import ValueProposition from "@/components/business/value-proposition";
import Services from "@/components/business/services";
import CaseStudies from "@/components/business/case-studies";
import TechStack from "@/components/business/tech-stack";
import Workflow from "@/components/business/workflow";
import SocialProofs from "@/components/business/social-proofs";
import FooterInfo from "@/components/business/footer-info";

export default function BusinessPage() {
  const meetingLink = process.env.NEXT_PUBLIC_CALENDLY_URL!;
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--textColor)]">
      <h1>Hello World</h1>
      <p>{meetingLink}</p>
      {/*<Navbar />
      <BusinessHero />
      <div className="container mx-auto max-w-7xl flex flex-col gap-20 md:gap-60">
        <IdealClientsProfile />
        <ValueProposition />
      </div>
      <Services />
      <CaseStudies />
      <TechStack />
      <Workflow />
      <SocialProofs />

      <section
        id="contact"
        className="py-20 px-4 md:px-6 bg-gradient-to-br from-[#392467] to-[#5a3a8f] text-white"
        style={{ scrollMarginTop: "80px" }}
      >
        <div className="container mx-auto max-w-4xl text-center pt-6 rounded-sm">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build Something Great?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Every project is value-based and scoped according to business goals. Book a free
            strategy call to get clarity on your technical roadmap and next steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-[#392467] hover:bg-gray-100 text-base px-10 py-6 rounded-lg shadow-xl hover:shadow-2xl transition-all font-semibold"
              asChild
            >
              <Link href={meetingLink} target="_blank" rel="noopener noreferrer">
                Book Your Free Strategy Call
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-whites hover:bg-white/10 text-base px-8 py-6 rounded-lg"
              asChild
            >
              <Link href="mailto:your@email.com">Or Email Me Directly</Link>
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t border-white/20">
            <p className="text-sm md:text-base opacity-75 mb-4">
              Trusted technical partner for startups and scale-ups worldwide
            </p>
            <div className="flex justify-center space-x-8 text-sm md:text-base">
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="hidden md:block h-4 w-4" />
                <span>50+ Projects Delivered</span>
              </span>
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="hidden md:block h-4 w-4" />
                <span>10+ Years Experience</span>
              </span>
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="hidden md:block h-4 w-4" />
                <span>100% Client Satisfaction</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-8 px-4 md:px-6 bg-bg border-t border-[var(--border)]">
        <FooterInfo />
      </footer>*/}
    </div>
  );
}
