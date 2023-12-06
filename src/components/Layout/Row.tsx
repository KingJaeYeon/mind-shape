import React, { forwardRef } from "react";
import { cn } from "@/utils/twmarge";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};
function Row({ children, className, ref }: Props) {
  return (
    <div ref={ref} className={cn("flex", className)}>
      {children}
    </div>
  );
}

Row.displayName = "Row";
export default forwardRef<HTMLDivElement, Props>(Row);
