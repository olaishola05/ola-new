import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Niches() {
  return (
    <section
      className="py-14 mb-10"
      data-aos="fade-up"
      data-aos-duration="3000"
    >
      <div className="w-full mx-auto px-4 text-gray-600 md:px-0">
        <div className="flex flex-col items-center justify-center gap-3 mb-12 lg:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-cta">Specialized Services</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight text-center">
            What I Do
          </h2>
        </div>

        <div
          className="flex flex-col gap-20 lg:gap-32"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className="max-w-screen-2xl mx-auto md:px-0 md:py-14">
            <div className="items-center gap-x-12 sm:px-0 md:px-0 lg:flex">
              <div className="flex-1 sm:hidden lg:block">
                <Image
                  width={640}
                  height={383.66}
                  src="https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mdHdhcmUlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D"
                  className="md:max-w-2xl rounded-lg"
                  alt="coding screen"
                />
              </div>
              <div className="max-w-xl px-0 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-cta">
                  Software development
                </span>
                <h3 className="text-[var(--textColor)] text-3xl font-extrabold tracking-tight sm:text-4xl mt-2 mb-4">
                  Build your App solution with help from an expert
                </h3>
                <p className="text-base md:text-lg text-softText leading-relaxed">
                  I excel in developing premium software solutions customized to
                  your unique requirements across various web platforms. I
                  leverage a range of cutting-edge technologies including React,
                  Next.js, Tailwind CSS, MUI, Node.js, Express, MongoDB,
                  PostgreSQL, and other relevant tools to align with your
                  business objectives.
                </p>
                <Link
                  // href={`${process.env.NEXT_PUBLIC_RESUME_URL}`}
                  href={`mailto:olaishola.dev@gmail.com`}
                  target="_blank"
                  className="inline-flex gap-x-1 items-center text-[var(--cta)] hover:text-indigo-500 duration-150 font-medium"
                >
                  {"Let's work together"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="max-w-screen-2xl mx-auto md:px-0 md:py-14"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex lg:flex-row-reverse">
              <div className="flex-1 sm:hidden lg:block">
                <Image
                  width={640}
                  height={383.66}
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5pY2FsJTIwd3JpdGVyfGVufDB8fDB8fHww"
                  className="md:max-w-2xl rounded-lg"
                  alt="content writing"
                />
              </div>
              <div className="max-w-xl px-0 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-cta">
                  Technical writing
                </span>
                <h3 className="text-[var(--textColor)] text-3xl font-extrabold tracking-tight sm:text-4xl mt-2 mb-4">
                  Write technical articles and documentation for your software
                  projects
                </h3>
                <p className="text-base md:text-lg text-softText leading-relaxed">
                  I am adept at crafting insightful technical articles
                  encompassing web and software development, as well as offering
                  potential solutions to technical challenges and other
                  pertinent topics. Furthermore, I excel in creating
                  comprehensive technical documentation for software projects.
                </p>
                <Link
                  href={`${process.env.NEXT_PUBLIC_ADMIN_MEDIUM_URL}`}
                  target="_blank"
                  className="inline-flex gap-x-1 items-center text-[var(--cta)] hover:text-indigo-500 duration-150 font-medium"
                >
                  Visit my blog
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="max-w-screen-2xl mx-auto md:px-0 md:py-14"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
              <div className="flex-1 sm:hidden lg:block">
                <Image
                  width={640}
                  height={383.66}
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHdlYnNpdGV8ZW58MHx8MHx8fDA%3D"
                  className="md:max-w-2xl rounded-lg"
                  alt="coding instructor"
                />
              </div>
              <div className="max-w-xl px-0 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-cta">
                  Coding Instructor
                </span>
                <h3 className="text-[var(--textColor)] text-3xl font-extrabold tracking-tight sm:text-4xl mt-2 mb-4">
                  Learn to code with help from an expert
                </h3>
                <p className="text-base md:text-lg text-softText leading-relaxed">
                  I specialize in providing personalized coding education
                  through a project-based approach, offering individualized
                  mentorship and guidance to aspiring developers. My focus is on
                  equipping others with the skills they need to create
                  innovative software solutions, while also facilitating access
                  to supportive communities of like-minded individuals.
                </p>
                <Link
                  href="https://10nth-mnoht-brytebee.vercel.app"
                  target="_blank"
                  className="inline-flex gap-x-1 items-center text-[var(--cta)] hover:text-indigo-500 duration-150 font-medium"
                >
                  Join here
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
