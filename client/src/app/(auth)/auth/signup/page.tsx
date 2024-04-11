"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon from "../../../../components/images/logo.png";
import { FaStar } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import Link from "next/link";
import memoryBg from "../../../../components/images/icon.png";
// const obj = z.object({
//   username: string(),
//   password: string().min(7, "Password must be at least 7 characters long."),
//   ["confirm-password"]: string().refine((formField, ctx) => {
//     const password = ctx.parent.password;
//     return formField !== password;
//   }, "Password do not match"),
// });
// type Form = z.infer<obj>;
function Signup() {
  const { formState, register } = useForm();
  const [hasChanged, setHasChanged] = useState(true);
  useEffect(() => {
    function load(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    if (hasChanged) {
      window.addEventListener("beforeunload", load);
      return () => window.removeEventListener("beforeunload", load);
    }
  }, []);
  return (
    <main
      id="bg"
      className="h-screen w-full grid md:grid-cols-2 grid-cols-1 items-center justify-center bg-[#fffffe] px-4"
    >
      <header className="absolute top-0 right-0 left-0 px-2 py-3">
        <Image src={icon} alt="icon" priority width={130} />
      </header>
      <div className="w-full">
        <form
          autoComplete="false"
          id="form"
          className="px-4 py-3.5 w-full sm:w-[400px] h-[450px] backdrop-blur-sm rounded-sm mx-auto relative"
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
            <h1 className="text-white text-xl">REGISTER</h1>
            <span className="text-[#FFE30A] text-3xl">
              <FaStar />
            </span>
          </header>
          <div className="w-full pt-10 flex space-y-4 flex-col">
            <div className="space-y-1 flex flex-col">
              <label
                htmlFor="username"
                className="text-[#FFE30A] text-[0.7rem]"
              >
                USERNAME
              </label>
              <input
                type="text"
                {...register("username")}
                name="username"
                id="username"
                className="w-full p-2.5 space-x-2 rounded-sm bg-primary text-white outline-[#EBD30C] border-none outline-dashed outline-1"
              />
            </div>
            <div className="space-y-1 flex flex-col">
              <label
                htmlFor="password"
                className="text-[#FFE30A] text-[0.7rem]"
              >
                PASSWORD
              </label>
              <div className="w-full p-2.5 space-x-2 rounded-sm bg-primary outline-[#EBD30C] outline-dashed outline-1">
                <input
                  type="password"
                  {...register("password")}
                  name="password"
                  id="password"
                  className="bg-transparent text-white outline-none w-[90%]"
                />
              </div>
            </div>
            <div className="space-y-1 flex flex-col">
              <label
                htmlFor="confirm-password"
                className="text-[#FFE30A] text-[0.7rem]"
              >
                CONFIRM PASSWORD
              </label>
              <div className="w-full p-2.5 space-x-2 rounded-sm bg-primary outline-[#EBD30C] outline-dashed outline-1">
                <input
                  type="password"
                  {...register("confirm-password")}
                  name="confirm-password"
                  id="confirm-password"
                  className="bg-transparent text-white outline-none w-[90%]"
                />
              </div>
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
                Already have an account?{" "}
                <span className="text-[#EBD30C] underline-offset-2 underline">
                  <Link href={"/auth/login"} className="">
                    login here
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
