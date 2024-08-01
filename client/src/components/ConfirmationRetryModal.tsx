"use client";
import React, { ReactNode } from "react";
import { useModalStore } from "@/utils/store/modal.store";
import cards from "../components/images/cards.png";
import Image from "next/image";
import { GamePlaySchema } from "@/types/game.types";
import { Cards } from "@/types/game.types";
type GameConfirmationModalSchema = Omit<GamePlaySchema, "totalPoints"> & {
  hiddenCards: Cards[];
  playMoves: number;
};
function ConfirmationRetryModal({
  setPlayMoves,
  setStarPoints,
  setCards,
  setIsMount,
  hiddenCards,
  playMoves,
}: GameConfirmationModalSchema) {
  const { setOpenConfirmationRetryModal } = useModalStore();
  function resetGame() {
    setIsMount(true);
    setPlayMoves(playMoves);
    setStarPoints(0);
    setCards(hiddenCards);
    setOpenConfirmationRetryModal(false);
  }
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
            Are you sure you want to retry the game?
          </p>
          <small className="text-white text-[0.6rem]">
            All your current progress will be lost and not saved.
          </small>
        </div>
        <div className="flex w-full justify-end items-end space-x-3 pt-5">
          <button
            onClick={() => setOpenConfirmationRetryModal(false)}
            className="bg-[#191F23] py-2 px-5 text-white text-sm rounded-sm"
          >
            CANCEL
          </button>
          <button
            onClick={resetGame}
            className="text-primary py-2 px-5 bg-secondary text-sm rounded-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationRetryModal;
