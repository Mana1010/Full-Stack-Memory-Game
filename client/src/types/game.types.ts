import { Dispatch } from "react";
import { SetStateAction } from "react";

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
export interface GamePlaySchema {
  totalPoints: number;
  setPlayMoves: Dispatch<SetStateAction<number>>;
  setStarPoints: Dispatch<SetStateAction<number>>;
  setCards: Dispatch<SetStateAction<Cards[]>>;
  setIsMount: Dispatch<SetStateAction<boolean>>;
}
