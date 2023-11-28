"use client";

import { Button } from "@/components/editor/button";
import React, { useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { animated, useSpring } from "@react-spring/web";
import { cn } from "@/utils/twmarge";

export default function LinkButton({ isHoverButton = false }) {
  const { setLink } = useEditorStore((state) => state);
  const [show, isShow] = useState<boolean>(false);
  const border = isHoverButton ? "" : "border border-gray-300";

  return (
    <div>
      <Button
        onclickHandler={() => {
          setLink(true);
        }}
        className={cn(`flex px-1.5 py-0.5 italic`, border)}
      >
        Link
      </Button>
      {/*<DropDown show={show} />*/}
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
      style={{
        position: "absolute",
        width: 50,
        height: 50,
        background: "black",
        ...springs,
      }}
    >
      dd
    </animated.div>
  );
}
