"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCoreStore } from "@/zustand/useCoreStore";
import { useAuthStore } from "@/zustand/useAuthStore";
import {
  addResponseInterceptor,
  removeResponseInterceptor,
  addRequestInterceptor,
  removeRequestInterceptor,
} from "../utils/api/request";
import Cookies from "js-cookie";

export default function useGlobalInterceptors() {
  const setNotFound = useCoreStore((s) => s.setNotFound);
  // Assuming useAuthStore has token
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    // 1. Response Interceptor for Toasts & 404s
    const respId = addResponseInterceptor(
      (response) => response,
      (error) => {
        if (!error.response) {
          toast.error("Server is unavailable!", { position: "bottom-right" });
        }
        if (error.response?.status === 404 && !error.config?.skipNotFound) {
          setNotFound(true);
        }
        return Promise.reject(error);
      },
    );

    // 2. Request Interceptor for Auth Sync
    const reqId = addRequestInterceptor((request) => {
      const activeToken = token || Cookies.get("token");
      if (activeToken) {
        request.headers.set("Authorization", `Bearer ${activeToken}`);
      }
      return request;
    });

    return () => {
      removeResponseInterceptor(respId);
      removeRequestInterceptor(reqId);
    };
  }, [setNotFound, token]);
}
