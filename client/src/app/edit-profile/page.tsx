"use client";
import React, { useState } from "react";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { useQuery } from "react-query";
import Image from "next/image";
import cards from "../../components/images/cards.png";
import { QueryClient } from "react-query";
import SideDesignNoFM from "@/components/SideDesignNoFM";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfilePicsModal from "@/components/ProfilePicsModal";
import { useModalStore } from "@/utils/store/modal.store";
import { useEditProfileStore } from "@/utils/store/edit-profile.store";
function EditProfile() {
  const axiosInterceptor = useAxiosInterceptor();
  const { openSelectProfile, setOpenSelectProfile } = useModalStore();
  const {
    selectedProfile,
    selectedPreviewCustomProfile,
    selectedCustomProfile,
  } = useEditProfileStore();
  console.log(selectedCustomProfile);
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
              src={selectedProfile ?? selectedPreviewCustomProfile ?? cards}
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
        <div></div>
      </form>
      {openSelectProfile && <ProfilePicsModal />}
    </div>
  );
}

export default EditProfile;
