"use client";
import React, { useState } from "react";
import setting from "../../components/images/titles/setting.png";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "sonner";

function Setting() {
  const axiosInterceptor = useAxiosInterceptor();
  const [touchedSetting, setTouchedSetting] = useState("");
  const getSetting = useQuery({
    queryKey: ["setting"],
    queryFn: async () => {
      const response = await axiosInterceptor.get(
        `${baseUrl}/feature/setting`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return response.data.message;
    },
    refetchOnMount: false,
  });
  const queryClient = useQueryClient();
  const changeSetting = useMutation({
    mutationFn: async (data: boolean) => {
      await axiosInterceptor.patch(
        `${baseUrl}/feature/setting`,
        { [touchedSetting]: data },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("setting");
    },
    onError: (err) => {
      toast.error(JSON.stringify(err));
    },
  });

  return (
    <div className="py-2.5 flex flex-col w-full h-full">
      <header className="md:px-[5rem] px-5">
        <Image src={setting} alt="setting" priority />
      </header>
      <div className="flex-grow flex-col justify-center items-center flex w-full px-5">
        <div className=" w-full md:w-[450px] h-[400px] rounded-md space-y-5 p-7">
          <div className="flex items-center w-full justify-between">
            <h1 className="text-secondary">MUSIC</h1>
            <Switch
              checked={getSetting?.data?.setting?.playMusic ?? false}
              onCheckedChange={(value) => {
                changeSetting.mutate(value);
              }}
              onClick={() => setTouchedSetting("playMusic")}
            />
          </div>
          <div className="flex items-center w-full justify-between">
            <h1 className="text-secondary">SOUND</h1>
            <Switch
              checked={getSetting?.data?.setting?.playSound ?? false}
              onCheckedChange={(value) => {
                changeSetting.mutate(value);
              }}
              onClick={() => setTouchedSetting("playSound")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
