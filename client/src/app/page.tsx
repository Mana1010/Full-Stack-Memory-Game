"use client";
import { useEffect, useState, useId } from "react";
import Image from "next/image";
import logo from "../components/images/logo.png";
import icon from "../components/images/icon.png";
import { motion } from "framer-motion";
import { MdLeaderboard, MdRoundaboutRight, MdGamepad } from "react-icons/md";

export default function Home() {
  return (
    <main className="h-full w-full grid sm:grid-cols-2 grid-cols-1 items-center justify-center">
      <div className={`h-full w-full relative sm:rounded-md`}>
        <div
          className={`h-full items-center justify-center flex-col space-y-3 flex w-full px-5`}
        >
          <Image src={logo} alt="logo" width={616} priority />
          <motion.button
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
            className="bg-primary text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md relative overflow-hidden"
          >
            PLAY
            <motion.span className="absolute text-primary/45 text-[3.5rem] right-[30px] top-0">
              <MdGamepad />
            </motion.span>
          </motion.button>
          <motion.button
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
            className="bg-primary text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md relative overflow-hidden"
          >
            LEADERBOARD
            <motion.span className="absolute text-primary/45 text-[3.5rem] right-[30px] top-0">
              <MdLeaderboard />
            </motion.span>
          </motion.button>
          <motion.button
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
            className="bg-primary text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md relative overflow-hidden"
          >
            ABOUT
            <motion.span className="absolute text-primary/45 text-[3.5rem] right-[30px] top-0">
              <MdRoundaboutRight />
            </motion.span>
          </motion.button>
        </div>
      </div>
      <div className="w-full hidden sm:block">
        <Image className="mx-auto" src={icon} width={466} alt="img" priority />
      </div>
      <footer className="absolute bottom-3 left-0 right-0">
        <p className="text-center text-white text-[1rem]">
          Made by: TRISTAN VIC CLARITO
        </p>
        <p className="text-[0.7rem] text-center text-white">
          All Right Reserved 2024
        </p>
      </footer>
    </main>
  );
}
