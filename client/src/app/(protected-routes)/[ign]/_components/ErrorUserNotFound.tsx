"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import notFound from "../../../../components/images/user-not-found.png";
import { usePathname } from "next/navigation";
interface Error {
  message: string;
}
function ErrorUserNotFound({ message }: Error) {
  const pathname = usePathname().slice(1);
  return (
    <div className=" flex w-full justify-center h-full px-3 items-center flex-col space-y-2">
      <Image
        src={notFound}
        alt={`${pathname} username does not exist`}
        width={300}
        priority
      />
      <h1 className="text-white text-lg">
        <span className="text-secondary">&quot;{pathname}&quot;</span> {message}
      </h1>
    </div>
  );
}

export default ErrorUserNotFound;
