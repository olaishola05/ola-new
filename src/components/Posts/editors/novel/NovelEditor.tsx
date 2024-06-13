"use client";

import React, { useState } from "react";
import {
  EditorContent,
  EditorRoot,
  EditorInstance,
  EditorBubble,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  type JSONContent,
  // defaultEditorProps,
} from "novel";
import { useDebouncedCallback } from "use-debounce";
import { ImageResizer } from "novel/extensions";
import { defaultExtensions } from "./extension";
import { slashCommand, suggestionItems } from "./slash-commands";
import { defaultEditorContent } from "./content";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { NodeSelector } from "./selectors/node-selector";
import { TextButtons } from "./selectors/text-button";
import { Separator } from "./ui/separator";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";
import { Storage } from "@/app/utils/utilities";

interface NovelEditorProps {
  value: JSONContent | null;
  setValue: (value: JSONContent) => void;
  html: (html: string) => void;
}

const extensions = [...defaultExtensions, slashCommand];

const NovelEditor: React.FC<NovelEditorProps> = ({ value, setValue, html }) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const storagePost = Storage.getStorageItem("post") || {};

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      const htmlVal = editor.getHTML();
      html(htmlVal);
      setValue(json);
      const updatePost = {
        ...storagePost,
        content: { json: json, html: htmlVal },
      };
      Storage.setToStorage("post", updatePost);
    },
    500,
  );

  React.useEffect(() => {
    const contents = Storage.getStorageItem("post");
    if (contents.content) setValue(contents.content.json);
    else setValue(defaultEditorContent);
  }, [setValue]);

  if (!value) return null;
  return (
    <div className={`relative w-full max-w-screen-lg text-textColor`}>
      <EditorRoot>
        <EditorContent
          initialContent={value}
          extensions={extensions}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
          }}
          className="relative min-h-[1200px] w-full max-w-screen-lg bg-bg text-textColor sm:mb-[calc(20vh)] sm:rounded-lg overflow-auto"
          slotAfter={<ImageResizer />}
          editorProps={{
            // ...defaultEditorProps,
            attributes: {
              class: `prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command!(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommand>

          <EditorBubble
            tippyOptions={{
              placement: "top",
            }}
            className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
          >
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default NovelEditor;
