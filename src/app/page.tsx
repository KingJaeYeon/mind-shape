import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div
      className={
        "flex h-[100dvh] w-full max-w-full items-center justify-center"
      }
    >
      <Link
        className={
          "rounded-full border border-gray-300 px-8 py-3 text-[20px] font-bold"
        }
        href={"/list"}
      >
        List
      </Link>
      <div className={"mx-[20px]"}>|</div>
      <Link
        href={"/write"}
        className={
          "rounded-full border border-gray-300 px-8 py-3 text-[20px] font-bold"
        }
      >
        Write
      </Link>
    </div>
  );
}
