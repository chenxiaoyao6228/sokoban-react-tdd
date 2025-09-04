import { create } from 'zustand';
import { useMapStore } from './mapStore';
import useCargoStore from './cargoStore';

export interface PlayerPosition {
  x: number;
  y: number;
}

interface PlayerState {
  position: PlayerPosition;
  setPlayerPosition: (position: PlayerPosition) => void;
  movePlayer: (dx: number, dy: number) => void;
  movePlayerToLeft: () => void;
  movePlayerToRight: () => void;
  movePlayerToUp: () => void;
  movePlayerToDown: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  position: { x: 1, y: 1 },
  setPlayerPosition: (position) => set({ position }),

  movePlayer: (dx, dy) => {
    const { isWall } = useMapStore.getState();
    const { position } = get();
    const targetPosition = { x: position.x + dx, y: position.y + dy };

    if (isWall(targetPosition)) {
      return;
    }

    const cargo = useCargoStore.getState().findCargoByPos(targetPosition);

    if (cargo) {
      const isCargoMoved = useCargoStore.getState().moveCargo(cargo, dx, dy);
      if (!isCargoMoved) {
        return;
      }
    }

    set(() => ({
      position: targetPosition,
    }));
  },

  movePlayerToLeft: () => {
    get().movePlayer(-1, 0);
  },

  movePlayerToRight: () => {
    get().movePlayer(1, 0);
  },

  movePlayerToDown: () => {
    get().movePlayer(0, 1);
  },

  movePlayerToUp: () => {
    get().movePlayer(0, -1);
  },
}));
