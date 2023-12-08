import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getPostList } from "@/service/post";
import { PAGE_SIZE } from "@/constant/constant";

interface FilterType {
  category?: string | null;
  sortBy?: string | null;
  // 다른 필요한 속성들도 추가할 수 있음
}
export function usePosts() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const filter: FilterType = {};
  // 1.FILTER
  const filterValue = searchParams.get("category");
  filter["category"] =
    !filterValue || filterValue === "ALL" ? null : filterValue;

  // SORT
  const sortBy = searchParams.get("sortBy") || "desc";
  filter["sortBy"] = !sortBy || sortBy === "desc" ? "desc" : sortBy;

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // data 는 현재 page data
  // count 는 전체 posts 의 개수 (select count(*) from posts)
  const {
    isPending: isLoading,
    data: { posts, count } = {},
    error,
  } = useQuery({
    queryKey: ["posts", filter, page],
    queryFn: () => getPostList({ filter, page }),
  });

  // PRE-FETCHING
  // 전체 page count
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // 만약 현재 페이지가 전체페이지보다 낮으면
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["posts", filter, page + 1],
      queryFn: () => getPostList({ filter, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["posts", filter, page - 1],
      queryFn: () => getPostList({ filter, page: page - 1 }),
    });
  }
  // count를 전달하는 이유는 Pagination 컴포넌트에서도 같은 로직을 처리해주어야하기 때문
  return { isLoading, posts, count, error };
}
