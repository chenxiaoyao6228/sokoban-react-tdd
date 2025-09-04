import { create } from 'zustand';
import { PlayerPosition } from './playerStore';

export enum MapTile {
  FLOOR = 0,
  WALL = 1,
}

export type GameMap = MapTile[][];

interface MapState {
  gameMap: GameMap;
}

interface MapAction {
  setGameMap: (map: number[][]) => void;
  isWall: (position: PlayerPosition) => boolean;
}

const defaultState: MapState = {
  gameMap: [],
};

export const useMapStore = create<MapState & MapAction>((set, get) => ({
  ...defaultState,

  isWall: (position) => {
    const { gameMap } = get();

    // out of bounds
    if (
      position.x < 0 ||
      position.x >= gameMap[0].length ||
      position.y < 0 ||
      position.y >= gameMap.length
    ) {
      return true;
    }
    return gameMap[position.y][position.x] === MapTile.WALL;
  },
  setGameMap: (map) => set({ gameMap: map }),
}));
