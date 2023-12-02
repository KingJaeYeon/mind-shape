"use client";
import React from "react";
import { useReadOnly } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import { savePost } from "@/service/client/post";

export default function SubmitButton() {
  const { isLoading, setIsLoading } = useEditorStore((state) => state);
  const { category, title, contents } = useEditorStore((state) => state);
  const { isOnlyRead } = useEditorStore((state) => state);
  if (isOnlyRead) return null;
  return (
    <button
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        const res = await savePost({ title, category, contents });
        setIsLoading(false);
        if (res) {
          alert("저장되었습니다.");
          window.location.href = "/list";
        }
      }}
      className={
        "rounded-full border border-gray-300 px-8 py-3 text-[20px] font-bold"
      }
    >
      저장
    </button>
  );
}
