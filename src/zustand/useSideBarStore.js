import { create } from "zustand";

export const useSideBarStore = create((set) => ({
  isHamSideOpen: false,
  isSearchSideBarOpen: false,
  isSubCategoriesHidden: true,
  searchTerm: "",

  setIsHamSideOpen: (isOpen) => set({ isHamSideOpen: isOpen }),
  setIsSearchSideBarOpen: (isOpen) => set({ isSearchSideBarOpen: isOpen }),
  setIsSubCategoriesHidden: (isHidden) =>
    set({ isSubCategoriesHidden: isHidden }),
  setSearchTerm: (term) => set({ searchTerm: term }),

  closeAll: () =>
    set({
      isHamSideOpen: false,
      isSearchSideBarOpen: false,
    }),
}));
