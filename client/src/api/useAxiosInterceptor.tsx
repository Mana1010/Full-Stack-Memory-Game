"use client";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";

const getToken = localStorage.getItem("token");

const axiosInterceptor = axios.create({
  baseURL: " http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${getToken}`,
  },
  withCredentials: true,
});
function useAxiosInterceptor() {
  const router = useRouter();
  useEffect(() => {
    const requestIntercept = axiosInterceptor.interceptors.request.use(
      async (config) => {
        if (!config) {
          return config;
        }
      }
    );
  }, []);
  return <div>useAxiosInterceptor</div>;
}

export default useAxiosInterceptor;
