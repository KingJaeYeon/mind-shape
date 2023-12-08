import React, { forwardRef } from "react";
import { cn } from "@/utils/twmarge";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Contents = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className } = props;
  return (
    <div ref={ref} className={cn(``, className)}>
      {children}
    </div>
  );
});

Contents.displayName = "Contents";

export default Contents;
