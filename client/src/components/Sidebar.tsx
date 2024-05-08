"use client";
import React, { useState } from "react";
import { delay, easeIn, motion } from "framer-motion";
import Link from "next/link";
import { TiUserAddOutline } from "react-icons/ti";
import { CiLogin } from "react-icons/ci";
import { FaFacebook, FaTiktok, FaGithub, FaLinkedin } from "react-icons/fa";
import { useModalStore } from "@/utils/store/modal.store";
import Image from "next/image";
import icon from "../../src//components//images//small-logo.png";
import { FaXmark } from "react-icons/fa6";
import { BiCheckShield } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";

function Sidebar() {
  const [showSocial, setShowSocial] = useState(false);
  const {
    openSidebar,
    openAuthMenu,
    openDevSocial,
    setOpenSidebar,
    setOpenAuthMenu,
    setOpenDevSocial,
  } = useModalStore();
  const navAuth = [
    {
      name: "REGISTER",
      route: "/auth/signup",
      icon: <TiUserAddOutline />,
    },
    {
      name: "LOGIN",
      route: "/auth/login",
      icon: <CiLogin />,
    },
  ];
  const devSocials = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/tanvic.clarito?mibextid=ZbWKwL",
      icon: <FaFacebook />,
      index: 1,
    },
    {
      name: "Tiktok",
      link: "https://www.tiktok.com/@arcane_mage?is_from_webapp=1&sender_device=pc",
      icon: <FaTiktok />,
      index: 2,
    },
    {
      name: "Github",
      link: "https://github.com/Mana1010",
      icon: <FaGithub />,
      index: 3,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/tristan-vic-clarito-a256322a0/",
      icon: <FaLinkedin />,
      index: 4,
    },
  ];
  const sidebarVariant = {
    visible: {
      width: openSidebar ? 260 : 70,
      transition: {
        ease: "easeOut",
        duration: 0.2,
      },
    },
  };
  const arrowRightVariant = {
    visible: {
      rotate: openSidebar ? 180 : 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <motion.div
      variants={sidebarVariant}
      initial={false}
      animate="visible"
      className={`absolute w-full h-screen top-0 bottom-0 bg-[#191F23] z-[999999] py-3`}
    >
      {/* <div>
        <p className="text-[#FFE30A] text-[0.75rem] font-bold">
          DEVELOPER&apos;S SOCIAL
        </p>
        <ul className="pt-2 flex flex-col gap-1">
          {devSocials.map((social, index) => (
            <Link href={social.link} key={index} target="_blank">
              <motion.li className="text-white p-2 flex space-x-3 items-center hover:bg-[#c8b948] rounded-2xl active:bg-[#c8b948]">
                <span className="text-[1rem]">{social.icon}</span>
                <span className=" text-[0.8rem]">
                  {" "}
                  {social.name.toUpperCase()}
                </span>
              </motion.li>
            </Link>
          ))}
        </ul>
      </div> */}
      {/* For Sidebar's Header */}
      <motion.button
        variants={arrowRightVariant}
        animate="visible"
        onClick={setOpenSidebar}
        type="button"
        className="text-secondary text-2xl absolute right-[-10px]"
      >
        <IoIosArrowDroprightCircle />
      </motion.button>
      {/* <div className="flex w-full flex-col space-y-4 text-2xl justify-center items-center h-[200px]">
        <button className="p-1.5 bg-secondary/80 rounded-full">
          <BiCheckShield />
        </button>
        <button className="p-1.5 bg-secondary/80 rounded-full">
          <IoShareSocialOutline />
        </button>
      </div> */}
      <div>
        <header className={`pr-3 `}>
          <Image src={icon} alt="icon" width={130} priority />
        </header>
        <motion.div className="px-2 pt-10 space-y-5">
          {/* <p
            className={`text-secondary text-[0.65rem] font-bold ${
              openSidebar ? "text-start" : "text-center"
            }`}
          >
            {openSidebar ? "MAIN MENU" : "MENU"}
          </p> */}

          <div className="space-y-2 w-full">
            <button
              style={{ boxShadow: "-1px -1px 5px black" }}
              className="flex items-center text-white justify-between w-full py-2 px-1"
            >
              <div className={`flex space-x-1 items-center w-full`}>
                <span className="text-xl">
                  <BiCheckShield />
                </span>
                <span
                  className={`text-[0.8rem]  ${
                    openSidebar ? "flex" : "hidden"
                  }`}
                >
                  AUTHENTICATION
                </span>
              </div>
              <span className={`text-3xl`}>
                <RiArrowDropDownLine />
              </span>
            </button>
            <button
              style={{ boxShadow: "-1px -1px 5px black" }}
              className="flex items-center text-white justify-between w-full py-2 px-1"
            >
              <div className="flex space-x-1 items-center">
                <span className="text-xl">
                  <IoShareSocialOutline />
                </span>
                <span
                  className={`text-[0.8rem] ${openSidebar ? "flex" : "hidden"}`}
                >
                  DEV
                </span>
              </div>
              <span className="text-3xl">
                <RiArrowDropDownLine />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
export default Sidebar;
