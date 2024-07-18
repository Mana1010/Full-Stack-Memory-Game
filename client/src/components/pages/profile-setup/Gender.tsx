"use client";
import React from "react";
import { IoRadioButtonOffSharp, IoRadioButtonOnSharp } from "react-icons/io5";
import { useProfileStore } from "@/utils/store/profile.store";
import { motion } from "framer-motion";
import { useAudioStore } from "@/utils/store/audio.store";
function Gender() {
  const { setGender, gender } = useProfileStore();
  const { playClickSound } = useAudioStore();
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

  return (
    <motion.div
      variants={pageTransitionVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full flex justify-center items-center flex-col"
    >
      {" "}
      <h1
        style={{ textShadow: "0 0 15px white" }}
        className=" text-xl font-extrabold text-white tracking-wider"
      >
        YOUR GENDER
      </h1>
      <div className="flex gap-5 flex-col justify-center pt-10">
        <div className="space-x-2 flex items-center">
          <button
            onClick={() => {
              playClickSound();
              setGender("male");
            }}
            type="button"
            aria-label="You set your gender to male"
            id="male"
            className="text-[#ffe30a] text-3xl"
          >
            {gender.value === "male" ? (
              <IoRadioButtonOnSharp />
            ) : (
              <IoRadioButtonOffSharp />
            )}
          </button>
          <label className="text-white text-md">MALE</label>
        </div>
        <div className="space-x-2 flex items-center">
          <button
            onClick={() => {
              playClickSound();
              setGender("female");
            }}
            type="button"
            id="female"
            aria-label="You set your gender to female"
            className="text-[#ffe30a] text-3xl"
          >
            {gender.value === "female" ? (
              <IoRadioButtonOnSharp />
            ) : (
              <IoRadioButtonOffSharp />
            )}
          </button>
          <label className="text-md text-white">FEMALE</label>
        </div>
      </div>
    </motion.div>
  );
}

export default Gender;
