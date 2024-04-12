"use client";
import React from "react";
import icon from "../components/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
function Header() {
  const router = useRouter();
  const pathname = usePathname();
  if (!/^\/auth/.test(pathname)) {
    return;
  }
  return (
    <header className="absolute top-0 right-0 left-0 px-2 py-3">
      <Image
        className="cursor-pointer"
        onClick={() => router.push("/")}
        src={icon}
        alt="icon"
        priority
        width={130}
      />
    </header>
  );
}

export default Header;
