"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useMutation } from "react-query";
interface Form {
  setShowSignup: Dispatch<SetStateAction<boolean>>;
}
function Form({ setShowSignup }: Form) {
  useEffect(() => {
    function loadFunc(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    window.addEventListener("beforeunload", loadFunc);
    return () => window.removeEventListener("beforeunload", loadFunc);
  }, []);
  return (
    <main className="w-full h-screen backdrop-blur-md flex items-center justify-center px-3 absolute inset-0 flex-col space-y-2">
      <button
        onClick={() => setShowSignup((prev) => !prev)}
        className="bg-[#293133] md:w-[200px] w-full py-2.5 text-white rounded-md border border-white"
      >
        BACK TO HOME
      </button>
    </main>
  );
}

export default Form;
