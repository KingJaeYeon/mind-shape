declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}

import {
  BaseEditor,
  BaseRange,
  Descendant,
  Element,
  Operation,
  Range,
} from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

import {
  BADGE,
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_THREE,
  BLOCK_HEADING_TWO,
  BLOCK_PARAGRAPH,
  BLOCK_QUOTE,
  BULLETED_LIST,
  BUTTON,
  CODE_LINE,
  EDITABLE_VOID,
  HR,
  IMAGE,
  LIST_ITEM,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_LINK,
  MARK_UNDERLINE,
  MENTION,
  NUMBER_LIST,
  TABLE,
  TABLE_CELL,
  TABLE_ROW,
  TITLE,
  VIDEO,
} from "@/constant/slate";

export type BlockQuoteElement = {
  type: BLOCK_QUOTE;
  align?: string;
  children: Descendant[];
};

export type BulletedListElement = {
  type: BULLETED_LIST;
  align?: string;
  children: Descendant[];
};

export type NumberListElement = {
  type: NUMBER_LIST;
  checked: boolean;
  children: Descendant[];
};

export type EditableVoidElement = {
  type: EDITABLE_VOID;
  children: EmptyText[];
};

export type HeadingElement = {
  type: BLOCK_HEADING_ONE;
  align?: string;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: BLOCK_HEADING_TWO;
  align?: string;
  children: Descendant[];
};

export type HeadingThreeElement = {
  type: BLOCK_HEADING_THREE;
  align?: string;
  children: Descendant[];
};

export type ImageElement = {
  type: IMAGE;
  url: string;
  children: EmptyText[];
};
export type HRElement = {
  type: HR;
  align?: string;
  children: EmptyText[];
};

export type LinkElement = {
  type: MARK_LINK;
  url: string;
  children: Descendant[];
};

export type ButtonElement = { type: BUTTON; children: Descendant[] };

export type BadgeElement = { type: BADGE; children: Descendant[] };

export type ListItemElement = { type: LIST_ITEM; children: Descendant[] };

export type MentionElement = {
  type: MENTION;
  character: string;
  children: CustomText[];
};

export type ParagraphElement = {
  type: BLOCK_PARAGRAPH;
  align?: string;
  children: Descendant[];
};

export type TableElement = { type: TABLE; children: TableRow[] };

export type TableCellElement = { type: TABLE_CELL; children: CustomText[] };

export type TableRowElement = { type: TABLE_ROW; children: TableCell[] };

export type TitleElement = { type: TITLE; children: Descendant[] };

export type VideoElement = {
  type: VIDEO;
  url: string;
  children: EmptyText[];
};

export type CodeLineElement = {
  type: CODE_LINE;
  children: Descendant[];
};

export type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | NumberListElement
  | EditableVoidElement
  | HeadingElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | BadgeElement
  | ListItemElement
  | MentionElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement
  | HRElement
  // | CodeBlockElement
  | CodeLineElement;

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  link?: boolean;
  text?: string;
};
export type MarkFormat =
  | typeof MARK_BOLD
  | typeof MARK_LINK
  | typeof MARK_CODE
  | typeof MARK_ITALIC
  | typeof MARK_UNDERLINE;

export type EmptyText = {
  text: string;
};

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeT;
    oDecorations?: Map<Element, Range[]>;
  };

export interface HistoryEditor extends BaseEditor {
  history: History;
  undo: () => void;
  redo: () => void;
  writeHistory: (stack: `undos` | `redos`, batch: any) => void;
}

export interface History {
  redos: Batch[];
  undos: Batch[];
}

interface Batch {
  operations: Operation[];
  selectionBefore: Range | null;
}
