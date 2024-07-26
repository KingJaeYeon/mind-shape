import { useFocused, useSelected } from "slate-react";
import { ElementProps } from "@/components/editor/plugins/change-element";
import { cn } from "@/utils/twmarge";
import Image from "next/image";
import ImageHoverToolbar from "@/components/editor/plugins/image-hover-toolbar";
import { IMAGE_SIZE_LARGE, IMAGE_SIZE_MIDDLE } from "@/constant/slate";

export const ImageElement = ({
  attributes,
  children,
  element,
}: ElementProps) => {
  const selected = useSelected();
  const focused = useFocused();
  const boxShadow = selected && focused ? `shadow-[0_0_0_3px_#B4D5FF]` : `none`;
  const width =
    element.size === IMAGE_SIZE_LARGE
      ? `w-[90%]`
      : element.size === IMAGE_SIZE_MIDDLE
        ? `w-[70%]`
        : `w-[40%]`;

  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} className={`relative flex justify-center`}>
        <Image
          src={element.url as string}
          width={700}
          height={3000}
          className={cn(`box-border block`, boxShadow, width)}
          alt={`insert`}
          priority
        />
        <ImageHoverToolbar element={element} />
      </div>
    </div>
  );
};
