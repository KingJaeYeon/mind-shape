import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/service/post";
import { useState } from "react";

export function usePost() {
  const id = useSearchParams().get("id");

  // "post"는 키 값이고 나머지 value 들이 변경되는 것을 감지하고 데이터를 다시 요청하거나 캐싱처리하거나 결정함
  const {
    isFetching: isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost({ id }),
    retry: false,
  });
  return { post, error, isLoading };
}
