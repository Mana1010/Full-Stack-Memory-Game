"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import refreshToken from "@/utils/refreshToken";
import { getAuthUser } from "./getAuthUser";
import { useUserStore } from "@/utils/store/user.store";
import { axiosInterceptor } from "./axiosPrivate";
import { usePathname } from "next/navigation";
interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}
function useAxiosInterceptor() {
  const pathname = usePathname();
  const { setIsAuthenticated } = useUserStore();
  const router = useRouter();
  const getToken =
    typeof window !== "undefined" && localStorage.getItem("token");
  const unprotectedRoute = ["/", "/auth/signup", "/about"];
  const protectedRoutes = ["/profile-setup"];
  useEffect(() => {
    const requestIntercept = axiosInterceptor.interceptors.request.use(
      async (config) => {
        if (!getToken) {
          if (!unprotectedRoute.includes(pathname)) router.push("/auth/login");
          setIsAuthenticated(false);
          return Promise.reject("No token available");
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
              return Promise.reject("Your session token has been expired");
            }
          }
          const checkUser = await getAuthUser();
          if (!checkUser.isOldUser) {
            router.push("/profile-setup");
          }
          setIsAuthenticated(true);
          return config;
        } catch (err) {
          console.log(err);
          setIsAuthenticated(false);
          if (!unprotectedRoute.includes(pathname)) {
            router.push("/auth/login");
          }
          localStorage.removeItem("token");
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
            if (!unprotectedRoute.includes(pathname)) {
              router.push("/auth/login");
            }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, setIsAuthenticated, getToken, pathname]);
  return axiosInterceptor;
}

export default useAxiosInterceptor;
