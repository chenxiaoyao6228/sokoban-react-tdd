import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GameState {
  level: number;
  score: number;
  moves: number;
  isGameComplete: boolean;
  isPaused: boolean;
  highScore: number;
  incrementLevel: () => void;
  incrementScore: (points: number) => void;
  incrementMoves: () => void;
  setGameComplete: (complete: boolean) => void;
  setPaused: (paused: boolean) => void;
  resetGame: () => void;
  updateHighScore: () => void;
}

export const useGameStore = create<GameState>()(
  devtools(
    (set, get) => ({
      level: 1,
      score: 0,
      moves: 0,
      isGameComplete: false,
      isPaused: false,
      highScore: 0,

      incrementLevel: () => set((state) => ({ level: state.level + 1 })),
      incrementScore: (points) =>
        set((state) => ({ score: state.score + points })),
      incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),
      setGameComplete: (complete) => set({ isGameComplete: complete }),
      setPaused: (paused) => set({ isPaused: paused }),
      resetGame: () =>
        set({
          level: 1,
          score: 0,
          moves: 0,
          isGameComplete: false,
          isPaused: false,
        }),
      updateHighScore: () => {
        const { score, highScore } = get();
        if (score > highScore) {
          set({ highScore: score });
        }
      },
    }),
    {
      name: 'game-store',
    }
  )
);
