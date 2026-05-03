import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, signup, getMe, logout } from "../api/auth.api";
import { useAuthStore } from "@/zustand/useAuthStore";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { closeAuthModal } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(["me"], user);
      toast.success("Welcome back!");
      closeAuthModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useSignup = () => {
  const { setAuthView } = useAuthStore();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created! Please log in.");
      setAuthView("login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Signup failed");
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => logout(),
    onSuccess: () => {
      queryClient.setQueryData(["me"], null); // Clear user state
      toast.success("Logged out");
      router.push("/");
      router.refresh();
    },
  });
};
