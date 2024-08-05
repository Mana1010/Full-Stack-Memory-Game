"use client";
import React from "react";
import Image from "next/image";
import hardTitle from "../../../../../components/images/titles/hard.png";
import SideDesignNoFM from "@/components/SideDesignNoFM";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MdGamepad } from "react-icons/md";
import { useAudioStore } from "@/utils/store/audio.store";
import { IoReturnDownBack } from "react-icons/io5";
import { useQuery } from "react-query";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { baseUrl } from "@/utils/baseUrl";
import { AxiosError } from "axios";
import { UseQueryResult } from "react-query";
import { useModalStore } from "@/utils/store/modal.store";
interface ScoreData {
  allTimeBest: number;
  personalHardScore: {
    totalScore: number;
    highScore: number;
    isUnlock: boolean;
  };
}
function Hard() {
  const axiosInterceptor = useAxiosInterceptor();
  const { setOpenGameOverModal } = useModalStore();
  const router = useRouter();
  const { playClickSound } = useAudioStore();
  const getScore: UseQueryResult<
    ScoreData,
    AxiosError<{ message: string }>
  > = useQuery({
    queryKey: ["hard-level-score"],
    queryFn: async () => {
      const response = await axiosInterceptor.get(
        `${baseUrl}/feature/hard-score`,
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
  if (getScore.isError) {
    const errorMsg = getScore.error;
    throw new Error(errorMsg.response?.data.message);
  }
  if (getScore.data?.personalHardScore.isUnlock) {
    router.push("/levels");
  }
  return (
    <div className="w-full h-full flex flex-col py-5 justify-center items-center  px-5">
      <div className="w-full sm:w-[500px] min-h-[400px] flex flex-col p-2.5 space-y-5 relative items-center">
        <SideDesignNoFM size={270} />
        <header className="pl-5">
          <Image src={hardTitle} alt="hard-image" priority />
        </header>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col pt-5">
            <h1 className="text-secondary font-extrabold text-sm">
              Your High Score:
            </h1>
            <small
              style={{ textShadow: "0 0 15px white" }}
              className="text-white text-center"
            >
              {getScore.data?.personalHardScore.highScore}
            </small>
          </div>
          <div className="flex flex-col">
            <h1 className="text-secondary font-extrabold text-sm">
              Your Total Score:
            </h1>
            <small
              style={{ textShadow: "0 0 15px white" }}
              className="text-white text-center"
            >
              {getScore.data?.personalHardScore.totalScore}
            </small>
          </div>
          <div className="flex flex-col">
            <h1 className="text-secondary font-extrabold text-sm text-center">
              All-Time Best:
            </h1>
            <small
              style={{ textShadow: "0 0 15px white" }}
              className="text-white text-center"
            >
              {getScore.data?.allTimeBest}
            </small>
          </div>
        </div>
        <div className="flex w-full justify-center items-center space-x-2 pt-5">
          <motion.button
            onClick={() => {
              router.push("/levels");
              playClickSound();
            }}
            whileHover={{
              backgroundColor: "#FFE30A",
              color: "#293133",
              boxShadow: "0 0 25px #FFE30A",
            }}
            whileTap={{
              backgroundColor: "#FFE30A",
              color: "#293133",
              boxShadow: "0 0 25px #FFE30A",
            }}
            className="bg-primary text-white sm:w-1/3 w-full py-2.5 font-bold rounded-md relative overflow-hidden text-sm"
          >
            BACK
            <motion.span className="absolute text-primary/45 text-[2.5rem] top-0">
              <IoReturnDownBack />
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => {
              router.push("/levels/hard/play");
              playClickSound();
              setOpenGameOverModal(false);
            }}
            whileHover={{
              backgroundColor: "#FFE30A",
              color: "#293133",
              boxShadow: "0 0 25px #FFE30A",
            }}
            whileTap={{
              backgroundColor: "#FFE30A",
              color: "#293133",
              boxShadow: "0 0 25px #FFE30A",
            }}
            className="bg-primary text-white sm:w-1/3 w-full py-2.5 font-bold rounded-md relative overflow-hidden text-sm"
          >
            PLAY
            <motion.span className="absolute text-primary/45 text-[2.5rem] top-0">
              <MdGamepad />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Hard;
