import { authRequired, request } from "@/shared/utils/api/request";
import Cookies from "js-cookie";

export const signup = async (data) => {
  const payload = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    password: data.password,
  };
  const res = await request.post("/auth/signup", payload);
  return res.data.data.user;
};
export const login = async (data) => {
  const payload = {
    identifier: data.email,
    password: data.password,
  };
  const res = await request.post("/auth/login", payload);
  Cookies.set("token", res.data.data.token, { expires: 7 });
  return res.data.data.user;
};

export const getMe = async () => {
  const res = await authRequired.get("/auth/me");
  return res.data.data.user;
};

export const logout = () => {
  Cookies.remove("token");
};
