import {
  Editor as SlateEditor,
  Element as SlateElement,
  Path,
  Transforms,
} from "slate";
import {
  CustomText,
  HRElement,
  ImageFormat,
  MarkFormat,
  ParagraphElement,
} from "../../../../@types/slate";
import {
  ALIGN,
  BLOCK_PARAGRAPH,
  BULLETED_LIST,
  HR,
  IMAGE,
  LIST_ITEM,
  LIST_TYPES,
  MARK_LINK,
  NUMBER_LIST,
  TEXT_ALIGN_TYPES,
  TYPE,
} from "@/constant/slate";

export const ListDeleter = {
  isElementListType(editor: any) {
    const [match]: any = SlateEditor.nodes(editor, {
      match: (n: any) => LIST_TYPES.includes(n.type),
    });
    const [match1]: any = SlateEditor.nodes(editor, {
      match: (n: any) => n.type === LIST_ITEM,
    });
    console.log("ListDeleter match::", match);
    console.log("ListDeleter match1::", match1);
    let length;
    if (match) {
      length =
        match[0].children[match[0].children.length - 1].children[0].text.length;
    }
    return {
      isMatch: !!match,
      length,
    };
  },

  ActionHandler(editor: any, event: any) {
    const { isMatch, length } = ListDeleter.isElementListType(editor);
    if (length === 0 && isMatch) {
      event.preventDefault();
      Transforms.unwrapNodes(editor, {
        match: (n: any) => LIST_TYPES.includes(n.type),
        split: true,
      });
      Transforms.setNodes(editor, {
        type: BLOCK_PARAGRAPH,
      } as any);
    }
  },
};
export const HREditor = {
  toggleHR(editor: any) {
    const hr: HRElement = { type: HR, children: [{ text: `` }] };
    const paragraph: ParagraphElement = {
      type: BLOCK_PARAGRAPH,
      children: [{ text: `` }],
    };
    Transforms.insertNodes(editor, hr);
    Transforms.insertNodes(editor, paragraph);
  },
};
export const ListEditor = {
  isListActive(editor: any, format: string) {
    const [match]: any = SlateEditor.nodes(editor, {
      match: (n: any) => n.type === format,
    });
    return !!match;
  },

  toggleList(editor: any, format: string) {
    const isActive = ListEditor.isListActive(editor, format);
    const isList = LIST_TYPES.includes(format);
    // Transforms.unwrapNodes(editor, {
    //   match: (n: any) => LIST_TYPES.includes(n.type),
    //   split: true,
    // });
    // console.log("toggleIsActive::", isActive);
    // console.log("toggleIsList:", isList);
    // console.log("format::", format);
    Transforms.setNodes(editor, {
      type: isActive ? BLOCK_PARAGRAPH : isList ? LIST_ITEM : format,
    } as any);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },
};

export const BlockEditor = {
  isBlockActive(editor: any, format: string, blockType = TYPE) {
    const { selection } = editor;
    if (!selection) return false;

    const [match]: any = SlateEditor.nodes(editor, {
      match: (n: any) => SlateElement?.isElement(n) && n[blockType] === format,
    } as any);
    return !!match;
  },

  toggleBlock(editor: any, format: string) {
    const isActive = BlockEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? ALIGN : TYPE,
    );

    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      } as any;
    } else {
      newProperties = {
        type: isActive ? BLOCK_PARAGRAPH : format,
      } as any;
    }
    Transforms.unwrapNodes(editor, {
      match: (n: any) => LIST_TYPES.includes(n.type),
      split: true,
    });
    Transforms.setNodes<SlateElement>(editor, newProperties);
  },
  defaultBlock(editor: any) {
    Transforms.setNodes<SlateElement>(editor, { type: BLOCK_PARAGRAPH });
  },
};
export const ImageEditor = {
  toggleImage(editor: any, format: ImageFormat) {
    Transforms.insertNodes(editor, { size: format });
    // Transforms.setNodes<SlateElement>(editor, { size: format });
  },
  removeImage(editor: any, path: Path) {
    Transforms.removeNodes(editor, { at: path });
  },
};
export const MarkEditor = {
  isMarkActive(editor: any, format: MarkFormat) {
    const marks: Omit<CustomText, `text`> | null = SlateEditor.marks(editor);
    return marks ? (marks as any)[format] === true : false;
  },

  toggleMark(editor: any, format: MarkFormat) {
    const isActive = MarkEditor.isMarkActive(editor, format);
    console.log("toggleMark");
    if (isActive) {
      SlateEditor.removeMark(editor, format);
    } else {
      SlateEditor.addMark(editor, format, true);
    }
  },
  removeMark(editor: any, format: MarkFormat) {
    SlateEditor.removeMark(editor, format);
  },
};

export const LinkEditor = {
  isLinkActive(editor: any, format = MARK_LINK) {
    const marks: Pick<CustomText, `link`> | null = SlateEditor.marks(editor);
    return marks ? (marks as any)[format] !== undefined : false;
  },
  addLink(editor: any, format = MARK_LINK, link: string) {
    if (link.trim().length !== 0) SlateEditor.addMark(editor, format, link);
  },
  removeLink(editor: any, format = MARK_LINK) {
    SlateEditor.removeMark(editor, format);
  },
};
