import React, { useEffect } from "react";
import { useAudioStore } from "@/utils/store/audio.store";
function GameVictoryModal() {
  const { playGameVictorySound } = useAudioStore();
  useEffect(() => {
    playGameVictorySound();
  }, [playGameVictorySound]);
  return (
    <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center w-full h-screen px-5">
      GameVictoryModal
    </div>
  );
}

export default GameVictoryModal;
