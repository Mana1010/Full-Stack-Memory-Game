"use client";
import React, { useState } from "react";
import leaderboard from "../../components/images/titles/leaderboard.png";
import leaderboardImg from "../../components/images/leaderboard-image.png";
import Image, { StaticImageData } from "next/image";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/baseUrl";
import { Profile } from "../account-details/page";
import { useModalStore } from "@/utils/store/modal.store";
import ImagePreviewPlayers from "@/components/ImagePreviewPlayers";
import firstPlace from "../../components/images/trophies/1st-prize.png";
import secondPlace from "../../components/images/trophies/2nd-place.png";
import thirdPlace from "../../components/images/trophies/3rd-place.png";
import { IoReturnDownBack } from "react-icons/io5";
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
  const trophies = [firstPlace, secondPlace, thirdPlace];
  return (
    <div className="py-2.5 flex flex-col w-full h-full relative">
      <header className="md:px-[5rem] px-5">
        <Image src={leaderboard} alt="leaderboard" priority />
      </header>
      <div className="flex-grow grid items-center grid-cols-1 lg:grid-cols-2 w-full px-5">
        <div className="w-full justify-center items-center flex flex-col space-y-2">
          <div className="leaderboard-bg w-[400px] rounded-md h-[470px] relative">
            <div
              style={{ backdropFilter: "blur(1.5px)" }}
              className="leaderboard-scroll-design absolute inset-0 h-full w-full px-3 py-2 overflow-y-auto"
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
                          <td className="text-center">
                            {updatedIndex <= 3 ? (
                              trophies.map(
                                (trophy: StaticImageData, index: number) => {
                                  const updatedIndexImage = index + 1;
                                  if (updatedIndexImage === updatedIndex) {
                                    return (
                                      <div
                                        key={index}
                                        className="flex justify-center items-center"
                                      >
                                        <Image
                                          src={trophy}
                                          alt="trophy"
                                          width={30}
                                          priority
                                        />
                                      </div>
                                    );
                                  }
                                }
                              )
                            ) : (
                              <small
                                style={{ textShadow: "0 0 15px #FFE30A" }}
                                className={`text-[0.8rem] ${
                                  player?.userId._id === userId
                                    ? "text-primary"
                                    : "text-secondary"
                                }`}
                              >
                                {" "}
                                {updatedIndex}
                              </small>
                            )}
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
                                alt={`${player.profileId.ign}'s profile pic`}
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
                            aria-label={`${player.profileId.ign}'s points is ${player.bestScore}`}
                            style={{ textShadow: "0 0 15px white" }}
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
              </table>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="bg-secondary text-primary px-5 py-2.5 rounded-sm flex items-center space-x-2"
          >
            <span>
              <IoReturnDownBack />
            </span>
            <span>BACK</span>
          </button>
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
