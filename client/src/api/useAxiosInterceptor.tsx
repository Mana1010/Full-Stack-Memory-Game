"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import refreshToken from "@/utils/refreshToken";
import { getAuthUser } from "./getAuthUser";
import { useUserStore } from "@/utils/store/user.store";
import { axiosInterceptor } from "./axiosPrivate";
interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}
function useAxiosInterceptor() {
  const { setIsAuthenticated } = useUserStore();
  const router = useRouter();
  const getToken =
    typeof window !== "undefined" && localStorage.getItem("token");
  useEffect(() => {
    const requestIntercept = axiosInterceptor.interceptors.request.use(
      async (config) => {
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
      (err: any) => {
        if (err.response) {
          const status = err?.response.status;
          if (status === 401 || status === 403) {
            setIsAuthenticated(false);
            router.push("/auth/login");
            return;
          }
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axiosInterceptor.interceptors.request.eject(requestIntercept);
      axiosInterceptor.interceptors.response.eject(responseIntercept);
    };
  }, [router, setIsAuthenticated, getToken]);
  return axiosInterceptor;
}

export default useAxiosInterceptor;
