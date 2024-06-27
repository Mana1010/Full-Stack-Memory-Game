"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import { useModalStore } from "@/utils/store/modal.store";
import { useEditProfileStore } from "@/utils/store/edit-profile.store";
import { StaticImageData } from "next/image";
import { Profiles } from "@/utils/store/edit-profile.store";
function ProfilePicsModal() {
  const { setOpenSelectProfile } = useModalStore();
  const {
    profileSelection,
    selectedCustomProfile,
    setSelectedProfile,
    setSelectedCustomProfile,
    setSelectedPreviewCustomProfile,
  } = useEditProfileStore();
  const [profilePreview, setProfilePreview] = useState<Profiles | null>(null);
  function uploadCustomProfile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedPreviewCustomProfile(reader.result as string);
      };
      setSelectedCustomProfile(file);
      setSelectedProfile(null);
    }
    setOpenSelectProfile();
  }
  function selectProfile() {
    setSelectedPreviewCustomProfile(null);
    setSelectedCustomProfile(null);
    setSelectedProfile(profilePreview);
    setOpenSelectProfile();
  }
  return (
    <div className="absolute w-full h-screen inset-0 backdrop-blur-md flex items-center justify-center">
      <div className="p-2.5 w-full sm:w-1/2 bg-primary rounded-md">
        <h2 className="text-secondary">SELECT YOUR PROFILE</h2>
        <div className="grid grid-cols-5 sm:grid-cols-4 lg:grid-cols-7 justify-center items-center gap-3 pt-3">
          {profileSelection.map((avatar: Profiles) => (
            <button
              onClick={() => setProfilePreview(avatar)}
              key={avatar.name}
              className={`w-[3.5rem] h-[3.5rem] rounded-full bg-white overflow-hidden ${
                profilePreview?.name === avatar.name
                  ? "ring-secondary ring-2"
                  : "ring-none"
              }`}
            >
              <Image src={avatar.avatar} alt={avatar.name} priority />
            </button>
          ))}
          <label
            htmlFor="file"
            className=" bg-white w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center text-primary text-2xl cursor-pointer"
          >
            <LuPlus />
          </label>
          <input
            onChange={uploadCustomProfile}
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
            onClick={selectProfile}
            disabled={profilePreview !== null ? false : true}
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
