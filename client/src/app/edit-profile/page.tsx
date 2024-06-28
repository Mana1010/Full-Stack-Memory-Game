"use client";
import React, { useEffect, useState } from "react";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { useMutation, useQuery } from "react-query";
import Image from "next/image";
import { QueryClient } from "react-query";
import SideDesignNoFM from "@/components/SideDesignNoFM";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import ProfilePicsModal from "@/components/ProfilePicsModal";
import { useModalStore } from "@/utils/store/modal.store";
import { useEditProfileStore } from "@/utils/store/edit-profile.store";
import { Slider } from "@/components/ui/slider";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { UseQueryResult } from "react-query";
import cards from "../../components/images/404-img.png";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditProfileSchema {
  _id: string;
  ign: string;
  age: number;
  profilePic: {
    secure_url: string;
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
  const router = useRouter();
  const axiosInterceptor = useAxiosInterceptor();
  const { openSelectProfile, setOpenSelectProfile } = useModalStore();
  const {
    selectedProfile,
    selectedPreviewCustomProfile,
    selectedCustomProfile,
    setSelectedCustomProfile,
    setSelectedProfile,
  } = useEditProfileStore();
  const [payload, setPayload] = useState<EditProfileType | any>(null);
  const getProfile: UseQueryResult<EditProfileSchema | null> = useQuery({
    queryKey: ["edit-profile"],
    queryFn: async () => {
      const response = await axiosInterceptor.get(
        `${baseUrl}/user/edit-profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const extractData = {
        ign: response.data.message.ign,
        age: [response.data.message.age],
      };
      setPayload(extractData);
      return response.data.message;
    },
  });
  const queryClient = new QueryClient();
  const userId = getProfile?.data?._id;
  const editProfile = useMutation({
    mutationFn: async (data: EditProfileSchema | File) => {
      const payload = new FormData();
      console.log(data);
      for (const [key, value] of Object.entries(data)) {
        payload.append(key, value);
      }
      const response = await axiosInterceptor.patch(
        `${baseUrl}/user/profile/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data.message;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      toast.success(data);
      router.push("/account-details");
      setSelectedCustomProfile(null); //To reset the previewed image
      setSelectedProfile(null); //To reset the previewed image
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
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
    const updatedData = {
      ...payload,
      file: selectedCustomProfile ?? selectedProfile?.name ?? null,
    };
    if (checkUser.success) {
      editProfile.mutate(updatedData);
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
      <form
        onSubmit={submitForm}
        className="sm:w-[450px] w-full relative py-2.5 px-3 h-[500px] flex flex-col items-center backdrop-blur-sm bg-transparent"
      >
        <SideDesignNoFM size={120} />
        <div className="flex w-full justify-between items-center">
          <div className="relative bg-white w-[120px] h-[120px] rounded-md overflow-hidden">
            <Image
              src={
                selectedProfile?.avatar ??
                selectedPreviewCustomProfile ??
                getProfile.data?.profilePic?.secure_url ??
                cards
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
