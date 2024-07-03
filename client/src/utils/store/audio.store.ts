import { create } from "zustand";
import { Howl } from "howler";
import bgSound from "../../resources/bgSound.mp3";

interface AudioStore {
  playSound: () => void;
  pauseSound: () => void;
  stopSound: () => void;
}
const sound = new Howl({
  src: [bgSound],
  volume: 0.3,
  loop: true,
});

const store = () => ({
  playSound: () => {
    if (!sound.playing()) {
      sound.play();
    }
  },
  pauseSound: () => sound.pause(),
  stopSound: () => sound.stop(),
});

export const useAudioStore = create<AudioStore>(store);
