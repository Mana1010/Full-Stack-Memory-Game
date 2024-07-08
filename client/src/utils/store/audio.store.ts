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
});

export const useAudioStore = create<AudioStore>(store);
