"use client";
import React from "react";
import { useEditorStore } from "@/store/editorStore";
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
  const { category, setCategory } = useEditorStore((state) => state);
  return (
    <div className={"mb-[20px] flex w-full max-w-[45rem] justify-end"}>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
