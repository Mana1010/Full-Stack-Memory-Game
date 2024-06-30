"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useProfileStore } from "@/utils/store/profile.store";
import SideDesign from "@/components/SideDesign";
import { z } from "zod";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
export const ignSchema = z.object({
  ign: z
    .string()
    .min(1, "IGN is required")
    .max(15, "The IGN you entered is too long.")
    .refine((data) => !data.startsWith(" "), {
      message: "IGN cannot start with space as first character",
    }),
});

// type IgnSchema = z.infer<typeof ignSchema>;
function IGN() {
  const { ign, setIgn } = useProfileStore();
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
  const checkIgn = ignSchema.safeParse({ ign: ign.value });

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
      <div>
        <motion.div
          style={{ boxShadow: "-1px -1px 3px black" }}
          className="w-[300px] relative py-3 rounded-md bg-transparent"
        >
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
            className="bg-transparent px-3 text-white outline-none w-full text-[0.8rem]"
            onChange={(e) => setIgn(e.target.value)}
          />
        </motion.div>
        <div className="space-y-2">
          {!checkIgn.success && (
            <motion.small
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1, textShadow: "0 0 10px #EBD30C" }}
              transition={{ duration: 0.1, ease: "easeIn" }}
              className="text-[0.85rem] text-[#EBD30C]"
            >
              {JSON.parse(checkIgn.error.message)[0].message}
            </motion.small>
          )}
        </div>
      </div>
      <small
        style={{
          textShadow: `0 0 5px ${
            (ign.value ? ign.value.length : 0) > 15 ? "red" : "#EBD30C"
          }`,
        }}
        className={`text-[0.7rem] ${
          (ign.value ? ign.value.length : 0) > 15
            ? "text-red-500"
            : "text-secondary"
        }`}
      >
        {ign.value ? ign.value.length : 0}/15
      </small>
    </motion.div>
  );
}

export default IGN;
