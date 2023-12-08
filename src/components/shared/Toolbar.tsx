"use client";
//Only use in Toolbar.Root
import * as Toolbar from "@radix-ui/react-toolbar";
import React from "react";
import { cn } from "@/lib/twmarge";
import {
  SeparatorProps,
  ToggleGroupProps,
  ToggleItemProps,
} from "@/types/toggleType";

export function ToggleGroup(props: ToggleGroupProps) {
  if (props.type === "single") {
    return (
      <Toolbar.ToggleGroup
        type={props.type}
        aria-label={props.ariaLabel}
        defaultValue={props.defaultValue}
        className={cn("flex gap-1", props.className)}
      >
        {props.children}
      </Toolbar.ToggleGroup>
    );
  }
  return (
    <Toolbar.ToggleGroup
      type={props.type}
      aria-label={props.ariaLabel}
      className={cn("flex gap-1", props.className)}
    >
      {props.children}
    </Toolbar.ToggleGroup>
  );
}

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

export function ToggleSeparator(props: SeparatorProps) {
  return (
    <Toolbar.Separator
      className={cn(
        "mx-[4px] h-[24px] w-[1px] bg-[rgba(255,255,255,.2)]",
        props.className,
      )}
    />
  );
}
