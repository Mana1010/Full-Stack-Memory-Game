"use client";
import React from "react";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAudioStore } from "@/utils/store/audio.store";
import { useRouter } from "next/navigation";
import { IoReturnDownBack } from "react-icons/io5";
import { TbDoorEnter } from "react-icons/tb";
import { GrPowerReset } from "react-icons/gr";
import { VscDebugContinueSmall } from "react-icons/vsc";
import { useModalStore } from "@/utils/store/modal.store";
function GameMenuModal() {
  const { playClickSound } = useAudioStore();
  const { setOpenGameMenu } = useModalStore();
  const router = useRouter();
  return (
    <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center w-full h-screen px-5">
      <div className="bg-[#191F23] w-full sm:w-[300px] flex flex-col space-y-5 pb-5 rounded-md">
        <header className="py-4">
          <div className="text-secondary text-2xl relative ml-8">
            <div className="w-9 h-9 rounded-full bg-primary absolute left-[-20px] top-[-6px] flex justify-center items-center">
              <span>
                <FaBars />
              </span>
            </div>
            <div
              style={{ boxShadow: "0 0 10px #FFE30A" }}
              className="w-[100px] h-6 rounded-3xl bg-secondary flex justify-center items-center"
            >
              <small className="text-primary text-[0.7rem]">MAIN MENU</small>
            </div>
          </div>
        </header>
        <div className="flex space-y-2 flex-grow justify-center items-center w-full flex-col px-5">
          <motion.button
            onClick={() => {
              setOpenGameMenu();
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
            className="bg-primary text-white sm:w-[70%] w-full py-2.5 font-bold rounded-md relative overflow-hidden text-sm"
          >
            CONTINUE
            <motion.span className="absolute text-primary/45 text-[2.5rem] top-0">
              <VscDebugContinueSmall />
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => {
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
            className="bg-primary text-white sm:w-[70%] w-full py-2.5 font-bold rounded-md relative overflow-hidden text-sm"
          >
            RETRY
            <motion.span className="absolute text-primary/45 text-[2.5rem] top-0">
              <GrPowerReset />
            </motion.span>
          </motion.button>
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
            className="bg-primary text-white sm:w-[70%] w-full py-2.5 font-bold rounded-md relative overflow-hidden text-sm"
          >
            QUIT
            <motion.span className="absolute text-primary/45 text-[2.5rem] top-0">
              <TbDoorEnter />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default GameMenuModal;
