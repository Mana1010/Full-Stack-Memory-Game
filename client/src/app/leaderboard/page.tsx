"use client";
import React from "react";
import leaderboard from "../../components/images/titles/leaderboard.png";
import leaderboardImg from "../../components/images/leaderboard-image.png";
import Image from "next/image";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/baseUrl";
import { Profile } from "../account-details/page";

// interface Leaderboard {
//   message: {
//     profileId: Profile;
//     bestScore: number;
//     _id: string;
//   };
// }
function Leaderboard() {
  const router = useRouter();
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
  });
  console.log(getAllPlayers.data);
  return (
    <div className="py-2.5 flex flex-col w-full h-full">
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
                  {getAllPlayers.data?.map((player: any, index: number) => {
                    const updatedIndex = index + 1;
                    return (
                      <tr key={player._id} className="space-y-2">
                        <td
                          style={{ textShadow: "0 0 15px #FFE30A" }}
                          className="text-center text-secondary text-[0.8rem]"
                        >
                          {updatedIndex}
                        </td>
                        <td className="flex items-center space-x-3 px-3">
                          <div className="w-[40px] h-[40px]  relative ">
                            <Image
                              src={player.profileId.profilePic.secure_url}
                              alt="profile-pic"
                              fill
                              objectFit="cover"
                              objectPosition="center"
                              priority
                              className="rounded-full ring-1 ring-zinc-500"
                            />
                          </div>
                          <span
                            style={{ textShadow: "0 0 15px white" }}
                            className="text-[0.9rem] text-white"
                          >
                            {player.profileId.ign}
                          </span>
                        </td>
                        <td
                          style={{ textShadow: "0 0 15px #FFE30A" }}
                          className="text-center text-[0.8rem] text-secondary"
                        >
                          {player.bestScore}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full hidden lg:flex justify-center items-center">
          <Image src={leaderboardImg} alt="leaderboardImg" priority />
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
