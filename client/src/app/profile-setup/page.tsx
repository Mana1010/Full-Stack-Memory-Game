"use client";
import React, { useEffect, useState } from "react";
import { string, z } from "zod";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "react-query";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "sonner";
import TubeDesign from "@/components/TubeDesign";
import Gender from "@/components/pages/profile-setup/Gender";
import Age from "@/components/pages/profile-setup/Age";
import IGN from "@/components/pages/profile-setup/IGN";
import { useProfileStore } from "@/utils/store/profile.store";
import { useQuery } from "react-query";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";

interface Profile {
  age: number;
  gender: string | null;
  ign: string | null;
  profilePic: string | null;
}
function ProfileSetup() {
  const axiosInterceptor = useAxiosInterceptor();
  const {
    setCurrentStep,
    currentStep,
    ign,
    gender,
    age,
    profilePic,
    setAgeIsDone,
    setGenderIsDone,
    setIgn,
    setProfilePic,
  } = useProfileStore();
  const router = useRouter();
  const checkUser = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInterceptor.get(`${baseUrl}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setIgn(response.data.message.username);
      return response.data.message;
    },
  });
  const profileMutation = useMutation({
    mutationFn: async (data: Profile) => {
      const response = await axios.post(
        `${baseUrl}/user/profile-upload`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/levels");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });
  useEffect(() => {
    function load(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    window.addEventListener("beforeunload", load);
    return () => window.removeEventListener("beforeunload", load);
  }, []);
  //For icons
  return (
    <main className="h-full w-full flex items-center justify-center flex-col relative">
      <TubeDesign />
      <AnimatePresence mode="wait">
        {currentStep === "gender" && <Gender />}
        {currentStep === "age" && <Age />}
        {currentStep === "ign" && <IGN />}
      </AnimatePresence>
      <div className="w-full justify-center items-center flex absolute bottom-[100px]">
        <div className="space-x-4">
          {currentStep === "gender" || (
            <button
              onClick={() => {
                setCurrentStep(currentStep === "age" ? "gender" : "age");
                {
                  currentStep === "age"
                    ? setGenderIsDone(false)
                    : setAgeIsDone(false);
                }
              }}
              style={{ boxShadow: "0 0 8px #ffe30a" }}
              id="button-submit"
              type="submit"
              className="w-[150px] py-2.5 bg-secondary text-primary rounded-md transition-all duration-200 ease-in font-bold"
            >
              BACK
            </button>
          )}
          {/* Button group for the next and submit */}
          {currentStep === "gender" && (
            <button
              style={{
                boxShadow: gender.value ? "0 0 8px #ffe30a" : "none",
              }}
              id="button-submit"
              disabled={gender.value === null}
              className="w-[150px] py-2.5 bg-secondary text-primary rounded-md transition-all duration-200 ease-in disabled:bg-zinc-700 disabled:text-zinc-400 font-bold"
              onClick={() => {
                const boyProfilePic = [
                  "boy1",
                  "boy2",
                  "boy3",
                  "boy4",
                  "boy5",
                  "boy6",
                  "boy7",
                  "boy8",
                ];
                const girlProfilePic = [
                  "girl1",
                  "girl2",
                  "girl3",
                  "girl4",
                  "girl5",
                  "girl6",
                ];
                const checkGender: string[] =
                  gender.value === "male" ? boyProfilePic : girlProfilePic;
                const randomize = Math.floor(
                  Math.random() * checkGender.length
                );
                setProfilePic(checkGender[randomize]);
                setCurrentStep("age");
                setGenderIsDone(true);
              }}
            >
              NEXT
            </button>
          )}
          {currentStep === "age" && (
            <button
              style={{ boxShadow: "0 0 8px #ffe30a" }}
              id="button-submit"
              disabled={age.value === null}
              className="w-[150px] py-2.5 bg-secondary text-primary rounded-md transition-all duration-200 ease-in font-bold"
              onClick={() => {
                setCurrentStep("ign");
                setAgeIsDone(true);
              }}
            >
              NEXT
            </button>
          )}
          {currentStep === "ign" && (
            <button
              onClick={() => {
                const data = {
                  age: age.value[0],
                  gender: gender.value,
                  profilePic,
                  ign: ign.value,
                };
                profileMutation.mutate(data);
              }}
              style={{
                boxShadow: ign.value ? "0 0 8px #ffe30a" : "none",
              }}
              disabled={ign.value === "" || ign.value === null}
              id="button-submit"
              className="w-[150px] py-2.5 bg-secondary text-primary rounded-md transition-all duration-200 ease-in disabled:bg-zinc-700 disabled:text-zinc-400 font-bold"
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProfileSetup;
