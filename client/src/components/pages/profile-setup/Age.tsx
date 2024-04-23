import React from "react";
import { motion } from "framer-motion";
function Age() {
  return (
    <motion.form
      initial={{ x: -700, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn", type: "spring" }}
      autoComplete="false"
      id="form"
      className="px-4 py-3.5 w-full sm:w-[320px] h-[100px] rounded-sm mx-auto relative space-y-3"
    ></motion.form>
  );
}

export default Age;
