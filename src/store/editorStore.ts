import { create } from "zustand";
import { withReact } from "slate-react";
import { createEditor } from "slate";
// import { withHistory } from "@/components/slate-plugins/history/with-history";
// import { withImages } from "@/components/slate-plugins/image/withImages";

type State = {
  editor: any;
  shift: boolean;
};
type Action = {
  setShift: (shift: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  // editor: withImages(withReact(withHistory(createEditor()))),
  editor: withReact(createEditor()),
  shift: false,
};

export const useEditorStore = create<State & Action>()((set) => ({
  editor: withReact(createEditor()),
  // editor: withImages(withReact(withHistory(createEditor()))),
  shift: false,
  setShift: (shift: boolean) => set({ shift }),
  reset: () => set(initialState),
}));
