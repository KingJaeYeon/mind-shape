"use client";
import React, { PropsWithChildren } from "react";
import { BaseProps } from "@/types/baseProps";
import { cn } from "@/utils/twmarge";

export const Menu = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<BaseProps>
>(({ className, ...props }, ref) => {
  return (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cn(``, className)}
    />
  );
});

Menu.displayName = "Menu";
