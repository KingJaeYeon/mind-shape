import Editor from "@/components/editor/editor";

export default async function page() {
  return (
    <div>
      <Editor readOnly={true} />
    </div>
  );
}
