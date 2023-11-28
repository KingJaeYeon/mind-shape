"use client";

import { Button } from "@/components/editor/button";
import React, { useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { animated, useSpring } from "@react-spring/web";

export default function LinkButton() {
  const { editor } = useEditorStore((state) => state);
  const [show, isShow] = useState<boolean>(false);

  return (
    <div>
      <Button
        onclickHandler={() => {
          // MarkEditor.toggleMark(editor, MARK_ITALIC);
          isShow((show) => !show);
          console.log(editor.selection?.anchor);
        }}
        className={`flex border border-gray-300 px-1.5 py-0.5 italic`}
      >
        Link
      </Button>
      <DropDown show={show} />
    </div>
  );
}

function DropDown({ show }: { show: boolean }) {
  const springs = useSpring({
    from: { x: 0 },
    to: { x: show ? 100 : 0 },
  });

  if (!show) return;
  return (
    <animated.div
      style={{ width: 50, height: 50, background: "black", ...springs }}
    >
      dd
    </animated.div>
  );
}
