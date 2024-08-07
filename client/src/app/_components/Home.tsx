"use client";
import Image from "next/image";
import logo from "../../components/images/logo.png";
import icon from "../../components/images/icon.png";
import { motion } from "framer-motion";
import {
  MdLeaderboard,
  MdRoundaboutRight,
  MdGamepad,
  MdOutlineSettings,
} from "react-icons/md";
import { useUserStore } from "@/utils/store/user.store";
import { useRouter } from "next/navigation";
import { useAudioStore } from "@/utils/store/audio.store";
import { GoCommentDiscussion } from "react-icons/go";
import { useSearchParams } from "next/navigation";
export default function Home() {
  const search = useSearchParams();
  const { playClickSound } = useAudioStore();
  const { isAuthenticated } = useUserStore();
  const router = useRouter();
  function enterGame() {
    router.push("/levels");
  }
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
            onClick={() => {
              isAuthenticated
                ? enterGame()
                : router.push("/auth/login?message=You have not log in yet!");
              playClickSound();
            }}
            className="bg-primary text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md relative overflow-hidden"
          >
            PLAY
            <motion.span className="absolute text-primary/45 text-[3.5rem] right-[30px] top-0">
              <MdGamepad />
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => {
              isAuthenticated
                ? router.push("/leaderboard")
                : router.push("/auth/login?message=You have not log in yet!");
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
            className="bg-primary text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md relative overflow-hidden"
          >
            LEADERBOARD
            <motion.span className="absolute text-primary/45 text-[3.5rem] right-[30px] top-0">
              <MdLeaderboard />
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => {
              router.push("/about");
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
            className="bg-primary text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md relative overflow-hidden"
          >
            ABOUT
            <motion.span className="absolute text-primary/45 text-[3.5rem] right-[30px] top-0">
              <MdRoundaboutRight />
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => {
              router.push("/setting");
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
            className="bg-primary text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md relative overflow-hidden"
          >
            SETTING
            <motion.span className="absolute text-primary/45 text-[3.5rem] right-[30px] top-0">
              <MdOutlineSettings />
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => {
              isAuthenticated
                ? router.push("/feedback")
                : router.push("/auth/login?message=You have not log in yet!");
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
            className="bg-primary text-white md:w-1/2 w-full py-2.5 text-lg font-bold rounded-md relative overflow-hidden"
          >
            FEEDBACK
            <motion.span className="absolute text-primary/45 text-[3.5rem] right-[30px] top-0">
              <GoCommentDiscussion />
            </motion.span>
          </motion.button>
        </div>
      </div>
      <div className="w-full hidden sm:block">
        <Image className="mx-auto" src={icon} width={466} alt="img" priority />
      </div>
    </main>
  );
}
