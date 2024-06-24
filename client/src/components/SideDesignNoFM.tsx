"use client";
import React from "react";

function SideDesignNoFM({ size }: { size: number }) {
  return (
    <div>
      <div
        style={{ boxShadow: "0 0 15px #FFE30A" }}
        className={`bg-secondary absolute left-0 top-0 h-[${size}px] w-[1px]`}
      ></div>
      <div
        style={{ boxShadow: "0 0 15px #FFE30A" }}
        className={`bg-secondary absolute left-0 top-0 h-[1px] w-[${size}px]`}
      ></div>
      <div
        style={{ boxShadow: "0 0 15px #FFE30A" }}
        className={`bg-secondary absolute right-0 top-0 h-[${size}px] w-[1px]`}
      ></div>
      <div
        style={{ boxShadow: "0 0 15px #FFE30A" }}
        className={`bg-secondary absolute right-0 top-0 h-[1px] w-[${size}px]`}
      ></div>
      <div
        style={{ boxShadow: "0 0 15px #FFE30A" }}
        className={`bg-secondary absolute w-[${size}px] h-[1px] bottom-0 right-0`}
      ></div>
      <div
        style={{ boxShadow: "0 0 15px #FFE30A" }}
        className={`bg-secondary absolute w-[1px] h-[${size}px] bottom-0 right-0`}
      ></div>
      <div
        style={{ boxShadow: "0 0 15px #FFE30A" }}
        className={`bg-secondary absolute w-[${size}px] h-[1px] bottom-0 left-0`}
      ></div>
      <div
        style={{ boxShadow: "0 0 15px #FFE30A" }}
        className={`bg-secondary absolute w-[1px] h-[${size}px] bottom-0 left-0`}
      ></div>
    </div>
  );
}

export default SideDesignNoFM;
