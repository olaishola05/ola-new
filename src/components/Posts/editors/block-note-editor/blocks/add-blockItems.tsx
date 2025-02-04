import { Code2Icon, Lightbulb } from 'lucide-react';
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  insertOrUpdateBlock,
} from "@blocknote/core";
import { Callout } from '../callout/callout';

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    callout: Callout
  },
});

export const insertCallout = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Insert Callout Note",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "callout"
    })
  },
  aliases: ["callout", "co"],
  group: "Other",
  icon: <Lightbulb size={18} />,
  subtext: "Insert a Note for Supplementary info.",
})

// export const insertCodeBlockItem = (editor: typeof schema.BlockNoteEditor) => ({
//   title: "Insert Code Block",
//   onItemClick: () => {
//     insertOrUpdateBlock(editor, {
//       type: "code_block"
//     })
//   },
//   aliases: ["codeblock", "cb"],
//   group: "Development",
//   icon: <Code2Icon size={18} />,
//   subtext: "Insert a block of code with syntax highlighting.",
// });