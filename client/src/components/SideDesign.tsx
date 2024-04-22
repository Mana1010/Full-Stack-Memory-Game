import React from "react";
import { motion } from "framer-motion";
interface DesignType {
  formSideDesignHeightVariants: any;
  formSideDesignWidthVariants: any;
}
function SideDesign({
  formSideDesignHeightVariants,
  formSideDesignWidthVariants,
}: DesignType) {
  return (
    <div>
      {" "}
      {/* TOP AND LEFT */}
      <motion.div
        variants={formSideDesignHeightVariants}
        initial={false}
        animate="visible"
        className="absolute w-[1px] bg-[#FFE30A] top-0 left-0"
      ></motion.div>
      <motion.div
        variants={formSideDesignWidthVariants}
        initial={false}
        animate="visible"
        className="absolute bg-[#FFE30A] h-[1px] top-0 left-0"
      ></motion.div>
      {/* BOTTOM AND RIGHT */}
      <motion.div
        variants={formSideDesignWidthVariants}
        initial={false}
        animate="visible"
        className="absolute bg-[#FFE30A] h-[1px] bottom-0 right-0"
      ></motion.div>
      <motion.div
        variants={formSideDesignHeightVariants}
        initial={false}
        animate="visible"
        className="absolute  w-[1px] bg-[#FFE30A] bottom-0 right-0"
      ></motion.div>
      {/* TOP AND RIGHT */}
      <motion.div
        variants={formSideDesignWidthVariants}
        initial={false}
        animate="visible"
        className="absolute bg-[#FFE30A] h-[1px] top-0 right-0"
      ></motion.div>
      <motion.div
        variants={formSideDesignHeightVariants}
        initial={false}
        animate="visible"
        className="absolute  w-[1px] bg-[#FFE30A] top-0 right-0"
      ></motion.div>
      {/* BOTTOM AND LEFT */}
      <motion.div
        variants={formSideDesignWidthVariants}
        initial={false}
        animate="visible"
        className="absolute bg-[#FFE30A] h-[1px] bottom-0 left-0"
      ></motion.div>
      <motion.div
        variants={formSideDesignHeightVariants}
        initial={false}
        animate="visible"
        className="absolute w-[1px] bg-[#FFE30A] bottom-0 left-0"
      ></motion.div>
    </div>
  );
}

export default SideDesign;
