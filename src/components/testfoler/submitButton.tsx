"use client";
import React from "react";
import { useReadOnly } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import { savePost } from "@/service/client/post";

export default function SubmitButton() {
  const { isLoading, setIsLoading, category, title, contents, isOnlyRead } =
    useEditorStore((state) => state);
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
        } else {
          alert("저장에 실패하였습니다.");
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
