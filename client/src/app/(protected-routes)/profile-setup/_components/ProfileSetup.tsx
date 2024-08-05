"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useMutation, UseQueryResult } from "react-query";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "sonner";
import TubeDesign from "@/components/TubeDesign";
import Gender from "@/components/pages/profile-setup/Gender";
import Age from "@/components/pages/profile-setup/Age";
import IGN from "@/components/pages/profile-setup/IGN";
import { useProfileStore } from "@/utils/store/profile.store";
import { useQuery } from "react-query";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { ignSchema } from "@/components/pages/profile-setup/IGN";
import { QueryClient } from "react-query";
import loading from "../../../../components/images/loading.gif";
import Image from "next/image";
import { useUserStore } from "@/utils/store/user.store";
import { Axios, AxiosError } from "axios";
import { useAudioStore } from "@/utils/store/audio.store";
interface Profile {
  age: number;
  gender: string | null;
  ign: string | null;
  profilePic: string | null;
}
interface User {
  username: string;
  isOldUser: boolean;
  _id: string;
}
function ProfileSetup() {
  const axiosInterceptor = useAxiosInterceptor();
  const { setIsAuthenticated } = useUserStore();
  const { playClickSound } = useAudioStore();
  const {
    setCurrentStep,
    currentStep,
    ign,
    gender,
    age,
    profilePic,
    setGender,
    setAge,
    setAgeIsDone,
    setGenderIsDone,
    setIgn,
    setProfilePic,
  } = useProfileStore();
  const router = useRouter();
  const queryClient = new QueryClient();
  const {
    isError,
    error,
    data,
  }: UseQueryResult<User, AxiosError<{ message: string }>> = useQuery({
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
    refetchOnWindowFocus: false,
  });
  const profileMutation = useMutation({
    mutationFn: async (data: Profile) => {
      const response = await axiosInterceptor.post(
        `${baseUrl}/user/profile`,
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
    onSuccess: async (data) => {
      queryClient.invalidateQueries();
      toast.success(data.message);
      router.push("/levels");
      setGender(null);
      setAge([1]);
      setCurrentStep("gender");
      setAgeIsDone(false);
      setGenderIsDone(false);
      setIgn(null);
      setProfilePic(null);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message);
    },
  });
  useEffect(() => {
    function load(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    window.addEventListener("beforeunload", load);
    return () => window.removeEventListener("beforeunload", load);
  }, []);
  useEffect(() => {
    if (data?.isOldUser) {
      router.push("/levels");
    }
  }, [data?.isOldUser, router]);
  if (isError) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data.message);
  }
  console.log(data);
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
                playClickSound();
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
              disabled={!gender.value}
              aria-label="Next to age setup"
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
                playClickSound();
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
              aria-label="Next to the last part which is the ign setup"
              disabled={age.value === null}
              className="w-[150px] py-2.5 bg-secondary text-primary rounded-md transition-all duration-200 ease-in font-bold"
              onClick={() => {
                playClickSound();
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
                playClickSound();
                profileMutation.mutate(data);
              }}
              style={{
                boxShadow: ignSchema.safeParse({ ign: ign.value }).success
                  ? "0 0 8px #ffe30a"
                  : "none",
              }}
              disabled={!ignSchema.safeParse({ ign: ign.value }).success}
              id="button-submit"
              className="w-[150px] h-[46px] l bg-secondary text-primary rounded-md transition-all duration-200 ease-in disabled:bg-zinc-700 disabled:text-zinc-400 font-bold"
            >
              {profileMutation.isLoading ? (
                <Image width={60} src={loading} alt="loading" priority />
              ) : (
                "SUBMIT"
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProfileSetup;
