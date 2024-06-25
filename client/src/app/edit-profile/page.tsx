"use client";
import React, { useEffect, useState } from "react";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { useMutation, useQuery } from "react-query";
import Image from "next/image";
import { QueryClient } from "react-query";
import SideDesignNoFM from "@/components/SideDesignNoFM";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfilePicsModal from "@/components/ProfilePicsModal";
import { useModalStore } from "@/utils/store/modal.store";
import { useEditProfileStore } from "@/utils/store/edit-profile.store";
import { Slider } from "@/components/ui/slider";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { UseQueryResult } from "react-query";

interface EditProfileSchema {
  id: string;
  ign: string;
  age: number;
  profilePic: {
    secure_url: any;
  };
}
const schema = z.object({
  ign: z
    .string()
    .min(1, "This field is required")
    .max(15, "The IGN is too long"),
  age: z.tuple([z.number().min(1).max(150)]),
});
type EditProfileType = z.infer<typeof schema>;
function EditProfile() {
  const axiosInterceptor = useAxiosInterceptor();
  const { openSelectProfile, setOpenSelectProfile } = useModalStore();
  const {
    selectedProfile,
    selectedPreviewCustomProfile,
    selectedCustomProfile,
  } = useEditProfileStore();
  const [payload, setPayload] = useState<EditProfileType | any>(null);
  const getProfile: UseQueryResult<EditProfileSchema | null> = useQuery({
    queryKey: ["edit-profile"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/user/edit-profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      const extractData = {
        ign: response.data.message.ign,
        age: [response.data.message.age],
      };
      setPayload(extractData);
      return response.data.message;
    },
  });
  const editProfile = useMutation({
    mutationFn: async () => {
      const payload = new FormData();
      const response = await axios.patch(`${baseUrl}/user/profile`);
    },
  });
  function handleAgeChange(value: number[]) {
    setPayload({
      ...payload,
      age: value,
    });
  }
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const checkUser = schema.safeParse(payload);
    if (checkUser.success) {
    }
  }
  return (
    <div className="flex items-center justify-center w-full h-full flex-col px-4">
      <h3
        style={{
          textShadow: "0 0 15px rgb(255 227 10 / var(--tw-text-opacity))",
        }}
        className="text-secondary text-center text-xl md:text-3xl"
      >
        EDIT PROFILE
      </h3>
      <form className="sm:w-[450px] w-full relative py-2.5 px-3 h-[500px] flex flex-col items-center backdrop-blur-sm bg-transparent">
        <SideDesignNoFM size={120} />
        <div className="flex w-full justify-between items-center">
          <div className="relative bg-white w-[120px] h-[120px] rounded-md overflow-hidden">
            <Image
              src={
                selectedProfile ??
                selectedPreviewCustomProfile ??
                getProfile.data?.profilePic?.secure_url
              }
              alt="profile-pic"
              height={120}
              width={120}
              priority
              className="w-full h-full object-cover object-center"
            />
          </div>
          <button
            onClick={() => setOpenSelectProfile()}
            type="button"
            className="text-sm px-4 py-2.5 text-primary bg-secondary rounded-md"
          >
            <span>CHANGE AVATAR</span>
          </button>
        </div>
        <div className="py-5 w-full space-y-8">
          <div className="w-full">
            <label htmlFor="ign" className="text-[0.7rem] text-secondary">
              IGN
            </label>
            <input
              value={payload?.ign ?? ""}
              type="text"
              name="ign"
              id="ign"
              onChange={(e) => setPayload({ ...payload, ign: e.target.value })}
              className="w-full p-2.5 space-x-2 rounded-sm bg-primary text-white outline-[#EBD30C] border-none outline-dashed outline-1 bg-transparent"
            />
          </div>
          <div>
            {/* <label className="text-secondary text-[0.7rem]">AGE</label> */}
            <div className="space-y-2">
              <h4
                style={{ textShadow: "0 0 15px #ffe30a" }}
                className=" text-2xl font-semibold text-[#ffe30a] text-center"
              >
                {payload?.age ?? 0}
              </h4>
              <Slider
                value={payload?.age}
                defaultValue={[1]}
                min={1}
                max={150}
                step={1}
                onValueChange={handleAgeChange}
              />
            </div>
          </div>
        </div>
        <div className="flex-grow flex justify-end items-end w-full pb-3">
          <button
            type="submit"
            className="bg-secondary text-primary py-2.5 px-5 text-[0.8rem] rounded-md"
          >
            UPDATE PROFILE
          </button>
        </div>
      </form>
      {openSelectProfile && <ProfilePicsModal />}
    </div>
  );
}

export default EditProfile;
