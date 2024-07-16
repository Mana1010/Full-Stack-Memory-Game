"use client";
import React from "react";
import Image from "next/image";
import aboutTittle from "../../../../components/images/titles/about.png";
import { useRouter } from "next/navigation";
import { IoReturnDownBack } from "react-icons/io5";
function About() {
  const router = useRouter();
  return (
    <div className="py-2.5 flex flex-col w-full h-full relative">
      <header className="md:pl-[5rem] px-5 flex items-center justify-between">
        <Image src={aboutTittle} alt="about-image" priority />
        <button
          onClick={() => router.push("/")}
          className="bg-secondary text-primary px-3 py-2 rounded-sm flex items-center space-x-2 text-sm"
        >
          <span>
            <IoReturnDownBack />
          </span>
          <span>BACK</span>
        </button>
      </header>
      <div className="flex-grow flex flex-col w-full pt-5 md:pl-20 px-5 leading-4 overflow-y-auto space-y-2">
        <div className="flex flex-col space-y-2">
          <h3
            style={{ textShadow: "0 0 10px #FFE30A" }}
            className="text-secondary text-2xl text-center md:text-start"
          >
            INTRODUCTION
          </h3>
          <div>
            <p className="text-white text-sm text-center md:text-start">
              &quot;Memory Game is a challenging and fun brain-training exercise
              that tests and improves your recall abilities. Players must match
              pairs of hidden items by remembering their locations on a grid.
              With increasing difficulty levels, timed challenges, and various
              themes, this game offers endless entertainment while enhancing
              cognitive skills.
            </p>
          </div>{" "}
          <div className="flex flex-col space-y-2 py-3">
            <h5
              style={{ textShadow: "0 0 10px white" }}
              className="text-white text-center md:text-start"
            >
              {" "}
              Features include:
            </h5>
            <ul className="text-secondary list-disc space-y-2 pl-5 text-sm flex justify-center md:justify-start items-center md:items-start flex-col">
              <li>Three difficulty modes</li>{" "}
              <li>Token-based authentication</li>
              <li> Competitive leaderboards</li>{" "}
              <li>Customizable user profiles</li>
              <li>Account management</li> <li> Adjustable settings</li>
            </ul>
            <p className="text-white text-sm text-center md:text-start">
              Exercise your mind, improve concentration, and enjoy hours of
              engaging gameplay with Memory Game!&quot;
            </p>
          </div>
        </div>
        <div className="flex-grow py-2">
          <h3
            style={{ textShadow: "0 0 10px #FFE30A" }}
            className="text-secondary text-2xl text-center md:text-start"
          >
            CREDITS
          </h3>
          <div className="space-y-4 pt-4 flex flex-col justify-center items-center md:justify-start md:items-start">
            <p className="text-white">
              <span className="text-secondary">Developed by:</span> Tristan Vic
              T. Clarito
            </p>
            <p className="text-white">
              <span className="text-secondary">Designed by:</span> Tristan Vic
              T. Clarito
            </p>
          </div>
          <div className="flex-grow flex w-full justify-center items-center flex-col space-y-2 pt-10">
            <h4 className="text-white">ALL RIGHT RESERVED</h4>
            <h5
              style={{ textShadow: "0 0 15px #FFE30A" }}
              className="text-secondary"
            >
              2024
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
