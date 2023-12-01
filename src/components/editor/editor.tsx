"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Title } from "@/components/editor/title";
import { Editable, Slate } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import { BLOCK_PARAGRAPH } from "@/constant/slate";
import {
  renderElement,
  renderLeaf,
} from "@/components/editor/plugins/element-render";
import { Toolbar } from "@/components/editor/toolbar";

import { Descendant, Transforms } from "slate";
import HoverToolbar from "@/components/editor/plugins/hover-toolbar";
import {
  EventKeyPlugins,
  keydownEventPlugin,
} from "@/components/editor/plugins/event-key-plugins";
import Category from "@/components/testfoler/category";

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

  const defaultContent = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];
  const [content, setContent] = useState(null);

  useEffect(() => {
    const storedContent = localStorage.getItem("content");
    setContent(
      storedContent
        ? JSON.parse(storedContent)
        : [
            {
              type: "paragraph",
              children: [{ text: "" }],
            },
          ],
    );
  }, []);

  if (content === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex w-full flex-col items-center px-2 py-1`}>
      <Category />
      <Slate
        editor={editor}
        initialValue={content}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type,
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            localStorage.setItem("content", content);
          }
        }}
      >
        <Toolbar show={true} />
        <div className={`grid w-full max-w-[45rem] overflow-auto`}>
          <Title />
          <hr className={`my-5`} />
          <HoverToolbar />
          <Editable
            className={`min-h-[60vh] w-full max-w-[45rem] outline-none`}
            renderElement={renderElement}
            readOnly={true}
            onKeyDownCapture={(event) => {
              EventKeyPlugins.ShiftEnter(event, editor);
              EventKeyPlugins.DeleteLister(event, editor);
              EventKeyPlugins.CodeOrLinkEnter(event, editor);
            }}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (!(event.key === `Enter` && event.shiftKey)) {
                keydownEventPlugin(event, editor);
              }
            }}
          />
          <div className={`h-[200px] border border-gray-300 bg-red-100`}>
            <p>dmkdmk</p>
          </div>
        </div>
      </Slate>
    </div>
  );
}

export default Editor;
