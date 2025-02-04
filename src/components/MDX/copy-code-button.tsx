'use client';

import React, {ReactNode, useState} from "react";

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

                setTimeout(() => {
                    buttonFlip() // Reset text to "Copy" after 2000ms
                }, 2000) // Adjusted to 2000ms for better user experience
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err)
            })
    }

    return (
        <div className="rounded-lg dark:border dark:border-zinc-700 dark:bg-bg leading-none">
            <button
                onClick={handleClick}
                className="rounded-lg p-2 transition-all duration-200 hover:scale-110"
                style={{ opacity }}
            >
                {toggled ? (
                    <svg
                        height="18"
                        width="18"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        version="1.1"
                        className="fill-green-600 transition-opacity duration-150"
                    >
                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
                    </svg>
                ) : (
                    <svg
                        height="18"
                        width="18"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        version="1.1"
                        className="fill-neutral-500 text-white transition-opacity duration-150"
                    >
                        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                        <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                    </svg>
                )}
            </button>
        </div>
    )
}