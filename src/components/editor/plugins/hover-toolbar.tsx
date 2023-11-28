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
import { cn } from "@/utils/twmarge";

export default function HoverToolbar() {
  const ref = useRef<HTMLDivElement>(null);
  const { isLink, setLink } = useEditorStore((state) => state);
  const editor = useSlate();
  const inFocus = useFocused();
  const [inputValue, setInputValue] = useState("314324");
  useHoverToolbarPosition(ref, editor, inFocus, "default", isLink);

  const menuStyled = isLink ? "text-black flex-row" : "text-white";

  useEffect(() => {
    console.log(ref.current);
    if (ref.current) {
      setLink(false);
    }
  }, [editor.selection, ref.current]);

  return (
    <Portal>
      <Menu
        ref={ref}
        className={cn(
          "absolute z-20 hidden rounded-[4px] bg-[#222] p-[8px_7px_6px]",
          menuStyled,
        )}
        style={{
          transition: "opacity 0.75s",
        }}
        onMouseDown={(e: any) => {
          if (!isLink) e.preventDefault();
        }}
      >
        {isLink ? (
          <LinkInput inputValue={inputValue} setInputValue={setInputValue} />
        ) : (
          <DefaultMenu />
        )}
      </Menu>
    </Portal>
  );
}

function DefaultMenu() {
  const editor = useSlate();
  return (
    <>
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
    </>
  );
}

function LinkInput({
  inputValue,
  setInputValue,
}: {
  inputValue: string;
  setInputValue: Function;
}) {
  return (
    <>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button className={"flex px-1.5 py-0.5 italic text-white"}>확인</Button>
    </>
  );
}
