"use client";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import refreshToken from "@/utils/refreshToken";
import { getAuthUser } from "./getAuthUser";
import { useUserStore } from "@/utils/store/user.store";
interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}
console.log("Help");
const getToken =
  typeof localStorage.getItem("token") !== "undefined"
    ? localStorage.getItem("token")
    : null;
export const axiosInterceptor = axios.create({
  baseURL: " http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
  withCredentials: true,
});
function useAxiosInterceptor() {
  const { setIsAuthenticated } = useUserStore();
  const getToken =
    typeof localStorage.getItem("token") !== "undefined"
      ? localStorage.getItem("token")
      : null;
  const router = useRouter();
  useEffect(() => {
    const requestIntercept = axiosInterceptor.interceptors.request.use(
      async (config) => {
        if (!getToken) {
          setIsAuthenticated(false);
          router.push("/auth/login");
          return Promise.reject("Token is not available");
        }
        try {
          const decodedToken: DecodedToken = jwtDecode(getToken as string);
          const decodedAccessToken = decodedToken.exp * 1000;
          const currentTime = Date.now();
          if (currentTime > decodedAccessToken) {
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
              setIsAuthenticated(true);
              localStorage.setItem("token", JSON.stringify(newAccessToken));
              config.headers.Authorization = `Bearer ${newAccessToken}`;
              return config;
            } else {
              setIsAuthenticated(false);
              localStorage.removeItem("token");
              router.push("/auth/login");
              return Promise.reject("Error");
            }
          }
          const checkUser = await getAuthUser();
          if (!checkUser.isOldUser) {
            router.push("/profile-setup");
          }
          setIsAuthenticated(true);
          return config;
        } catch (err) {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          router.push("/auth/login");
          return Promise.reject(err);
        }
      }
    );
    const responseIntercept = axiosInterceptor.interceptors.response.use(
      async (response) => {
        return response;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    return () => {
      axiosInterceptor.interceptors.request.eject(requestIntercept);
      axiosInterceptor.interceptors.response.eject(responseIntercept);
    };
  }, [getToken, router, setIsAuthenticated]);
  return axiosInterceptor;
}

export default useAxiosInterceptor;
