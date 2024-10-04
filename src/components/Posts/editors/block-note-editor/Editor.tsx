import React, { useMemo } from 'react'
import dynamic from "next/dynamic";
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';

interface EditorProps {
  initialContent: PartialBlock[] | undefined | "loading"
  setInitialContent: (content: PartialBlock[]) => void
  setMarkdown: (markdown: string) => void
}

export default function CustomEditor({ initialContent, setInitialContent, setMarkdown }: EditorProps) {
  const BlockNoteEditor = useMemo(() => dynamic(() => import("./block-note-editor"), { ssr: false }), [])

  const handleEditorContent = async (editor: BlockNoteEditor) => {
    setInitialContent(editor.document)
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown)
  }

  return (
    <div className="relative min-h-[1200px] w-full max-w-screen-lg bg-bg text-textColor sm:mb-[calc(20vh)] sm:rounded-lg overflow-auto">
      <BlockNoteEditor onChange={handleEditorContent} initialContent={initialContent} />
    </div>
  )
}
