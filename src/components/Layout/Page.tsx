import React, { forwardRef } from "react";
import { cn } from "@/utils/twmarge";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};
function Page({ children, className, ref }: Props) {
  return (
    <div ref={ref} className={cn("", className)}>
      {children}
    </div>
  );
}

Page.displayName = "Page";
export default forwardRef<HTMLDivElement, Props>(Page);
