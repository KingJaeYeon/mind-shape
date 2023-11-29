import React from "react";

export type ToggleGroupProps = {
  children: React.ReactNode;
  type: "single" | "multiple";
  defaultValue?: string;
  ariaLabel?: string;
  className?: string;
};

export type ToggleItemProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export type SeparatorProps = {
  className?: string;
};
