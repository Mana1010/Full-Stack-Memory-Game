"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
function TubeDesign({}) {
  const activeVariant = {};
  return (
    <div className="space-y-7 text-center w-full flex flex-col justify-center items-center px-10 absolute top-[70px]">
      <h1
        style={{ textShadow: "0 0 25px #FFE30A" }}
        className=" text-[#FFE30A]"
      >
        SET YOUR PROFILE FIRST
      </h1>
      <motion.div className=" w-full md:w-[400px] h-[3px] relative bg-white rounded-md flex justify-between items-center">
        <div className="absolute bg-transparent w-full flex justify-between items-center">
          <div className="bg-[#FFE30A] rounded-[50%] w-[42px] h-[42px] justify-center items-center flex">
            <div className="rounded-full w-[40px] h-[40px] bg-primary text-[white] flex justify-center items-center">
              1
            </div>
          </div>
          <div className="rounded-full w-[40px] h-[40px] bg-primary text-[white] flex justify-center items-center">
            2
          </div>{" "}
          <div className="rounded-full w-[40px] h-[40px] bg-primary text-[white] flex justify-center items-center">
            3
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TubeDesign;
