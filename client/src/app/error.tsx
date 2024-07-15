"use client";
import React from "react";
import Image from "next/image";
import errorImg from "../components/images/error-img.png";
interface ErrorBoundary {
  error: Error;
  reset: () => void;
}
function ErrorBoundary({ error, reset }: ErrorBoundary) {
  const errorMessage = error.message;
  return (
    <div className="w-full px-4 h-full flex flex-col justify-center items-center space-y-4">
      <h1 className="text-red-500 md:text-[2rem] text-center text-base">
        Opps! Something went wrong
      </h1>
      <Image src={errorImg} alt="error-img" width={300} priority />
      <h2 className="text-secondary text-sm md:text-base text-center">
        {errorMessage}
      </h2>
      <button
        onClick={reset}
        className="py-2 px-7 bg-secondary text-primary rounded-md"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorBoundary;
