import { ListBlock } from "@/app/list/ListBlock";
import { getPostList } from "@/service/client/post";

export const revalidate = 0;

export default async function page() {
  return <ListBlock />;
}
