import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getPostList } from "@/service/server/post";

export function useListing() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // 1.FILTER
  const filterValue = searchParams.get("category");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "category", value: filterValue };

  // const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  // const []

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["posts", filter, page],
    queryFn: () => getPostList({ filter, page }),
  });
}
