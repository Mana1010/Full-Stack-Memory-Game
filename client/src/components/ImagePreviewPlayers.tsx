"use client";
import React from "react";
import { useQueryClient } from "react-query";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { useModalStore } from "@/utils/store/modal.store";
function ImagePreviewPlayers({ id }: { id: string | null }) {
  const queryClient = useQueryClient();
  const { setOpenImagePreviewPlayer } = useModalStore();
  const getImage: any = queryClient.getQueryData("leaderboard");
  const getPlayerProfile = getImage?.players.find(
    (profile: any) => profile.userId._id === id
  );
  return (
    <div className="absolute inset-0 bg-black/75 flex flex-col w-full h-screen px-10">
      <div className="flex w-full justify-end py-5">
        <button
          onClick={setOpenImagePreviewPlayer}
          className="text-3xl text-white"
        >
          <FaXmark />
        </button>
      </div>
      <div className="flex-grow flex justify-center items-center w-full flex-col">
        <div>
          <span
            style={{ textShadow: "0 0 15px #FFE30A" }}
            className="font-bold text-secondary text-xl"
          >
            {getPlayerProfile?.profileId?.ign}&apos;s
          </span>{" "}
          <span
            style={{ textShadow: "0 0 15px white" }}
            className="text-white text-lg"
          >
            {" "}
            Profile
          </span>
        </div>
        <div className="flex-grow flex justify-center items-center w-full">
          <Image
            src={getPlayerProfile?.profileId?.profilePic?.secure_url ?? ""}
            alt="profile-pic"
            priority
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}

export default ImagePreviewPlayers;
