'use client'

import React, {ForwardedRef} from 'react'
import {
    AdmonitionDirectiveDescriptor,
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    codeBlockPlugin,
    codeMirrorPlugin,
    CreateLink,
    diffSourcePlugin,
    DiffSourceToggleWrapper,
    directivesPlugin,
    headingsPlugin,
    imagePlugin,
    InsertCodeBlock,
    InsertImage,
    InsertTable,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    ListsToggle,
    markdownShortcutPlugin,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    quotePlugin,
    Separator,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './mdx-editor.css'
import {languages, Storage} from "@/app/utils/utilities";
import {uploadFileServerAction} from "@/actions";

async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    try {
        return await uploadFileServerAction(formData);
    } catch (error) {
        console.error('Image upload error:', error);
        return 'https://via.placeholder.com/150';
    }
}

export default function MDXEditorInstance({editorRef, ...props}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps){
    const handleChange = () => {
        // @ts-ignore
        if(editorRef && editorRef.current){
            // @ts-ignore
            Storage.setToStorage('markdown', editorRef.current.getMarkdown())
        }
    }
    return (
        <MDXEditor
            onChange = {handleChange}
        plugins={[
            listsPlugin(),
            quotePlugin(),
            headingsPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            imagePlugin({
                imageUploadHandler
            }),
            tablePlugin(),
            thematicBreakPlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
            codeMirrorPlugin({
                codeBlockLanguages: languages,
            }),
            directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
            diffSourcePlugin({
                diffMarkdown: props.markdown,
                viewMode: 'rich-text',
                readOnlyDiff: true
            }),
            markdownShortcutPlugin(),
            toolbarPlugin({
            toolbarContents: () => (
                    <DiffSourceToggleWrapper>
                    {' '}
                       <UndoRedo />
                        <BoldItalicUnderlineToggles />
                      <BlockTypeSelect />
                       {/*<CodeToggle />*/}
                      <ListsToggle />
                      <InsertCodeBlock />
                       <CreateLink />
                        <InsertImage />
                        <InsertTable />
                        <Separator />
                    </DiffSourceToggleWrapper>
                    )
              })
            ]}
            {...props}
            ref={editorRef}
        />
    )
}
