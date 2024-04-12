"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { AppProps } from "next/app";
import { motion } from "framer-motion";
function _app({ Component, pageProps, router }: AppProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
  );
}

export default _app;
