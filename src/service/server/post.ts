import { request } from "@/service/client/axios";

export function getPostList({ filter, page }: { filter: any; page: any }) {
  return request({
    method: "get",
    url: "/plate/list",
    params: {
      filter: filter,
      page: page,
    },
  });
}

export function getPost(id: string) {
  return request({
    method: "get",
    url: "/plate/post",
    params: {
      id: id,
    },
  });
}
