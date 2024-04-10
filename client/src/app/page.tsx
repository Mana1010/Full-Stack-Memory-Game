"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../components/images/logo.png";
import icon from "../components/images/icon.png";

export default function Home() {
  return (
    <main
      id="bg"
      className="h-screen w-full grid sm:grid-cols-2 grid-cols-1 items-center justify-center bg-[#fffffe]"
    >
      <div className={`h-full w-full relative sm:rounded-md`}>
        <header className="w-full flex items-center py-6 px-4 absolute top-0 right-0 left-0">
          <button className="bg-[#FF4A6B] py-2 px-3 text-white rounded-md">
            LOGIN
          </button>
        </header>

        <div
          className={`h-full items-center justify-center flex-col space-y-2 flex w-full px-5`}
        >
          <Image src={logo} alt="logo" width={616} priority />
          <button
            onClick={() => {}}
            className="bg-[#293133] text-white w-full py-2.5 text-lg font-bold rounded-md"
          >
            PLAY
          </button>
          <button className="bg-[#293133] text-white w-full py-2.5 text-lg font-bold rounded-md">
            ABOUT
          </button>
          <button className="bg-[#293133] text-white w-full py-2.5 text-lg font-bold rounded-md">
            RESET GAME
          </button>
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
