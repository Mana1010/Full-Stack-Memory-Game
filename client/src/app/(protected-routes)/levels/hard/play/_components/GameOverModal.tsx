"use client";
import React from "react";
import { useAudioStore } from "@/utils/store/audio.store";
import { useEffect } from "react";
import Image from "next/image";
import skullImg from "../../../../../../components/images/skull.png";
import star from "../../../../../../components/images/trophies/total-score-star.png";
import { MdInfoOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/utils/store/user.store";
import { AxiosError } from "axios";
import { useModalStore } from "@/utils/store/modal.store";
import { hiddenCard } from "./HardPlay";
import { GamePlaySchema } from "@/types/game.types";

function GameOverModalHard({
  totalPoints,
  setPlayMoves,
  setStarPoints,
  setCards,
  setIsMount,
}: GamePlaySchema) {
  const axiosInterceptor = useAxiosInterceptor();
  const { playGameOverSound, playClaimingSound } = useAudioStore();
  const { setOpenGameOverModal } = useModalStore();
  const { userId } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const claimPrize = useMutation({
    mutationFn: async () => {
      const payload = {
        points: totalPoints,
      };
      const response = await axiosInterceptor.patch(
        `${baseUrl}/feature/hard/claim-prize/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return response.data.message;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user-profile"]);
      playClaimingSound();
      router.push("/levels/hard");
      toast.success(data);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message);
    },
  });
  useEffect(() => {
    playGameOverSound();
  }, [playGameOverSound]);

  function resetGame() {
    setIsMount(true);
    setPlayMoves(60);
    setStarPoints(0);
    setCards(hiddenCard);
  }
  return (
    <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center w-full h-screen px-5">
      <div className="bg-primary p-4 w-[95%] sm:w-[400px] rounded-sm flex flex-col space-y-3 min-h-[500px] relative">
        <div className="absolute top-[-25px] w-full flex justify-center items-center bg-transparent left-0 right-0">
          <div
            style={{ boxShadow: "0 0 20px #FFE30A" }}
            className="bg-secondary py-3 w-1/2 rounded-md flex justify-center items-center relative"
          >
            <span className="text-primary"> HARD LEVEL</span>
            <div className="absolute right-[10px] bottom-[5px] flex space-x-1">
              <span className="h-[35px] w-2 bg-primary/50"></span>
              <span className="h-[35px] w-2 bg-primary/50"></span>
              <span className="h-[35px] w-2 bg-primary/50"></span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <Image src={skullImg} alt="skull-image" width={200} priority />
        </div>
        <div className="flex justify-center items-center flex-col">
          <h1 className="font-semibold text-secondary text-2xl font-mono">
            GAME OVER
          </h1>
          <p className=" text-secondary text-[0.67rem]">No moves left</p>
        </div>
        <div className="pt-3 flex flex-col justify-center items-center w-full space-y-2">
          <h1 className="text-secondary text-xl">YOU GOT</h1>
          <div
            style={{
              textShadow: "0 0 15px white",
              boxShadow: "1px 1px 3px black",
            }}
            className="w-1/2 py-2 rounded-sm flex justify-center items-center text-white space-x-1"
          >
            <span className="pt-0.5">{totalPoints} </span>
            <Image src={star} alt="star-image" width={15} priority />
          </div>
        </div>
        <div
          className={`pt-5 justify-center items-center flex-col ${
            totalPoints === 0 ? "hidden" : "flex"
          }`}
        >
          <button
            onClick={() => {
              claimPrize.mutate();
              setOpenGameOverModal(false);
            }}
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="mx-auto py-2.5 w-[70%] bg-secondary text-primary"
          >
            CLAIM
          </button>
          <div className="flex items-center space-x-2 pt-2">
            <span className="text-[0.7rem] text-secondary">
              <MdInfoOutline />
            </span>
            <p className="text-center text-[0.6rem] text-secondary">
              If you refresh without claiming, your points will not be added.
            </p>
          </div>
        </div>
        <div
          className={`pt-5 justify-center items-center flex-col ${
            totalPoints === 0 ? "flex" : "hidden"
          }`}
        >
          <button
            onClick={() => {
              resetGame();
              setOpenGameOverModal(false);
            }}
            style={{ boxShadow: "0 0 15px #FFE30A" }}
            className="mx-auto py-2.5 w-[70%] bg-secondary text-primary"
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverModalHard;
