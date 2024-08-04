"use client";
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion";
import {
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacLibra,
  TbZodiacCapricorn,
  TbZodiacTaurus,
  TbZodiacLeo,
  TbZodiacScorpio,
  TbZodiacAquarius,
  TbZodiacGemini,
  TbZodiacVirgo,
  TbZodiacSagittarius,
  TbZodiacPisces,
} from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useAudioStore } from "@/utils/store/audio.store";
import timeMoves from "../../../../../../components/images/time-moves.png";
import points from "../../../../../../components/images/trophies/total-score-star.png";
import cardDone from "../../../../../../components/images/cards-done.png";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { useModalStore } from "@/utils/store/modal.store";
import GameMenuModal from "@/components/GameMenuModal";
import GameOverModalHard from "./GameOverModal";
import ConfirmationRetryModal from "@/components/ConfirmationRetryModal";
import ConfirmationQuitModal from "@/components/ConfirmationQuitModal";
import GameVictoryModalHard from "./GameVictoryModal";
import { Cards } from "@/types/game.types";

export const hiddenCard = [
  {
    id: nanoid(),
    sticker: <TbZodiacSagittarius />,
    name: "sagittarius",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacSagittarius />,
    name: "sagittarius",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacPisces />,
    name: "pisces",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacPisces />,
    name: "pisces",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacAries />,
    name: "aries",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacAries />,
    name: "aries",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacCancer />,
    name: "cancer",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacCancer />,
    name: "cancer",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacCapricorn />,
    name: "capricorn",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacCapricorn />,
    name: "capricorn",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacLibra />,
    name: "libra",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacLibra />,
    name: "libra",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacTaurus />,
    name: "taurus",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacTaurus />,
    name: "taurus",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacLeo />,
    name: "leo",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacLeo />,
    name: "leo",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacScorpio />,
    name: "scorpio",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacScorpio />,
    name: "scorpio",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacVirgo />,
    name: "virgo",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacVirgo />,
    name: "virgo",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacAquarius />,
    name: "aquarius",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacAquarius />,
    name: "aquarius",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacGemini />,
    name: "gemini",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbZodiacGemini />,
    name: "gemini",
    isPick: false,
    isDone: false,
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
];

function HardPlay() {
  const pathname = usePathname();
  const {
    openGameMenu,
    setOpenGameMenu,
    setOpenGameOverModal,
    setOpenVictoryModal,
    openConfirmationRetryModal,
    openGameOverModal,
    openVictoryModal,
    openConfirmationQuitModal,
  } = useModalStore();
  const { playCardSound, playClickSound } = useAudioStore();
  const [cards, setCards] = useState<Cards[]>(hiddenCard);
  const [playMoves, setPlayMoves] = useState<number>(60);
  const [isMount, setIsMount] = useState(true);
  const [starPoints, setStarPoints] = useState<number>(0);
  //For shuffling the cards when the component first to mount
  useEffect(() => {
    if (isMount) {
      for (let i = cards.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[random]] = [cards[random], cards[i]];
      }
      setIsMount(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, openGameOverModal, openConfirmationRetryModal]);
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
                setStarPoints(starPoints + 200);
                return {
                  ...card,
                  isDone: true,
                  isPick: true,
                  cardModified: Date.now(),
                };
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
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, starPoints]);
  const getMatchedCards = cards.filter((card) => card.isDone);
  useEffect(() => {
    const completedCards = cards.every((card) => card.isDone);
    if (completedCards) {
      setOpenVictoryModal(true);
      setOpenGameOverModal(false);
    } else if (!completedCards && playMoves <= 0) {
      setTimeout(() => {
        setOpenGameOverModal(true);
      }, 500);
    }
  }, [cards, playMoves, setOpenGameOverModal, setOpenVictoryModal]);

  useEffect(() => {
    const sortedArr = cards
      .toSorted((a, b) => b.cardModified - a.cardModified)
      .slice(0, 2);
    const checkDoneCards = cards.some((card) => card.isDone);
    const threshold = 100; //Means the time limit.
    const dateTime = Date.now() - sortedArr[0].cardModified <= threshold; //Para icheck ang nabilin nga time by milliseconds from the current date to the time of when user matched the cards kay its because of how the execution and rendering time works, there is a slight delayed by milliseconds.
    if (checkDoneCards && dateTime) {
      setCards((prev) => {
        return prev.map((card) => {
          if (sortedArr[0].id === card.id || sortedArr[1].id === card.id) {
            return { ...card, isShowAddPoints: true };
          } else {
            return card;
          }
        });
      });
      setTimeout(() => {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.isShowAddPoints) {
              return { ...card, isShowAddPoints: false };
            } else {
              return card;
            }
          });
        });
      }, 800);
    }
  }, [cards]);
  function playCardSoundFunc(card: boolean) {
    if (!card) {
      playCardSound();
    }
  }
  return (
    <main className="hard-bg h-full w-full flex flex-col py-5">
      <header className="flex justify-between items-center">
        <div className="pl-10 sm:pl-[6rem]">
          <button
            onClick={() => {
              setOpenGameMenu();
            }}
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
              <small className="text-primary text-[0.7rem]">{`${
                getMatchedCards.length / 2
              }/${hiddenCard.length / 2}`}</small>
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
          className={`items-center flex-col flex sm:rounded-md sm:w-[450px] w-[95%] backdrop-blur-sm`}
        >
          <div className="grid grid-cols-6 items-center justify-center py-3 px-2 gap-2 w-full ">
            {cards.map((card) => (
              <motion.div
                layout
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
                        return {
                          ...cardsMap,
                          isPick: !cardsMap.isPick,
                        };
                      } else {
                        return cardsMap;
                      }
                    })
                  );
                }}
              >
                {" "}
                <button
                  onClick={() => setPlayMoves((prev) => prev - 1)}
                  disabled={playMoves <= 0}
                  className="back-hard"
                ></button>
                <button disabled={card.isDone} className="front">
                  <span className="text-4xl">{card.sticker}</span>
                </button>
                <AnimatePresence mode="wait">
                  {card.isShowAddPoints && (
                    <motion.span
                      style={{ textShadow: "0 0 15px #FFE30A" }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: -30 }}
                      transition={{ duration: 0.5, ease: "easeIn" }}
                      exit={{ opacity: 0 }}
                      className="absolute text-secondary top-0 z-[99]"
                    >
                      +100
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {openGameMenu && <GameMenuModal />}
      {openVictoryModal && (
        <GameVictoryModalHard
          totalPoints={
            playMoves === 0 ? starPoints : starPoints + playMoves * 100
          }
        />
      )}
      {openGameOverModal && (
        <GameOverModalHard
          totalPoints={starPoints}
          setPlayMoves={setPlayMoves}
          setStarPoints={setStarPoints}
          setCards={setCards}
          setIsMount={setIsMount}
        />
      )}
      {openConfirmationRetryModal && (
        <ConfirmationRetryModal
          setPlayMoves={setPlayMoves}
          setStarPoints={setStarPoints}
          setCards={setCards}
          setIsMount={setIsMount}
          hiddenCards={hiddenCard}
          playMoves={60}
        />
      )}
      {openConfirmationQuitModal && <ConfirmationQuitModal />}
    </main>
  );
}

export default HardPlay;
