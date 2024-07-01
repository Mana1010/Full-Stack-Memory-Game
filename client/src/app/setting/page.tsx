"use client";
import React from "react";
import setting from "../../components/images/titles/setting.png";
import Image from "next/image";
function Setting() {
  return (
    <div className="py-2.5 flex flex-col w-full h-full">
      <header className="md:px-[5rem] px-5">
        <Image src={setting} alt="setting" priority />
      </header>
      <div className="flex-grow flex-col justify-center items-center flex w-full"></div>
    </div>
  );
}

export default Setting;
