import { MapTile, useMapStore } from '../mapStore';
import { usePlayerStore } from '../playerStore';

describe('PlayerStore', () => {
  describe('normal move', () => {
    beforeEach(() => {
      useMapStore.getState().setGameMap([
        [MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR],
        [MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR],
        [MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR],
      ]);
    });
    it('should be able to move player to left', () => {
      usePlayerStore.setState({ position: { x: 1, y: 1 } });
      const store = usePlayerStore.getState();
      store.movePlayerToLeft();

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 0, y: 1 });
    });

    it('should be able to move player to right', () => {
      usePlayerStore.setState({ position: { x: 1, y: 1 } });
      const store = usePlayerStore.getState();
      store.movePlayerToRight();

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 2, y: 1 });
    });

    it('should be able to move player to up', () => {
      usePlayerStore.setState({ position: { x: 1, y: 1 } });
      const store = usePlayerStore.getState();
      store.movePlayerToUp();

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 1, y: 0 });
    });

    it('should be able to move player to down', () => {
      usePlayerStore.setState({ position: { x: 1, y: 1 } });
      const store = usePlayerStore.getState();
      store.movePlayerToDown();

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 1, y: 2 });
    });
  });

  describe('edge move', () => {
    beforeEach(() => {
      useMapStore.getState().setGameMap([
        [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
        [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
        [MapTile.WALL, MapTile.WALL, MapTile.FLOOR, MapTile.WALL],
      ]);
    });
    it('should not be able to move player to left if it is at the left edge', () => {
      const { movePlayerToLeft, setPlayerPosition } = usePlayerStore.getState();

      setPlayerPosition({
        x: 1,
        y: 0,
      });

      movePlayerToLeft();

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 1, y: 0 });
    });
  });

  it('should not be able to move player to right if it is at the right edge', () => {
    const { movePlayerToRight, setPlayerPosition } = usePlayerStore.getState();

    setPlayerPosition({
      x: 2,
      y: 0,
    });

    movePlayerToRight();

    const newState = usePlayerStore.getState();
    expect(newState.position).toEqual({ x: 2, y: 0 });
  });
  it('should not be able to move player to right if it is at the up edge', () => {
    const { movePlayerToUp, setPlayerPosition } = usePlayerStore.getState();

    setPlayerPosition({
      x: 2,
      y: 0,
    });

    movePlayerToUp();

    const newState = usePlayerStore.getState();
    expect(newState.position).toEqual({ x: 2, y: 0 });
  });
  it('should not be able to move player to right if it is at the down edge', () => {
    const { movePlayerToDown, setPlayerPosition } = usePlayerStore.getState();

    setPlayerPosition({
      x: 2,
      y: 2,
    });

    movePlayerToDown();

    const newState = usePlayerStore.getState();
    expect(newState.position).toEqual({ x: 2, y: 2 });
  });
});
