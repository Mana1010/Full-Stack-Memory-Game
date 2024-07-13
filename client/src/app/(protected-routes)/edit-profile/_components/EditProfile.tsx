"use client";
import React, { useEffect, useState } from "react";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import Image from "next/image";
import SideDesignNoFM from "@/components/SideDesignNoFM";
import { z } from "zod";
import ProfilePicsModal from "@/components/ProfilePicsModal";
import { useModalStore } from "@/utils/store/modal.store";
import { useEditProfileStore } from "@/utils/store/edit-profile.store";
import { Slider } from "@/components/ui/slider";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaMask } from "react-icons/fa";
import loading from "../../../../components/images/loading.gif";
import Loading from "@/components/Loading";
interface EditProfileSchema {
  _id: string;
  ign: string;
  age: number;
  profilePic: {
    secure_url: string;
  };
  userId: {
    _id: string;
    username: string;
  };
}
const editSchema = z.object({
  ign: z
    .string()
    .min(1, "This field is required")
    .max(15, "The ign should not be exceed to 15"),
  age: z.tuple([z.number().min(1).max(150)]),
});
type EditProfileType = z.infer<typeof editSchema>;
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries(["user-profile"]);
      toast.success(data.content);
      router.push(`/${data.username.username}`);
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
    const checkUser = editSchema.safeParse(payload);
    const updatedData = {
      ...payload,
      file: selectedCustomProfile ?? selectedProfile?.name ?? null,
    };

    if (checkUser.success) {
      editProfile.mutate(updatedData);
      setErrorMessage(null);
    }
  }
  function checkChanges() {
    const data = {
      ign: getProfile.data?.ign,
      age: [getProfile.data?.age],
    };
    if (
      JSON.stringify(payload) === JSON.stringify(data) &&
      !selectedProfile &&
      !selectedCustomProfile
    ) {
      return true;
    }
    return false;
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

        {getProfile.isLoading ? (
          <Loading />
        ) : (
          <div className="w-full h-full flex flex-col">
            <div className="flex w-full justify-between items-center">
              <div className="relative bg-white w-[120px] h-[120px] rounded-md overflow-hidden ">
                <Image
                  src={
                    selectedProfile?.avatar ??
                    selectedPreviewCustomProfile ??
                    getProfile.data?.profilePic?.secure_url ??
                    ""
                  }
                  alt="profile-pic"
                  fill
                  priority
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <button
                disabled={editProfile.isLoading}
                onClick={() => setOpenSelectProfile()}
                type="button"
                className="text-sm px-4 py-2.5 text-primary bg-secondary rounded-sm flex space-x-2 items-center"
              >
                <span>
                  <FaMask />
                </span>
                <small>CHANGE AVATAR</small>
              </button>
            </div>
            <div className="py-5 w-full space-y-8">
              <div className="w-full space-y-1">
                <div className="w-full flex justify-between items-center">
                  <label htmlFor="ign" className="text-[0.7rem] text-secondary">
                    IGN
                  </label>
                  <small
                    className={`text-[0.7rem] ${
                      (payload?.ign ? payload.ign.length : 0) > 15
                        ? "text-red-500"
                        : "text-secondary"
                    }`}
                  >
                    {payload?.ign ? payload.ign.length : 0}/15
                  </small>
                </div>
                <input
                  disabled={editProfile.isLoading}
                  value={payload?.ign ?? ""}
                  type="text"
                  name="ign"
                  id="ign"
                  onChange={(e) => {
                    const checkUser = editSchema.safeParse({
                      ...payload,
                      ign: e.target.value,
                    });
                    if (checkUser.success) {
                      setErrorMessage(null);
                    } else {
                      setErrorMessage(checkUser.error.issues[0].message);
                    }
                    setPayload({ ...payload, ign: e.target.value });
                  }}
                  className="w-full p-2.5 space-x-2 rounded-sm bg-primary text-white outline-[#EBD30C] border-none outline-dashed outline-1 bg-transparent"
                />
                {errorMessage && (
                  <motion.small
                    initial={{ y: -5, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      textShadow: "0 0 10px #EBD30C",
                    }}
                    transition={{ duration: 0.1, ease: "easeIn" }}
                    className="text-[0.85rem] text-[#EBD30C]"
                  >
                    {errorMessage}
                  </motion.small>
                )}
              </div>
              <div>
                {/* <label className="text-secondary text-[0.7rem]">AGE</label> */}
                <div className="space-y-2">
                  <h1
                    style={{ textShadow: "0 0 15px #ffe30a" }}
                    className=" text-2xl font-semibold text-[#ffe30a] text-center"
                  >
                    {payload?.age ?? 0}
                  </h1>
                  <Slider
                    disabled={editProfile.isLoading}
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
            <div className="flex-grow flex justify-between items-end w-full pb-3">
              <button
                onClick={() =>
                  router.push(`/${getProfile.data?.userId?.username}`)
                }
                type="button"
                className="bg-secondary text-primary py-2.5 px-5 text-[0.8rem] rounded-sm"
              >
                BACK
              </button>
              <button
                disabled={
                  !!errorMessage || checkChanges() || editProfile.isLoading
                }
                type="submit"
                className="bg-secondary text-primary w-[150px] h-[43px] text-[0.8rem] rounded-sm disabled:bg-zinc-500 flex items-center justify-center"
              >
                {editProfile.isLoading ? (
                  <Image src={loading} width={50} alt="loading" priority />
                ) : (
                  " UPDATE PROFILE"
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {openSelectProfile && <ProfilePicsModal />}
    </div>
  );
}

export default EditProfile;
