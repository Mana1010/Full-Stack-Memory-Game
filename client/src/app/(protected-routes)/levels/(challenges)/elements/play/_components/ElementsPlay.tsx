"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAudioStore } from "@/utils/store/audio.store";
import timeMoves from "../../../../../../../components/images/time-moves.png";
import points from "../../../../../../../components/images/trophies/total-score-star.png";
import cardDone from "../../../../../../../components/images/cards-done.png";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { useModalStore } from "@/utils/store/modal.store";
import GameMenuModal from "@/components/GameMenuModal";
import GameVictoryModalElements from "./GameVictoryModal";
import ConfirmationRetryModal from "@/components/ConfirmationRetryModal";
import ConfirmationQuitModal from "@/components/ConfirmationQuitModal";
import GameOverModalElements from "./GameOverModal";
import { shuffleElements } from "@/data/elements.data";
import { CardsFunctionSchema } from "@/types/game.types";
import Loading from "@/components/Loading";
const hiddenCards = shuffleElements();
function ElementsPlay() {
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
  const { playCardSound } = useAudioStore();
  const [cards, setCards] = useState<CardsFunctionSchema[]>([]);
  const [playMoves, setPlayMoves] = useState<number>(50);
  const [isMount, setIsMount] = useState(true);
  const [starPoints, setStarPoints] = useState<number>(0);
  //For shuffling the cards when the component first to mount
  useEffect(() => {
    if (isMount) {
      setCards(shuffleElements());
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
        if (slicedFilteredCard[0].codeName === slicedFilteredCard[1].codeName) {
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
    if (completedCards && cards.length !== 0) {
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
    const dateTime = Date.now() - sortedArr[0]?.cardModified <= threshold; //Para icheck ang nabilin nga time by milliseconds from the current date to the time of when user matched the cards kay its because of how the execution and rendering time works, there is a slight delayed by milliseconds.
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
    <main className="challenge-bg h-full w-full flex flex-col py-5">
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
              }/${hiddenCards.length / 2}`}</small>
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
          className={`items-center flex-col flex sm:rounded-md sm:w-[480px] w-[97%]`}
        >
          {cards.length === 0 ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-6 items-center justify-center py-3 px-2 gap-2 w-full ">
              {cards.map((card, index) => (
                <motion.div
                  layout
                  key={card.id}
                  initial={false}
                  animate={{ rotateY: !card.isPick ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  className="card break-all"
                  style={{
                    marginTop: index >= 12 && index <= 17 ? "30px" : "0",
                  }}
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
                    className="back-reshuffle"
                  ></button>
                  <button
                    disabled={card.isDone}
                    className="front text-[0.7rem]"
                  >
                    {card.name}
                  </button>
                  <AnimatePresence mode="wait">
                    {card.isShowAddPoints && (
                      <motion.span
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: -30 }}
                        transition={{ duration: 0.5, ease: "easeIn" }}
                        exit={{ opacity: 0 }}
                        className="absolute text-primary top-0 z-[99]"
                      >
                        +100
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      {openGameMenu && <GameMenuModal />}
      {openVictoryModal && (
        <GameVictoryModalElements totalPoints={starPoints + 3000} />
      )}
      {openGameOverModal && (
        <GameOverModalElements
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
          hiddenCards={shuffleElements()}
          playMoves={50}
        />
      )}
      {openConfirmationQuitModal && <ConfirmationQuitModal />}
    </main>
  );
}

export default ElementsPlay;
