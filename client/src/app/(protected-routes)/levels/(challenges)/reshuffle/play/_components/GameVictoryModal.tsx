"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useAudioStore } from "@/utils/store/audio.store";
import { useEffect } from "react";
import Image from "next/image";
import victoryImg from "../../../../../../../components/images/victory.png";
import star from "../../../../../../../components/images/trophies/total-score-star.png";
import { MdInfoOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/utils/store/user.store";
import { AxiosError } from "axios";
import { useModalStore } from "@/utils/store/modal.store";
import { GamePlaySchema } from "@/types/game.types";
import { FaShuffle } from "react-icons/fa6";

type GameVictorySchema = Pick<GamePlaySchema, "totalPoints">;
function GameVictoryModalReshuffle({ totalPoints }: GameVictorySchema) {
  const axiosInterceptor = useAxiosInterceptor();
  const { playGameVictorySound, playClaimingSound } = useAudioStore();
  const { setOpenVictoryModal } = useModalStore();
  const { userId } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const claimPrize = useMutation({
    mutationFn: async () => {
      const payload = {
        points: totalPoints,
        isGameComplete: true,
      };
      const response = await axiosInterceptor.patch(
        `${baseUrl}/feature/reshuffle/claim-prize/${userId}`,
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
      setOpenVictoryModal(false);
      playClaimingSound();
      router.push("/levels");
      toast.success(data);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      console.log(err.response?.data);
    },
  });
  useEffect(() => {
    playGameVictorySound();
  }, [playGameVictorySound]);
  return (
    <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center w-full h-screen px-5">
      <div className="bg-primary p-4 w-[95%] sm:w-[400px] rounded-sm flex flex-col space-y-3 min-h-[500px] relative">
        <div className="absolute top-[-25px] w-full flex justify-center items-center bg-transparent left-0 right-0">
          <div
            style={{ boxShadow: "0 0 20px #FFE30A" }}
            className="bg-secondary py-3 w-1/2 rounded-md flex justify-center items-center relative"
          >
            <span className="text-primary">RESHUFFLE</span>
            <div className="absolute right-[10px] bottom-[8px] flex">
              <span className="text-primary/50 font-semibold text-[2rem]">
                <FaShuffle />
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <Image src={victoryImg} alt="victory-image" width={200} priority />
        </div>
        <div className="flex justify-center items-center flex-col">
          <h1 className="font-semibold text-secondary text-2xl font-mono">
            GAME COMPLETE
          </h1>
          <p className=" text-secondary text-[0.67rem]">
            You matched all cards!
          </p>
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
            <span className="pt-0.5">{totalPoints}</span>
            <Image src={star} alt="star-image" width={15} priority />
          </div>
          <small className="text-center text-[0.6rem] text-secondary">
            You got 2000 extra points for completing this mode.
          </small>
        </div>
        <div className={`pt-5 justify-center items-center flex-col flex`}>
          <button
            onClick={() => {
              claimPrize.mutate();
              setOpenVictoryModal(false);
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
      </div>
    </div>
  );
}

export default GameVictoryModalReshuffle;
