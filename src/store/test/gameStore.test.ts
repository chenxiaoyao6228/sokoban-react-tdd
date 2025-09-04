import { levelGameData } from '../../game/gameData';
import useCargoStore from '../cargoStore';
import useGameStore from '../gameStore';
import { MapTile, useMapStore } from '../mapStore';
import { usePlayerStore } from '../playerStore';
import useTargetStore from '../targetStore';

const map = [
  [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
  [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
  [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
  [MapTile.WALL, MapTile.FLOOR, MapTile.FLOOR, MapTile.FLOOR, MapTile.WALL],
  [MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL, MapTile.WALL],
];

describe('game', () => {
  beforeEach(() => {
    useMapStore.getState().setGameMap(map);
  });

  afterEach(() => {
    useMapStore.getState().setGameMap([]);
    useCargoStore.getState().clearCargos();
    useTargetStore.getState().clearTargets();
  });

  it('should game completed', () => {
    const { createCargo, addCargo, moveCargo, findCargoById } =
      useCargoStore.getState();
    const { createTarget, addTarget } = useTargetStore.getState();

    const cargo = createCargo({ x: 1, y: 1 });
    addCargo(cargo);

    const target = createTarget({ x: 1, y: 2 });
    addTarget(target);

    const isCargoMoved = moveCargo(cargo, 0, 1);
    expect(isCargoMoved).toBe(true);

    findCargoById(cargo.id);

    useGameStore.getState().checkIfGameCompleted();

    expect(useGameStore.getState().isGameCompleted).toBe(true);
  });

  it('should game not completed', () => {
    const { createCargo, addCargo } = useCargoStore.getState();
    const { createTarget, addTarget } = useTargetStore.getState();

    const cargo = createCargo({ x: 1, y: 1 });
    addCargo(cargo);

    const target = createTarget({ x: 1, y: 2 });
    addTarget(target);

    useGameStore.getState().checkIfGameCompleted();

    expect(useGameStore.getState().isGameCompleted).toBe(false);
  });

  it('should setup game', () => {
    useGameStore.getState().setUpGame(levelGameData);

    expect(usePlayerStore.getState().position).toEqual(levelGameData.player);
    expect(useMapStore.getState().gameMap).toEqual(levelGameData.gameMap);
    console.log(
      'useCargoStore.getState().cargos',
      useCargoStore.getState().cargos
    );

    expect(useCargoStore.getState().cargos.length).toEqual(
      levelGameData.cargos.length
    );

    console.log(
      'useTargetStore.getState().targets',
      useTargetStore.getState().targets
    );

    expect(useTargetStore.getState().targets.length).toEqual(
      levelGameData.targets.length
    );
  });
});
