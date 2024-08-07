"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import settingBg from "../../../../components/images/titles/setting.png";
import { useRouter } from "next/navigation";
import { useAudioStore } from "@/utils/store/audio.store";
import { IoReturnDownBack } from "react-icons/io5";
function Setting() {
  const { clickSoundSetting, playClickSound, bgSoundSetting } = useAudioStore();
  const router = useRouter();
  const [setting, setSetting] = useState({ playMusic: true, playSound: true });
  useEffect(() => {
    // Initialize setting from localStorage or use default values
    const storedSetting = localStorage.getItem("setting");
    if (storedSetting) {
      setSetting(JSON.parse(storedSetting));
    } else {
      const defaultSetting = { playMusic: true, playSound: true };
      localStorage.setItem("setting", JSON.stringify(defaultSetting));
    }
  }, []);

  return (
    <div className="py-2.5 flex flex-col w-full h-full">
      <header className="md:px-[5rem] px-5">
        <Image src={settingBg} alt="setting" priority />
      </header>
      <div className="flex-grow flex-col justify-center items-center flex w-full px-5">
        <div className=" w-full md:w-[450px] h-[400px] rounded-md space-y-5 p-7">
          <div className="flex items-center w-full justify-between">
            <h1 className="text-secondary">MUSIC</h1>
            <Switch
              checked={setting.playMusic}
              onCheckedChange={(value) => {
                const data = { ...setting, playMusic: value };
                localStorage.setItem("setting", JSON.stringify(data));
                setSetting(data);
                bgSoundSetting();
              }}
              onClick={() => playClickSound()}
            />
          </div>
          <div className="flex items-center w-full justify-between">
            <h1 className="text-secondary">SOUND</h1>
            <Switch
              checked={setting.playSound}
              onCheckedChange={(value) => {
                const data = { ...setting, playSound: value };
                localStorage.setItem("setting", JSON.stringify(data));
                setSetting(data);
                clickSoundSetting();
              }}
              onClick={() => playClickSound()}
            />
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-secondary text-primary px-5 py-2.5 rounded-sm flex items-center space-x-2"
        >
          <span>
            <IoReturnDownBack />
          </span>
          <span>BACK</span>
        </button>
      </div>
    </div>
  );
}

export default Setting;
