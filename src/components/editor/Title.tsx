"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/twmarge";
import { useEditorStore } from "@/store/editorStore";

export const Title = () => {
  const { title, setTitle, isOnlyRead } = useEditorStore((state) => state);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = (e: any) => {
    console.log(textareaRef?.current);
    if (textareaRef?.current) {
      textareaRef.current.style.height = `auto`;
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + `px`;
    }
    setTitle(e.target.value);
    localStorage.setItem("title", e.target.value);
  };
  useEffect(() => {
    if (!isOnlyRead) {
      const storedContent = localStorage.getItem("title");
      setTitle(!!storedContent ? storedContent : "");
    }
    if (textareaRef?.current) {
      textareaRef.current.style.height = `auto`;
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + `px`;
    }
  }, [title]);
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
          `display-1 flex h-auto w-full resize-none flex-wrap text-[42px] leading-[52px] outline-none`,
        )}
        tabIndex={0}
        onChange={handleResizeHeight}
      />
    </div>
  );
};
