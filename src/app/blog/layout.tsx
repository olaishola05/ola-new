import React from "react";
import BlogFooter from "@/components/Layouts/BlogFooter/BlogFooter";

export default async function BlogLayout({ children }:{children: React.ReactNode}) {
    return (
        <div>
            {children}
            <BlogFooter />
        </div>
    )
}