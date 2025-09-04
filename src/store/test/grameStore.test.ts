import useCargoStore from '../cargoStore';
import useGameStore from '../gameStore';
import useTargetStore from '../targetStore';

describe('game', () => {
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
});
