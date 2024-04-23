"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "sonner";
import TubeDesign from "@/components/TubeDesign";
import Gender from "@/components/pages/profile-setup/Gender";
import Age from "@/components/pages/profile-setup/Age";
import Username from "@/components/pages/profile-setup/Username";
const schema = z.object({
  ign: string().min(1, "This field is required"),
});
type ProfileForm = z.infer<typeof schema>;
function ProfileSetup() {
  const [active, setActive] = useState();
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

  // useEffect(() => {
  //   function load(e: BeforeUnloadEvent) {
  //     e.preventDefault();
  //   }

  //   window.addEventListener("beforeunload", load);
  //   return () => window.removeEventListener("beforeunload", load);
  // }, []);

  return (
    <main className="h-full w-full flex items-center justify-center flex-col relative">
      <TubeDesign />
      {/* <SideDesign
          formSideDesignHeightVariants={formSideDesignHeightVariants}
          formSideDesignWidthVariants={formSideDesignWidthVariants}
        /> */}
      <Gender />
      <div className="w-full justify-center items-center flex absolute bottom-[100px]">
        <div className="space-x-4">
          {/* <button
            style={{ boxShadow: "0 0 8px #ffe30a" }}
            id="button-submit"
            type="submit"
            className="w-[150px] py-2.5 bg-[#EBD30C] text-primary rounded-md transition-all duration-200 ease-in"
          >
            BACK
          </button> */}
          <button
            style={{ boxShadow: "0 0 8px #ffe30a" }}
            id="button-submit"
            className="w-[150px] py-2.5 bg-[#EBD30C] text-primary rounded-md transition-all duration-200 ease-in"
          >
            NEXT
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProfileSetup;
