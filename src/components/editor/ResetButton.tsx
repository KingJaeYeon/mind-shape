"use client";
import React from "react";
import { useEditorStore } from "@/store/editorStore";
import Button from "@/components/PrimitiveUI/Button";

export default function ResetButton() {
  const { isLoading, isOnlyRead, editor, reset } = useEditorStore(
    (state) => state,
  );
  if (isOnlyRead) return null;
  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        localStorage.removeItem("content");
        localStorage.removeItem("title");
        localStorage.removeItem("category");
        reset();
        window.location.href = "/guide/posts";
      }}
      className={
        "rounded-full border border-grayscale px-8 py-3 text-[20px] font-bold"
      }
    >
      리셋
    </Button>
  );
}
