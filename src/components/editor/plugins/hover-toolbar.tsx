"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFocused, useReadOnly, useSlate, useSlateStatic } from "slate-react";
import { Portal } from "@/components/editor/Portal";
import { Button } from "@/components/editor/button";
import * as Toolbar from "@radix-ui/react-toolbar";
import {
  BlockEditor,
  HREditor,
  LinkEditor,
  MarkEditor,
} from "@/components/editor/plugins/custom-editor-plugins";
import {
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_TWO,
  BLOCK_QUOTE,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_LINK,
  MARK_UNDERLINE,
} from "@/constant/slate";
import { Menu } from "@/components/editor/Menu";
import { useHoverToolbarPosition } from "@/hook/useHoverToolbarPosition";
import { useEditorStore } from "@/store/editorStore";
import { cn } from "@/utils/twmarge";
import {
  IconBold,
  IconCode,
  IconHr,
  IconItalic,
  IconLink,
  IconQuote,
  IconUnderLined,
} from "@/public/svg";
import {
  ToggleGroup,
  ToggleItem,
  ToggleSeparator,
} from "@/components/shared/Toolbar";

export default function HoverToolbar() {
  const ref = useRef<HTMLDivElement>(null);
  const { isLink, setLink } = useEditorStore((state) => state);
  const editor = useSlate();
  const inFocus = useFocused();
  const [inputValue, setInputValue] = useState("");
  useHoverToolbarPosition(ref, editor, inFocus, "default", isLink);
  const menuStyled = isLink ? "text-black flex-row" : "text-white";

  useEffect(() => {
    if (ref.current) {
      setLink(false);
      setInputValue("");
    }
  }, [editor.selection, ref.current]);

  return (
    <Portal>
      <Menu
        ref={ref}
        className={cn(
          "absolute z-20 hidden rounded-[4px] bg-[#222]",
          menuStyled,
        )}
        style={{
          transition: "opacity 0.75s",
        }}
        onMouseDown={(e: any) => {
          if (!isLink) e.preventDefault();
        }}
      >
        {isLink ? (
          <LinkInput inputValue={inputValue} setInputValue={setInputValue} />
        ) : (
          <DefaultMenu />
        )}
      </Menu>
    </Portal>
  );
}

function DefaultMenu() {
  const editor = useSlateStatic();
  const { setLink } = useEditorStore((state) => state);
  const isReadOnly = useReadOnly();
  const isLinkActive = LinkEditor.isLinkActive(editor, MARK_LINK);
  if (isReadOnly) return null;
  return (
    <Toolbar.Root className={"flex h-[44px] items-center gap-1 px-[10px]"}>
      <ToggleGroup type={"single"} defaultValue="bold">
        <ToggleItem
          value={"bold"}
          ariaLabel={"Bold"}
          onClick={() => {
            MarkEditor.removeMark(editor, MARK_CODE);
            MarkEditor.toggleMark(editor, MARK_BOLD);
          }}
        >
          <IconBold isActive={MarkEditor.isMarkActive(editor, MARK_BOLD)} />
        </ToggleItem>
        <ToggleItem
          value={"code"}
          ariaLabel={"Code"}
          onClick={() => {
            BlockEditor.defaultBlock(editor);
            MarkEditor.removeMark(editor, MARK_BOLD);
            MarkEditor.toggleMark(editor, MARK_CODE);
          }}
        >
          <IconCode isActive={MarkEditor.isMarkActive(editor, MARK_CODE)} />
        </ToggleItem>
      </ToggleGroup>
      <ToggleSeparator />
      <ToggleGroup type={"multiple"}>
        <ToggleItem
          value={"link"}
          ariaLabel={"Link"}
          onClick={() =>
            isLinkActive ? LinkEditor.removeLink(editor) : setLink(true)
          }
        >
          <IconLink isActive={isLinkActive} />
        </ToggleItem>

        <ToggleItem
          value={"italic"}
          ariaLabel={"Italic"}
          onClick={() => MarkEditor.toggleMark(editor, MARK_ITALIC)}
        >
          <IconItalic isActive={MarkEditor.isMarkActive(editor, MARK_ITALIC)} />
        </ToggleItem>

        <ToggleItem
          value={"underlined"}
          ariaLabel={"UnderLined"}
          className={"relative top-[2px]"}
          onClick={() => MarkEditor.toggleMark(editor, MARK_UNDERLINE)}
        >
          <IconUnderLined
            isActive={MarkEditor.isMarkActive(editor, MARK_UNDERLINE)}
          />
        </ToggleItem>
        <ToggleItem
          value={"quote"}
          ariaLabel={"Quote"}
          className={"relative top-[2px]"}
          onClick={() => BlockEditor.toggleBlock(editor, BLOCK_QUOTE)}
        >
          <IconQuote
            isActive={BlockEditor.isBlockActive(editor, BLOCK_QUOTE)}
            css={{ width: "17px", height: "17px" }}
          />
        </ToggleItem>
      </ToggleGroup>
      <ToggleSeparator />
      <Button
        onclickHandler={() => {
          MarkEditor.removeMark(editor, MARK_CODE);
          BlockEditor.toggleBlock(editor, BLOCK_HEADING_ONE);
        }}
        className={cn(
          `flex px-1.5 py-0.5`,
          BlockEditor.isBlockActive(editor, BLOCK_HEADING_ONE) &&
            "text-[#a8e293]",
        )}
      >
        H1
      </Button>
      <Button
        onclickHandler={() => {
          MarkEditor.removeMark(editor, MARK_CODE);
          BlockEditor.toggleBlock(editor, BLOCK_HEADING_TWO);
        }}
        className={cn(
          `flex px-1.5 py-0.5`,
          BlockEditor.isBlockActive(editor, BLOCK_HEADING_TWO) &&
            "text-[#a8e293]",
        )}
      >
        H2
      </Button>
      <Button
        onclickHandler={() => {
          HREditor.toggleHR(editor);
        }}
        className={cn(`flex px-1.5 py-0.5`)}
      >
        HR
      </Button>
    </Toolbar.Root>
  );
}

function LinkInput({
  inputValue,
  setInputValue,
}: {
  inputValue: string;
  setInputValue: Function;
}) {
  const { setLink } = useEditorStore((state) => state);
  const editor = useSlateStatic();
  return (
    <div className={"flex p-[8px_7px_6px]"}>
      <input
        value={inputValue}
        className={"w-[180px] bg-[#222] text-[14px] text-white outline-none"}
        autoFocus={true}
        placeholder={"Paste or type a link..."}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        className={"flex px-1.5 py-0.5 text-[14px] text-white"}
        onclickHandler={() => {
          LinkEditor.addLink(editor, MARK_LINK, inputValue);
          setLink(false);
        }}
      >
        확인
      </Button>
    </div>
  );
}
