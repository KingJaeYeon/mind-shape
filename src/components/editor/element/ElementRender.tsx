"use client";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { Element, Leaf } from "./ChangeElement";

export const renderElement = (props: RenderElementProps) => {
  return <Element {...props} />;
};

export const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;
