"use client";
import React from "react";
import { useReadOnly } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import { savePost } from "@/service/client/post";
import { Transforms } from "slate";

export default function ResetButton() {
  const { isLoading, isOnlyRead, editor } = useEditorStore((state) => state);
  if (isOnlyRead) return null;
  return (
    <button
      disabled={isLoading}
      onClick={async () => {
        localStorage.removeItem("content");
        Transforms.insertNodes(editor, {
          type: "paragraph",
          children: [{ text: "" }],
        });
        window.location.href = "/list";
      }}
      className={
        "rounded-full border border-gray-300 px-8 py-3 text-[20px] font-bold"
      }
    >
      리셋
    </button>
  );
}
