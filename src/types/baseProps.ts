import React from "react";

export interface BaseProps {
  className: string;
  [key: string]: unknown;
}

export type TooltipProps = {
  children: React.ReactNode[] | React.ReactNode;
};
