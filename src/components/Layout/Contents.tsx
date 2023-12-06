import React, { forwardRef } from "react";
import { cn } from "@/utils/twmarge";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};
function Contents({ children, className, ref }: Props) {
  return (
    <div ref={ref} className={cn("", className)}>
      {children}
    </div>
  );
}

Contents.displayName = "Contents";
export default forwardRef<HTMLDivElement, Props>(Contents);
