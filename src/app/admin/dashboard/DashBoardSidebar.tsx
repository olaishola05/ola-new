"use client";

import React from "react";
import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

const Circle = (isActive: (pathname: string) => boolean, pathname: string) => (
  <div
    className={`w-2 h-2 rounded-full ${isActive(pathname) && "bg-blue-400"}`}
  ></div>
);

export default function DashBoardSidebar({ session }: any) {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  if (
    !session?.user?.role.includes("admin") &&
    !session?.user?.role.includes("author")
  ) {
    redirect("/");
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <aside className="flex flex-col flex-1 justify-between pb-10 w-full items-center">
      <div className="flex flex-col gap-6 mt-10">
        <div className="flex gap-3 items-center group cursor-pointer">
          {Circle(isActive, "/")}
          <Link href="/" className="text-base font-medium text-ctaText">
            Home
          </Link>
        </div>
        <div className="flex gap-3 items-center group cursor-pointer">
          {Circle(isActive, "/admin/dashboard")}
          <Link href="/admin/dashboard" className="text-base font-medium text-ctaText">
            Post Analytics
          </Link>
        </div>
        <div className="flex gap-3 items-center group cursor-pointer">
          {Circle(isActive, "/admin/dashboard/links-analytics")}
          <Link href="/admin/dashboard/links-analytics" className="text-base font-medium text-ctaText">
            Bio Link Analytics
          </Link>
        </div>
        {session?.user?.role.includes("admin") && (
          <>
            <div className="flex gap-3 items-center group cursor-pointer">
              {Circle(isActive, "/admin/dashboard/projects")}
              <Link
                href="/admin/dashboard/projects"
                className="text-base font-medium text-ctaText"
              >
                Projects
              </Link>
            </div>
            <div className="flex gap-3 items-center group cursor-pointer">
              {Circle(isActive, "/admin/dashboard/create")}
              <Link
                href="/admin/dashboard/create"
                className="text-base font-medium text-ctaText"
              >
                Add Project
              </Link>
            </div>

            <div className="flex gap-3 items-center group cursor-pointer">
              {Circle(isActive, "/admin/dashboard/testimonials")}
              <Link
                href="/admin/dashboard/testimonials"
                className="text-base font-medium text-ctaText"
              >
                Testimonials
              </Link>
            </div>
          </>
        )}
        <div className="flex gap-3 items-center group cursor-pointer">
          {Circle(isActive, "/admin/dashboard/posts")}
          <Link
            href="/admin/dashboard/posts"
            className="text-base font-medium text-ctaText"
          >
            All Posts
          </Link>
        </div>
        <div className="flex gap-3 items-center group cursor-pointer">
          {Circle(isActive, "/admin/dashboard/posts/drafts")}
          <Link
            href="/admin/dashboard/posts/drafts"
            className="text-base font-medium text-ctaText"
          >
            Draft Posts
          </Link>
        </div>
        <div className="flex gap-3 items-center group cursor-pointer">
          {Circle(isActive, "/admin/dashboard/posts/published")}
          <Link
            href="/admin/dashboard/posts/published"
            className="text-base font-medium text-ctaText"
          >
            Published Posts
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center flex-col gap-2">
          {session.user.image && (
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
              <Image
                src={session.user.image}
                alt={session.user.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <span className="font-extrabold text-2xl text-white tracking-tight">
            {session.user.name
              .split(" ")
              .map((name: string) => name[0])
              .join("")}
          </span>
        </div>
        <button
          className="cursor-pointer text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
