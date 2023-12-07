"use client";

import React, { useCallback } from "react";

import Image from "next/image";
import Table from "@/components/shared/Table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePosts } from "@/hook/usePosts";
import { cn } from "@/utils/twmarge";
import Pagination from "@/components/shared/Pagination";
import Contents from "@/components/Layout/Contents";
import Col from "@/components/Layout/Col";

type Post = {
  id: number;
  title: string;
  description: string;
  category: string;
  firstImg: string;
};

export function ListBlock() {
  const { isLoading, error, posts: postList, count } = usePosts();

  return (
    <Contents className={"flex flex-col items-center"}>
      <Table>
        <Table.Header>
          <div className={"flex w-full justify-between"}>
            <Select />
            <SortBy />
          </div>
        </Table.Header>

        <Table.Body
          isLoading={isLoading}
          data={postList}
          render={(post: any) => <PostRow post={post} key={post.id} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Contents>
  );
}
function PostRow({ post }: { post: Post }) {
  return (
    <Table.TRow>
      <div
        className={"flex w-[850px] cursor-pointer gap-[30px]"}
        onClick={() => (window.location.href = `/detail?id=${post.id}`)}
      >
        <Col className={"w-[100px] items-center overflow-hidden "}>
          <Image
            style={{ height: "100%" }}
            src={post.firstImg ? post?.firstImg : "./svg/next.svg"}
            width={100}
            height={100}
            alt={"image"}
          />
          <h2>{post.category}</h2>
        </Col>
        <Col className={"max-w-[45rem]"}>
          <h2 className={"text-[30px] font-bold"}>{post.title}</h2>
          <p className={"text-[20px]"}>{post.description.slice(0, 110)}</p>
        </Col>
      </div>
    </Table.TRow>
  );
}

function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortBy = searchParams.get("sortBy") || "desc";

  const createQuery = useCallback(
    (sortBy: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("sortBy", sortBy);
      return params.toString();
    },
    [searchParams],
  );

  const options = [
    { label: "최신순", value: "desc" },
    { label: "오래된순", value: "asc" },
  ];

  return (
    <div className={"flex gap-[30px]"}>
      {options.map((option) => (
        <button
          className={cn("", sortBy === option.value && "text-blue-500")}
          key={option.label}
          onClick={() =>
            router.push(pathname + "?" + createQuery(option.value))
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

const categories = [
  "ALL",
  "금전/계약",
  "기업 법무",
  "형사 절차",
  "폭행 협박",
  "명예훼손",
  "가족/이혼",
  "세금",
  "학교폭력",
  "성/통매음",
  "기타",
];

function Select() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const category = searchParams.get("category") || "ALL";

  const createQuery = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("category", category);
      params.set("page", "1");
      return params.toString();
    },
    [searchParams],
  );

  return (
    <select
      value={category}
      onChange={(e) => {
        router.push(pathname + "?" + createQuery(e.target.value));
      }}
      id="cars"
      className={
        "h-[40px] w-auto rounded-[4px] border border-gray-300 px-[10px]"
      }
    >
      {categories.map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
