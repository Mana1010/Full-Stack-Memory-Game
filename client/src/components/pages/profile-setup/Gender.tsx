"use client";
import React, { useState } from "react";
import { IoRadioButtonOffSharp, IoRadioButtonOnSharp } from "react-icons/io5";

interface CheckType {
  male: boolean;
  female: boolean;
}
function Gender() {
  const [checkedValue, setCheckedValue] = useState<CheckType>({
    male: false,
    female: false,
  });
  return (
    <div className="w-full flex justify-center items-center flex-col">
      {" "}
      <h1
        style={{ textShadow: "0 0 15px #ffe30a" }}
        className=" text-3xl font-extrabold text-[#ffe30a] tracking-wider"
      >
        ARE YOU?
      </h1>
      <div className="flex gap-5 flex-col justify-center pt-10">
        <div className="space-x-2 flex items-center">
          <button
            onClick={() =>
              setCheckedValue({ ...checkedValue, female: false, male: true })
            }
            type="button"
            id="male"
            className="text-[#ffe30a] text-3xl"
          >
            {checkedValue.male ? (
              <IoRadioButtonOnSharp />
            ) : (
              <IoRadioButtonOffSharp />
            )}
          </button>
          <label className="text-white text-md">MALE</label>
        </div>
        <div className="space-x-2 flex items-center">
          <button
            onClick={() =>
              setCheckedValue({ ...checkedValue, male: false, female: true })
            }
            type="button"
            id="female"
            className="text-[#ffe30a] text-3xl"
          >
            {checkedValue.female ? (
              <IoRadioButtonOnSharp />
            ) : (
              <IoRadioButtonOffSharp />
            )}
          </button>
          <label className="text-md text-white">FEMALE</label>
        </div>
      </div>
    </div>
  );
}

export default Gender;
