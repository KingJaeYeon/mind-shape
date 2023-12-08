import React, { forwardRef } from "react";
import { cn } from "@/utils/twmarge";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Page = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className } = props;
  return (
    <main ref={ref} className={cn(`flex`, className)}>
      {children}
    </main>
  );
});

Page.displayName = "Page";

export default Page;
