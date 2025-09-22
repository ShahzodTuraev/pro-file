import { create } from "zustand";
type vidStore = {
  vid: string;
  setVid: (vid: string) => void;
};

export const useVidStore = create<vidStore>((set) => ({
  vid: "",
  setVid: (vid) => set({ vid }),
}));
