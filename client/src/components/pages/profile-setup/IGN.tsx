"use client";
import React from "react";
import { motion } from "framer-motion";
import { ProfileStore } from "@/utils/store/profile.store";
function IGN() {
  // const { ign } = ProfileStore();
  return (
    <motion.form className="w-full flex justify-center items-center flex-col">
      <input type="text" />
    </motion.form>
  );
}

export default IGN;
