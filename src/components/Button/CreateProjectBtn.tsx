import React from "react";
import Link from "next/link";

const CreateButton: React.FC = () => {
  return (
    <>
      <Link
        className="bg-primary text-ctaText w-[200px] h-[50px]] p-2 rounded-full 
        leading-4 tracking-tighter shadow-lg flex items-center justify-center gap-10 text-base border border-[var(--primary)] 
        hover:bg-[var(--cta)] hover:text-[var(--ctaText)] hover:border hover:border-[var(--cta)]"
        href="/admin/dashboard/create"
      >
        Create New Project
      </Link>
    </>
  );
};

export default CreateButton;

