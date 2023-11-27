"use client";
import {
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_THREE,
  BLOCK_HEADING_TWO,
  BULLETED_LIST,
  HR,
  IMAGE,
  LIST_ITEM,
  NUMBER_LIST,
} from "@/constant/slate";
import { HrElement } from "@/components/editor/hr";
// import { ImageElement } from "@/components/slate-plugins/image/Image";

export type ElementProps = {
  attributes: any;
  children?: any;
  element: any;
};
type LeafProps = {
  attributes: any;
  children?: any;
  underline?: any;
  leaf: any;
  code?: any;
};
export const Element = ({ attributes, children, element }: ElementProps) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case BLOCK_HEADING_ONE:
      return (
        <h1 style={style} className={`text-[32px]`} {...attributes}>
          <strong>{children}</strong>
        </h1>
      );
    case BLOCK_HEADING_TWO:
      return (
        <h2 style={style} className={`text-[28px]`} {...attributes}>
          <strong>{children}</strong>
        </h2>
      );
    case BLOCK_HEADING_THREE:
      return (
        <h3 style={style} className={`text-[24px]`} {...attributes}>
          <strong>{children}</strong>
        </h3>
      );
    case LIST_ITEM:
      return (
        <li style={style} className={`mb-2`} {...attributes}>
          {children}
        </li>
      );
    case BULLETED_LIST:
      return (
        <ul
          style={style}
          className={`mb-2 list-inside list-disc text-[20px]`}
          {...attributes}
        >
          {children}
        </ul>
      );
    case NUMBER_LIST:
      return (
        <ol
          style={style}
          className={`list-inside list-decimal text-[20px]`}
          {...attributes}
        >
          {children}
        </ol>
      );
    // case IMAGE:
    //   return (
    //     <ImageElement element={element} attributes={attributes}>
    //       {children}
    //     </ImageElement>
    //   );
    case HR:
      return <HrElement element={element} attributes={attributes} />;
    default:
      return (
        <p style={style} className={`text-[20px]`} {...attributes}>
          {children}
        </p>
      );
  }
};

export const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.code) {
    children = (
      <code className={`rounded bg-gray-100 p-0.5 text-[18px] font-thin`}>
        {children}
      </code>
    );
  }
  return <span {...attributes}>{children}</span>;
};
