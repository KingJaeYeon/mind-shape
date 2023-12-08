import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";
import { cn } from "@/lib/twmarge";

type ToolTipProps = {
  trigger?: React.ReactNode | React.ReactNode[];
  content?: React.ReactNode | React.ReactNode[];
  bg?: string;
  fill?: string;
  text?: string;
};

export default function ToolTip({
  trigger,
  bg,
  text,
  fill,
  content,
}: ToolTipProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className={cn(
            "select-none rounded-[4px] bg-[#222] px-[15px] py-[10px] text-[15px] leading-none text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
            bg,
            text,
          )}
          sideOffset={5}
        >
          {content}
          <Tooltip.Arrow className={cn("fill-[#222]", fill)} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
