"use client";
import React from "react";
import { useAudioStore } from "@/utils/store/audio.store";
import { useEffect } from "react";
function GameOverModal() {
  const { playGameOverSound } = useAudioStore();
  useEffect(() => {
    playGameOverSound();
  }, [playGameOverSound]);
  return (
    <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center w-full h-screen px-5">
      GAME OVER MODAL
    </div>
  );
}

export default GameOverModal;
