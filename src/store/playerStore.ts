import { create } from 'zustand';
import { useMapStore } from './mapStore';

export interface PlayerPosition {
  x: number;
  y: number;
}

interface PlayerState {
  position: PlayerPosition;
  setPlayerPosition: (position: PlayerPosition) => void;
  movePlayerToLeft: () => void;
  movePlayerToRight: () => void;
  movePlayerToUp: () => void;
  movePlayerToDown: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  position: { x: 1, y: 1 },
  setPlayerPosition: (position) => set({ position }),
  movePlayerToLeft: () => {
    const { isWall } = useMapStore.getState();
    const { position } = get();
    const targetPosition = { x: position.x - 1, y: position.y };

    if (isWall(targetPosition)) {
      return;
    }

    set(() => ({
      position: targetPosition,
    }));
  },

  movePlayerToRight: () => {
    const { isWall } = useMapStore.getState();
    const { position } = get();
    const targetPosition = { x: position.x + 1, y: position.y };

    if (isWall(targetPosition)) {
      return;
    }

    set(() => ({
      position: targetPosition,
    }));
  },

  movePlayerToDown: () => {
    const { isWall } = useMapStore.getState();
    const { position } = get();
    const targetPosition = { x: position.x, y: position.y + 1 };

    if (isWall(targetPosition)) {
      return;
    }

    set(() => ({
      position: targetPosition,
    }));
  },

  movePlayerToUp: () => {
    const { isWall } = useMapStore.getState();
    const { position } = get();
    const targetPosition = { x: position.x, y: position.y - 1 };

    if (isWall(targetPosition)) {
      return;
    }

    set(() => ({
      position: targetPosition,
    }));
  },
}));
