import CodeBlock from '../code-block/Code';
import { Code2Icon } from 'lucide-react';
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  insertOrUpdateBlock,
} from "@blocknote/core";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    code_block: CodeBlock,
  },
});

export const insertCodeBlockItem = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Insert Code Block",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "code_block"
    })
  },
  aliases: ["codeblock", "cb"],
  group: "Development",
  icon: <Code2Icon size={18} />,
  subtext: "Insert a block of code with syntax highlighting.",
});