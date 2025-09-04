import useCargoStore from '../cargoStore';

describe('cargoStore', () => {
  it('should create a cargo', () => {
    const { createCargo } = useCargoStore.getState();
    const cargo = createCargo({ x: 1, y: 1 });
    expect(cargo).toEqual({ id: expect.any(String), x: 1, y: 1 });
  });
});
