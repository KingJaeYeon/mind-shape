"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";
import { TooltipProps } from "@/types/baseProps";

export default function TooltipProvider({ children }: TooltipProps) {
  return <Tooltip.Provider delayDuration={0}>{children}</Tooltip.Provider>;
}
