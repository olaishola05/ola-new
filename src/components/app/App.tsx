"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Layout from "../Layouts/Layout";
import { useSession } from "next-auth/react";

// Pure CSS spinner — zero JS cost, no third-party bundle
function PageSpinner() {
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-bg">
      <div className="w-8 h-8 rounded-full border-2 border-softBg border-t-cta animate-spin" />
    </div>
  );
}

interface Props {
  children: React.ReactNode;
}

export default function App({ children }: Props) {
  const pathname = usePathname();
  const { status } = useSession();
  const protectedPaths = ["/auth", "/admin", "/business", "/links"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Only block render on protected routes — public visitors never see a spinner
  if (status === "loading" && isProtected) {
    return <PageSpinner />;
  }

  return <>{isProtected ? <>{children}</> : <Layout>{children}</Layout>}</>;
}
