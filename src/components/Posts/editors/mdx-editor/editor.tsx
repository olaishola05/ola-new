'use client';

import React, {forwardRef} from 'react';
import dynamic from "next/dynamic";
import {MDXEditorMethods, MDXEditorProps} from "@mdxeditor/editor";

const Editor = dynamic(() => import("./mdx-editor"),  { ssr: false });

export const CustomEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) =>
    <Editor
        {...props}
        editorRef={ref}
    />
)
CustomEditor.displayName = 'CustomEditor;'
