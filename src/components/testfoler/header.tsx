"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useEditorStore } from "@/store/editorStore";

export default function Header() {
  const { isLoading, reset } = useEditorStore((state) => state);
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div className={"my-[50px] flex w-full max-w-full justify-center"}>
      <Link href={isLoading ? "" : "/list"}>List</Link>{" "}
      <div className={"mx-[20px]"}>|</div>
      <Link href={isLoading ? "" : "/write"} onClick={reset}>
        Write
      </Link>
    </div>
  );
}
