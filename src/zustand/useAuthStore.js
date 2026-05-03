import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthModalOpen: false,
  authView: "login",

  openLogin: () => set({ isAuthModalOpen: true, authView: "login" }),
  openRegister: () => set({ isAuthModalOpen: true, authView: "register" }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setAuthView: (view) => set({ authView: view }),
}));
