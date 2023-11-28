"use client";
import { Transforms } from "slate";
import { cn } from "@/utils/twmarge";
import { Button } from "@/components/editor/button";
import { ReactEditor, useSelected, useSlate } from "slate-react";
import { Portal } from "@/components/editor/Portal";
import { useRef } from "react";
import { Menu } from "@/components/editor/hover-toolbar-menu";
import { useHoverToolbarPosition } from "@/hook/useHoverToolbarPosition";
import { ImageEditor } from "@/components/editor/plugins/custom-editor-plugins";
import {
  IMAGE_SIZE_LARGE,
  IMAGE_SIZE_MIDDLE,
  IMAGE_SIZE_SMALL,
} from "@/constant/slate";

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
          onclickHandler={() => ImageEditor.removeImage(editor, path)}
          className={cn(`px-1.5 py-0.5`, display)}
        >
          {/*<Icon>delete</Icon>*/}
          <div>delete</div>
        </Button>
        <Button
          // active
          onclickHandler={() =>
            ImageEditor.toggleImage(editor, IMAGE_SIZE_LARGE)
          }
          className={cn(`px-1.5 py-0.5`, display)}
        >
          {/*<Icon>delete</Icon>*/}
          <div>F</div>
        </Button>
        <Button
          // active
          onclickHandler={() =>
            ImageEditor.toggleImage(editor, IMAGE_SIZE_MIDDLE)
          }
          className={cn(`px-1.5 py-0.5`, display)}
        >
          {/*<Icon>delete</Icon>*/}
          <div>M</div>
        </Button>
        <Button
          // active
          onclickHandler={() =>
            ImageEditor.toggleImage(editor, IMAGE_SIZE_SMALL)
          }
          className={cn(`px-1.5 py-0.5`, display)}
        >
          {/*<Icon>delete</Icon>*/}
          <div>S</div>
        </Button>
      </Menu>
    </Portal>
  );
}
