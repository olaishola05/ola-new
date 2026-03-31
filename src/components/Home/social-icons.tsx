'use client';

import React from 'react'
import { socialLinks } from "@/app/utils";
import { Icons } from "..";

export default function SocialIcons() {
  return (
    <div
      className="hidden right-2 bottom-60 p-3 gap-4 my-0 text-3xl lg:flex lg:flex-col lg:my-0 lg:mx-0 lg:-mb-5 lg:fixed lg:right-8 lg:bottom-[15%] z-50 bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-[3rem] shadow-2xl animate-fade-in"
    >
      {socialLinks.map((link) => (
        <div key={link.id} data-aos="zoom-in-up" data-aos-duration="8000">
          <Icons link={link} />
        </div>
      ))}
    </div>
  )
}
