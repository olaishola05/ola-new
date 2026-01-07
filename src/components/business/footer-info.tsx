"use client";

import * as React from "react";
import Link from "next/link";

const FooterInfo = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-softTextColor md:text-base">
          © {new Date().getFullYear()} Oladipupo Ishola. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <Link
            href="https://github.com/olaishola05"
            target="_blank"
            rel="noopener noreferrer"
            className="text-softTextColor hover:text-primary transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/olaishola05/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-softTextColor hover:text-primary transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="https://twitter.com/olaishola05"
            target="_blank"
            rel="noopener noreferrer"
            className="text-softTextColor hover:text-primary transition-colors"
          >
            Twitter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterInfo;
