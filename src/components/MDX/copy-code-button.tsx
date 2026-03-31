'use client';

import React, { ReactNode, useState } from "react";

function extractCodeString(children: React.ReactNode): string {
  if (typeof children === 'string') return children;

  if (React.isValidElement(children)) {
    if (typeof children.props.children === 'string') {
      return children.props.children;
    }

    if (Array.isArray(children.props.children)) {
      return children.props.children
        .map((child: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined) => extractCodeString(child))
        .join('');
    }
  }

  if (Array.isArray(children)) {
    return children
      .map(child => extractCodeString(child))
      .join('');
  }

  return '';
}

export default function CopyCodeButton({ children }: { children: ReactNode }) {
  const [toggled, setToggled] = useState(false)
  const [opacity, setOpacity] = useState(1)

  function buttonFlip() {
    setOpacity(0)

    setTimeout(() => {
      setToggled((prev: boolean) => !prev)
      setOpacity(1) // Fade back in
    }, 100) // This should match the transition duration
  }

  function handleClick() {
    const textToCopy = extractCodeString(children)

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        if (toggled) return // Prevent flicker when clicking multiple times
        buttonFlip() // Set text to "Copied!"

        // Track interaction
        const slug = window.location.pathname.split('/').filter(Boolean).pop();
        if (slug) {
          import("@/components/Analytic/EngagementTracker").then(m => {
            m.trackInteraction(slug, 'copy_code');
          });
        }

        setTimeout(() => {
          buttonFlip() // Reset text to "Copy" after 2000ms
        }, 2000) // Adjusted to 2000ms for better user experience
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-1 text-gray-500 hover:text-textColor transition-colors"
      style={{ opacity }}
      aria-label="Copy code"
    >
      {toggled ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      )}
    </button>
  )
}