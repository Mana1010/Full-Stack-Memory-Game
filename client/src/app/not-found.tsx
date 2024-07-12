"use client";
import React from "react";
import noResult from "../components/images/404-img.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
function NotFound() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center w-full h-full space-y-2 flex-col">
      <Image src={noResult} alt="no-result" width={400} priority />
      <button
      onClick={() => router.back()}
        style={{ boxShadow: "0 0 15px #FFE30A" }}
        className="bg-secondary rounded-md py-2.5 px-5 text-primary"
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFound;
