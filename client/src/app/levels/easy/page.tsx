"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { FaAppleAlt } from "react-icons/fa";
import { GiOrange, GiGrapes, GiBanana, GiCoconuts } from "react-icons/gi";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { FaLemon } from "react-icons/fa";
import { usePathname } from "next/navigation";

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
];
function Easy() {
  const pathname = usePathname();

  const [finish, setFinish] = useState(false);
  const [cards, setCards] = useState<Cards[]>(hiddenCard);
  const [isMount, setIsMount] = useState(true);
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
      alert("Condragulation");
      setFinish(true);
    }
    return () => setFinish(false);
  }, [cards]);
  return (
    <main className="h-screen w-full flex items-center justify-center bg-[#fffffe] sm:py-7 py-0">
      <div
        id="bg"
        className={`h-full items-center flex-col flex sm:w-[350px] w-full sm:rounded-md`}
      >
        <div className="pt-10 text-white text-lg">MEMORY GAME</div>
        <div className="grid grid-cols-4 items-center justify-center w-full py-3 px-2 gap-2">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={false}
              animate={{ rotateY: !card.isPick ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className="card"
              onClick={() => {
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
    </main>
  );
}

export default Easy;
