"use client";
import React from "react";
import { cn } from "@/utils/twmarge";

type ButtonProps = {
  className: string;
  title?: string;
  children?: React.ReactNode;
  onclickHandler?: () => void;
};
export const Button = ({
  className = ``,
  title,
  children,
  onclickHandler,
}: ButtonProps) => {
  return (
    <button
      title={title}
      className={cn(``, className)}
      onClick={onclickHandler}
    >
      {children}
    </button>
  );
};
