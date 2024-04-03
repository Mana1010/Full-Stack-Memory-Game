"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaDice } from "react-icons/fa";
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
        <h6 className="font-bold text-lg md:text-xl text-white">
          ENTER YOUR GAME NAME FIRST
        </h6>
        <form
          className="flex-col flex space-y-3 items-center justify-center w-full px-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (/\w|\d/g.test(name)) {
              const info = {
                name: name.trim(),
                score: null,
                levels: {
                  easy: true,
                  medium: false,
                  hard: false,
                },
              };
              localStorage.setItem("info", JSON.stringify(info));
              setName("");
              router.push("/levels");
            }
          }}
        >
          <div className="py-2.5 sm:w-[300px] w-full rounded-md px-2 bg-transparent border-[1px] border-zinc-500 flex items-center justify-between pr-2">
            <input
              onChange={(e) => setName(e.target.value)}
              className=" placeholder:text-zinc-200 placeholder:text-[0.8rem] bg-transparent outline-none w-[90%] text-white"
              type="text"
              value={name}
              placeholder="Name"
              required
            />
            <button
              type="button"
              className="text-white text-[1.2rem]"
              onClick={() => {
                const random = Math.floor(Math.random() * randomNames.length);
                setName(randomNames[random]);
              }}
            >
              <FaDice />
            </button>
          </div>
          <button className="bg-[#FF3F3F] text-white sm:w-[200px] w-full py-2 text-lg font-bold rounded-md">
            OK
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-[#FF5779] text-white sm:w-[200px] w-full py-2 text-lg font-bold rounded-md"
          >
            BACK
          </button>
        </form>
      </div>
    </main>
  );
}

export default Yourname;
