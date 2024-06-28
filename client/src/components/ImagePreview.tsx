"use client";
import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { QueryClient } from "react-query";
import { useQueryClient } from "react-query";
import Image from "next/image";
import cards from "../components/images/bg-two.png";
import AccountDetails from "@/app/account-details/page";
function ImagePreview() {
  const queryClient = useQueryClient();
  const getImage: UseQueryResult<any | null> =
    queryClient.getQueryData("account-details");
  console.log(getImage);
  return (
    <div className="absolute inset-0 bg-black/65 flex items-center justify-center w-full h-screen">
      <Image
        src={getImage.data?.profileId.profilePic.secure_url}
        alt="profile-pic"
        priority
        width={600}
        height={600}
      />
    </div>
  );
}

export default ImagePreview;
