"use client";
import React from "react";
import { useReadOnly } from "slate-react";
import { useEditorStore } from "@/store/editorStore";

export default function SubmitButton() {
  const isReadOnly = useReadOnly();
  const { category, title, contents } = useEditorStore((state) => state);

  if (isReadOnly) return null;
  return (
    <button
      onClick={() => {
        console.log("title", title);
        console.log("category", category);
        console.log("contents", contents);
      }}
      className={
        "rounded-full border border-gray-300 px-8 py-3 text-[20px] font-bold"
      }
    >
      저장
    </button>
  );
}
