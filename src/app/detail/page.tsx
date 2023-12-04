import Editor from "@/components/editor/editor";
import { getPost } from "@/service/server/post";
import { useSearchParams } from "next/navigation";

export default async function page() {
  return (
    <div>
      <Editor readOnly={true} />
    </div>
  );
}
