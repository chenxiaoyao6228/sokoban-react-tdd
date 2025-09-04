import { MapTile } from '../store/mapStore';

export const gameDataLevel1 = {
  player: { x: 1, y: 1 },
  gameMap: [
    [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
    [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
    [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
    [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
    [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
  ],
  cargos: [{ x: 2, y: 2 }],
  targets: [{ x: 2, y: 3 }],
};

export const gameDataLevel2 = {
  player: { x: 2, y: 2 },
  gameMap: [
    [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.FLOOR],
    [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
    [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
    [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
    [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
  ],
  cargos: [{ x: 1, y: 1 }],
  targets: [{ x: 2, y: 3 }],
};

export const gameData = [gameDataLevel1, gameDataLevel2];
