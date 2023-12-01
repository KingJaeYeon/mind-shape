"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div className={"my-[50px] flex w-full max-w-full justify-center"}>
      <Link href={"/list"}>List</Link> <div className={"mx-[20px]"}>|</div>
      <Link href={"/write"}>Write</Link>
    </div>
  );
}
