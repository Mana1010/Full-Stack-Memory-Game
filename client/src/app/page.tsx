"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../components/images/logo.png";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  return (
    <main className="h-screen w-full flex items-center justify-center bg-[#fffffe] sm:py-7 py-0">
      <div
        id="bg"
        className={`h-full sm:w-[350px] w-full relative sm:rounded-md`}
      >
        <header className="w-full flex justify-end items-center py-6 px-2 absolute top-0 right-0 left-0">
          {isSignedIn && <UserButton afterSignOutUrl="/login" />}
        </header>
        <div
          className={`h-full items-center justify-center flex-col space-y-2 flex w-full px-3`}
        >
          <Image src={logo} alt="logo" width={700} priority />
          <button
            onClick={() => {
              router.push(isSignedIn ? "/levels" : "/login");
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
        </div>
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
