import React from "react";
import Link from "next/link";
import Companies from "./Companies";
import HeroTitleAnimation from "./greeting";
import Image from "next/image";
import HeroSocialIcons from "./hero-social";
import ResumeModal from "../Modal/resume-modal";

export default function HeroSection() {
  return (
    <main
      className="flex flex-col-reverse md:flex-row p-2 w-full h-full mt-8 mx-auto gap-10 relative md:py-0 md:px-5 md:h-[50vh] lg:h-[75vh] lg:mt-20 lg:mb-0 lg:mx-auto md:w-[90%] lg:w-[100%] md:gap-8 mb-10"
      data-aos="fade-up"
      data-aos-duration="3000"
    >
      <div className="w-full md:flex-1 flex flex-col gap-4 md:gap-6 lg:gap-7 md:py-20">
        <HeroTitleAnimation />
        <p
          className="intro self-center md:self-start w-full text-justify md:text-left md:w-[700px] font-light text-base md:text-lg lg:text-xl text-[var(--textColor)]"
          data-aos="zoom-in-up"
          data-aos-duration="8000"
        >
          Hi there! {"I'm"} a software developer based in Nigeria. I help
          businesses & startups to develop accessible, human-centered products
          that meet their {"customers'"} needs.
        </p>
        <div className="self-center md:self-start flex justify-center md:justify-start gap-5 w-full mt-6">
          <Link
            href="/#my-works"
            className="w-[200px] h-[45px] px-3 py-5 rounded-full leading-4 tracking-tighter shadow-lg flex items-center justify-center gap-10 text-base md:text-lg text-[var(--cta)] bg-inherit border border-[var(--primary)] hover:bg-[var(--cta)] hover:text-[var(--ctaText)] hover:border hover:border-[var(--cta)]"
          >
            My works
          </Link>
          <ResumeModal />
        </div>

        <HeroSocialIcons />
        {/* <Companies /> */}
      </div>
      <div className="w-full md:flex-1 rounded-full [clip-path:circle(50%_at_50%_50%)]">
        <Image src="/images/ola.png" alt="Hero Image" width={1024} height={1024} loading="lazy" className="h-[36rem] w-full md:w-11/12 object-cover" />
      </div>
    </main>
  );
}

