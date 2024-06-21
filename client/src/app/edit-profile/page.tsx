"use client";
import React from "react";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
function EditProfile() {
  const axiosInterceptor = useAxiosInterceptor();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-white">This is Edit Profile Page</h1>
    </div>
  );
}

export default EditProfile;
