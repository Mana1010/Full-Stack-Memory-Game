"use client";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import React, { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import icon from "../../components/images/vampire.png";
import Image from "next/image";
import cards from "../../components/images/cards.png";
import { MdOutlineEditNote } from "react-icons/md";
import trophyTopPlace from "../../components/images/trophies/top-star-trophy.png";
import totalScoreStar from "../../components/images/trophies/total-score-star.png";
import userIdIcon from "../../components/images/face-recognition.png";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
export interface Profile {
  _id: string;
  age: number;
  gender: string;
  ign: string;
  profilePic: {
    secure_url: string;
    public_id: string;
  };
  updatedAt: Date;
  createdAt: Date;
}
export interface User {
  _id: string;
  username: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}
interface AccountDetails {
  bestScore: number;
  _id: string;
  profileId: Profile;
  userId: User;
}
function AccountDetails() {
  const axiosInterceptor = useAxiosInterceptor();
  const [openPassword, setOpenPassword] = useState(false);
  const getAccountDetails: UseQueryResult<AccountDetails | null> = useQuery({
    queryKey: ["account-details"],
    queryFn: async () => {
      const response = await axiosInterceptor.get(
        `${baseUrl}/user/account-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      return response.data.message;
    },
  });
  console.log(getAccountDetails.data?.userId.createdAt);
  const formatNum = new Intl.NumberFormat("en-US").format(
    getAccountDetails.data?.bestScore ?? 0
  );
  // const formatUpdatedAtTime = new Intl.DateTimeFormat("en-PH").format(
  //   getAccountDetails.data?.profileId.updatedAt
  // );
  // const formatCreatedAtTime = new Intl.DateTimeFormat("en-PH").format(
  //   getAccountDetails.data?.userId.createdAt
  // );
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
                src={
                  getAccountDetails.data?.profileId.profilePic.secure_url ?? ""
                }
                width={150}
                height={200}
                alt="profile-pic"
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
                <div className="h-[30px] w-[90px] flex items-center space-x-2 p-2 bg-primary text-secondary rounded-lg text-[0.7rem]">
                  <Image
                    src={trophyTopPlace}
                    alt="top-place"
                    width={20}
                    priority
                  />
                  <span> 5</span>
                </div>
                <div className="h-[30px] w-[210px] flex items-center space-x-2 p-2 bg-primary text-secondary rounded-lg text-[0.7rem]">
                  <Image
                    src={totalScoreStar}
                    alt="total-score"
                    width={20}
                    priority
                  />
                  <span>{formatNum}</span>
                </div>
                <div className="h-[30px] w-[210px] flex items-center space-x-2 p-2 bg-primary text-secondary rounded-lg text-[0.7rem]">
                  <Image
                    src={userIdIcon}
                    alt="user-id-icon"
                    width={20}
                    priority
                  />
                  <span>#{getAccountDetails.data?.userId._id}</span>
                </div>
              </div>
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
        <div className="grid md:grid-cols-2 grid-cols-1 w-full pb-2 h-full pt-5 px-4 overflow-y-auto">
          {/* FIRST ROW */}
          <div className="space-y-2 flex flex-col">
            {/* IGN DIV */}
            <div>
              <strong className="text-secondary font-bold text-[0.8rem]">
                IGN
              </strong>
              <div className="bg-primary text-white px-1.5 py-2 rounded-md w-1/2 break-all">
                <span className="text-[0.69rem]">
                  {getAccountDetails.data?.profileId.ign}
                </span>
              </div>
            </div>
            {/* END OF IGN DIV */}
            {/* AGE DIV */}
            <div>
              <strong className="text-secondary font-bold text-[0.8rem]">
                AGE
              </strong>
              <div className="bg-primary text-white px-1.5 py-2 rounded-md w-1/4 break-all">
                <span className="text-[0.69rem]">
                  {getAccountDetails.data?.profileId.age}
                </span>
              </div>
            </div>
            {/* END OF AGE DIV */}
            {/* GENDER DIV */}
            <div>
              <strong className="text-secondary font-bold text-[0.8rem]">
                GENDER
              </strong>
              <div className="bg-primary text-white px-1.5 py-2 rounded-md w-1/4 break-all">
                <span className="text-[0.69rem]">
                  {getAccountDetails.data?.profileId?.gender.toUpperCase()}
                </span>
              </div>
            </div>
            {/* END OF GENDER DIV */}
            {/* UPDATED AT DIV */}
            <div>
              <strong className="text-secondary font-bold text-[0.8rem]">
                UPDATED AT
              </strong>
              <div className="bg-primary text-white px-1.5 py-2 rounded-md w-2/3 break-all">
                <span className="text-[0.69rem]">MAY 5 2003</span>
              </div>
            </div>
            {/* END OF UPDATED AT DIV */}
          </div>
          {/* END OF FIRST ROW */}
          {/* SECOND ROW */}
          <div className="space-y-2 flex flex-col">
            {/* USERNAME DIV */}
            <div>
              <strong className="text-secondary font-bold text-[0.8rem]">
                USERNAME
              </strong>
              <div className="bg-primary text-white px-1.5 py-2 rounded-md w-1/2 break-all">
                <span className="text-[0.69rem]">
                  {getAccountDetails.data?.userId.username}
                </span>
              </div>
            </div>
            {/* END OF USERNAME DIV */}
            {/* PASSWORD DIV */}
            <div>
              <form>
                <strong className="text-secondary font-bold text-[0.8rem]">
                  PASSWORD
                </strong>
                <div className="bg-primary text-white px-1.5 py-2.5 rounded-md w-1/2 break-all flex items-center">
                  <input
                    type={openPassword ? "text" : "password"}
                    className="text-[0.69rem] bg-transparent"
                    value="JAVASCRIPT"
                    disabled
                  />

                  <button
                    type="button"
                    onClick={() => setOpenPassword((prev) => !prev)}
                  >
                    {openPassword ? <VscEyeClosed /> : <VscEye />}
                  </button>
                </div>
              </form>
            </div>
            {/* END OF PASSWORD DIV */}
            {/* PASSWORD DIV */}
            <div>
              <strong className="text-secondary font-bold text-[0.8rem]">
                ACCOUNT CREATED AT
              </strong>
              <div className="bg-primary text-white px-1.5 py-2 rounded-md w-2/3 break-all">
                <span className="text-[0.69rem]">JAVASCRIPT</span>
              </div>
            </div>
            {/* END OF PASSWORD DIV */}
          </div>
          {/* END OF SECOND ROW */}
        </div>
        {/* END OF SECOND PART */}
      </div>
    </div>
  );
}

export default AccountDetails;
