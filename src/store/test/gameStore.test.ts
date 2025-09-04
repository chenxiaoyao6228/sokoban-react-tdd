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

const gameDataLevel1 = {
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

const gameDataLevel2 = {
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

const gameData = [gameDataLevel1, gameDataLevel2];

function resetStores() {
  useMapStore.getState().setGameMap([]);
  useCargoStore.getState().clearCargos();
  useTargetStore.getState().clearTargets();
}

describe('game', () => {
  beforeEach(() => {
    useMapStore.getState().setGameMap(map);
    useCargoStore.getState().clearCargos();
    useTargetStore.getState().clearTargets();
    usePlayerStore.getState().setPlayerPosition({ x: 0, y: 0 });
    useGameStore.getState().isGameLevelCompleted = false;
  });

  afterEach(() => {
    resetStores();
    usePlayerStore.getState().setPlayerPosition({ x: 0, y: 0 });
    useGameStore.getState().isGameLevelCompleted = false;
  });

  it('should mark game as completed when all cargos are on targets', () => {
    const cargoStore = useCargoStore.getState();
    const targetStore = useTargetStore.getState();

    const cargo = cargoStore.createCargo({ x: 1, y: 1 });
    cargoStore.addCargo(cargo);

    const target = targetStore.createTarget({ x: 1, y: 2 });
    targetStore.addTarget(target);

    const isCargoMoved = cargoStore.moveCargo(cargo, 0, 1);
    expect(isCargoMoved).toBe(true);

    useGameStore.getState().checkIfGameCompleted();

    expect(useGameStore.getState().isGameLevelCompleted).toBe(true);
  });

  it('should not mark game as completed if cargos are not on targets', () => {
    const cargoStore = useCargoStore.getState();
    const targetStore = useTargetStore.getState();

    const cargo = cargoStore.createCargo({ x: 1, y: 1 });
    cargoStore.addCargo(cargo);

    const target = targetStore.createTarget({ x: 1, y: 2 });
    targetStore.addTarget(target);

    useGameStore.getState().checkIfGameCompleted();

    expect(useGameStore.getState().isGameLevelCompleted).toBe(false);
  });

  it('should setup game and go to next level correctly', () => {
    useGameStore.getState().setUpGame(gameData);

    expect(usePlayerStore.getState().position).toEqual(gameDataLevel1.player);
    expect(useMapStore.getState().gameMap).toEqual(gameDataLevel1.gameMap);
    expect(useCargoStore.getState().cargos.length).toBe(
      gameDataLevel1.cargos.length
    );
    expect(useTargetStore.getState().targets.length).toBe(
      gameDataLevel1.targets.length
    );

    useGameStore.getState().toNextLevel();

    expect(usePlayerStore.getState().position).toEqual(gameDataLevel2.player);
    expect(useMapStore.getState().gameMap).toEqual(gameDataLevel2.gameMap);
    expect(useCargoStore.getState().cargos.length).toBe(
      gameDataLevel2.cargos.length
    );
    expect(useTargetStore.getState().targets.length).toBe(
      gameDataLevel2.targets.length
    );
  });

  it('should reset game level state after go to next level', () => {
    useGameStore.getState().setUpGame(gameData);
    useGameStore.getState().setIsGameLevelCompleted(true);
    useGameStore.getState().toNextLevel();
    expect(useGameStore.getState().gameLevel).toBe(1);
    setTimeout(() => {
      expect(useGameStore.getState().isGameLevelCompleted).toBe(false);
    }, 0);
  });

  it('should not go to next level if the gameData length is reached', () => {
    useGameStore.getState().setUpGame(gameData);

    useGameStore.getState().toNextLevel();
    useGameStore.getState().toNextLevel();

    expect(useGameStore.getState().gameLevel).toBe(1);

    expect(useGameStore.getState().isGameLevelCompleted).toBe(false);
  });
});
