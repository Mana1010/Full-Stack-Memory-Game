"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTiktok, FaGithub, FaLinkedin } from "react-icons/fa";
import { useModalStore } from "@/utils/store/modal.store";
import Image from "next/image";
import icon from "../../src//components//images//small-logo.png";
import vamp from "../../src//components//images//vampire.png";
import { BiCheckShield } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import { MdLogin } from "react-icons/md";
import { PiUserPlus } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import card from "../components/images/cards.png";
import SideDesign from "./SideDesign";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { usePathname } from "next/navigation";
import firstTop from "../components/images/trophies/1st-prize.png";
import { useUserStore } from "@/utils/store/user.store";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
function Sidebar() {
  const pathname = usePathname();
  const mobileScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const { isAuthenticated, setIsAuthenticated } = useUserStore();
  const axiosInterceptor = useAxiosInterceptor();
  const {
    openSidebar,
    openAuthMenu,
    openDevSocial,
    openEditModal,
    setOpenSidebar,
    setOpenAuthMenu,
    setOpenDevSocial,
    setOpenEditModal,
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
  const getUser = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await axiosInterceptor.get(`${baseUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      console.log(response.data.message);
      return response.data.message;
    },
    enabled: isAuthenticated && pathname !== "/profile-setup",
  });
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
  const formSideDesignWidthVariants = {
    visible: {
      boxShadow: openEditModal ? "0 0 25px #FFE30A" : "0 0 10px #FFE30A",
      width: openEditModal ? "100%" : "20px",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
  const formSideDesignHeightVariants = {
    visible: {
      boxShadow: openEditModal ? "0 0 25px #FFE30A" : "0 0 10px #FFE30A",
      height: openEditModal ? "100%" : "20px",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
  if (pathname === "/profile-setup") return;

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
      <div
        className={`${
          mobileScreen && !openSidebar ? "hidden" : "initial"
        } overflow-hidden`}
      >
        <header className={`pr-3 `}>
          <Image src={icon} alt="icon" width={130} priority />
        </header>

        {/* For Profile */}
        <div className="space-y-2 py-5 px-2">
          <div
            className={`flex ${
              openSidebar ? "justify-between" : "justify-center"
            } items-center spce-x-2`}
          >
            <div
              style={{
                boxShadow: "-1px -1px 5px black",
              }}
              className=" bg-[#191F23] max-w-[110px] pt-2 rounded-sm relative"
            >
              <Image
                src={
                  getUser.data?.profilePic?.secure_url
                    ? getUser.data?.profilePic.secure_url
                    : vamp
                }
                width={200}
                height={200}
                alt="icon"
                priority
                className="w-full"
              />
              <Image
                src={card}
                alt="cards"
                width={50}
                priority
                className="absolute top-[-18px] right-0 z-[-1]"
              />
              <SideDesign
                formSideDesignWidthVariants={formSideDesignWidthVariants}
                formSideDesignHeightVariants={formSideDesignHeightVariants}
              />
            </div>
            {/* For the records */}
            <div
              className={`w-full flex justify-center ${
                openSidebar || "hidden"
              }`}
            >
              <Image src={firstTop} alt="first-top" width={70} priority />
            </div>
          </div>
          <div className={`pt-1 ${openSidebar ? "initial" : "hidden"}`}>
            <small className="text-white break-all">
              {getUser.data?.userId}
            </small>
            <h5
              style={{ textShadow: "0 0 10px #FFE30A" }}
              className="text-secondary"
            >
              {getUser.data?.ign}
            </h5>
          </div>
        </div>
        <div className={`px-2 pt-2 space-y-2 `}>
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
