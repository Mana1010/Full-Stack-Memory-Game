"use client";
import { baseUrl } from "@/utils/baseUrl";
import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import Image from "next/image";
import { MdOutlineEditNote } from "react-icons/md";
import trophyTopPlace from "../../../../components/images/trophies/top-star-trophy.png";
import totalScoreStar from "../../../../components/images/trophies/total-score-star.png";
import userIdIcon from "../../../../components/images/face-recognition.png";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import SideDesignNoFM from "@/components/SideDesignNoFM";
import ImagePreview from "@/components/ImagePreview";
import { useModalStore } from "@/utils/store/modal.store";
import { IoReturnDownBack } from "react-icons/io5";
import { useUserStore } from "@/utils/store/user.store";

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
  createdAt: string;
}
export interface User {
  _id: string;
  username: string;
  updatedAt: Date;
  createdAt: string;
}
interface AccountDetails {
  bestScore: number;
  _id: string;
  profileId: Profile;
  userId: User;
  rank: number;
}
function AccountDetails() {
  const axiosInterceptor = useAxiosInterceptor();
  const { isAuthenticated } = useUserStore();
  const { openImagePreview, setOpenImagePreview } = useModalStore();
  const router = useRouter();
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
      return response.data.message;
    },
    enabled: isAuthenticated != null,
  });
  const formatNum = new Intl.NumberFormat("en-US").format(
    getAccountDetails.data?.bestScore ?? 0
  );

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
        <div className="hidden lg:block">
          <SideDesignNoFM size={200} />
        </div>
        {getAccountDetails.isLoading ? (
          <Loading />
        ) : (
          <div className="overflow-y-auto lg:overflow-y-visible">
            <div className="flex space-x-2 flex-col lg:flex-row px-2 justify-between items-center space-y-2 lg:space-y-0">
              <div className="flex space-x-2">
                <div
                  onClick={() => setOpenImagePreview()}
                  className=" pt-1 bg-transparent rounded-md w-[120px] h-[120px] overflow-hidden relative"
                >
                  <Image
                    src={
                      getAccountDetails.data?.profileId.profilePic.secure_url ??
                      ""
                    }
                    alt="profile-pic"
                    fill
                    priority
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div className="pt-2">
                  <div className="space-y-2">
                    <div className="h-[30px] w-[90px] flex items-center space-x-2 p-2 bg-primary text-secondary rounded-lg text-[0.7rem]">
                      <Image
                        src={trophyTopPlace}
                        alt="top-place-icon"
                        width={20}
                        priority
                      />
                      <span>{getAccountDetails.data?.rank}</span>
                    </div>
                    <div className="h-[30px] w-[210px] flex items-center space-x-2 p-2 bg-primary text-secondary rounded-lg text-[0.7rem]">
                      <Image
                        src={totalScoreStar}
                        alt="total-score-icon"
                        width={20}
                        priority
                      />
                      <span>{formatNum}</span>
                    </div>
                    <div
                      aria-label="Your user id"
                      className="h-[30px] w-[210px] flex items-center space-x-2 p-2 bg-primary text-secondary rounded-lg text-[0.7rem]"
                    >
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
              <button
                onClick={() => router.push("/edit-profile")}
                className="items-center space-x-2 text-sm px-4 py-2.5 text-primary bg-secondary rounded-md flex "
              >
                <span className="text-[1.075rem] md:text-base">
                  <MdOutlineEditNote />
                </span>
                <span>EDIT PROFILE</span>
              </button>
            </div>
            <div className="pl-2 flex flex-col pt-3 justify-center items-center h-full">
              <div className="flex justify-center items-center w-full md:space-x-3 lg:flex-row flex-col">
                <div className="space-y-2 flex flex-col">
                  <strong className="text-secondary font-bold text-[0.8rem]">
                    IGN
                  </strong>
                  <div className="bg-primary text-white px-1.5 py-2 rounded-md w-[300px] break-all">
                    <span className="text-[0.69rem]">
                      {getAccountDetails.data?.profileId.ign}
                    </span>
                  </div>

                  <div>
                    <strong className="text-secondary font-bold text-[0.8rem]">
                      AGE
                    </strong>
                    <div className="bg-primary text-white px-1.5 py-2 rounded-md  w-[300px] break-all">
                      <span className="text-[0.69rem]">
                        {getAccountDetails.data?.profileId.age}
                      </span>
                    </div>
                  </div>

                  <div>
                    <strong className="text-secondary font-bold text-[0.8rem]">
                      GENDER
                    </strong>
                    <div className="bg-primary text-white px-1.5 py-2 rounded-md w-[300px] break-all">
                      <span className="text-[0.69rem]">
                        {getAccountDetails.data?.profileId?.gender.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <strong className="text-secondary font-bold text-[0.8rem]">
                      UPDATED AT
                    </strong>
                    <div className="bg-primary text-white px-1.5 py-2 rounded-md  w-[300px] break-all">
                      <span className="text-[0.69rem]">
                        {new Date(
                          getAccountDetails.data?.profileId.updatedAt ?? 0
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 flex flex-col">
                  <div>
                    <strong className="text-secondary font-bold text-[0.8rem]">
                      USERNAME
                    </strong>
                    <div className="bg-primary text-white px-1.5 py-2 rounded-md  w-[300px] break-all">
                      <span className="text-[0.69rem]">
                        {getAccountDetails.data?.userId.username}
                      </span>
                    </div>
                  </div>

                  <div>
                    <strong className="text-secondary font-bold text-[0.8rem]">
                      ACCOUNT CREATED AT
                    </strong>
                    <div className="bg-primary text-white px-1.5 py-2 rounded-md  w-[300px] break-all">
                      <span className="text-[0.69rem]">
                        {new Date(
                          getAccountDetails.data?.userId.createdAt ?? 0
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-grow flex items-center justify-center w-full">
                {" "}
                <button
                  onClick={() => router.push("/")}
                  className="bg-secondary text-primary px-5 py-2.5 rounded-sm flex items-center space-x-2"
                >
                  <span>
                    <IoReturnDownBack />
                  </span>
                  <span>BACK</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {openImagePreview && <ImagePreview />}
    </div>
  );
}

export default AccountDetails;
