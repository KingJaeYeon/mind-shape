import React, { forwardRef } from "react";
import { cn } from "@/utils/twmarge";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};
function Grid({ children, className, ref }: Props) {
  return (
    <div ref={ref} className={cn("grid", className)}>
      {children}
    </div>
  );
}

Grid.displayName = "Grid";
export default forwardRef<HTMLDivElement, Props>(Grid);
