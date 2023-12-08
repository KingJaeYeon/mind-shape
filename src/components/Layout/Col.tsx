import React, { forwardRef } from "react";
import { cn } from "@/lib/twmarge";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Col = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className } = props;
  return (
    <div ref={ref} className={cn(`flex flex-col`, className)}>
      {children}
    </div>
  );
});

Col.displayName = "Col";

export default Col;
