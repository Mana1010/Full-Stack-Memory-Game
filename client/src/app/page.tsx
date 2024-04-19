"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../components/images/logo.png";
import icon from "../components/images/icon.png";
import { AnimatePresence, motion } from "framer-motion";
import { RiMenu2Line } from "react-icons/ri";
import MenuBar from "@/components/MenuBar";

export default function Home() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const formSideDesignWidthVariants = {
    visible: {
      boxShadow: toggle ? "0 0 35px #FFE30A" : "0 0 10px #FFE30A",
      width: toggle ? "100%" : "10px",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  const formSideDesignHeightVariants = {
    visible: {
      boxShadow: toggle ? "0 0 35px #FFE30A" : "0 0 10px #FFE30A",
      height: toggle ? "100%" : "10px",
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <main
      onClick={() => setToggle(false)}
      className="h-full w-full grid sm:grid-cols-2 grid-cols-1 items-center justify-center"
    >
      <div className={`h-full w-full relative sm:rounded-md`}>
        <header className="w-full flex items-center py-6 px-4 absolute top-0 right-0 left-0">
          <div className="relative p-2">
            <span
              onClick={(e) => {
                e.stopPropagation(), setToggle((prev) => !prev);
              }}
              className="cursor-pointer text-white text-3xl"
            >
              <RiMenu2Line />
            </span>
            <motion.div
              initial={false}
              variants={formSideDesignHeightVariants}
              animate="visible"
              className="absolute w-[1px] bg-[#FFE30A] top-0 left-0"
            ></motion.div>
            <motion.div
              initial={false}
              variants={formSideDesignWidthVariants}
              animate="visible"
              className="absolute bg-[#FFE30A] h-[1px] top-0 left-0"
            ></motion.div>
            {/* BOTTOM AND RIGHT */}
            <motion.div
              initial={false}
              variants={formSideDesignWidthVariants}
              animate="visible"
              className="absolute bg-[#FFE30A] h-[1px] bottom-0 right-0"
            ></motion.div>
            <motion.div
              initial={false}
              variants={formSideDesignHeightVariants}
              animate="visible"
              className="absolute  w-[1px] bg-[#FFE30A] bottom-0 right-0"
            ></motion.div>
            {/* TOP AND RIGHT */}
            <motion.div
              initial={false}
              variants={formSideDesignWidthVariants}
              animate="visible"
              className="absolute bg-[#FFE30A] h-[1px] top-0 right-0"
            ></motion.div>
            <motion.div
              initial={false}
              variants={formSideDesignHeightVariants}
              animate="visible"
              className="absolute  w-[1px] bg-[#FFE30A]  top-0 right-0"
            ></motion.div>
            {/* BOTTOM AND LEFT */}
            <motion.div
              initial={false}
              variants={formSideDesignWidthVariants}
              animate="visible"
              className="absolute bg-[#FFE30A] h-[1px] bottom-0 left-0"
            ></motion.div>
            <motion.div
              initial={false}
              variants={formSideDesignHeightVariants}
              animate="visible"
              className="absolute w-[1px] bg-[#FFE30A] bottom-0 left-0"
            ></motion.div>
            <AnimatePresence mode="wait">
              {toggle && <MenuBar />}
            </AnimatePresence>
          </div>
        </header>

        <div
          className={`h-full items-center justify-center flex-col space-y-3 flex w-full px-5`}
        >
          <Image src={logo} alt="logo" width={616} priority />
          <button className="bg-[#293133] text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md">
            PLAY
          </button>
          <button className="bg-[#293133] text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md">
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
