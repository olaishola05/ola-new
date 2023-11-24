import React from 'react'

export default function Niches() {
  const features = [
    // {
    //   icon:
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    //     </svg>,
    //   title: "Fast Refresh",
    //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    // },
    // {
    //   icon:
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    //     </svg>,
    //   title: "Analytics",
    //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    // },
    // {
    //   icon:
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    //     </svg>,
    //   title: "Datacenter security",
    //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    // },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
        </svg>,
      title: "Software development",
      desc: "I create high-end software solutions tailored to your specific needs across multiple web platforms, using React, Nextjs, Tailwindcss, Nodejs, Express, MongoDB, PostgreSQL, and other technologies that align with business objectives."
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>

      ,
      title: "Technical writing",
      desc: "I write technical articles about web development, software development, possible solutions to technical problems, and other related topics. In addition, I produce technical documentation for software projects."
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>,
      title: "Coding Instructor",
      desc: "I teach people how to code and build software solutions. I Provide mentorship and guidance to aspiring developers."
    },
  ]
  return (
    <section className="py-14 mb-10" data-aos="fade-up"
      data-aos-duration="3000">
      <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-600 md:px-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-2">
          <p className="mt-3 info text-[var(--textColor)] text-center text-base md:text-xl font-light">
            Below are some of the things I do
          </p>
          <h1 className="text-2xl md:text-6xl sm:text-4xl text-[var(--textColor)]">
            What I do
          </h1>
        </div>
        <div className="mt-12">
          <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {
              features.map((item, idx) => (
                <li key={idx} className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-[var(--cta)] text-[var(--ctaText)] rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-lg text-[var(--textColor)]  font-semibold">
                    {item.title}
                  </h4>
                  <p className='text-[var(--textColor)] text-base'>
                    {item.desc}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  )
}
