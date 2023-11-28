"use client";
import { Transforms, Range, Editor as SlateEditor } from "slate";
import { cn } from "@/utils/twmarge";
import { Button } from "@/components/editor/button";
import { ReactEditor, useSelected, useSlate } from "slate-react";
import { Portal } from "@/components/editor/Portal";
import { useEffect, useRef } from "react";
import { Menu } from "@/components/editor/hover-toolbar-menu";
import { useHoverToolbarPosition } from "@/hook/useHoverToolbarPosition";

export default function ImageHoverToolbar({ element }: { element: any }) {
  const selected = useSelected();
  const editor = useSlate();
  const ref = useRef<HTMLDivElement>(null);
  const path = ReactEditor.findPath(editor, element);
  const display = selected ? `inline` : `hidden`;

  useHoverToolbarPosition(ref, editor, selected, "image");

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
          className={cn(`px-1.5 py-0.5`, display)}
        >
          {/*<Icon>delete</Icon>*/}
          <div>delete</div>
        </Button>
        <Button
          // active
          onclickHandler={() => Transforms.removeNodes(editor, { at: path })}
          className={cn(`px-1.5 py-0.5`, display)}
        >
          {/*<Icon>delete</Icon>*/}
          <div>F</div>
        </Button>
        <Button
          // active
          onclickHandler={() => Transforms.removeNodes(editor, { at: path })}
          className={cn(`px-1.5 py-0.5`, display)}
        >
          {/*<Icon>delete</Icon>*/}
          <div>M</div>
        </Button>
        <Button
          // active
          onclickHandler={() => Transforms.removeNodes(editor, { at: path })}
          className={cn(`px-1.5 py-0.5`, display)}
        >
          {/*<Icon>delete</Icon>*/}
          <div>S</div>
        </Button>
      </Menu>
    </Portal>
  );
}
