"use client";

import React from 'react'
import {
  useCreateBlockNote,
  GridSuggestionMenuController,
  SideMenu,
  SideMenuController,
  BlockColorsItem,
  DragHandleMenu,
  RemoveBlockItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";
import {
  filterSuggestionItems,
  PartialBlock,
  Block,
} from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import CustomEmojiPicker from './emojis/custom-emoji';
import { ResetBlockTypeItem } from './remove-btn/reset-block-type';
import './editor.css'
import { uploadFileServerAction } from '@/actions';
import { Storage } from '@/app/utils/utilities';
import { useDebouncedCallback } from "use-debounce";
import { schema, insertCodeBlockItem } from './blocks/add-blockItems';

async function saveToStorage(jsonBlocks: Block[]) {
  Storage.setToStorage("editorContent", jsonBlocks);
}

interface EditorProps {
  onChange: (content: PartialBlock[], markdown: string) => void;
  initialContent?: PartialBlock[] | undefined | "loading"
}

export default function Editor({ onChange, initialContent }: EditorProps) {

  const debouncedUpdates = useDebouncedCallback(
    async (editor: any) => {
      await saveToStorage(editor.document);
      const markdown = await editor.blocksToMarkdownLossy(editor.document);
      onChange(editor.document, markdown)
    },
    500,
  );

  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent === "loading" ? undefined : initialContent,
    uploadFile: (file: File) => {
      const form = new FormData();
      form.append("fileUpload", file);
      return uploadFileServerAction(form);
    },
  });

  if (editor === undefined) {
    return "Loading content...";
  }


  return (
    <BlockNoteView
      editor={editor}
      emojiPicker={false}
      sideMenu={false}
      slashMenu={false}
      data-brand-theming
      onChange={() => {
        debouncedUpdates(editor)
      }}
    >
      <GridSuggestionMenuController
        triggerCharacter={":"}
        gridSuggestionMenuComponent={CustomEmojiPicker}
        columns={10}
        minQueryLength={2}
      />
      <SideMenuController
        sideMenu={(props) => (
          <SideMenu
            {...props}
            dragHandleMenu={(props) => (
              <DragHandleMenu {...props}>
                <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                <BlockColorsItem {...props}>Colors</BlockColorsItem>
                <ResetBlockTypeItem {...props}>Reset Type</ResetBlockTypeItem>
              </DragHandleMenu>
            )}
          />
        )}
      />
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) =>
          filterSuggestionItems(
            [...getDefaultReactSlashMenuItems(editor), insertCodeBlockItem(editor)], query)
        }
      />
    </BlockNoteView>
  )
}
