import { create } from "zustand";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import { withImages } from "@/components/editor/plugins/withImages";
import { withHistory } from "@/components/editor/plugins/with-history";
import { CustomEditor } from "../../@types/slate";

type State = {
  editor: CustomEditor;
  element: any;
};

type Action = {
  setElement: (props: any) => void;
  reset: () => void;
};

const initialState: State = {
  editor: withImages(withReact(withHistory(createEditor()))),
  element: null,
};

export const useEditorStore = create<State & Action>()((set) => ({
  editor: withImages(withReact(withHistory(createEditor()))),
  element: null,
  setElement: (props: any) => set(() => ({ element: props })),
  reset: () => set(initialState),
}));
