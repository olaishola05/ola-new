'use client';

import React from 'react'
import { socialLinks } from "@/app/utils";
import { Icons } from "..";

export default function HeroSocialIcons() {
  return (
    <div className="flex md:hidden items-center justify-center mt-5">
      {socialLinks.map((link) => (
        <div key={link.id} data-aos="zoom-in-up" data-aos-duration="8000">
          <Icons link={link} />
        </div>
      ))}
    </div>
  )
}
