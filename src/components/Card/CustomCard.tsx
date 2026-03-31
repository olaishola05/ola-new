'use client';

import React, { useRef } from "react";
import Image from "next/image";
import { BiTimeFive as AccessTimeSharpIcon } from "react-icons/bi";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CustomCardProps {
  image?: string | null;
  name: string;
  description?: string | null;
  role?: string | null;
  duration?: string;
  overlayText?: string;
  onClick?: () => void;
  url?: string;
}

const CustomCard = ({
  image,
  name,
  description,
  role,
  duration,
  overlayText,
  url,
}: CustomCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col gap-5 p-4 rounded-3xl bg-[var(--contactBg)] border border-softBg shadow-xl transition-all duration-300 group"
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-softBg/50"
      >
        <Image
          src={image || '/images/placeholder.webp'}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-cta/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 backdrop-blur-sm">
          <Link
            href={url || "#"}
            className="px-6 py-3 bg-white text-[#392467] font-extrabold tracking-wide rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl"
          >
            {overlayText || 'View Project'}
          </Link>
        </div>
      </div>

      <div
        style={{ transform: "translateZ(50px)" }}
        className="space-y-3 px-1"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-textColor tracking-tight uppercase">{name}</h3>
          <span className="text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full bg-cta/10 text-cta border border-cta/20">
            {role || 'Fullstack'}
          </span>
        </div>

        <p className="text-sm text-softText line-clamp-3 leading-relaxed">
          {description}
        </p>

        {duration && (
          <div className="flex items-center gap-2 text-xs text-softText pt-2">
            <AccessTimeSharpIcon className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        )}
      </div>

      {/* Shine Effect */}
      <motion.div
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 80%)",
          transform: "translateZ(100px)",
          top: useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]),
          left: useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]),
        }}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  );
};

export default CustomCard;
