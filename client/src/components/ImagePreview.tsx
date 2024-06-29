"use client";
import React from "react";
import { useQueryClient } from "react-query";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { useModalStore } from "@/utils/store/modal.store";
function ImagePreview() {
  const queryClient = useQueryClient();
  const { setOpenImagePreview } = useModalStore();
  const getImage: any = queryClient.getQueryData("account-details");
  return (
    <div className="absolute inset-0 bg-black/75 flex flex-col w-full h-screen px-10">
      <div className="flex w-full justify-end py-5">
        <button onClick={setOpenImagePreview} className="text-3xl text-white">
          <FaXmark />
        </button>
      </div>
      <div className="flex-grow flex justify-center items-center w-full">
        <Image
          src={getImage?.profileId?.profilePic?.secure_url}
          alt="profile-pic"
          priority
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}

export default ImagePreview;
