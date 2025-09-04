import { MapTile } from '../store/mapStore';

export const levelGameData = {
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
