'use client';


import { useFormStatus } from "react-dom"

interface ButtonStatus {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined
  classes: string
}

export default function FormBtnStatus({ children, classes, type }: ButtonStatus) {
  const { pending } = useFormStatus()
  return (
    <button
      type={type || "button"}
      className={classes}
      disabled={pending}
    >
      {pending ? 'Loading...' : children}
    </button>
  )
}