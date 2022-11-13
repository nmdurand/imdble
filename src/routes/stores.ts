import { writable } from "svelte/store";

interface Question {
  imdb_id: string;
  plot: string;
}

type GameStatus = "IDLE" | "IN_PROGRESS" | "SUCCESS" | "FAILURE";


export interface GameGuess {
  answer: string;
  isCorrect: boolean;
}

const INITIAL_STATE: {
  question: Question
  guesses: (GameGuess | undefined)[]
  currentGuessIndex: number
  status: GameStatus
} = {
  question: {
    imdb_id: "",
    plot: "",
  },
  guesses: [undefined, undefined, undefined, undefined,],
  currentGuessIndex: 0,
  status: "IDLE",
}

export const gameState = writable(INITIAL_STATE);