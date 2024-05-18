"use client";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import icon from "../../components/images/vampire.png";
import Image from "next/image";
import cards from "../../components/images/cards.png";
import { MdOutlineEditNote } from "react-icons/md";
import trophyTopPlace from "../../components/images/trophies/top-star-trophy.png";
import totalScoreStar from "../../components/images/trophies/total-score-star.png";
function AccountDetails() {
  const getAccountDetails = useQuery({
    queryKey: ["account-details"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/user/account-details`);
      return response.data;
    },
  });
  return (
    <div className="py-5 flex flex-col w-full justify-center h-full items-center">
      <h2
        style={{
          textShadow: "0 0 15px rgb(255 227 10 / var(--tw-text-opacity))",
        }}
        className="text-secondary text-center text-2xl md:text-3xl"
      >
        ACCOUNT DETAILS
      </h2>

      <div className="flex w-full sm:w-[800px] h-full flex-col pt-5 backdrop-blur-sm relative space-y-2">
        <div className="hidden lg:flex">
          <div
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="bg-secondary absolute left-0 top-0 h-[200px] w-[1px]"
          ></div>
          <div
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="bg-secondary absolute left-0 top-0 h-[1px] w-[200px]"
          ></div>
          <div
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="bg-secondary absolute right-0 top-0 h-[200px] w-[1px]"
          ></div>
          <div
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="bg-secondary absolute right-0 top-0 h-[1px] w-[200px]"
          ></div>
          <div
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="bg-secondary absolute w-[200px] h-[1px] bottom-0 right-0"
          ></div>
          <div
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="bg-secondary absolute w-[1px] h-[200px] bottom-0 right-0"
          ></div>
          <div
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="bg-secondary absolute w-[200px] h-[1px] bottom-0 left-0"
          ></div>
          <div
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="bg-secondary absolute w-[1px] h-[200px] bottom-0 left-0"
          ></div>
        </div>
        {/* FIRST PART AKA HEADER */}
        <div className="flex space-x-2 flex-col lg:flex-row px-2 justify-between items-center space-y-2 lg:space-y-0">
          <div className="flex space-x-2">
            <div className="relative pt-1 bg-white rounded-md w-[120px] h-[120px]">
              <Image
                src={icon}
                alt="vampire"
                priority
                className="w-full h-full"
              />
              <Image
                src={cards}
                alt="cards"
                width={80}
                priority
                className="absolute top-[-20px] right-[3px] z-[-1]"
              />
            </div>
            <div className="pt-2">
              <div className="space-y-2">
                <div className="h-[30px] w-[80px] flex items-center space-x-2 p-2 bg-primary text-secondary rounded-lg text-[0.6rem]">
                  <Image
                    src={trophyTopPlace}
                    alt="top-place"
                    width={20}
                    priority
                  />
                  <span> 5</span>
                </div>
                <div className="h-[30px] w-[120px] flex items-center space-x-2 p-2 bg-primary text-secondary rounded-lg text-[0.6rem]">
                  <Image
                    src={totalScoreStar}
                    alt="total-score"
                    width={20}
                    priority
                  />
                  <span>333233323</span>
                </div>
              </div>
              <h1
                style={{
                  textShadow:
                    "0 0 15px rgb(255 227 10 / var(--tw-text-opacity))",
                }}
                className="text-secondary font-bold lg:text-2xl text-xl text-center lg:text-start pt-2"
              >
                JAVASCRIPT
              </h1>
            </div>
          </div>
          <button className="items-center space-x-2 text-sm px-4 py-2.5 text-primary bg-secondary rounded-md flex ">
            <span className="text-[1.075rem] md:text-base">
              <MdOutlineEditNote />
            </span>
            <span>EDIT PROFILE</span>
          </button>
        </div>
        {/* END OF FIRST PART */}

        {/* SECOND PART AKA PERSONAL INFO */}
        <div className="grid md:grid-cols-2 grid-cols-1 w-full py-2 h-full">
          <div>
            <h5 className="text-secondary font-bold">IGN</h5>
            <div>
              <span>JAVASCRIPT</span>
            </div>
          </div>
        </div>
        {/* END OF SECOND PART */}
      </div>
    </div>
  );
}

export default AccountDetails;
