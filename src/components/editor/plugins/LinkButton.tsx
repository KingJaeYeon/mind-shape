"use client";

import Button from "@/components/PrimitiveUI/Button";
import React from "react";
import { useEditorStore } from "@/store/editorStore";
import { cn } from "@/lib/twmarge";
import { LinkEditor } from "@/components/editor/plugins/custom-editor-plugins";
import { MARK_LINK } from "@/constant/slate";
import { useSlateStatic } from "slate-react";
import { IconLink } from "@/assets/svg";

export default function LinkButton({ isHoverButton = false }) {
  const { setLink } = useEditorStore((state) => state);
  const border = isHoverButton ? "" : "border border-gray-300";
  const editor = useSlateStatic();
  const isActive = LinkEditor.isLinkActive(editor, MARK_LINK);
  return (
    <div>
      <Button
        onClick={() => {
          isActive ? LinkEditor.removeLink(editor) : setLink(true);
        }}
        className={cn(`flex px-0.5 py-0.5`, border)}
      >
        <IconLink isActive={isActive} />
      </Button>
    </div>
  );
}
