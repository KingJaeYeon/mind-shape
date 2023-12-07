import { request } from "@/service/axios";
import { PAGE_SIZE } from "@/constant/default";

export function getPostList({
  filter,
  page,
  pageSize = PAGE_SIZE,
}: {
  filter: any;
  page: any;
  pageSize?: number;
}) {
  return request({
    method: "get",
    url: "/plate/list",
    params: {
      filter: filter,
      page: page,
      pageSize: pageSize,
    },
  });
}

export function getPost({ id }: { id: any }) {
  return request({
    method: "get",
    url: "/plate/post",
    params: {
      id: id,
    },
  });
}

export function savePost({
  title,
  category = "금전/계약",
  contents,
}: {
  title: string;
  category: string;
  contents: any;
}) {
  return request({
    method: "post",
    url: "/plate/post",
    data: {
      title,
      category,
      contents,
    },
  });
}
