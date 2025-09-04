import useCargoStore from '../cargoStore';
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

    afterEach(() => {
      useMapStore.getState().setGameMap([]);
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

    it('should not be able to move player to right if it is at the right edge', () => {
      const { movePlayerToRight, setPlayerPosition } =
        usePlayerStore.getState();

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

  describe('can push a cargo', () => {
    beforeEach(() => {
      useMapStore.getState().setGameMap([
        [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
        [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
        [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
        [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
        [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
      ]);
      useCargoStore.getState().clearCargos();
    });

    it('should be able to push a cargo to left', () => {
      const { movePlayerToLeft, setPlayerPosition } = usePlayerStore.getState();
      const { createCargo, addCargo } = useCargoStore.getState();
      addCargo(createCargo({ x: 2, y: 1 }));

      setPlayerPosition({ x: 3, y: 1 });
      movePlayerToLeft();

      expect(useCargoStore.getState().cargos).toEqual([
        { id: expect.any(String), x: 1, y: 1 },
      ]);

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 2, y: 1 });
    });

    it('should be able to push a cargo to right', () => {
      const { movePlayerToRight, setPlayerPosition } =
        usePlayerStore.getState();
      const { createCargo, addCargo } = useCargoStore.getState();
      addCargo(createCargo({ x: 1, y: 1 }));

      setPlayerPosition({ x: 0, y: 1 });
      movePlayerToRight();

      expect(useCargoStore.getState().cargos).toEqual([
        { id: expect.any(String), x: 2, y: 1 },
      ]);

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 1, y: 1 });
    });

    it('should be able to push a cargo to up', () => {
      const { movePlayerToUp, setPlayerPosition } = usePlayerStore.getState();
      const { createCargo, addCargo } = useCargoStore.getState();
      addCargo(createCargo({ x: 1, y: 2 }));

      setPlayerPosition({ x: 1, y: 3 });
      movePlayerToUp();

      expect(useCargoStore.getState().cargos).toEqual([
        { id: expect.any(String), x: 1, y: 1 },
      ]);

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 1, y: 2 });
    });

    it('should be able to push a cargo to down', () => {
      const { createCargo, addCargo } = useCargoStore.getState();
      addCargo(createCargo({ x: 2, y: 2 }));

      usePlayerStore.getState().setPlayerPosition({ x: 2, y: 1 });
      usePlayerStore.getState().movePlayerToDown();

      expect(useCargoStore.getState().cargos).toEqual([
        { id: expect.any(String), x: 2, y: 3 },
      ]);

      expect(usePlayerStore.getState().position).toEqual({ x: 2, y: 2 });
    });

    it('should not move cargo when it is at the wall', () => {
      const { createCargo, addCargo } = useCargoStore.getState();
      addCargo(createCargo({ x: 1, y: 2 }));

      usePlayerStore.getState().setPlayerPosition({ x: 1, y: 3 });
      usePlayerStore.getState().movePlayerToLeft();

      expect(useCargoStore.getState().cargos).toEqual([
        { id: expect.any(String), x: 1, y: 2 },
      ]);

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 1, y: 3 });
    });

    it.only('should not push a cargo when it hits other cargos', () => {
      const { createCargo, addCargo, findCargoById } = useCargoStore.getState();
      const cargo1 = createCargo({ x: 1, y: 2 });
      addCargo(cargo1);
      const cargo2 = createCargo({ x: 2, y: 2 });
      addCargo(cargo2);

      usePlayerStore.getState().setPlayerPosition({ x: 1, y: 3 });
      usePlayerStore.getState().movePlayerToLeft();

      expect(findCargoById(cargo1.id)).toEqual(
        expect.objectContaining({ x: 1, y: 2 })
      );
      expect(findCargoById(cargo2.id)).toEqual(
        expect.objectContaining({ x: 2, y: 2 })
      );

      const newState = usePlayerStore.getState();
      expect(newState.position).toEqual({ x: 1, y: 3 });
    });
  });
});
