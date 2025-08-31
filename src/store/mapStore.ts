import { create } from 'zustand';

export enum MapTile {
  FLOOR = 0,
  WALL = 1,
}

interface MapState {
  map: number[][];
  setMap: (map: number[][]) => void;
}

export const useMapStore = create<MapState>((set) => ({
  map: [
    [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
    [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
    [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
    [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
  ],
  setMap: (map) => set({ map }),
}));
