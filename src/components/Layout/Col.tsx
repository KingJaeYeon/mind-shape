import React, { forwardRef } from "react";
import { cn } from "@/utils/twmarge";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};
function Col({ children, className, ref }: Props) {
  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      {children}
    </div>
  );
}

Col.displayName = "Col";
export default forwardRef<HTMLDivElement, Props>(Col);
