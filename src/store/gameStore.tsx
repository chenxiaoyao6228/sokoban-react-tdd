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

interface GameStore {
  isGameCompleted: boolean;
  checkIfGameCompleted: () => void;
  setUpGame: (gameData: LevelGameData) => void;
}

const useGameStore = create<GameStore>((set) => ({
  isGameCompleted: false,
  checkIfGameCompleted: () => {
    const { cargos } = useCargoStore.getState();
    const isCompleted = cargos.every((cargo) => cargo.onTarget);
    set({ isGameCompleted: isCompleted });
  },
  setUpGame: (gameData) => {
    useMapStore.getState().setGameMap(gameData.gameMap);

    // Set player position
    usePlayerStore.getState().setPlayerPosition(gameData.player);

    // Add cargos
    gameData.cargos.forEach((cargoPos) => {
      const cargo = useCargoStore.getState().createCargo(cargoPos);
      useCargoStore.getState().addCargo(cargo);
    });

    // Add targets
    gameData.targets.forEach((targetPos) => {
      const target = useTargetStore.getState().createTarget(targetPos);
      useTargetStore.getState().addTarget(target);
    });
  },
}));

export default useGameStore;
