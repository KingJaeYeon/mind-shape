import React from "react";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import { cn } from "@/utils/twmarge";

export const Title = () => {
  const { editor } = useEditorStore((state) => state);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `auto`;
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + `px`;
    }
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

  return (
    <div className={`w-full`}>
      <textarea
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
