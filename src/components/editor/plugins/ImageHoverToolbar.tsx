"use client";
import { cn } from "@/lib/twmarge";
import Button from "@/components/PrimitiveUI/Button";
import { ReactEditor, useSelected, useSlate } from "slate-react";
import { Portal } from "@/components/PrimitiveUI/Portal";
import { useRef } from "react";
import { Menu } from "@/components/editor/Menu";
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
        <Button
          onClick={() => ImageEditor.removeImage(editor, path)}
          className={cn(`px-1.5 py-0.5 text-grayscale-white`, display)}
        >
          delete
        </Button>
        <Button
          onClick={() => ImageEditor.toggleImage(editor, IMAGE_SIZE_LARGE)}
          className={cn(`px-1.5 py-0.5 text-grayscale-white`, display)}
        >
          F
        </Button>
        <Button
          onClick={() => ImageEditor.toggleImage(editor, IMAGE_SIZE_MIDDLE)}
          className={cn(`px-1.5 py-0.5 text-grayscale-white`, display)}
        >
          M
        </Button>
        <Button
          onClick={() => ImageEditor.toggleImage(editor, IMAGE_SIZE_SMALL)}
          className={cn(`px-1.5 py-0.5 text-grayscale-white`, display)}
        >
          S
        </Button>
      </Menu>
    </Portal>
  );
}
