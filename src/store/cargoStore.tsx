import { create } from 'zustand';
import { Position } from '../hooks/usePosition';
import { uuid } from '../utils/uuid';
import { useMapStore } from './mapStore';

interface Cargo {
  id: string;
  x: number;
  y: number;
}

interface CargoState {
  cargos: Cargo[];
  createCargo: (position: Position) => Cargo;
  addCargo: (cargo: Cargo) => void;
  updateCargo: (id: string, cargo: Cargo) => void;
  moveCargo: (cargo: Cargo, dx: number, dy: number) => boolean;
  findCargoById: (id: string) => Cargo | undefined;
  findCargoByPos: (position: Position) => Cargo | undefined;
  clearCargos: () => void;
}

const useCargoStore = create<CargoState>((set, get) => ({
  cargos: [],
  createCargo: ({ x, y }) => ({ id: uuid(), x, y }),
  moveCargo: (cargo, dx, dy) => {
    const { updateCargo } = get();
    const { isWall } = useMapStore.getState();
    const targetPosition = { x: cargo.x + dx, y: cargo.y + dy };
    if (cargo) {
      if (isWall(targetPosition)) {
        return false;
      }
      // find if there are any cargos at the current place
      if (get().findCargoByPos(targetPosition)) {
        return false;
      }
      updateCargo(cargo.id, { ...cargo, x: cargo.x + dx, y: cargo.y + dy });
      return true;
    }
    return false;
  },
  updateCargo: (id, cargo) =>
    set((state) => ({
      cargos: state.cargos.map((c) => (c.id === id ? cargo : c)),
    })),
  addCargo: (cargo) => set((state) => ({ cargos: [...state.cargos, cargo] })),
  findCargoById: (cargoId) => get().cargos.find((c) => c.id === cargoId),
  findCargoByPos: (position) =>
    get().cargos.find((c) => c.x === position.x && c.y === position.y),
  clearCargos: () => set({ cargos: [] }),
}));

export default useCargoStore;
