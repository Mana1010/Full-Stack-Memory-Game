"use client";
import React, { useEffect } from "react";
import { baseUrl } from "@/utils/baseUrl";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { axiosInterceptor } from "@/api/useAxiosInterceptor";
import { useQuery } from "react-query";
import axios from "axios";
function Check() {
  const query = useQuery({
    queryKey: ["hillo"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/user/verify`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return response.data;
    },
  });
  const axiosIntercept = useAxiosInterceptor();
  // const checking = useQuery({
  //   queryKey: ["checking"],
  //   queryFn: async () => {
  //     const response = await axiosIntercept.get(`${baseUrl}/user/check`);
  //     return await response.data;
  //   },
  // });
  return <div>Check</div>;
}

export default Check;
