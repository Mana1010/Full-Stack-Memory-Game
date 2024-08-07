"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "sonner";
import SideDesign from "@/components/SideDesign";
import loading from "../../../../../components/images/loading.gif";
interface ShowPassword {
  password: boolean;
  ["confirm-password"]: boolean;
}
const schema = z
  .object({
    username: string()
      .min(1, "This field is required")
      .max(15, "The username you entered is too long.")
      .regex(/^\w+$/, "Don't put space"),
    password: string()
      .min(1, "This field is required")
      .min(7, "Password must be at least 7 characters long."),
    confirm: string().min(1, "This field is required"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

type DataSignUp = z.infer<typeof schema>;
function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<DataSignUp>({
    defaultValues: {
      username: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    password: false,
    ["confirm-password"]: false,
  });
  const router = useRouter();
  const signUpMutation = useMutation({
    mutationFn: async (data: DataSignUp) => {
      const response = await axios.post(`${baseUrl}/auth/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      localStorage.setItem(
        "setting",
        JSON.stringify({ playMusic: true, playSound: true })
      );
      localStorage.setItem("token", data.token);
      reset();
      router.push("/profile-setup");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message);
    },
  });
  const formSideDesignWidthVariants = {
    visible: {
      boxShadow: signUpMutation.isLoading
        ? "0 0 25px #FFE30A"
        : "0 0 10px #FFE30A",
      width: signUpMutation.isLoading ? "100%" : "100px",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  const formSideDesignHeightVariants = {
    visible: {
      boxShadow: signUpMutation.isLoading
        ? "0 0 25px #FFE30A"
        : "0 0 10px #FFE30A",
      height: signUpMutation.isLoading ? "100%" : "100px",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  useEffect(() => {
    function load(e: BeforeUnloadEvent) {
      e.preventDefault();
    }

    window.addEventListener("beforeunload", load);
    return () => window.removeEventListener("beforeunload", load);
  }, []);
  function submitForm(data: DataSignUp) {
    signUpMutation.mutate(data);
  }
  return (
    <motion.main
      initial={{ x: -700, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn", type: "spring" }}
      exit={{ x: 700 }}
      className="h-full w-full px-4 flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit(submitForm)}
        autoComplete="false"
        id="form"
        className="px-4 py-3.5 w-full sm:w-[430px] h-[500px] backdrop-blur-sm rounded-sm mx-auto relative"
      >
        <SideDesign
          formSideDesignWidthVariants={formSideDesignWidthVariants}
          formSideDesignHeightVariants={formSideDesignHeightVariants}
        />
        <header>
          <h1 className="text-white text-xl">REGISTER</h1>
        </header>
        <div className="w-full pt-7 flex space-y-4 flex-col">
          <div className="space-y-1 flex flex-col">
            <div className="flex w-full justify-between items-center">
              <label
                htmlFor="username"
                className="text-secondary text-[0.7rem]"
              >
                USERNAME
              </label>
              <small
                className={`text-[0.7rem] ${
                  watch("username").length > 15
                    ? "text-red-500"
                    : "text-secondary"
                }`}
              >
                {watch("username").length}/15
              </small>
            </div>
            <input
              autoComplete="true"
              type="text"
              {...register("username")}
              name="username"
              id="username"
              className="w-full p-2.5 space-x-2 rounded-sm bg-primary text-white outline-[#EBD30C] border-none outline-dashed outline-1 bg-transparent"
            />

            {errors.username?.message && (
              <motion.small
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1, textShadow: "0 0 10px #EBD30C" }}
                transition={{ duration: 0.1, ease: "easeIn" }}
                className="text-[0.85rem] text-[#EBD30C]"
              >
                {errors.username.message}
              </motion.small>
            )}
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="password" className="text-[#FFE30A] text-[0.7rem]">
              PASSWORD
            </label>
            <div className="w-full p-2.5 space-x-2 rounded-sm bg-transparent outline-[#EBD30C] outline-dashed outline-1 flex justify-between items-center">
              <input
                autoComplete="true"
                type={showPassword.password ? "text" : "password"}
                {...register("password")}
                name="password"
                id="password"
                className="bg-transparent text-white outline-none w-[90%]"
              />
              <button
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    password: !showPassword.password,
                  })
                }
                type="button"
                aria-label={
                  showPassword.password ? "Hide password" : "Show password"
                }
                className="text-yellow-200 text-2xl"
                name="password"
              >
                {showPassword.password ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>

            {errors.password?.message && (
              <motion.small
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1, textShadow: "0 0 10px #EBD30C" }}
                transition={{ duration: 0.1, ease: "easeIn" }}
                className="text-[0.85rem] text-[#EBD30C]"
              >
                {errors.password.message}
              </motion.small>
            )}
          </div>
          <div className="space-y-1 flex flex-col">
            <label
              htmlFor="confirm-password"
              className="text-[#FFE30A] text-[0.7rem]"
            >
              CONFIRM PASSWORD
            </label>
            <div className="w-full p-2.5 space-x-2 rounded-sm bg-transparent outline-[#EBD30C] outline-dashed outline-1 flex justify-between items-center">
              <input
                autoComplete="true"
                type={showPassword["confirm-password"] ? "text" : "password"}
                {...register("confirm")}
                name="confirm"
                id="confirm-password"
                className="bg-transparent text-white outline-none w-[90%]"
              />
              <button
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    ["confirm-password"]: !showPassword["confirm-password"],
                  })
                }
                type="button"
                aria-label={
                  showPassword["confirm-password"]
                    ? "Hide password"
                    : "Show password"
                }
                className="text-yellow-200 text-2xl"
              >
                {showPassword["confirm-password"] ? (
                  <VscEyeClosed />
                ) : (
                  <VscEye />
                )}
              </button>
            </div>

            {errors.confirm?.message && (
              <motion.small
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1, textShadow: "0 0 10px #EBD30C" }}
                transition={{ duration: 0.1, ease: "easeIn" }}
                className="text-[0.85rem] text-[#EBD30C]"
              >
                {errors.confirm.message}
              </motion.small>
            )}
          </div>
          <div className="pt-2 w-full flex justify-center flex-col items-center space-y-2">
            <button
              style={{ boxShadow: "0 0 8px #ffe30a" }}
              id="button-submit"
              type="submit"
              className="w-[200px] h-[50px] bg-[#EBD30C] text-primary rounded-md transition-all duration-200 ease-in flex justify-center items-center"
            >
              {signUpMutation.isLoading ? (
                <Image width={60} src={loading} alt="" priority />
              ) : (
                "SUBMIT"
              )}
            </button>
            <p className="text-white">
              Already have an account?{" "}
              <span className="text-[#EBD30C] underline-offset-2 underline">
                <Link href={"/auth/login"}>login here</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </motion.main>
  );
}

export default Signup;
