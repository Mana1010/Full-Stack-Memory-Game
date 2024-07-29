"use client";
import React, { ReactNode } from "react";
import { useModalStore } from "@/utils/store/modal.store";
import cards from "../components/images/cards.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ConfirmationQuitModal() {
  const { setOpenConfirmationQuitModal } = useModalStore();
  const router = useRouter();
  return (
    <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center w-full h-screen px-5">
      <div className="w-full md:w-1/3 bg-primary px-3.5 py-4 rounded-sm relative">
        <Image
          width={100}
          src={cards}
          alt="3-cards-image"
          priority
          className="absolute top-[-35px] left-0 z-[-1]"
        />
        <div>
          <p className="text-secondary text-sm font-semibold">
            Are you sure you want to quit the game?
          </p>
          <small className="text-white text-[0.6rem]">
            All your current progress will be lost and not saved.
          </small>
        </div>
        <div className="flex w-full justify-end items-end space-x-3 pt-5">
          <button
            onClick={() => setOpenConfirmationQuitModal(false)}
            className="bg-[#191F23] py-2 px-5 text-white text-sm rounded-sm"
          >
            CANCEL
          </button>
          <button
            onClick={() => {
              router.push("/levels");
              setOpenConfirmationQuitModal(false);
            }}
            className="text-primary py-2 px-5 bg-secondary text-sm rounded-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationQuitModal;
