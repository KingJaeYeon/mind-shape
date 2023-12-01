import { request } from "@/service/client/axios";

/*
 --example
 axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
 */
export function savePost({
  title,
  category,
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
