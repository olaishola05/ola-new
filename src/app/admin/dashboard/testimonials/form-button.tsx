"use client";

import { useFormStatus } from "react-dom";

interface Props {
  children: React.ReactNode;
  color?: string;
}

export default function FormButton({ children, color }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`bg-${color || "primary"} text-white py-2 px-4 rounded-md`}
      disabled={pending}
    >
      {children}
    </button>
  );
}
