"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAudioStore } from "@/utils/store/audio.store";
import levelsTitle from "../../components/images/titles/levels.png";
import { FaShuffle } from "react-icons/fa6";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";
import { MdLeaderboard, MdOutlineSettings } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
function Levels() {
  const { stopSound, playSound } = useAudioStore();
  const router = useRouter();
  const getLevel = useQuery({
    queryKey: ["level"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/feature/levels`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return response.data.message;
    },
  });
  useEffect(() => {
    playSound();
    return () => stopSound();
  }, [playSound, stopSound]);
  return (
    <main className="h-full w-full md:pl-[5rem] px-5 flex flex-col py-3">
      <header className="flex justify-between items-center">
        <div>
          <Image src={levelsTitle} alt="levels-title" priority />
        </div>
        <div className="flex space-x-2 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                aria-label="setting-button"
                onClick={() => router.push("/setting")}
                style={{ boxShadow: " 0 0 10px #FFE30A" }}
                className="text-primary text-md w-[35px] h-[35px] md:text-xl bg-secondary md:w-[40px] md:h-[40px] rounded-full flex justify-center items-center"
              >
                <span>
                  <MdOutlineSettings />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-300/40 border-none text-white">
                <small>Setting</small>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                aria-label="Rate us button"
                onClick={() => router.push("/feedback")}
                style={{ boxShadow: " 0 0 10px #FFE30A" }}
                className="text-primary text-md w-[35px] h-[35px] md:text-xl bg-secondary md:w-[40px] md:h-[40px] rounded-full flex justify-center items-center"
              >
                <span>
                  <GoCommentDiscussion />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-300/40 border-none text-white">
                <small>Rate Us</small>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                aria-label="Leaderboard button"
                onClick={() => router.push("/leaderboard")}
                style={{ boxShadow: " 0 0 10px #FFE30A" }}
                className="text-primary text-md w-[35px] h-[35px] md:text-xl bg-secondary md:w-[40px] md:h-[40px] rounded-full flex justify-center items-center"
              >
                <span>
                  <MdLeaderboard />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-300/40 border-none text-white">
                <small>Leaderboard</small>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>
      {getLevel.isLoading ? (
        <Loading />
      ) : (
        <div className="flex-grow flex justify-center items-center pt-5 w-full">
          <div className="flex flex-col space-y-3">
            {getLevel.data?.levels.map((level: any, index: number) => (
              <motion.button
                key={level._id}
                disabled={!level.isUnlock}
                style={{
                  boxShadow: level.isUnlock ? "0 0 15px #FFE30A" : "none",
                }}
                className={`bg-secondary text-primary w-[300px] py-3 text-lg font-bold rounded-md relative overflow-hidden disabled:bg-primary/40`}
              >
                {level.level}
                <div className="absolute right-[20px] bottom-[5px] flex space-x-1">
                  {new Array(index + 1).fill(0).map((_, index) => (
                    <span
                      key={index}
                      className="h-[35px] w-2 bg-primary/50"
                    ></span>
                  ))}
                </div>
              </motion.button>
            ))}
            <div className="flex flex-col pt-5">
              <small className="text-secondary text-sm font-bold">
                Game Mode
              </small>
              <button
                style={{ boxShadow: "0 0 15px #FFE30A" }}
                className={`bg-secondary text-primary w-[300px] py-3 text-lg font-bold rounded-md relative overflow-hidden disabled:bg-primary/40`}
              >
                RESHUFFLE
                <div className="absolute text-[2.5rem] right-[20px] bottom-[5px] flex">
                  <span className=" text-primary/50 font-semibold">
                    <FaShuffle />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Levels;
