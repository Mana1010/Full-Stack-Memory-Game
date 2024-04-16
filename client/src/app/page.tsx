"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../components/images/logo.png";
import icon from "../components/images/icon.png";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { GoPersonAdd } from "react-icons/go";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function Home() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const formSideDesignWidthVariants = {
    visible: {
      boxShadow: toggle ? "0 0 25px #FFE30A" : "0 0 10px #FFE30A",
      width: toggle ? "100%" : "15px",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
  const formSideDesignHeightVariants = {
    visible: {
      boxShadow: toggle ? "0 0 25px #FFE30A" : "0 0 10px #FFE30A",
      height: toggle ? "100%" : "15px",
      transition: {
        duration: 0.7,
      },
    },
  };
  return (
    <main className="h-full w-full grid sm:grid-cols-2 grid-cols-1 items-center justify-center">
      <div className={`h-full w-full relative sm:rounded-md`}>
        <header className="w-full flex items-center py-6 px-4 absolute top-0 right-0 left-0">
          {/* <div className="space-x-2">
            <motion.button
              whileHover={{}}
              onClick={() => router.push("/auth/login")}
              className=" py-2 px-5 text-white rounded-sm bg-primary"
            >
              SIGN IN
            </motion.button>
            <motion.button
              whileHover={{}}
              onClick={() => router.push("/auth/signup")}
              className=" py-2 px-5 text-white rounded-sm bg-primary"
            >
              SIGN UP
            </motion.button>
          </div> */}
          <Menubar
            onClick={() => setToggle((prev) => !prev)}
            className="bg-transparent border-none relative"
          >
            {/* TOP AND RIGHT */}
            <div className="absolute bg-[#FFE30A] w-[15px] h-[1px] top-0 right-0"></div>
            <div className="absolute  w-[1px] bg-[#FFE30A] h-[15px]  top-0 right-0"></div>
            {/* BOTTOM AND LEFT */}
            <div className="absolute w-[15px] bg-[#FFE30A] h-[1px] bottom-0 left-0"></div>
            <div className="absolute h-[15px] w-[1px] bg-[#FFE30A] bottom-0 left-0"></div>
            <MenubarMenu>
              <MenubarTrigger>
                <GoPersonAdd className="text-2xl text-white" />
              </MenubarTrigger>
              <MenubarContent className="bg-primary border-none rounded-sm p-3 space-y-2">
                <MenubarItem className="bg-[#293133] cursor-pointer text-[#FFE30A]">
                  SIGN IN
                </MenubarItem>

                <MenubarItem className="bg-[#293133]  cursor-pointer text-[#FFE30A]">
                  SIGN UP
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </header>

        <div
          className={`h-full items-center justify-center flex-col space-y-2 flex w-full px-5`}
        >
          <Image src={logo} alt="logo" width={616} priority />
          <button className="bg-[#293133] text-white w-full py-2.5 text-lg font-bold rounded-md">
            PLAY
          </button>
          <button className="bg-[#293133] text-white w-full py-2.5 text-lg font-bold rounded-md">
            ABOUT
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
