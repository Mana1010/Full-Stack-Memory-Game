"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TiUserAddOutline } from "react-icons/ti";
import { CiLogin } from "react-icons/ci";
import { FaFacebook, FaTiktok, FaGithub, FaLinkedin } from "react-icons/fa";
import { useModalStore } from "@/utils/store/modal.store";
import Image from "next/image";
import icon from "../../src//components//images//small-logo.png";
import { FaXmark } from "react-icons/fa6";
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
  const menubarVariant = {
    hidden: {
      left: "45px",
      opacity: 0,
    },
    visible: {
      opacity: 1,
      left: "50px",
      transition: {
        duration: 0.6,
        ease: "easeIn",
        type: "spring",
      },
    },
    exit: {
      left: "45px",
      opacity: 0,
    },
  };
  if (!openSidebar) return;
  return (
    <motion.div
      // variants={menubarVariant}
      // initial="hidden"
      // animate="visible"
      // exit="exit"
      className="absolute w-[250px] h-screen top-0 bottom-0 left-0 backdrop-blur-sm bg-primary z-[999999] py-3"
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
      <header className="flex justify-between items-center pr-3">
        <Image src={icon} alt="icon" width={130} priority />
        <button className="text-white text-lg" onClick={setOpenSidebar}>
          <FaXmark />
        </button>
      </header>
      <div className="px-2 pt-10 space-y-5">
        <p className="text-secondary text-[0.65rem] font-bold">GAME MENU</p>
        <div>
          <button className="">AUTHENTICATION</button>
          <ul className="pt-2 flex flex-col gap-1">
            {navAuth.map((menu, index) => (
              <Link href={menu.route} key={index}>
                <motion.li className="text-white p-2 flex space-x-3 items-center hover:bg-slate-400/55 active:bg-slate-400/55 rounded-2xl">
                  <span className="text-[1rem]">{menu.icon}</span>
                  <span className=" text-[0.8rem]"> {menu.name}</span>
                </motion.li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
export default Sidebar;
