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

import HoverToolbar from "@/components/editor/plugins/hover-toolbar";
import {
  EventKeyPlugins,
  keydownEventPlugin,
} from "@/components/editor/plugins/event-key-plugins";
import Category from "@/components/testfoler/category";

function Editor() {
  const { editor, setContents, contents } = useEditorStore((state) => state);

  useEffect(() => {
    const storedContent = localStorage.getItem("content");
    setContents(
      !!storedContent
        ? JSON.parse(storedContent)
        : [
            {
              type: "paragraph",
              children: [{ text: "" }],
            },
          ],
    );
  }, []);

  if (contents === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex w-full flex-col items-center px-2 py-1`}>
      <Category />
      <Slate
        editor={editor}
        initialValue={contents}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type,
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            console.log(isAstChange);
            setContents(value);
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
            readOnly={false}
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
