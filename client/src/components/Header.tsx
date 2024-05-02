"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RiMenu2Line } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import SideDesign from "@/components/SideDesign";
import Sidebar from "@/components/Sidebar";
import { useModalStore } from "@/utils/store/modal.store";

function Header() {
  const { openSidebar, setOpenSidebar } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();
  const formSideDesignWidthVariants = {
    visible: {
      boxShadow: openSidebar ? "0 0 35px #FFE30A" : "0 0 10px #FFE30A",
      width: openSidebar ? "100%" : "10px",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  const formSideDesignHeightVariants = {
    visible: {
      boxShadow: openSidebar ? "0 0 35px #FFE30A" : "0 0 10px #FFE30A",
      height: openSidebar ? "100%" : "10px",
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <header className="w-full flex items-center py-6 px-4 absolute top-0 right-0 left-0  z-50">
      <div className="relative p-2">
        <span
          onClick={() => {
            setOpenSidebar();
          }}
          className="cursor-pointer text-white text-3xl"
        >
          <RiMenu2Line />
        </span>
        <SideDesign
          formSideDesignHeightVariants={formSideDesignHeightVariants}
          formSideDesignWidthVariants={formSideDesignWidthVariants}
        />
        <AnimatePresence mode="wait">
          {openSidebar && <Sidebar />}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
