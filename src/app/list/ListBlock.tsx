"use client";

import { useEffect, useState } from "react";
import { getPostList } from "@/service/client/post";

type Post = {
  id: number;
  title: string;
  description: string;
  category: string;
  firstImg: string;
};

export function ListBlock() {
  const [postList, setPostList] = useState<any>([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await getPostList();
    setPostList(res);
  }

  return (
    <div className={"flex w-full flex-col items-center gap-[20px]"}>
      {postList.length > 0 &&
        postList?.map((post: Post) => {
          return (
            <div
              className={"flex w-[850px] cursor-pointer gap-[30px]"}
              key={post.id}
              onClick={() => (window.location.href = `/detail?id=${post.id}`)}
            >
              <div
                className={
                  "flex w-[100px] flex-col items-center overflow-hidden "
                }
              >
                <img
                  style={{ height: "100%" }}
                  src={post.firstImg ? post.firstImg : "./svg/next.svg"}
                  width={100}
                  height={100}
                  alt={"image"}
                />
                <h2>{post.category}</h2>
              </div>
              <div className={"flex max-w-[45rem] flex-col"}>
                <h2 className={"text-[30px] font-bold"}>{post.title}</h2>
                <p className={"text-[20px]"}>
                  {post.description.slice(0, 110)}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
