"use client";
import React, { useEffect } from "react";
import { Transforms } from "slate";
import { ReactEditor, useReadOnly, useSlateStatic } from "slate-react";
import { cn } from "@/utils/twmarge";
import { useEditorStore } from "@/store/editorStore";

export const Title = () => {
  const { title, setTitle, isOnlyRead } = useEditorStore((state) => state);
  const editor = useSlateStatic();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = (e: any) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `auto`;
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + `px`;
    }
    setTitle(e.target.value);
    localStorage.setItem("title", e.target.value);
    console.log(title);
  };
  const handleKeyDown = (event: any) => {
    if (event.key === `Enter`) {
      // Enter 키가 눌리면 실행
      event.preventDefault(); // 기본 Enter 키 동작 방지

      // Slate 에디터의 시작 위치로 포커스 이동
      Transforms.select(editor, { path: [0, 0], offset: 0 });
      ReactEditor.focus(editor);
    }
  };

  useEffect(() => {
    const storedContent = localStorage.getItem("title");
    setTitle(!!storedContent ? storedContent : "");
  }, []);
  return (
    <div className={`w-full`}>
      <textarea
        value={title}
        readOnly={isOnlyRead}
        rows={1}
        ref={textareaRef}
        placeholder="제목"
        maxLength={100}
        className={cn(
          `flex h-auto w-full resize-none flex-wrap text-[42px] font-bold leading-[52px] outline-none`,
        )}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onChange={handleResizeHeight}
      />
    </div>
  );
};
