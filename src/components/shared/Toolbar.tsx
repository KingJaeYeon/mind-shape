"use client";
import * as Toolbar from "@radix-ui/react-toolbar";
import React from "react";
import { cn } from "@/utils/twmarge";

type ToggleItemProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};
export function ToggleItem(props: ToggleItemProps) {
  return (
    <Toolbar.ToggleItem
      value={props.value}
      aria-label={props.ariaLabel}
      className={cn(
        "ml-0.5 flex basis-auto bg-[#222] text-white outline-none",
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Toolbar.ToggleItem>
  );
}
