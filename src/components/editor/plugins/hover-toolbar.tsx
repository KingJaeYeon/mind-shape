"use client";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { useFocused, useSlate } from "slate-react";
import { Editor as SlateEditor, Range } from "slate";
import { Portal } from "@/components/editor/Portal";
import { cn } from "@/utils/twmarge";
import { Button } from "@/components/editor/button";
import { BlockEditor } from "@/components/editor/plugins/custom-editor-plugins";
import { BLOCK_HEADING_TWO } from "@/constant/slate";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

type OrNull<T> = T | null;
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
    console.log("domSelection", domSelection);
    const domRange = domSelection.getRangeAt(0);
    console.log("domRange", domRange);
    const rect = domRange.getBoundingClientRect();
    console.log("rect", rect);
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Portal>
      {/*<Menu*/}
      {/*  ref={ref}*/}
      {/*  // className={"z-1 absolute p-[8px_7px_6px_0px]"}*/}
      {/*  onMouseDown={(e: any) => {*/}
      {/*    // prevent toolbar from taking focus away from editor*/}
      {/*    e.preventDefault();*/}
      {/*  }}*/}
      {/*>*/}
      {/*<Button*/}
      {/*  onclickHandler={() => {*/}
      {/*    BlockEditor.toggleBlock(editor, BLOCK_HEADING_TWO);*/}
      {/*  }}*/}
      {/*  className={`flex border border-gray-300 px-1.5 py-0.5 italic`}*/}
      {/*>*/}
      {/*  H2*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  onclickHandler={() => {*/}
      {/*    BlockEditor.toggleBlock(editor, BLOCK_HEADING_TWO);*/}
      {/*  }}*/}
      {/*  className={`flex border border-gray-300 px-1.5 py-0.5 italic`}*/}
      {/*>*/}
      {/*  H2*/}
      {/*</Button>*/}
      {/*</Menu>*/}
    </Portal>
  );
}

export const Menu = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<BaseProps>
>(({ className, ...props }, ref) => {
  return (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cn(``, className)}
    />
  );
});

Menu.displayName = "Menu";
