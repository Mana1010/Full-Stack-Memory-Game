"use client";
import { useEffect } from "react";
import { useAudioStore } from "@/utils/store/audio.store";
function Sound() {
  const { clickSound, bgSound } = useAudioStore();
  useEffect(() => {
    let setting;
    const settingLocal = localStorage.getItem("setting");
    if (settingLocal) {
      setting = JSON.parse(settingLocal);
    } else {
      const defaultSetting = { playMusic: true, playSound: true };
      localStorage.setItem("setting", JSON.stringify(defaultSetting));
      setting = defaultSetting;
    }

    if (setting.playSound) {
      clickSound.volume(0.3);
    } else {
      clickSound.volume(0);
    }
  }, [clickSound, bgSound]);
  return null;
}

export default Sound;
