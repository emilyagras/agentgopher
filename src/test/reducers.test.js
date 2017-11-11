import reducer from '../reducers';
import deepFreeze from 'deep-freeze';
import * as actions from '../actions';

describe('reducers', () => {
  it('should not mutate', () => {
    const oldState = { cells: [{ id: 1, hidden: true }] };
    deepFreeze(oldState);
    const newState = reducer(oldState, {
      type: 'BECOME_VISIBLE',
      value: { id: 1, hidden: false }
    });
    expect(newState).toEqual({ cells: [{ id: 1, hidden: false }] });
  });

  it('should put fetched cells in state', () => {
    const oldState = { cells: [{ id: 1, hidden: true }] };
    const oldHiddenStatus = true;
    const cell = oldState.cells[0];
    const action = actions.becomeVisible(cell.id);
    const newState = reducer(oldState, action);
    expect(newState.cells[0].id).toBe(cell.id);
    expect(newState.cells[0].hidden).toBe(!oldHiddenStatus);
  });

  it('should only replace the changed cell', () => {
    const oldState = { cells: [{ id: 1, hidden: false }, { id: 2, hidden: false }] };
    const cellToChange = oldState.cells[0];
    const action = actions.becomeInvisible(cellToChange.id);
    const newState = reducer(oldState, action);
    expect(newState.cells).toEqual([
      { id: 1, hidden: true },
      { id: 2, hidden: false }]);
  });

});