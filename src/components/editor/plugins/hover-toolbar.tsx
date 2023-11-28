"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFocused, useSlate } from "slate-react";
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
import { useHoverToolbarPosition } from "@/hook/useHoverToolbarPosition";
import LinkButton from "@/components/editor/link-button";
import { useEditorStore } from "@/store/editorStore";

export default function HoverToolbar() {
  const ref = useRef<HTMLDivElement>(null);
  const { isLink, setLink } = useEditorStore((state) => state);
  const editor = useSlate();
  const inFocus = useFocused();
  const [inputValue, setInputValue] = useState("314324");
  useHoverToolbarPosition(ref, editor, inFocus, "default", isLink);

  useEffect(() => {
    console.log(ref.current);
    if (ref.current) {
      setLink(false);
    }
  }, [editor.selection, ref.current]);

  return (
    <Portal>
      {/*<div*/}
      {/*  className={*/}
      {/*    "z-20 flex rounded-[4px] border border-gray-300 bg-[#222] p-[8px_7px_6px] text-black "*/}
      {/*  }*/}
      {/*>*/}
      {/*  <input*/}
      {/*    value={inputValue}*/}
      {/*    onChange={(e) => setInputValue(e.target.value)}*/}
      {/*  />*/}
      {/*</div>*/}
      {isLink ? (
        <Menu
          ref={ref}
          className={
            "absolute z-20 hidden rounded-[4px] bg-[#222] p-[8px_7px_6px] text-black"
          }
          style={{
            transition: "opacity 0.75s",
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Menu>
      ) : (
        <Menu
          ref={ref}
          className={
            "z-1 absolute hidden rounded-[4px] bg-[#222] p-[8px_7px_6px] text-white"
          }
          style={{
            transition: "opacity 0.75s",
          }}
          onMouseDown={(e: any) => {
            // prevent toolbar from taking focus away from editor
            e.preventDefault();
          }}
        >
          <LinkButton isHoverButton={true} />
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
      )}
    </Portal>
  );
}
