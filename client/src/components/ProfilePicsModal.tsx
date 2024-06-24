"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import Image from "next/image";
import boy1 from "../components/images/images/boy1.png";
import boy2 from "../components/images/images/boy2.png";
import boy3 from "../components/images/images/boy3.png";
import boy4 from "../components/images/images/boy4.png";
import boy5 from "../components/images/images/boy5.png";
import boy6 from "../components/images/images/boy6.png";
import boy7 from "../components/images/images/boy7.png";
import boy8 from "../components/images/images/boy8.png";
import girl1 from "../components/images/images/girl1.png";
import girl2 from "../components/images/images/girl2.png";
import girl3 from "../components/images/images/girl3.png";
import girl4 from "../components/images/images/girl4.png";
import girl5 from "../components/images/images/girl5.png";
import girl6 from "../components/images/images/girl6.png";
import devil from "../components/images/images/devil.png";
import vampire from "../components/images/images/vampire.png";
import frankestein from "../components/images/images/frankenstein.png";
import { LuPlus } from "react-icons/lu";
import { useModalStore } from "@/utils/store/modal.store";
function ProfilePicsModal() {
  const profile = [
    boy1,
    boy2,
    boy3,
    boy4,
    boy5,
    boy6,
    boy7,
    boy8,
    girl1,
    girl3,
    girl4,
    girl5,
    girl6,
    devil,
    vampire,
    frankestein,
  ];
  const { setOpenSelectProfile } = useModalStore();
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  return (
    <div className="absolute w-full h-screen inset-0 backdrop-blur-md flex items-center justify-center">
      <div className="p-2.5 w-full sm:w-1/2 bg-primary rounded-md">
        <h2 className="text-secondary">SELECT YOUR PROFILE</h2>
        <div className="grid grid-cols-5 sm:grid-cols-4 lg:grid-cols-7 justify-center items-center gap-3 pt-3">
          {profile.map((avatar, index) => (
            <button
              onClick={() => setSelectedImageId(index)}
              key={index}
              className={`w-[3.5rem] h-[3.5rem] rounded-full bg-white overflow-hidden ${
                selectedImageId === index
                  ? "ring-secondary ring-2"
                  : "ring-none"
              }`}
            >
              <Image src={avatar} alt={`${avatar}`} priority />
            </button>
          ))}

          <label
            htmlFor="file"
            className=" bg-white w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center text-primary text-2xl"
          >
            <LuPlus />
          </label>
          <input
            hidden
            id="file"
            type="file"
            accept="image/jpeg, image/png, image/gif"
          />
        </div>
        <div className="flex space-x-2 justify-center items-center md:justify-end md:items-center pt-5">
          <button
            onClick={() => setOpenSelectProfile()}
            className="py-2.5 px-4 bg-zinc-700 text-secondary rounded-sm text-sm"
          >
            BACK
          </button>
          <button
            disabled={selectedImageId !== null ? false : true}
            className="py-2.5 px-4 bg-secondary text-primary rounded-sm text-sm disabled:bg-zinc-500"
          >
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicsModal;
