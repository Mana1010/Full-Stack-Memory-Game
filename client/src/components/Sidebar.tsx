"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import Link from "next/link";
import { MdLogin } from "react-icons/md";
import { PiUserPlus } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import SideDesign from "./SideDesign";
function Sidebar() {
  const [showSocial, setShowSocial] = useState(false);
  const mobileScreen = useMediaQuery({ query: "(max-width: 767px)" });
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
      icon: <PiUserPlus />,
    },
    {
      name: "LOGIN",
      route: "/auth/login",
      icon: <MdLogin />,
    },
  ];
  const devSocials = [
    {
      name: "FACEBOOK",
      link: "https://www.facebook.com/tanvic.clarito?mibextid=ZbWKwL",
      icon: <FaFacebook />,
      index: 1,
    },
    {
      name: "TIKTOK",
      link: "https://www.tiktok.com/@arcane_mage?is_from_webapp=1&sender_device=pc",
      icon: <FaTiktok />,
      index: 2,
    },
    {
      name: "GITHUB",
      link: "https://github.com/Mana1010",
      icon: <FaGithub />,
      index: 3,
    },
    {
      name: "LINKEDIN",
      link: "https://www.linkedin.com/in/tristan-vic-clarito-a256322a0/",
      icon: <FaLinkedin />,
      index: 4,
    },
  ];
  const sidebarVariant = {
    visible: {
      width: openSidebar ? 260 : 70,
      transition: {
        ease: "linear",
        duration: 0.2,
      },
    },
  };
  const sidebarMobileVariant = {
    visible: {
      width: openSidebar ? 260 : 13,
      transition: {
        ease: "linear",
        duration: 0.2,
      },
    },
  };
  const arrowRightVariant = {
    visible: {
      rotate: openSidebar ? 180 : 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <motion.div
      variants={mobileScreen ? sidebarMobileVariant : sidebarVariant}
      initial={false}
      animate="visible"
      className={`absolute h-screen top-0 bottom-0 bg-[#191F23] z-[999999] py-3`}
    >
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
      <div className={`${mobileScreen && !openSidebar ? "hidden" : "initial"}`}>
        <header className={`pr-3 `}>
          <Image src={icon} alt="icon" width={130} priority />
        </header>

        {/* For Profile */}
        <div className="space-y-2 py-3">
          <div>
            <Image src={icon} alt="icon" priority width={100} />
          </div>
        </div>
        <div className={`px-2 pt-8 space-y-2 `}>
          <div className="space-y-2 w-full">
            <div className="space-y-1">
              <button
                onClick={setOpenAuthMenu}
                style={{ boxShadow: "-1px -1px 5px black" }}
                className="flex items-center text-white justify-between w-full py-2 px-1"
              >
                <div className={`flex space-x-1 items-center w-full`}>
                  <span className="text-xl">
                    <BiCheckShield />
                  </span>
                  {openSidebar && (
                    <span
                      className={`text-[0.8rem] ${
                        openSidebar ? "flex" : "hidden"
                      }`}
                    >
                      AUTHENTICATION
                    </span>
                  )}
                </div>
                <span
                  style={{
                    transform: `rotate(${openAuthMenu ? "180deg" : "0"})`,
                  }}
                  className={`text-3xl transition-transform duration-200 ease-in`}
                >
                  <RiArrowDropDownLine />
                </span>
              </button>

              <ul
                className={`${
                  openAuthMenu ? "flex" : "hidden"
                } transition-all duration-200 flex-col`}
              >
                {navAuth.map((nav) => (
                  <Link href={nav.route} key={nav.name}>
                    <li
                      style={{ boxShadow: "-1px -1px 3px black" }}
                      className={`flex space-x-2 text-[#EBD30C] text-[0.82rem] items-center p-2 m-1 ${
                        !openSidebar && "justify-center"
                      }`}
                    >
                      <span>{nav.icon}</span>
                      <span className={`${openSidebar ? "flex" : "hidden "}`}>
                        {nav.name}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div>
              <button
                onClick={setOpenDevSocial}
                style={{ boxShadow: "-1px -1px 5px black" }}
                className={`flex items-center text-white justify-between w-full py-2 px-1 `}
              >
                <div className="flex space-x-1 items-center">
                  <span className="text-xl">
                    <IoShareSocialOutline />
                  </span>
                  <span
                    className={`text-[0.8rem] ${
                      openSidebar ? "flex" : "hidden"
                    } space-x-1`}
                  >
                    <span>DEV</span>
                    <span>SOCIAL</span>
                  </span>
                </div>
                <span
                  style={{
                    transform: `rotate(${openDevSocial ? "180deg" : "0"})`,
                  }}
                  className="text-3xl transition-transform duration-200 ease-in"
                >
                  <RiArrowDropDownLine />
                </span>
              </button>

              <ul
                className={`${
                  openDevSocial ? "flex" : "hidden"
                } transition-all duration-200 flex-col`}
              >
                {devSocials.map((dev) => (
                  <Link href={dev.link} key={dev.name}>
                    <li
                      style={{ boxShadow: "-1px -1px 3px black" }}
                      className={`flex space-x-2 text-[#EBD30C] text-[0.79rem] items-center p-2 m-1 ${
                        !openSidebar && "justify-center"
                      }`}
                    >
                      <span>{dev.icon}</span>
                      <span className={`${openSidebar ? "flex" : "hidden"}`}>
                        {dev.name}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default Sidebar;
