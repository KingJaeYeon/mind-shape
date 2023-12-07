"use client";
import React from "react";
import { useEditorStore } from "@/store/editorStore";
import { useCreatePost } from "@/hook/useCreatePost";

export default function SubmitButton() {
  const { category, title, contents, isOnlyRead } = useEditorStore(
    (state) => state,
  );
  const { isCreating, createPost } = useCreatePost();
  if (isOnlyRead) return null;
  return (
    <button
      disabled={isCreating}
      onClick={() => {
        createPost({ title, category, contents });
      }}
      className={
        "rounded-full border border-gray-300 px-8 py-3 text-[20px] font-bold"
      }
    >
      저장
    </button>
  );
}
