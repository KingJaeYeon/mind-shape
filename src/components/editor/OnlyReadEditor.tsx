"use client";
import React, { useEffect } from "react";
import { Title } from "@/components/editor/Title";
import { Editable, Slate } from "slate-react";
import { useEditorStore } from "@/store/editorStore";
import {
  renderElement,
  renderLeaf,
} from "@/components/editor/element/ElementRender";
import { Toolbar } from "@/components/editor/EditorToolbar";
import HoverToolbar from "@/components/editor/plugins/HoverToolbar";
import Category from "@/components/editor/Category";
import Grid from "@/components/Layout/Grid";

function OnlyReadEditor({ post }: { post: any }) {
  const {
    editor,
    setContents,
    contents,
    setTitle,
    setCategory,
    setIsOnlyRead,
  } = useEditorStore((state) => state);

  useEffect(() => {
    setData();
  }, []);

  async function setData() {
    console.log(post);
    setTitle(post.title);
    setCategory(post.category);
    setContents(JSON.parse(post.content));
    setIsOnlyRead(true);
  }

  if (contents === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex w-full flex-col items-center px-2 py-1`}>
      <Category />
      <Slate editor={editor} initialValue={contents}>
        <Toolbar show={true} />
        <Grid className={`w-full max-w-[47rem] overflow-auto`}>
          <Title />
          <hr className={`my-5`} />
          <HoverToolbar />
          <Editable
            className={`min-h-[60vh] w-full max-w-[47rem] outline-none`}
            renderElement={renderElement}
            readOnly={true}
            renderLeaf={renderLeaf}
          />
        </Grid>
      </Slate>
    </div>
  );
}

export default OnlyReadEditor;
