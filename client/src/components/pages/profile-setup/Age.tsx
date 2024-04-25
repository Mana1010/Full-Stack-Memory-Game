"use client";
import React from "react";
import { motion } from "framer-motion";
import { ProfileStore } from "@/utils/store/profile.store";
import { Slider } from "@/components/ui/slider";
function Age() {
  const { age, setAge } = ProfileStore();

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
      className="w-full sm:w-[350px] h-[300px] rounded-sm mx-auto relative space-y-10 flex items-center justify-center flex-col px-5"
    >
      <h1
        style={{ textShadow: "0 0 15px white" }}
        className="text-xl font-extrabold text-white tracking-wider"
      >
        YOUR AGE
      </h1>
      <h4
        style={{ textShadow: "0 0 15px #ffe30a" }}
        className=" text-2xl font-semibold text-[#ffe30a] "
      >
        {age.value}
      </h4>
      <Slider
        value={age.value}
        defaultValue={[1]}
        min={1}
        max={150}
        step={1}
        onValueChange={setAge}
      />
    </motion.div>
  );
}

export default Age;
