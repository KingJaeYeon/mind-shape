import { create } from "zustand";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import { withImages } from "@/components/editor/plugins/withImages";
import { withHistory } from "@/components/editor/plugins/with-history";
import { CustomEditor } from "../../@types/slate";

type State = {
  editor: CustomEditor;
  isLink: boolean;
};

type Action = {
  setLink: (isLink: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  editor: withImages(withReact(withHistory(createEditor()))),
  isLink: false,
};

export const useEditorStore = create<State & Action>()((set) => ({
  editor: withImages(withReact(withHistory(createEditor()))),
  isLink: false,
  setLink: (isLink) => set(() => ({ isLink: isLink })),
  reset: () => set(initialState),
}));
