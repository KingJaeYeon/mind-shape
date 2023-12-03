"use client";
import React, { useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";
import { useReadOnly } from "slate-react";
import SubmitButton from "@/components/testfoler/submitButton";
import { Transforms } from "slate";
import editor from "@/components/editor/editor";
import { Button } from "@/components/editor/button";
const categories = [
  "금전/계약",
  "기업 법무",
  "형사 절차",
  "폭행 협박",
  "명예훼손",
  "가족/이혼",
  "세금",
  "학교폭력",
  "성/통매음",
  "기타",
];
export default function Category() {
  const { category, setCategory, reset, editor } = useEditorStore(
    (state) => state,
  );
  const { isOnlyRead } = useEditorStore((state) => state);
  useEffect(() => {
    const storedContent = localStorage.getItem("category");
    setCategory(!!storedContent ? storedContent : "");
  }, []);

  return (
    <div className={"mb-[20px] flex w-full max-w-[45rem] justify-end"}>
      <SubmitButton />
      <Button
        className={
          "rounded-full border border-gray-300 px-8 py-3 text-[20px] font-bold"
        }
        onclickHandler={() => {
          localStorage.removeItem("content");
          Transforms.insertNodes(editor, {
            type: "paragraph",
            children: [{ text: "" }],
          });
          window.location.href = "/list";
        }}
      >
        reset
      </Button>
      <select
        value={category}
        onChange={(e) => {
          if (isOnlyRead) return;
          setCategory(e.target.value);
          localStorage.setItem("category", e.target.value);
        }}
        id="cars"
        className={
          "h-[40px] w-auto rounded-[4px] border border-gray-300 px-[10px]"
        }
      >
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
