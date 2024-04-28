"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProfileStore } from "@/utils/store/profile.store";
import SideDesign from "@/components/SideDesign";
function IGN() {
  const { ign, setIgn } = ProfileStore();
  const [focus, isFocus] = useState(false);
  const formSideDesignWidthVariants = {
    visible: {
      boxShadow: focus ? "0 0 25px #FFE30A" : "0 0 10px #FFE30A",
      width: focus ? "100%" : "10px",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
  const pageTransitionVariant = {
    hidden: {
      x: -300,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "string",
      },
    },
  };
  const formSideDesignHeightVariants = {
    visible: {
      boxShadow: focus ? "0 0 25px #FFE30A" : "0 0 10px #FFE30A",
      height: focus ? "100%" : "10px",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      variants={pageTransitionVariant}
      initial="hidden"
      animate="visible"
      className="w-full flex justify-center items-center flex-col space-y-4"
    >
      <h1
        style={{ textShadow: "0 0 15px white" }}
        className="text-xl font-extrabold text-white tracking-wider"
      >
        YOUR IGN
      </h1>
      <motion.div className="w-[300px] relative py-3 rounded-md bg-primary/85">
        <SideDesign
          formSideDesignWidthVariants={formSideDesignWidthVariants}
          formSideDesignHeightVariants={formSideDesignHeightVariants}
        />
        <input
          onFocus={() => isFocus(true)}
          onBlur={() => isFocus(false)}
          type="text"
          value={ign.value as string}
          placeholder="In Game Name"
          className="bg-transparent px-3 text-white outline-none w-full"
          onChange={(e) => setIgn(e.target.value)}
        />
      </motion.div>
    </motion.div>
  );
}

export default IGN;
