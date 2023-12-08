import {
  MARK_BOLD_HOTKEY,
  MARK_CODE_HOTKEY,
  MARK_ITALIC_HOTKEY,
  MARK_UNDERLINE_HOTKEY,
} from "@/constant/slate-hotkey";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_LINK,
  MARK_UNDERLINE,
} from "@/constant/slate";
import {
  BlockEditor,
  LinkEditor,
  MarkEditor,
} from "@/components/editor/plugins/custom-editor-plugins";

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

export const EventKeyPlugins = {
  ShiftEnter(event: any, editor: any) {
    //Shift + Enter
    if (event.key === `Enter` && event.shiftKey) {
      event.preventDefault();
      editor.insertText(`\n`);
    }
  },
  DeleteLister(event: any, editor: any) {
    if (event.key === `Backspace` || event.key === `Delete`) {
      BlockEditor.deleteBlock(editor);
    }
  },
  CodeOrLinkEnter(event: any, editor: any) {
    if (event.key === `Enter`) {
      const isLinkActive = LinkEditor.isLinkActive(editor, MARK_LINK);
      const isCodeActive = MarkEditor.isMarkActive(editor, MARK_CODE);
      if (isLinkActive) {
        LinkEditor.removeLink(editor);
      }
      if (isCodeActive) {
        MarkEditor.removeMark(editor, MARK_CODE);
      }
    }
  },
};
