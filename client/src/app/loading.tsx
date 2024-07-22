"use client";
import React, { ReactNode } from "react";
import loading from "../components/images/loading-yellow.gif";
import Image from "next/image";
import backCard from "../components/images/BACK.png";
import { useModalStore } from "@/utils/store/modal.store";
function Loading() {
  return (
    <div className="flex items-center justify-center flex-col px-3 h-full w-full ">
      <Image src={backCard} alt="back-card" priority width={30} />
      <span>
        <Image src={loading} alt="loading" priority width={50} />
      </span>
    </div>
  );
}

export default Loading;
