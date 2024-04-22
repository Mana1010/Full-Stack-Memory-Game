"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "sonner";
import SideDesign from "@/components/SideDesign";
const schema = z.object({
  ign: string().min(1, "This field is required"),
});
type ProfileForm = z.infer<typeof schema>;
function ProfileSetup() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<ProfileForm>({
    defaultValues: {
      ign: "",
    },
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const profileMutation = useMutation({
    mutationFn: async (data: ProfileForm) => {
      const response = await axios.post(`${baseUrl}/user/profile-setup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/levels");
      reset();
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });
  const formSideDesignWidthVariants = {
    visible: {
      boxShadow: profileMutation.isLoading
        ? "0 0 25px #FFE30A"
        : "0 0 10px #FFE30A",
      width: profileMutation.isLoading ? "100%" : "100px",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
  const formSideDesignHeightVariants = {
    visible: {
      boxShadow: profileMutation.isLoading
        ? "0 0 25px #FFE30A"
        : "0 0 10px #FFE30A",
      height: profileMutation.isLoading ? "100%" : "100px",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // useEffect(() => {
  //   function load(e: BeforeUnloadEvent) {
  //     e.preventDefault();
  //   }

  //   window.addEventListener("beforeunload", load);
  //   return () => window.removeEventListener("beforeunload", load);
  // }, []);

  return (
    <motion.main
      initial={{ x: -700, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn", type: "spring" }}
      className="h-full w-full px-4 flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit((data: ProfileForm) => {
          profileMutation.mutate(data);
        })}
        autoComplete="false"
        id="form"
        className="px-4 py-3.5 w-full sm:w-[430px] h-[420px] backdrop-blur-sm rounded-sm mx-auto relative"
      >
        <SideDesign
          formSideDesignHeightVariants={formSideDesignHeightVariants}
          formSideDesignWidthVariants={formSideDesignWidthVariants}
        />
        <header className="w-full flex justify-between items-center">
          <div>
            <h1 className="text-white text-xl">SET YOUR PROFILE FIRST</h1>
          </div>
          <span className="text-[#FFE30A] text-3xl">
            <FaStar />
          </span>
        </header>
        <div className="w-full pt-10 flex space-y-4 flex-col">
          <div className="pt-2 w-full flex justify-center flex-col items-center space-y-2">
            <button
              style={{ boxShadow: "0 0 8px #ffe30a" }}
              id="button-submit"
              type="submit"
              className="w-[200px] py-2.5 bg-[#EBD30C] text-primary rounded-md transition-all duration-200 ease-in"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </motion.main>
  );
}

export default ProfileSetup;
