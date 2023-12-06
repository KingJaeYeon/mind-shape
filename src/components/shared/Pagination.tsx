"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE, PAGINATION } from "@/constant/default";
import React, { useCallback } from "react";
import { IconChevronLeft, IconChevronRight } from "@/public/svg";
import { cn } from "@/utils/twmarge";
import "@/style/pagination.css";

export default function Pagination({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pathname = usePathname();
  const router = useRouter();

  const pageCount = Math.ceil(count / PAGE_SIZE);
  const currentMaxPage = Math.ceil(currentPage / PAGINATION) * PAGINATION;
  const createQuery = useCallback(
    (page: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page);
      return params.toString();
    },
    [searchParams],
  );

  function nextPage() {
    const next = (Math.ceil(currentPage / PAGINATION) + 1) * PAGINATION;
    const data = next - (PAGINATION - 1);
    router.push(pathname + "?" + createQuery(data.toString()));
  }

  function prevPage() {
    const prev = (Math.ceil(currentPage / PAGINATION) - 1) * PAGINATION;
    router.push(pathname + "?" + createQuery(String(prev.toString())));
  }

  if (pageCount < currentPage) return null;
  if (!currentPage) return null;
  if (!pageCount) return null;

  const pageList = Array.from({ length: PAGINATION }, (_, index) => {
    if (currentMaxPage - index > pageCount) return null;
    return currentMaxPage - index;
  })
    .filter((page) => page !== null)
    .reverse();

  return (
    <div className={"flex gap-[10px]"}>
      <button
        onClick={() => prevPage()}
        id={"prev"}
        disabled={currentMaxPage === PAGINATION}
        className={
          "flex h-[2.25rem] w-[2.25rem] items-center justify-center border border-grayscale-light disabled:cursor-not-allowed "
        }
      >
        <IconChevronLeft />
      </button>
      {pageList &&
        pageList?.map((page) => {
          if (page !== 0)
            return (
              <button
                className={cn(
                  "h-[2.25rem] w-[2.25rem] border border-grayscale-light bg-transparent text-grayscale-dark",
                  currentPage === page && "bg-grayscale text-grayscale-white",
                  currentPage !== page &&
                    "hover:bg-primary hover:text-grayscale-white",
                )}
                key={page}
                onClick={() =>
                  router.push(pathname + "?" + createQuery(String(page)))
                }
              >
                {page}
              </button>
            );
        })}
      <button
        id={"next"}
        onClick={() => nextPage()}
        disabled={currentMaxPage >= pageCount}
        className={
          "flex h-[2.25rem] w-[2.25rem] items-center justify-center border border-grayscale-light disabled:cursor-not-allowed"
        }
      >
        <IconChevronRight />
      </button>
    </div>
  );
}
