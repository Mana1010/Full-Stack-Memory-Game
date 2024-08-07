"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAudioStore } from "@/utils/store/audio.store";
import { IoTriangleSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { FaDiamond, FaSquare, FaStar } from "react-icons/fa6";
import { RiRectangleFill } from "react-icons/ri";
import { TbOvalFilled } from "react-icons/tb";
import { BsOctagonFill } from "react-icons/bs";
import timeMoves from "../../../../../../../components/images/time-moves.png";
import points from "../../../../../../../components/images/trophies/total-score-star.png";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { useModalStore } from "@/utils/store/modal.store";
import GameMenuModal from "@/components/GameMenuModal";
import GameOverModalThreeCards from "./GameOverModal";
import GameVictoryModalThreeCards from "./GameVictoryModal";
import ConfirmationRetryModal from "@/components/ConfirmationRetryModal";
import ConfirmationQuitModal from "@/components/ConfirmationQuitModal";
import threeCardsImg from "../../../../../../../components/images/threeCards.png";
import { CardsFunctionSchema } from "@/types/game.types";
export interface Cards {
  id: string;
  sticker: React.JSX.Element;
  name: string;
  isPick: boolean;
  isDone: boolean;
  color?: string;
  isShowAddPoints: boolean;
  cardModified: number;
}
export const hiddenCard = [
  {
    id: nanoid(),
    sticker: <IoTriangleSharp />,
    name: "triangle",
    isPick: false,
    isDone: false,
    color: "#F68A21",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <IoTriangleSharp />,
    name: "triangle",
    isPick: false,
    isDone: false,
    color: "#F68A21",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <IoTriangleSharp />,
    name: "triangle",
    isPick: false,
    isDone: false,
    color: "#F68A21",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaCircle />,
    name: "circle",
    isPick: false,
    isDone: false,
    color: "#EE342F",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaCircle />,
    name: "circle",
    isPick: false,
    isDone: false,
    color: "#EE342F",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaCircle />,
    name: "circle",
    isPick: false,
    isDone: false,
    color: "#EE342F",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaDiamond />,
    name: "diamond",
    isPick: false,
    isDone: false,
    color: "#B734A7",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaDiamond />,
    name: "diamond",
    isPick: false,
    isDone: false,
    color: "#B734A7",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaDiamond />,
    name: "diamond",
    isPick: false,
    isDone: false,
    color: "#B734A7",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaSquare />,
    name: "square",
    isPick: false,
    isDone: false,
    color: "#00647C",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaSquare />,
    name: "square",
    isPick: false,
    isDone: false,
    color: "#00647C",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaSquare />,
    name: "square",
    isPick: false,
    isDone: false,
    color: "#00647C",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <RiRectangleFill />,
    name: "rectangle",
    isPick: false,
    isDone: false,
    color: "#00C458",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <RiRectangleFill />,
    name: "rectangle",
    isPick: false,
    isDone: false,
    color: "#00C458",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <RiRectangleFill />,
    name: "rectangle",
    isPick: false,
    isDone: false,
    color: "#00C458",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbOvalFilled />,
    name: "oval",
    isPick: false,
    isDone: false,
    color: "#F6C41E",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbOvalFilled />,
    name: "oval",
    isPick: false,
    isDone: false,
    color: "#F6C41E",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <TbOvalFilled />,
    name: "oval",
    isPick: false,
    isDone: false,
    color: "#F6C41E",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <BsOctagonFill />,
    name: "octagon",
    isPick: false,
    isDone: false,
    color: "#9F7452",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <BsOctagonFill />,
    name: "octagon",
    isPick: false,
    isDone: false,
    color: "#9F7452",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <BsOctagonFill />,
    name: "octagon",
    isPick: false,
    isDone: false,
    color: "#9F7452",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaStar />,
    name: "star",
    isPick: false,
    isDone: false,
    color: "#FFE30A",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaStar />,
    name: "star",
    isPick: false,
    isDone: false,
    color: "#FFE30A",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
  {
    id: nanoid(),
    sticker: <FaStar />,
    name: "star",
    isPick: false,
    isDone: false,
    color: "#FFE30A",
    isShowAddPoints: false,
    cardModified: Date.now(),
  },
];
function ThreeCardsPlay() {
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
  const [cards, setCards] = useState<Cards[]>(hiddenCard);
  const [playMoves, setPlayMoves] = useState<number>(60);
  const [isMount, setIsMount] = useState(true);
  const [starPoints, setStarPoints] = useState<number>(0);

  //For shuffling the cards when the component first to mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[random]] = [cards[random], cards[i]];
    }
  }

  useEffect(() => {
    if (isMount) {
      shuffleCards();
      setIsMount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, openGameOverModal, openConfirmationRetryModal]);
  useEffect(() => {
    const slicedFilteredCard = cards.filter(
      (card) => card.isPick && !card.isDone
    );
    if (slicedFilteredCard.length === 3) {
      const checkTripleCards = slicedFilteredCard.every(
        (card) => card.name === slicedFilteredCard[0].name
      );
      setTimeout(() => {
        if (checkTripleCards) {
          setCards((prev) => {
            return prev.map((card) => {
              if (
                slicedFilteredCard[0].id === card.id ||
                slicedFilteredCard[1].id === card.id ||
                slicedFilteredCard[2].id === card.id
              ) {
                setStarPoints(starPoints + 150 * 3);
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
      }, 500);
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
    const sortedArr = [...cards]
      .sort((a, b) => b.cardModified - a.cardModified)
      .slice(0, 3);
    const checkDoneCards = cards.some((card) => card.isDone);
    const threshold = 100; //Means the time limit.
    const dateTime = Date.now() - sortedArr[0].cardModified <= threshold; //Para icheck ang nabilin nga time by milliseconds from the current date to the time of when user matched the cards kay its because of how the execution and rendering time works, there is a slight delayed by milliseconds.
    if (checkDoneCards && dateTime) {
      setCards((prev) => {
        return prev.map((card) => {
          if (
            sortedArr[0].id === card.id ||
            sortedArr[1].id === card.id ||
            sortedArr[2].id === card.id
          ) {
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
              <Image src={threeCardsImg} alt="card-icon" priority width={25} />
            </div>
            <div
              style={{ boxShadow: "0 0 10px #FFE30A" }}
              className="w-[100px] h-6 rounded-3xl bg-secondary flex justify-center items-center"
            >
              <small className="text-primary text-[0.7rem]">{`${
                getMatchedCards.length / 3
              }/${hiddenCard.length / 3}`}</small>
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
          className={`items-center flex-col flex sm:rounded-md sm:w-[420px] w-[92%]`}
        >
          <div className="grid grid-cols-6 items-center justify-center py-3 px-2 gap-2 w-full">
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
                  className="back-reshuffle"
                >
                  {/* <span className="text-[#fce878] text-[1.46rem]">
                    <FaStar />
                  </span> */}
                </button>
                <button
                  disabled={card.isDone}
                  style={{ color: card.color }}
                  className="front"
                >
                  <span className="text-4xl">{card.sticker}</span>
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
                      +150
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
        <GameVictoryModalThreeCards totalPoints={starPoints + 3000} />
      )}
      {openGameOverModal && (
        <GameOverModalThreeCards
          totalPoints={starPoints}
          setPlayMoves={setPlayMoves}
          setStarPoints={setStarPoints}
          setCards={
            setCards as Dispatch<
              SetStateAction<Cards[] | CardsFunctionSchema[]>
            >
          }
          setIsMount={setIsMount}
        />
      )}
      {openConfirmationRetryModal && (
        <ConfirmationRetryModal
          setPlayMoves={setPlayMoves}
          setStarPoints={setStarPoints}
          setCards={
            setCards as Dispatch<
              SetStateAction<Cards[] | CardsFunctionSchema[]>
            >
          }
          setIsMount={setIsMount}
          hiddenCards={hiddenCard}
          playMoves={60}
        />
      )}
      {openConfirmationQuitModal && <ConfirmationQuitModal />}
    </main>
  );
}

export default ThreeCardsPlay;
