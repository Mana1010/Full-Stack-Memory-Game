"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { FaAppleAlt } from "react-icons/fa";
import {
  GiOrange,
  GiGrapes,
  GiBanana,
  GiCoconuts,
  GiWatermelon,
} from "react-icons/gi";
import { FaLemon } from "react-icons/fa";
import { TbMelon } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useAudioStore } from "@/utils/store/audio.store";
import timeMoves from "../../../../../../components/images/time-moves.png";
import points from "../../../../../../components/images/trophies/total-score-star.png";
import cardDone from "../../../../../../components/images/cards-done.png";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { useModalStore } from "@/utils/store/modal.store";
import GameMenuModal from "@/components/GameMenuModal";

interface Cards {
  id: string;
  sticker: React.JSX.Element;
  name: string;
  isPick: boolean;
  isDone: boolean;
  color: string;
}
const hiddenCard = [
  {
    id: nanoid(),
    sticker: <FaAppleAlt />,
    name: "apple",
    isPick: false,
    isDone: false,
    color: "#ED483B",
  },
  {
    id: nanoid(),
    sticker: <FaLemon />,
    name: "lemon",
    isPick: false,
    isDone: false,
    color: "#F7D931",
  },
  {
    id: nanoid(),
    sticker: <FaLemon />,
    name: "lemon",
    isPick: false,
    isDone: false,
    color: "#F7D931",
  },
  {
    id: nanoid(),
    sticker: <GiOrange />,
    name: "orange",
    isPick: false,
    isDone: false,
    color: "#FF8508",
  },
  {
    id: nanoid(),
    sticker: <GiGrapes />,
    name: "grapes",
    isPick: false,
    isDone: false,
    color: "#392A63",
  },

  {
    id: nanoid(),
    sticker: <GiBanana />,
    name: "banana",
    isPick: false,
    isDone: false,
    color: "#FED602",
  },
  {
    id: nanoid(),
    sticker: <GiBanana />,
    name: "banana",
    isPick: false,
    isDone: false,
    color: "#FED602",
  },
  {
    id: nanoid(),
    sticker: <GiOrange />,
    name: "orange",
    isPick: false,
    isDone: false,
    color: "#FF8508",
  },
  {
    id: nanoid(),
    sticker: <FaAppleAlt />,
    name: "apple",
    isPick: false,
    isDone: false,
    color: "#ED483B",
  },
  {
    id: nanoid(),
    sticker: <GiGrapes />,
    name: "grapes",
    isPick: false,
    isDone: false,
    color: "#392A63",
  },
  {
    id: nanoid(),
    sticker: <GiCoconuts />,
    name: "coconut",
    isPick: false,
    isDone: false,
    color: "#719A26",
  },
  {
    id: nanoid(),
    sticker: <GiCoconuts />,
    name: "coconut",
    isPick: false,
    isDone: false,
    color: "#719A26",
  },
  {
    id: nanoid(),
    sticker: <GiWatermelon />,
    name: "watermelon",
    isPick: false,
    isDone: false,
    color: "#F55454",
  },
  {
    id: nanoid(),
    sticker: <GiWatermelon />,
    name: "watermelon",
    isPick: false,
    isDone: false,
    color: "#F55454",
  },
  {
    id: nanoid(),
    sticker: <TbMelon />,
    name: "melon",
    isPick: false,
    isDone: false,
    color: "#E3E54D",
  },
  {
    id: nanoid(),
    sticker: <TbMelon />,
    name: "melon",
    isPick: false,
    isDone: false,
    color: "#E3E54D",
  },
];
function EasyPlay() {
  const pathname = usePathname();
  const { openGameMenu, setOpenGameMenu } = useModalStore();
  const { playCardSound } = useAudioStore();
  const [finish, setFinish] = useState<boolean>(false);
  const [cards, setCards] = useState<Cards[]>(hiddenCard);
  const [playMoves, setPlayMoves] = useState<number>(30);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isMount, setIsMount] = useState(true);
  const [starPoints, setStarPoints] = useState<number>(0);
  useEffect(() => {
    if (isMount) {
      for (let i = cards.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[random]] = [cards[random], cards[i]];
      }
      setIsMount(false);
    }
    return () => setIsMount(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  useEffect(() => {
    const slicedFilteredCard = cards.filter(
      (card) => card.isPick && !card.isDone
    );
    if (slicedFilteredCard.length === 2) {
      setTimeout(() => {
        if (slicedFilteredCard[0].name === slicedFilteredCard[1].name) {
          setCards((prev) => {
            return prev.map((card) => {
              if (
                slicedFilteredCard[0].id === card.id ||
                slicedFilteredCard[1].id === card.id
              ) {
                return { ...card, isDone: true, isPick: true };
              } else {
                return card;
              }
            });
          });
        } else {
          setCards((prev) => {
            return prev.map((card) => {
              if (card.isPick && !card.isDone) {
                return { ...card, isPick: false };
              } else {
                return card;
              }
            });
          });
        }
      }, 500);
    }
  }, [cards]);
  useEffect(() => {
    const completeCards = cards.every((card) => card.isDone);
    if (completeCards) {
      setFinish(true);
    }
    return () => setFinish(false);
  }, [cards]);
  function playCardSoundFunc(card: boolean) {
    if (!card) {
      playCardSound();
    }
  }
  const getMatchedCards = cards.filter((card) => card.isDone === true);
  return (
    <main className="h-full w-full flex flex-col py-5">
      <header className="flex justify-between items-center">
        <div className="pl-10 sm:pl-[6rem]">
          <button
            onClick={() => setOpenGameMenu()}
            className="text-secondary text-2xl relative"
          >
            <div className="w-9 h-9 rounded-full bg-primary absolute left-[-20px] top-[-6px] flex justify-center items-center">
              <span>
                <FaBars />
              </span>
            </div>
            <div
              style={{ boxShadow: "0 0 10px #FFE30A" }}
              className="w-[80px] h-6 rounded-3xl bg-secondary flex justify-center items-center"
            >
              <small className="text-primary text-[0.7rem]">MENU</small>
            </div>
          </button>
        </div>
        <div className="flex-col flex space-y-4 pr-6">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-primary absolute left-[-20px] top-[-6px] flex justify-center items-center">
              <Image src={points} alt="star-points" priority width={25} />
            </div>
            <div
              style={{ boxShadow: "0 0 10px #FFE30A" }}
              className="w-[100px] h-6 rounded-3xl bg-secondary flex justify-center items-center"
            >
              <small className="text-primary text-[0.7rem]">{starPoints}</small>
            </div>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-primary absolute left-[-20px] top-[-6px] flex justify-center items-center">
              <Image src={cardDone} alt="card-icon" priority width={25} />
            </div>
            <div
              style={{ boxShadow: "0 0 10px #FFE30A" }}
              className="w-[100px] h-6 rounded-3xl bg-secondary flex justify-center items-center"
            >
              <small className="text-primary text-[0.7rem]">{`${getMatchedCards.length}/${hiddenCard.length}`}</small>
            </div>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-primary absolute left-[-20px] top-[-6px] flex justify-center items-center">
              <Image src={timeMoves} alt="star-points" priority width={25} />
            </div>
            <div
              style={{ boxShadow: "0 0 10px #FFE30A" }}
              className="w-[100px] h-6 rounded-3xl bg-secondary flex justify-center items-center"
            >
              <small className="text-primary text-[0.7rem]">{playMoves}</small>
            </div>
          </div>
        </div>
      </header>
      <div className="h-full w-full flex items-center justify-center flex-grow">
        <div
          className={`items-center flex-col flex sm:rounded-md sm:w-[400px] w-[70%]`}
        >
          <div className="grid grid-cols-4 items-center justify-center py-3 px-2 gap-2 w-full">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={false}
                animate={{ rotateY: !card.isPick ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
                className="card"
                onClick={() => {
                  playCardSoundFunc(card.isPick);
                  setCards((prev) =>
                    prev.map((cardsMap) => {
                      if (card.id === cardsMap.id) {
                        return { ...cardsMap, isPick: !cardsMap.isPick };
                      } else {
                        return cardsMap;
                      }
                    })
                  );
                }}
              >
                {" "}
                <button className="back">
                  <span className="text-[#fce878] text-[1.46rem]">
                    <FaStar />
                  </span>
                </button>
                <button
                  disabled={card.isDone}
                  style={{ color: card.color }}
                  className="front"
                >
                  <span className="text-4xl">{card.sticker}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {openGameMenu && <GameMenuModal />}
    </main>
  );
}

export default EasyPlay;
