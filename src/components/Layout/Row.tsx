import React, { forwardRef } from "react";
import { cn } from "@/utils/twmarge";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};
function Row({ className, ref, children, ...props }: Props) {
  return (
    <div ref={ref} className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
}

Row.displayName = "Row";
export default forwardRef<HTMLDivElement, Props>(Row);
