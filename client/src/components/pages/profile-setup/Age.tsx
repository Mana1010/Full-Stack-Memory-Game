"use client";
import React from "react";
import { motion } from "framer-motion";
import { ProfileStore } from "@/utils/store/profile.store";
function Age() {
  const { age, setAge } = ProfileStore();
  return (
    <motion.form
      initial={{ x: -700, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn", type: "spring" }}
      autoComplete="false"
      id="form"
      className="px-4 py-3.5 w-full sm:w-[320px] h-[100px] rounded-sm mx-auto relative space-y-3"
    >
      <h1>HOW OLD ARE YOU?</h1>
      <h3>{age.value}</h3>
      <input
        onChange={(e) => setAge(e.target.value)}
        type="range"
        min={1}
        max={150}
        className="w-full accent-[#FFE30A]"
        defaultValue={1}
      />
    </motion.form>
  );
}

export default Age;
