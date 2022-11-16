import { type Writable, writable } from "svelte/store";
import { browser } from "$app/environment";

export interface Question {
  imdb_id: string;
  plot: string;
  year: number | null;
  director: string;
  actor: string;
}

type GameStatus = "IDLE" | "IN_PROGRESS" | "SUCCESS" | "FAILURE";

export interface GameGuess {
  answer: string;
  isCorrect: boolean;
}

interface GameState {
  question: Question
  guesses: (GameGuess | undefined)[]
  currentGuessIndex: number
  status: GameStatus
}

interface GameStateStore extends Writable<GameState> {
  setNewQuestion: (question: Question) => void;
}

let localGameState: GameState | null = null;
if (typeof window !== 'undefined') {
  if (browser && (localStorage.getItem('gameState') !== null)) {
    localGameState = JSON.parse(localStorage.getItem('gameState') as string);
  }
}

const INITIAL_STATE: GameState = {
  question: {
    imdb_id: "",
    plot: "",
    year: null,
    director: "",
    actor: "",
  },
  guesses: [undefined, undefined, undefined, undefined,],
  currentGuessIndex: 0,
  status: "IDLE",
}

const createGameStateStore = (): GameStateStore => {
  let gameState = writable(localGameState || INITIAL_STATE);

  gameState.subscribe((value) => {
    if (browser) {
      localStorage.gameState = JSON.stringify(value);
    }
  })

  const setNewQuestion = (question: Question) => {
    gameState.update(() => {
      return {
        question,
        guesses: [undefined, undefined, undefined, undefined,],
        currentGuessIndex: 0,
        status: "IN_PROGRESS",
      }
    })
  }

  return Object.assign(gameState, { setNewQuestion });
}

export const gameState = createGameStateStore();