import { create } from 'zustand';

interface PlayerState {
  position: {
    x: number;
    y: number;
  };
}

export const usePlayerStore = create<PlayerState>((set) => ({
  position: { x: 0, y: 0 },
}));
