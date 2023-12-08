"use client";

import { Button } from "@/components/editor/Button";
import React from "react";
import { insertImage } from "@/components/editor/plugins/withImages";
import { useSlateStatic } from "slate-react";

export default function ImageButton() {
  const editor = useSlateStatic();
  const ref = React.useRef<HTMLInputElement>();

  function fileInputChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target?.result;
        insertImage(editor, base64String);
      };
      reader.readAsDataURL(file);
    }
    if (!!ref.current && `value` in ref.current) {
      ref.current.value = ``;
    }
  }

  return (
    <>
      <input
        type={`file`}
        ref={ref as any}
        accept="image/*"
        onChange={(event) => fileInputChange(event)}
        hidden
      />
      <Button
        onclickHandler={() => {
          if (!!ref.current && `click` in ref.current) {
            ref.current.click();
          }
        }}
        className={`flex border border-grayscale px-1.5 py-0.5 italic`}
      >
        File
      </Button>
    </>
  );
}
