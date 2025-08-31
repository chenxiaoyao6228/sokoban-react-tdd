import { MapTile, useMapStore } from '../mapStore';

describe('mapStore', () => {
  it('should be able to set map with new map', () => {
    const newMap = [
      [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
      [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
      [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
      [MapTile.WALL, MapTile.WALL, MapTile.FLOOR, MapTile.WALL, MapTile.WALL],
    ];
    const store = useMapStore.getState();
    store.setGameMap(newMap);

    const newState = useMapStore.getState();
    expect(newState.gameMap).toEqual(newMap);
  });
});
