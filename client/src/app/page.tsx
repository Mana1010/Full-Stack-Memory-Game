"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../components/images/logo.png";

export default function Home() {
  const router = useRouter();
  return (
    <main className="h-screen w-full flex items-center justify-center bg-[#fffffe] sm:py-7 py-0">
      <div
        id="bg"
        className={`h-full items-center justify-center flex-col space-y-3 flex bg-[#094067] sm:w-[350px] w-full px-3 relative sm:rounded-md`}
      >
        <Image src={logo} alt="logo" width={700} priority />
        <button
          onClick={() => {
            const myObj = localStorage.getItem("info");
            if (myObj) {
              router.push("/levels");
            } else {
              router.push("/yourname");
            }
          }}
          className="bg-[#3da9fc] text-white sm:w-[200px] w-full py-2 text-lg font-bold rounded-md"
        >
          PLAY
        </button>
        <button className="bg-[#3da9fc] text-white sm:w-[200px] w-full py-2 text-lg font-bold rounded-md">
          ABOUT
        </button>
        <button className="bg-[#3da9fc] text-white sm:w-[200px] w-full py-2 text-lg font-bold rounded-md">
          RESET GAME
        </button>
        <footer className="absolute bottom-3 left-0 right-0">
          <p className="text-center text-white text-[1rem]">
            Made by: TRISTAN VIC CLARITO
          </p>
          <p className="text-[0.7rem] text-center text-white">
            All Right Reserved 2024
          </p>
        </footer>
      </div>
    </main>
  );
}
