import { create, StoreApi } from "zustand";
import { Howl } from "howler";
import bgSound from "../../assets/bgSound.mp3";
import card_Sound from "../../assets/card-sound.mp3";
import click_Sound from "../../assets/click-sound.mp3";

interface AudioState {
  bgSound: Howl;
  clickSound: Howl;
  cardSound: Howl;
}
interface AudioActions {
  playSound: () => void;
  pauseSound: () => void;
  stopSound: () => void;
  playClickSound: () => void;
  bgSoundSetting: () => void;
  clickSoundSetting: () => void;
  playCardSound: () => void;
}
type AudioStore = AudioState & AudioActions;

const store = (
  set: StoreApi<AudioStore>["setState"],
  get: StoreApi<AudioStore>["getState"]
) => ({
  bgSound: new Howl({
    src: [bgSound],
    loop: true,
  }),
  clickSound: new Howl({
    src: [click_Sound],
  }),
  cardSound: new Howl({
    src: [card_Sound],
    volume: 0.2,
  }),
  playSound: () => {
    const sound = get().bgSound;
    if (!sound.playing()) {
      sound.play();
    }
  },
  pauseSound: () => get().bgSound.pause(),
  stopSound: () => get().bgSound.stop(),
  playClickSound: () => get().clickSound.play(),
  playCardSound: () => get().cardSound.play(),
  bgSoundSetting: () => {
    const getBgSound = get().bgSound;
    const defaultSetting = { playMusic: true, playSound: true };
    let setting;
    const storage = localStorage.getItem("setting");
    if (storage) {
      setting = JSON.parse(storage);
    } else {
      localStorage.setItem("setting", JSON.stringify(defaultSetting));
      setting = defaultSetting;
    }
    getBgSound.volume(setting.playMusic ? 0.3 : 0);
  },
  clickSoundSetting: () => {
    const getSound = get().clickSound;
    const defaultSetting = { playMusic: true, playSound: true };
    let setting;
    const storage = localStorage.getItem("setting");
    if (storage) {
      setting = JSON.parse(storage);
    } else {
      localStorage.setItem("setting", JSON.stringify(defaultSetting));
      setting = defaultSetting;
    }
    if (setting.playSound) {
      getSound.volume(0.3);
    } else {
      getSound.stop(); //To automatically stop the sound
      getSound.volume(0);
    }
  },
});

export const useAudioStore = create<AudioStore>(store);
