import useCargoStore from '../cargoStore';
import { MapTile, useMapStore } from '../mapStore';
import useTargetStore from '../targetStore';

const map = [
  [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
  [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
  [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
  [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
  [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
];

describe('cargoStore', () => {
  beforeEach(() => {
    useMapStore.getState().setGameMap(map);
  });

  afterEach(() => {
    useMapStore.getState().setGameMap([]);
  });

  it('should create a cargo', () => {
    const { createCargo } = useCargoStore.getState();
    const cargo = createCargo({ x: 1, y: 1 });
    expect(cargo).toEqual({
      id: expect.any(String),
      x: 1,
      y: 1,
      onTarget: expect.any(Boolean),
    });
  });

  describe('on target', () => {
    it('should move cargo to target', () => {
      const { createCargo, addCargo, moveCargo, findCargoById } =
        useCargoStore.getState();
      const { createTarget, addTarget } = useTargetStore.getState();

      const cargo = createCargo({ x: 1, y: 1 });
      addCargo(cargo);

      const target = createTarget({ x: 1, y: 2 });
      addTarget(target);

      const isCargoMoved = moveCargo(cargo, 0, 1);
      expect(isCargoMoved).toBe(true);

      const updatedCargo = findCargoById(cargo.id);

      expect(updatedCargo?.onTarget).toBe(true);
    });

    it('should move cargo out of target', () => {
      const { createCargo, addCargo, moveCargo, findCargoById } =
        useCargoStore.getState();
      const { createTarget, addTarget } = useTargetStore.getState();

      const cargo = createCargo({ x: 1, y: 2 });
      addCargo(cargo);

      const target = createTarget({ x: 1, y: 2 });
      addTarget(target);

      const isCargoMoved = moveCargo(cargo, 0, -1);
      expect(isCargoMoved).toBe(true);

      const updatedCargo = findCargoById(cargo.id);

      expect(updatedCargo?.onTarget).toBe(false);
    });
  });
});
