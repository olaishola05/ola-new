"use client";

import React from 'react'
import Image from 'next/image'
import SocialIcons from './SocialIcons'

export default function ProfileHeader() {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5">
      <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-[#392467] shadow-xl shadow-[#392467]/30 shrink-0">
        <Image
          src="https://avatars.githubusercontent.com/u/45001916?v=4"
          alt="Oladipupo Ishola"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 112px, 128px"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#392467] text-white text-3xl font-bold select-none -z-10">
          OI
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mt-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Oladipupo Ishola
        </h1>
        <p className="text-[13px] md:text-[14px] font-semibold text-white bg-[#392467] w-fit px-3 py-1 rounded-full mx-auto md:mx-0 shadow-md">
          Builder. Educator. Maker.
        </p>
      </div>

      <p className="text-[14px] text-white/70 leading-relaxed max-w-sm">
        Software engineer, product builder, and educator helping developers and founders build, ship, and monetise with AI.
      </p>

      <div className="mt-2 w-full flex justify-center md:justify-start">
        <SocialIcons />
      </div>
    </div>
  )
}
