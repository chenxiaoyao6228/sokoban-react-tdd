import { create } from 'zustand';

interface PlayerState {
  position: {
    x: number;
    y: number;
  };
  movePlayerToLeft: () => void;
  movePlayerToRight: () => void;
  movePlayerToUp: () => void;
  movePlayerToDown: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  position: { x: 0, y: 0 },
  movePlayerToLeft: () =>
    set((state) => ({
      position: { x: state.position.x - 1, y: state.position.y },
    })),
  movePlayerToRight: () =>
    set((state) => ({
      position: { x: state.position.x + 1, y: state.position.y },
    })),

  movePlayerToDown: () =>
    set((state) => ({
      position: { x: state.position.x, y: state.position.y + 1 },
    })),
  movePlayerToUp: () =>
    set((state) => ({
      position: { x: state.position.x, y: state.position.y - 1 },
    })),
}));
