"use client";
import React from "react";
import { useEditorStore } from "@/store/editorStore";
import { useCreatePost } from "@/hook/useCreatePost";
import Button from "@/components/PrimitiveUI/Button";

export default function SubmitButton() {
  const { category, title, contents, isOnlyRead } = useEditorStore(
    (state) => state,
  );
  const { isCreating, createPost } = useCreatePost();
  if (isOnlyRead) return null;
  return (
    <Button
      disabled={isCreating}
      onClick={async () => {
        const res = createPost({ title, category, contents });
      }}
      className={
        "rounded-full border border-grayscale px-8 py-3 text-[20px] font-bold"
      }
    >
      저장
    </Button>
  );
}
