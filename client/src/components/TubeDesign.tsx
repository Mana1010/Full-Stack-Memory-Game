"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useProfileStore } from "@/utils/store/profile.store";
function TubeDesign() {
  const { currentStep, gender, age, ign } = useProfileStore();
  const tubeLightVariant = {
    visible: {
      width:
        (currentStep === "age" && "50%") ||
        (currentStep === "ign" && "100%") ||
        "0",
      transition: {
        duration: 0.5,
      },
    },
  };
  const genderActiveVariant = {
    visible: {
      boxShadow:
        currentStep === "gender" || gender.isDone ? "0 0 25px #FFE30A" : "none",
      backgroundColor:
        currentStep === "gender" || gender.isDone ? "#FFE30A" : "#293133",
      transition: {
        duration: 0.8,
      },
    },
  };
  const ageActiveVariant = {
    visible: {
      boxShadow:
        currentStep === "age" || age.isDone ? "0 0 25px #FFE30A" : "none",
      backgroundColor:
        currentStep === "age" || age.isDone ? "#FFE30A" : "#293133",
      transition: {
        duration: 0.8,
      },
    },
  };
  const ignActiveVariant = {
    visible: {
      boxShadow:
        currentStep === "ign" || ign.isDone ? "0 0 25px #FFE30A" : "none",
      backgroundColor:
        currentStep === "ign" || ign.isDone ? "#FFE30A" : "#293133",

      transition: {
        duration: 0.8,
      },
    },
  };
  return (
    <div className="space-y-7 text-center w-full flex flex-col justify-center items-center px-10 absolute top-[70px]">
      <h1
        style={{ textShadow: "0 0 25px #FFE30A" }}
        className=" text-[#FFE30A]"
      >
        SET YOUR PROFILE FIRST
      </h1>
      <motion.div className=" w-full md:w-[400px] h-[3px] relative bg-white rounded-md flex justify-between items-center">
        <motion.div
          style={{ boxShadow: "0 0 15px #FFE30A" }}
          variants={tubeLightVariant}
          animate="visible"
          className="h-[3px] absolute inset-0 bg-secondary w-0"
        ></motion.div>
        <div className="absolute bg-transparent w-full flex justify-between items-center">
          <motion.div
            variants={genderActiveVariant}
            animate="visible"
            className="rounded-full w-[45px] h-[45px] bg-primary text-[white] flex justify-center items-center"
          >
            {gender.isDone ? (
              <motion.span
                initial={{ scale: 3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <FaStar />
              </motion.span>
            ) : (
              "1"
            )}
          </motion.div>
          <motion.div
            variants={ageActiveVariant}
            animate="visible"
            className="rounded-full w-[45px] h-[45px] bg-primary text-[white] flex justify-center items-center"
          >
            {age.isDone ? (
              <motion.span
                initial={{ scale: 3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <FaStar />
              </motion.span>
            ) : (
              "2"
            )}
          </motion.div>{" "}
          <motion.div
            variants={ignActiveVariant}
            animate="visible"
            className="rounded-full w-[45px] h-[45px] bg-primary text-[white] flex justify-center items-center"
          >
            3
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default TubeDesign;
