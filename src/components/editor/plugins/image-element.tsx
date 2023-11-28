import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";
import { ElementProps } from "@/components/editor/plugins/change-element";
import { cn } from "@/utils/twmarge";
import { Transforms } from "slate";
import { Button } from "@/components/editor/button";
import Image from "next/image";
import ImageHoverToolbar from "@/components/editor/plugins/image-hover-toolbar";

export const ImageElement = ({
  attributes,
  children,
  element,
}: ElementProps) => {
  const selected = useSelected();
  const focused = useFocused();
  const boxShadow = selected && focused ? `shadow-[0_0_0_3px_#B4D5FF]` : `none`;

  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} className={`relative flex justify-center`}>
        <Image
          src={element.url as string}
          width={700}
          height={3000}
          className={cn(`box-border block w-[95%]`, boxShadow)}
          alt={`insert`}
          priority
        />
        <ImageHoverToolbar element={element} />
      </div>
    </div>
  );
};
