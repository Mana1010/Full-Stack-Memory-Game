"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TiUserAddOutline } from "react-icons/ti";
import { CiLogin } from "react-icons/ci";
import { FaFacebook, FaTiktok, FaGithub, FaLinkedin } from "react-icons/fa";
function MenuBar() {
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
      top: "45px",
      opacity: 0,
    },
    visible: {
      opacity: 1,
      top: "50px",
      transition: {
        duration: 0.6,
        ease: "easeIn",
        type: "spring",
      },
    },
    exit: {
      top: "45px",
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={menubarVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute w-[200px] top-[50px] backdrop-blur-sm border-[#FFE30A] border-[1px] px-2 py-3 flex flex-col space-y-3 z-50"
    >
      <div>
        <p className="text-[#FFE30A] text-[0.75rem] font-bold">
          AUTHENTICATION
        </p>
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
      <div>
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
      </div>
    </motion.div>
  );
}
export default MenuBar;
