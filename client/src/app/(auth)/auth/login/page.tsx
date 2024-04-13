"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
  username: string().min(1, "This field is required"),
  password: string().min(1, "This field is required"),
});
type LoginForm = z.infer<typeof schema>;
function Login() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  // useEffect(() => {
  //   function load(e: BeforeUnloadEvent) {
  //     e.preventDefault();
  //   }

  //   window.addEventListener("beforeunload", load);
  //   return () => window.removeEventListener("beforeunload", load);
  // }, []);
  function submitLoginForm(data: LoginForm) {
    reset();
  }
  return (
    <motion.main
      initial={{ x: -700, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn", type: "spring" }}
      className="h-full w-full px-4 flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit(submitLoginForm)}
        autoComplete="false"
        id="form"
        className="px-4 py-3.5 w-full sm:w-[430px] h-[420px] backdrop-blur-sm rounded-sm mx-auto relative"
      >
        {/* TOP AND LEFT */}
        <div
          id="form-design"
          className="absolute  w-[1px] bg-[#FFE30A] h-[100px] top-0 left-0"
        ></div>
        <div
          id="form-design"
          className="absolute w-[100px] bg-[#FFE30A] h-[1px] top-0 left-0"
        ></div>
        {/* BOTTOM AND RIGHT */}
        <div
          id="form-design"
          className="absolute w-[100px] bg-[#FFE30A] h-[1px] bottom-0 right-0"
        ></div>
        <div
          id="form-design"
          className="absolute  w-[1px] bg-[#FFE30A]  h-[100px] bottom-0 right-0"
        ></div>
        {/* TOP AND RIGHT */}
        <div
          id="form-design"
          className="absolute w-[100px] bg-[#FFE30A] h-[1px] top-0 right-0"
        ></div>
        <div
          id="form-design"
          className="absolute  w-[1px] bg-[#FFE30A]  h-[100px] top-0 right-0"
        ></div>
        {/* BOTTOM AND LEFT */}
        <div
          id="form-design"
          className="absolute w-[100px] bg-[#FFE30A] h-[1px] bottom-0 left-0"
        ></div>
        <div
          id="form-design"
          className="absolute  w-[1px] bg-[#FFE30A]  h-[100px] bottom-0 left-0"
        ></div>
        <header className="w-full flex justify-between items-center">
          <h1 className="text-white text-xl">SIGN IN</h1>
          <span className="text-[#FFE30A] text-3xl">
            <FaStar />
          </span>
        </header>
        <div className="w-full pt-10 flex space-y-4 flex-col">
          <div className="space-y-1 flex flex-col">
            <label htmlFor="username" className="text-[#FFE30A] text-[0.7rem]">
              USERNAME
            </label>
            <input
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
            <div className="w-full p-2.5 space-x-2 rounded-sm bg-primary outline-[#EBD30C] outline-dashed outline-1 flex justify-between items-center">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                name="password"
                id="password"
                className="bg-transparent text-white outline-none w-[90%]"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="text-yellow-200 text-2xl"
                name="password"
              >
                {showPassword ? <VscEyeClosed /> : <VscEye />}
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
          <div className="pt-2 w-full flex justify-center flex-col items-center space-y-2">
            <button
              style={{ boxShadow: "0 0 8px #ffe30a" }}
              id="button-submit"
              type="submit"
              className="w-[200px] py-2.5 bg-[#EBD30C] text-primary rounded-md transition-all duration-200 ease-in"
            >
              SUBMIT
            </button>
            <p className="text-white">
              No account yet?{" "}
              <span className="text-[#EBD30C] underline-offset-2 underline">
                <Link href={"/auth/signup"} className="">
                  signup here
                </Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </motion.main>
  );
}

export default Login;
