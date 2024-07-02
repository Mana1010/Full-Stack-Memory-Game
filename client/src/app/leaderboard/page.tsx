"use client";
import React, { useState } from "react";
import leaderboard from "../../components/images/titles/leaderboard.png";
import leaderboardImg from "../../components/images/leaderboard-image.png";
import Image from "next/image";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/baseUrl";
import { Profile } from "../account-details/page";
import { useModalStore } from "@/utils/store/modal.store";
import ImagePreviewPlayers from "@/components/ImagePreviewPlayers";
function Leaderboard() {
  const router = useRouter();
  const { openImagePreviewPlayer, setOpenImagePreviewPlayer } = useModalStore();
  const [profileId, setProfileId] = useState<string | null>(null);
  const getAllPlayers = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const response: UseQueryResult<any> = await axios.get(
        `${baseUrl}/feature/leaderboard`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return response.data.message;
    },
    refetchOnWindowFocus: false,
  });
  // console.log(getAllPlayers.data?.players[0]?.userId._id);
  // console.log(getAllPlayers.data?.userId === getAllPlayers.data?.players[3]?.userId._id);
  return (
    <div className="py-2.5 flex flex-col w-full h-full relative">
      <header className="md:px-[5rem] px-5">
        <Image src={leaderboard} alt="leaderboard" priority />
      </header>
      <div className="flex-grow grid items-center grid-cols-1 lg:grid-cols-2 w-full px-5">
        <div className="w-full justify-center items-center flex">
          <div className="leaderboard-bg w-[400px] rounded-md h-[500px] relative">
            <div
              style={{ backdropFilter: "blur(1.5px)" }}
              className="absolute inset-0 h-full w-full px-3 py-2 overflow-y-auto"
            >
              <table className="w-full">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "80%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th
                      style={{ textShadow: "0 0 15px #FFE30A" }}
                      className="p-2 text-secondary text-[0.85rem]"
                    >
                      RANK
                    </th>
                    <th
                      style={{ textShadow: "0 0 15px #FFE30A" }}
                      className="p-2 text-secondary text-[0.85rem] text-start pl-10"
                    >
                      PLAYER
                    </th>
                    <th
                      style={{ textShadow: "0 0 15px #FFE30A" }}
                      className="p-2 text-secondary text-[0.85rem]"
                    >
                      POINTS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getAllPlayers.data?.players?.map(
                    (player: any, index: number) => {
                      const updatedIndex = index + 1;
                      const userId = getAllPlayers.data?.userId;
                      return (
                        <tr
                          style={{
                            boxShadow:
                              player?.userId._id === userId
                                ? "0 0 10px #FFE30A"
                                : "none",
                          }}
                          key={player._id}
                          className={` ${
                            player?.userId._id === userId && "bg-secondary/85"
                          }`}
                        >
                          <td
                            style={{ textShadow: "0 0 15px #FFE30A" }}
                            className={`text-[0.8rem] text-center  ${
                              player?.userId._id === userId
                                ? "text-primary"
                                : "text-white"
                            }`}
                          >
                            {updatedIndex}
                          </td>
                          <td className="flex items-center space-x-3 px-3 py-1">
                            <button
                              onClick={() => {
                                setOpenImagePreviewPlayer();
                                setProfileId(player.userId._id);
                              }}
                              className="w-[40px] h-[40px] relative"
                            >
                              <Image
                                src={player.profileId.profilePic.secure_url}
                                alt="profile-pic"
                                fill
                                sizes="100%"
                                priority
                                className="rounded-full ring-1 ring-zinc-500 object-cover object-center"
                              />
                            </button>
                            <span
                              style={{ textShadow: "0 0 15px white" }}
                              className={`text-[0.9rem]  ${
                                player?.userId._id === userId
                                  ? "text-primary"
                                  : "text-white"
                              }`}
                            >
                              {player.profileId.ign}
                            </span>
                          </td>
                          <td
                            style={{ textShadow: "0 0 15px #FFE30A" }}
                            className={`text-[0.8rem] text-center  ${
                              player?.userId._id === userId
                                ? "text-primary"
                                : "text-white"
                            }`}
                          >
                            {player.bestScore}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
                {/* <tfoot className="absolute bottom-0 py-3 left-0 right-0 w-full">
                  <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "80%" }} />
                    <col style={{ width: "10%" }} />
                  </colgroup>
                </tfoot> */}
              </table>
            </div>
          </div>
        </div>
        <div className="w-full hidden lg:flex justify-center items-center">
          <Image src={leaderboardImg} alt="leaderboardImg" priority />
        </div>
      </div>
      {openImagePreviewPlayer && <ImagePreviewPlayers id={profileId} />}
    </div>
  );
}

export default Leaderboard;
