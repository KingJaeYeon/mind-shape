"use client";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { useFocused, useSlate } from "slate-react";
import { Editor as SlateEditor, Range } from "slate";
import { Portal } from "@/components/editor/Portal";
import { Button } from "@/components/editor/button";
import {
  BlockEditor,
  MarkEditor,
} from "@/components/editor/plugins/custom-editor-plugins";
import {
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_TWO,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from "@/constant/slate";
import { Menu } from "@/components/editor/hover-toolbar-menu";

export default function HoverToolbar() {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  //빈배열을 제공하지 않으면 컴포넌트가 렌더링될 때마다 동작한다.
  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    if (!el) return;

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      SlateEditor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection) return;
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Portal>
      <Menu
        ref={ref}
        className={
          "z-1 absolute flex rounded-[4px] bg-[#222] p-[8px_7px_6px] text-white opacity-0"
        }
        style={{
          transition: "opacity 0.75s",
        }}
        onMouseDown={(e: any) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}
      >
        <Button
          title={`ctrl+b`}
          onclickHandler={() => {
            MarkEditor.toggleMark(editor, MARK_BOLD);
          }}
          className={`flex px-1.5 py-0.5 italic`}
        >
          B
        </Button>
        <Button
          onclickHandler={() => {
            MarkEditor.toggleMark(editor, MARK_CODE);
          }}
          className={`flex px-1.5 py-0.5 italic`}
        >
          C
        </Button>
        <Button
          onclickHandler={() => {
            MarkEditor.toggleMark(editor, MARK_UNDERLINE);
          }}
          className={`flex px-1.5 py-0.5 italic`}
        >
          U
        </Button>
        <Button
          onclickHandler={() => {
            MarkEditor.toggleMark(editor, MARK_ITALIC);
          }}
          className={`flex px-1.5 py-0.5 italic`}
        >
          I
        </Button>
        <Button
          onclickHandler={() => {
            BlockEditor.toggleBlock(editor, BLOCK_HEADING_ONE);
          }}
          className={`flex px-1.5 py-0.5 italic`}
        >
          H1
        </Button>
        <Button
          onclickHandler={() => {
            BlockEditor.toggleBlock(editor, BLOCK_HEADING_TWO);
          }}
          className={`flex px-1.5 py-0.5 italic`}
        >
          H2
        </Button>
      </Menu>
    </Portal>
  );
}
