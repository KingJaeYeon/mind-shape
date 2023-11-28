import { Transforms } from "slate";
import { cn } from "@/utils/twmarge";
import { Button } from "@/components/editor/button";
import { ReactEditor, useSelected, useSlate } from "slate-react";

export default function ImageHoverToolbar({ element }: { element: any }) {
  const selected = useSelected();
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);
  const display = selected ? `inline` : `hidden`;
  return (
    <Button
      // active
      onclickHandler={() => Transforms.removeNodes(editor, { at: path })}
      className={cn(`absolute bottom-0 flex justify-center bg-white`, display)}
    >
      {/*<Icon>delete</Icon>*/}
      <div>delete</div>
    </Button>
  );
}
