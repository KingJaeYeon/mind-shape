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
  LIST_ITEM,
  LIST_TYPES,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_UNDERLINE,
  NUMBER_LIST,
  TEXT_ALIGN_TYPES,
  TYPE,
} from "@/constant/slate";
import {
  MARK_BOLD_HOTKEY,
  MARK_CODE_HOTKEY,
  MARK_ITALIC_HOTKEY,
  MARK_UNDERLINE_HOTKEY,
} from "@/constant/slate-hotkey";

export const keydownEventPlugin = (event: any, editor: any) => {
  if (!event.ctrlKey) return;

  switch (event.key) {
    case MARK_CODE_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, MARK_CODE);
      break;
    }
    case MARK_BOLD_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, MARK_BOLD);
      break;
    }
    case MARK_UNDERLINE_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, MARK_UNDERLINE);
      break;
    }
    case MARK_ITALIC_HOTKEY: {
      event.preventDefault();
      MarkEditor.toggleMark(editor, MARK_ITALIC);
      break;
    }
  }
};

export const ShiftEnter = (event: any, editor: any) => {
  event.preventDefault();
  editor.insertText(`\n`);
};

export const ListDeleter = {
  isElementListType(editor: any) {
    const [match]: any = SlateEditor.nodes(editor, {
      match: (n: any) => n.type === NUMBER_LIST || n.type === BULLETED_LIST,
    });
    let length;
    if (match) {
      length =
        match[0].children[match[0].children.length - 1].children[0].text.length;
    }
    return {
      isMatch: !!match,
      match,
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
    Transforms.unwrapNodes(editor, {
      match: (n: any) => LIST_TYPES.includes(n.type),
      split: true,
    });

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
    Transforms.setNodes<SlateElement>(editor, newProperties);
  },
};
export const ImageEditor = {
  toggleImage(editor: any, format: ImageFormat) {
    console.log(editor);
    Transforms.setNodes<SlateElement>(editor, { size: format });
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
    if (isActive) {
      SlateEditor.removeMark(editor, format);
    } else {
      SlateEditor.addMark(editor, format, true);
    }
  },
};
