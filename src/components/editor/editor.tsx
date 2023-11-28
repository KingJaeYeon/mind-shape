"use client";
import React from "react";
import { Title } from "@/components/editor/title";
import { Editable, Slate } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import { BLOCK_PARAGRAPH, MARK_LINK } from "@/constant/slate";
import {
  renderElement,
  renderLeaf,
} from "@/components/editor/plugins/element-render";
import { Toolbar } from "@/components/editor/toolbar";
import {
  keydownEventPlugin,
  LinkEditor,
  ListDeleter,
  ShiftEnter,
} from "@/components/editor/plugins/custom-editor-plugins";
import { Descendant } from "slate";
import HoverToolbar from "@/components/editor/plugins/hover-toolbar";

const initialValue: Descendant[] = [
  {
    type: BLOCK_PARAGRAPH,
    children: [
      {
        text: `title: 10 Expert Performance Tips Every Senior JS React Developer Should Know\n`,
      },
    ],
  },
  {
    type: BLOCK_PARAGRAPH,
    children: [
      {
        text:
          `Hey, senior JS React developers! Are you looking to take your skills to the next level and optimize your React applications for top-notch performance?\n` +
          `\n` +
          `You’re in the right place!\n` +
          `\n` +
          `In this article, I’ll share with you 10 expert performance tips that will supercharge your React development.\n` +
          `\n` +
          `Get ready to optimize, streamline, and make your apps lightning-fast. Let’s dive in!`,
      },
    ],
  },
];

function Editor() {
  const { editor } = useEditorStore((state) => state);

  return (
    <div className={`flex w-full flex-col items-center px-2 py-1`}>
      <Slate editor={editor} initialValue={initialValue}>
        <Toolbar show={true} />
        <div className={`grid w-full max-w-[45rem] overflow-auto`}>
          <Title />
          <hr className={`my-5`} />
          <HoverToolbar />
          <Editable
            className={`min-h-[60vh] w-full max-w-full outline-none`}
            renderElement={renderElement}
            onKeyDownCapture={(event) => {
              if (event.key === `Enter` && event.shiftKey) {
                ShiftEnter(event, editor);
              }
              if (event.key === `Backspace` || event.key === `Delete`) {
                ListDeleter.ActionHandler(editor, event);
              }
              if (event.key === `Enter`) {
                const isActive = LinkEditor.isLinkActive(editor, MARK_LINK);
                if (isActive) {
                  LinkEditor.removeLink(editor);
                }
              }
            }}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (!(event.key === `Enter` && event.shiftKey)) {
                keydownEventPlugin(event, editor);
              }
            }}
          />
          <div className={`h-[200px] border border-gray-300`}>
            <p>dmkdmk</p>
          </div>
        </div>
      </Slate>
    </div>
  );
}

export default Editor;
