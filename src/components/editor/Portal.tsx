"use client";
import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Portal = ({ children }: { children: any }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted && typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};
