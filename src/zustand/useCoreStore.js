import { create } from "zustand";
export const useCoreStore = create((set) => ({
  isNotFound: false,
  setNotFound: (val) => set({ isNotFound: val }),
}));
