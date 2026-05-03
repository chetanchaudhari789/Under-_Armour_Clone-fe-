import { create } from "zustand";

export const useNavBarStore = create((set) => ({
  catHovered: false,

  setCatHovered: (isOpen) => set({ catHovered: isOpen }),

  closeAll: () =>
    set({
      catHovered: false,
    }),
}));
