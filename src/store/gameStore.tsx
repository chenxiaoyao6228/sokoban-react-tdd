import { create } from 'zustand';
import useCargoStore from './cargoStore';

interface GameStore {
  isGameCompleted: boolean;
  checkIfGameCompleted: () => void;
}

const useGameStore = create<GameStore>((set) => ({
  isGameCompleted: false,
  checkIfGameCompleted: () => {
    const { cargos } = useCargoStore.getState();
    const isCompleted = cargos.every((cargo) => cargo.onTarget);
    set({ isGameCompleted: isCompleted });
  },
}));

export default useGameStore;
