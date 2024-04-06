"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { FaDice } from "react-icons/fa";
import { useUser, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
function Yourname() {
  const [name, setName] = useState("");
  const [hasChange, setHasChange] = useState(false);
  const router = useRouter();
  const randomNames = [
    "Oshie",
    "Tristan",
    "Jezzille",
    "Jules",
    "Dario",
    "Kevin",
    "Eron",
    "Venus",
    "Wendylle",
    "GoldFish",
    "Goldie",
    "Ashley",
    "Villy",
    "Joven",
    "Jayce",
    "Bryle",
    "Jinx",
    "Viktor",
    "Anivia",
    "Ekko",
    "Vi",
    "Vander",
    "Heimerdinger",
    "Jasper",
    "Mark",
    "Lor",
    "Prince",
    "Hans",
    "Caithlyn",
    "RainbowDash",
    "Kristine",
    "Miaka",
    "Monique",
    "Mariz",
    "Bravo",
    "Crii",
    "Jheanny",
  ];
  useEffect(() => {
    if (/\w|\d/g.test(name)) {
      setHasChange(true);
    } else {
      setHasChange(false);
    }
  }, [name]);
  useEffect(() => {
    function load(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    if (hasChange) {
      window.addEventListener("beforeunload", load);
      return () => window.removeEventListener("beforeunload", load);
    }
  }, [hasChange]);
  return (
    <main className="h-screen w-full flex items-center justify-center bg-[#fffffe] sm:py-7 py-0">
      <div
        id="bg"
        className={`h-full items-center justify-center flex-col space-y-3 flex bg-[#094067] sm:w-[350px] w-full sm:rounded-md`}
      >
        <SignIn
          appearance={{
            elements: {
              form: {
                width: "100px", // Set the desired width
              },
            },
          }}
        />
      </div>
    </main>
  );
}

export default Yourname;
