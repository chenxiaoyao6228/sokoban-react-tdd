import { usePlayerStore } from '../playerStore';

describe('PlayerStore', () => {
  beforeEach(() => {
    usePlayerStore.setState({ position: { x: 1, y: 1 } });
  });

  it('should be able to move player to left', () => {
    const store = usePlayerStore.getState();
    store.movePlayerToLeft();

    const newState = usePlayerStore.getState();
    expect(newState.position).toEqual({ x: 0, y: 1 });
  });

  it('should be able to move player to right', () => {
    const store = usePlayerStore.getState();
    store.movePlayerToRight();

    const newState = usePlayerStore.getState();
    expect(newState.position).toEqual({ x: 2, y: 1 });
  });

  it('should be able to move player to up', () => {
    const store = usePlayerStore.getState();
    store.movePlayerToUp();

    const newState = usePlayerStore.getState();
    expect(newState.position).toEqual({ x: 1, y: 0 });
  });

  it('should be able to move player to down', () => {
    const store = usePlayerStore.getState();
    store.movePlayerToDown();

    const newState = usePlayerStore.getState();
    expect(newState.position).toEqual({ x: 1, y: 2 });
  });
});
