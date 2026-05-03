"use client";
import React from "react";
import { useAuthStore } from "@/zustand/useAuthStore";
import { IoCloseOutline } from "react-icons/io5";
import css from "@/imports/auth/auth-modal.module.css";
import LoginView from "@/imports/auth/login/Loginview";
import RegisterView from "@/imports/auth/signup/SignupView";

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authView } = useAuthStore();

  if (!isAuthModalOpen) return null;

  return (
    <div className={css.backdrop} onClick={closeAuthModal}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={closeAuthModal}>
          <IoCloseOutline size={28} />
        </button>

        <div className={css.content}>
          {authView === "login" ? <LoginView /> : <RegisterView />}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
