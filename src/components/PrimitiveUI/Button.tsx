"use client";
import React, { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/twmarge";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
} & ComponentProps<"button">;

const Button = (
  { className, children, ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  return (
    <button ref={ref} className={cn(``, className)} {...props}>
      {props.disabled && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
};

export default forwardRef(Button);
