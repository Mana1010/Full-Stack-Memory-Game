"use client";
import React from "react";
import { useAudioStore } from "@/utils/store/audio.store";
import { useEffect } from "react";
import Image from "next/image";
import skullImg from "../components/images/skull.png";
import star from "../components/images/trophies/total-score-star.png";
import { MdInfoOutline } from "react-icons/md";
function GameOverModal({ totalPoints }: { totalPoints: number }) {
  const { playGameOverSound } = useAudioStore();
  useEffect(() => {
    playGameOverSound();
  }, [playGameOverSound]);

  return (
    <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center w-full h-screen px-5">
      <div className="bg-primary p-4 w-[95%] sm:w-[400px] rounded-sm flex flex-col space-y-3 min-h-[500px]">
        <div className="flex items-center justify-center w-full">
          <Image src={skullImg} alt="skull-image" width={200} priority />
        </div>
        <div className="flex justify-center items-center flex-col">
          <h1 className="font-semibold text-secondary text-2xl font-mono">
            GAME OVER
          </h1>
          <p className=" text-secondary text-[0.67rem]">No moves left</p>
        </div>
        <div className="pt-3 flex flex-col justify-center items-center w-full space-y-2">
          <h1 className="text-secondary text-xl">YOU GOT</h1>
          <div
            style={{
              textShadow: "0 0 15px white",
              boxShadow: "1px 1px 3px black",
            }}
            className="w-1/2 py-2 rounded-sm flex justify-center items-center text-white space-x-1"
          >
            <span className="pt-0.5">{totalPoints} </span>
            <Image src={star} alt="star-image" width={15} priority />
          </div>
        </div>
        <div className="pt-5 flex justify-center items-center flex-col">
          <button
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="mx-auto py-2.5 w-[70%] bg-secondary text-primary"
          >
            CLAIM
          </button>
          <div className="flex items-center space-x-2 pt-2">
            <span className="text-[0.7rem] text-secondary">
              <MdInfoOutline />
            </span>
            <p className="text-center text-[0.6rem] text-secondary">
              If you refresh without claiming, your points will not be added.
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default GameOverModal;
