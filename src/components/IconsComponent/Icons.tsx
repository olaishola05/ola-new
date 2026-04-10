import React from "react";
import CustomIcon from "./CustomIcon";
import Link from "next/link";

interface IconProps {
  link: {
    id: number;
    title: string;
    path: string;
    icon?: any;
  };
}

const Icons = ({ link }: IconProps) => {
  const { icon: IconComponent } = link;
  return (
    <>
      <Link
        href={link.path}
        target="_blank"
        rel="noopener noreferrer"
        passHref
        className="flex items-center justify-center text-base md:text-xl w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 text-[var(--textColor)] hover:bg-[var(--cta)] hover:text-white hover:scale-110 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out"
      >
        <CustomIcon icon={IconComponent} />
      </Link>
    </>
  );
};

export default Icons;
