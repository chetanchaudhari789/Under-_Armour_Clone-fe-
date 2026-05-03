"use client";
import { useLoadingStore } from "@/zustand/useLoadingStore";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const RouteObserver = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    const handleAnchorClick = (event) => {
      const target = event.target.closest("a");

      if (target && target.href && !target.target) {
        const targetUrl = new URL(target.href);
        const currentUrl = new URL(window.location.href);

        if (targetUrl.pathname !== currentUrl.pathname) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [setIsLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams, setIsLoading]);

  return null;
};

export default RouteObserver;
