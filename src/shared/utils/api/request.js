import axios from "axios";

// 1. Instances
export const request = axios.create();
export const authRequired = axios.create();

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
};

// 2. Interceptor Management
export const addRequestInterceptor = (interceptor) => {
  return authRequired.interceptors.request.use(interceptor);
};

export const removeRequestInterceptor = (id) => {
  authRequired.interceptors.request.eject(id);
};

export const addResponseInterceptor = (interceptor, error) => {
  return authRequired.interceptors.response.use(
    interceptor,
    error ?? ((err) => Promise.reject(err)),
  );
};

export const removeResponseInterceptor = (id) => {
  authRequired.interceptors.response.eject(id);
};

// 3. Base Config
request.defaults.baseURL = getBaseUrl();
authRequired.defaults.baseURL = getBaseUrl();

// 4. Default Auth Interceptor
authRequired.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") return config;

    try {
      let token =
        localStorage.getItem("token") ||
        document.cookie.match(/(?:^|;)\s*token=([^;]*)/)?.[1] ||
        sessionStorage.getItem("token");

      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("🚨 Auth interceptor error:", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authRequired.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("🚨 Auth Request failed:", error.config?.url);
    return Promise.reject(error);
  },
);
