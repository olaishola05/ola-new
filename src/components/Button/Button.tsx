'use client'

import { ButtonProps } from "@/app/types";


export default function CustomButton(props: ButtonProps) {
  const { variant, color, size, width, children, onClick, className } = props;
  const tailwindClasses = `
  h-[45px]
  px-3
  py-5
  rounded-full
  leading-4
  tracking-tighter
  shadow-lg
  flex
  items-center
  justify-center
  gap-3
  text-base
  md:text-lg
  text-[var(--ctaText)]
  ${variant === 'contained' ? `bg-[var(--cta)]` : 'bg-transparent'}
  ${variant === 'outlined' ? `border border-[var(--primary)] text-[var(--primary)]` : 'border-none'} hover:bg-inherit hover:text-[var(--cta)] hover:border hover:border-[var(--ctaText)]'
`;
  return <button
    color={color}
    onClick={onClick}
    className={`${tailwindClasses} ${className}`}
    style={width ? { width: width } : { width: '200px' }}
  >
    {children}
  </button>;
}


