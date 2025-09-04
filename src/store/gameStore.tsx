import { create } from 'zustand';
import useCargoStore from './cargoStore';
import { GameMap, useMapStore } from './mapStore';

import useTargetStore from './targetStore';
import { PlayerPosition, usePlayerStore } from './playerStore';

interface LevelGameData {
  player: PlayerPosition;
  gameMap: GameMap;
  cargos: { x: number; y: number }[];
  targets: { x: number; y: number }[];
}

export type GameData = LevelGameData[];

interface GameState {
  isGameLevelCompleted: boolean;
  gameLevel: number; // Start from 0
  gameData: GameData;
}

interface GameAction {
  checkIfGameCompleted: () => void;
  setIsGameLevelCompleted: (isCompleted: boolean) => void;
  setUpGame: (gameData: GameData) => void;
  setLevelGameData: (gameData: GameData, level: number) => void;
  toNextLevel: () => void;
}

const defaultGameStoreState = {
  isGameLevelCompleted: false,
  gameLevel: 0,
  gameData: [],
};

const useGameStore = create<GameState & GameAction>((set, get) => ({
  ...defaultGameStoreState,
  checkIfGameCompleted: () => {
    const { cargos } = useCargoStore.getState();
    const isCompleted = cargos.every((cargo) => cargo.onTarget);
    set({ isGameLevelCompleted: isCompleted });
  },
  setIsGameLevelCompleted: (isCompleted: boolean) => {
    set({ isGameLevelCompleted: isCompleted });
  },
  setUpGame: (gameData) => {
    set({ gameData });

    get().setLevelGameData(gameData, 0);
  },

  setLevelGameData: (gameData: GameData, level: number) => {
    const levelGameData = gameData[level];
    useMapStore.getState().setGameMap(levelGameData.gameMap);

    // Set player position
    usePlayerStore.getState().setPlayerPosition(levelGameData.player);

    // Add cargos
    levelGameData.cargos.forEach((cargoPos) => {
      const cargo = useCargoStore.getState().createCargo(cargoPos);
      useCargoStore.getState().addCargo(cargo);
    });

    // Add targets
    levelGameData.targets.forEach((targetPos) => {
      const target = useTargetStore.getState().createTarget(targetPos);
      useTargetStore.getState().addTarget(target);
    });
  },

  toNextLevel: () => {
    if (get().gameData.length === get().gameLevel + 1) return;
    // clear state before going to next level
    usePlayerStore.getState().setPlayerPosition({ x: 0, y: 0 });
    useCargoStore.getState().clearCargos();
    useMapStore.getState().clearGameMap();
    useTargetStore.getState().clearTargets();

    get().setLevelGameData(get().gameData, get().gameLevel + 1);

    set((state) => ({
      gameLevel: state.gameLevel + 1,
      isGameLevelCompleted: false,
    }));
  },
}));

export default useGameStore;
