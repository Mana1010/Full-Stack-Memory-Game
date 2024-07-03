"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosLock } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { useAudioStore } from "@/utils/store/audio.store";
function Levels() {
  const { stopSound } = useAudioStore();
  const router = useRouter();
  const levels = [
    {
      difficulty: "EASY",
      score: null,
      color: "#81F612",
      stars: [4],
    },
    {
      difficulty: "MEDIUM",
      score: null,
      color: "#FEC81D",
      stars: [4, 12],
    },
    {
      difficulty: "HARD",
      score: null,
      color: "#F0442E",
      stars: [4, 12, 20],
    },
  ];
  return (
    <main className="h-screen w-full flex items-center justify-center bg-[#fffffe] sm:py-7 py-0">
      <div
        id="bg"
        className={`h-full items-center flex-col space-y-3 flex sm:w-[350px] w-full sm:rounded-md`}
      >
        <header className="w-full flex justify-between items-center py-3 px-3">
          <span className="text-white font-semibold text-[1.3rem] p-1 rounded-md">
            Helo
          </span>
          <button className="px-2.5 py-1.5 text-[0.93rem] bg-[#3da9fc] rounded-md text-white">
            RECORDS
          </button>
        </header>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="py-2 space-y-3 w-full h-[300px] flex flex-col justify-center items-center">
            {levels.map((level, index) => (
              <div key={level.difficulty} className="relative">
                <button
                  onClick={() =>
                    router.push(`/levels/${level.difficulty.toLowerCase()}`)
                  }
                  style={{
                    color: level.color,
                  }}
                  className={`w-[200px] py-3 rounded-md bg-[#293133] relative`}
                >
                  {level.difficulty}
                </button>
                {level.stars.map((star, index) => (
                  <span
                    style={{ left: `${star}px` }}
                    id="star"
                    key={index}
                    className="absolute top-[-10px] text-[#FFFF00]"
                  >
                    <FaStar />
                  </span>
                ))}
              </div>
            ))}
            <div>
              <p>GAME MODE</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSound();
              router.push("/");
            }}
            className="bg-[#3DA9FC] text-white py-2.5 text-lg w-[200px] rounded-md cursor-pointer"
          >
            BACK
          </button>
        </div>
      </div>
    </main>
  );
}

export default Levels;
