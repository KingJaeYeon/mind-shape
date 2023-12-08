"use client";
import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

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

export interface BaseProps {
  className: string;
  [key: string]: unknown;
}
