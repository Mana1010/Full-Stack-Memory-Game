"use client";
import React from "react";
import Image from "next/image";
import errorImg from "../components/images/error-img.png";
interface ErrorBoundary {
  message: string;
}
function ErroUnauthorized({ message }: ErrorBoundary) {
  return (
    <div className="w-full px-4 h-full flex flex-col justify-center items-center space-y-4">
      <h1 className="text-red-500 md:text-[2rem] text-center text-base">
        Opps! Something went wrong
      </h1>
      <Image src={errorImg} alt="error-img" width={300} priority />
      <h2 className="text-secondary text-sm md:text-base text-center">
        {message}
      </h2>
    </div>
  );
}

export default ErroUnauthorized;
