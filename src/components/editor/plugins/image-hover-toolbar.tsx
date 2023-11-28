"use client";
import { Transforms, Range, Editor as SlateEditor } from "slate";
import { cn } from "@/utils/twmarge";
import { Button } from "@/components/editor/button";
import { ReactEditor, useSelected, useSlate } from "slate-react";
import { Portal } from "@/components/editor/Portal";
import { useEffect, useRef } from "react";
import { Menu } from "@/components/editor/hover-toolbar-menu";

export default function ImageHoverToolbar({ element }: { element: any }) {
  const selected = useSelected();
  const editor = useSlate();
  const ref = useRef<HTMLDivElement>(null);
  const path = ReactEditor.findPath(editor, element);
  const display = selected ? `inline` : `hidden`;

  //빈배열을 제공하지 않으면 컴포넌트가 렌더링될 때마다 동작한다.
  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    console.log(selection);
    if (!el) return;

    // if (
    //   !selection ||
    //   !selected ||
    //   Range.isCollapsed(selection) ||
    //   SlateEditor.string(editor, selection) === ""
    // ) {
    //   console.log("selection", selection);
    //   console.log("selected", selected);
    //   el.removeAttribute("style");
    //   return;
    // }

    if (!selection || !selected) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection) return;
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    console.log(rect);
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
          // active
          onclickHandler={() => Transforms.removeNodes(editor, { at: path })}
          className={cn(``, display)}
        >
          {/*<Icon>delete</Icon>*/}
          <div>delete</div>
        </Button>
      </Menu>
    </Portal>
  );
}
