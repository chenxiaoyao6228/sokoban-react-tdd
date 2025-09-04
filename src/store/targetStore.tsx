import { create } from 'zustand';
import { Position } from '../hooks/usePosition';
import { uuid } from '../utils/uuid';

interface Target {
  id: string;
  x: number;
  y: number;
}

interface TargetState {
  targets: Target[];
  createTarget: (position: Position) => Target;
  addTarget: (target: Target) => void;
  findTargetByPos: (position: Position) => Target | undefined;
}

const useTargetStore = create<TargetState>((set, get) => ({
  targets: [],
  createTarget: ({ x, y }) => ({ id: uuid(), x, y }),
  addTarget: (target) =>
    set((state) => ({ targets: [...state.targets, target] })),
  findTargetByPos: (position) =>
    get().targets.find((t) => t.x === position.x && t.y === position.y),
}));

export default useTargetStore;
