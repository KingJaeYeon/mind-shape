import React from "react";
import Editor from "@/components/editor/Editor";

export default async function page() {
  return (
    <div>
      <Editor readOnly={true} />
    </div>
  );
}
