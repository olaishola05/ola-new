'use client';

import React, {forwardRef, useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import {MDXEditorMethods, MDXEditorProps} from "@mdxeditor/editor";


const Loading = () => {
    const loadingStates: string[] = ['Loading', 'Preparaing the Editor', 'Wrapping up']
    const [loadingIndex, setLoadingIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoadingIndex((prevIndex) => (prevIndex + 1) % loadingStates.length)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="text-center">
            {loadingStates.map((state, index) => (
                <div key={index} style={{ display: index === loadingIndex ? 'block' : 'none' }}>
                    {state}...
                </div>
            ))}
        </div>
    );
}

const Editor = dynamic(() => import("./mdx-editor"),
    { ssr: false, loading: () => <Loading /> });

export const CustomEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) =>
    <Editor
        {...props}
        editorRef={ref}
    />
)
CustomEditor.displayName = 'CustomEditor;'
